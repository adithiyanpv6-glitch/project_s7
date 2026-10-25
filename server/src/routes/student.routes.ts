import { Router, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { generatePersonalizedRoadmap } from '../services/roadmap.service';
import { recalculateStudentReadiness } from '../services/readiness.service';

const router = Router();

const onboardingSchema = z.object({
  college: z.string().min(2),
  branch: z.string().min(2),
  gradYear: z.number().int().min(2023).max(2030),
  cgpa: z.number().min(0).max(10),
  targetRoles: z.array(z.string()).min(1),
  targetCompanies: z.array(z.string()).min(1),
  skillLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  preferredLang: z.string().min(1),
  dailyHours: z.number().min(0.5).max(12),
  targetDate: z.string().optional(),
  strengths: z.array(z.string()).optional(),
  weakAreas: z.array(z.string()).optional(),
  roadmapDuration: z.number().int().default(60),
});

// Onboarding submission & roadmap initialization
router.post('/onboarding', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const data = onboardingSchema.parse(req.body);
    const userId = req.user!.userId;

    const targetDate = data.targetDate ? new Date(data.targetDate) : new Date(Date.now() + data.roadmapDuration * 86400000);

    const profile = await prisma.studentProfile.upsert({
      where: { userId },
      update: {
        college: data.college,
        branch: data.branch,
        gradYear: data.gradYear,
        cgpa: data.cgpa,
        targetRoles: JSON.stringify(data.targetRoles),
        targetCompanies: JSON.stringify(data.targetCompanies),
        skillLevel: data.skillLevel,
        preferredLang: data.preferredLang,
        dailyHours: data.dailyHours,
        targetDate,
        strengths: JSON.stringify(data.strengths || []),
        weakAreas: JSON.stringify(data.weakAreas || []),
        onboardingDone: true,
        roadmapDuration: data.roadmapDuration,
      },
      create: {
        userId,
        college: data.college,
        branch: data.branch,
        gradYear: data.gradYear,
        cgpa: data.cgpa,
        targetRoles: JSON.stringify(data.targetRoles),
        targetCompanies: JSON.stringify(data.targetCompanies),
        skillLevel: data.skillLevel,
        preferredLang: data.preferredLang,
        dailyHours: data.dailyHours,
        targetDate,
        strengths: JSON.stringify(data.strengths || []),
        weakAreas: JSON.stringify(data.weakAreas || []),
        onboardingDone: true,
        roadmapDuration: data.roadmapDuration,
        readinessScore: 45.0,
      },
    });

    // Generate personalized roadmap tasks
    await generatePersonalizedRoadmap({
      profileId: profile.id,
      skillLevel: data.skillLevel,
      preferredLang: data.preferredLang,
      targetRoles: data.targetRoles,
      targetCompanies: data.targetCompanies,
      weakAreas: data.weakAreas || [],
      durationDays: data.roadmapDuration,
    });

    await recalculateStudentReadiness(profile.id);

    res.json({
      message: 'Onboarding completed and preparation roadmap generated successfully!',
      profile,
    });
  } catch (err) {
    next(err);
  }
});

// Get Student Profile
router.get('/profile', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: req.user!.userId },
      include: { diagnosticResult: true },
    });
    if (!profile) {
      res.status(404).json({ error: 'Student profile not found. Please complete onboarding.' });
      return;
    }
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

// Get Student Roadmap
router.get('/roadmap', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: req.user!.userId },
    });
    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    const tasks = await prisma.roadmapTask.findMany({
      where: { profileId: profile.id },
      orderBy: { dayNumber: 'asc' },
    });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.completed).length;
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    res.json({
      roadmapDuration: profile.roadmapDuration,
      totalTasks,
      completedTasks,
      percentage,
      tasks,
    });
  } catch (err) {
    next(err);
  }
});

// Toggle Roadmap Task completion
router.patch('/roadmap/:taskId/toggle', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const taskId = req.params.taskId as string;
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: req.user!.userId },
    });

    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    const task = await prisma.roadmapTask.findFirst({
      where: { id: taskId, profileId: profile.id },
    });

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    const updated = await prisma.roadmapTask.update({
      where: { id: taskId },
      data: {
        completed: !task.completed,
        completedAt: !task.completed ? new Date() : null,
      },
    });

    // Update readiness score dynamically
    const newReadiness = await recalculateStudentReadiness(profile.id);

    res.json({
      message: updated.completed ? 'Task marked as completed' : 'Task reopened',
      task: updated,
      newReadinessScore: newReadiness,
    });
  } catch (err) {
    next(err);
  }
});

// Reschedule Roadmap Task
router.patch('/roadmap/:taskId/reschedule', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const taskId = req.params.taskId as string;
    const { newDueDate } = req.body;

    const profile = await prisma.studentProfile.findUnique({
      where: { userId: req.user!.userId },
    });

    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    const updated = await prisma.roadmapTask.update({
      where: { id: taskId },
      data: { dueDate: new Date(newDueDate) },
    });

    res.json({ message: 'Task rescheduled successfully', task: updated });
  } catch (err) {
    next(err);
  }
});

// Submit Diagnostic Assessment
router.post('/diagnostic/submit', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const { answers } = req.body;
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: req.user!.userId },
    });

    if (!profile) {
      res.status(404).json({ error: 'Student profile not found. Please complete onboarding first.' });
      return;
    }

    const questionIds = Object.keys(answers || {});
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
    });

    let quantCorrect = 0, quantTotal = 0;
    let logicalCorrect = 0, logicalTotal = 0;
    let verbalCorrect = 0, verbalTotal = 0;
    let codingCorrect = 0, codingTotal = 0;
    let coreCsCorrect = 0, coreCsTotal = 0;
    let softSkillsCorrect = 0, softSkillsTotal = 0;

    for (const q of questions) {
      const isCorrect = answers[q.id] === q.correctOpt;
      if (q.category === 'QUANTITATIVE') {
        quantTotal++;
        if (isCorrect) quantCorrect++;
      } else if (q.category === 'LOGICAL') {
        logicalTotal++;
        if (isCorrect) logicalCorrect++;
      } else if (q.category === 'VERBAL') {
        verbalTotal++;
        if (isCorrect) verbalCorrect++;
      } else if (q.category === 'PROGRAMMING' || q.category === 'DSA') {
        codingTotal++;
        if (isCorrect) codingCorrect++;
      } else if (q.category === 'CORE_CS') {
        coreCsTotal++;
        if (isCorrect) coreCsCorrect++;
      } else {
        softSkillsTotal++;
        if (isCorrect) softSkillsCorrect++;
      }

      await prisma.practiceLog.create({
        data: {
          userId: req.user!.userId,
          questionId: q.id,
          selectedOpt: answers[q.id],
          isCorrect,
          timeTakenSec: 45,
        },
      });
    }

    const calcCategory = (correct: number, total: number, fallback: number = 75) =>
      total > 0 ? Math.round((correct / total) * 100) : fallback;

    const quantScore = calcCategory(quantCorrect, quantTotal, 78);
    const logicalScore = calcCategory(logicalCorrect, logicalTotal, 80);
    const verbalScore = calcCategory(verbalCorrect, verbalTotal, 74);
    const codingScore = calcCategory(codingCorrect, codingTotal, 76);
    const coreCsScore = calcCategory(coreCsCorrect, coreCsTotal, 70);
    const softSkillsScore = calcCategory(softSkillsCorrect, softSkillsTotal, 75);

    const overallScore = Math.round(
      (quantScore * 0.2 +
        logicalScore * 0.2 +
        verbalScore * 0.15 +
        codingScore * 0.2 +
        coreCsScore * 0.15 +
        softSkillsScore * 0.1) *
        10
    ) / 10;

    const scores = [
      { name: 'Quantitative Aptitude', score: quantScore },
      { name: 'Logical Reasoning', score: logicalScore },
      { name: 'Verbal Ability', score: verbalScore },
      { name: 'Programming & DSA', score: codingScore },
      { name: 'Core CS (OS, DBMS, Networks)', score: coreCsScore },
      { name: 'Soft Skills & Interview Readiness', score: softSkillsScore },
    ];

    scores.sort((a, b) => b.score - a.score);
    const strengthsSummary = scores.slice(0, 2).map((s) => `Strong performance in ${s.name} (${s.score}%)`);
    const weaknessesSummary = scores.slice(-2).map((s) => `Immediate improvement required in ${s.name} (${s.score}%)`);

    const recommendations = [
      `Allocate 45 minutes daily to ${scores[scores.length - 1].name}`,
      `Solve at least 5 DSA problems weekly in your chosen language (${profile.preferredLang})`,
      'Schedule a mock interview on STAR behavioral framework within 14 days',
      'Attempt full-length company mock test at the end of each sprint',
    ];

    const diagnostic = await prisma.diagnosticResult.upsert({
      where: { profileId: profile.id },
      update: {
        overallScore,
        quantScore,
        logicalScore,
        verbalScore,
        codingScore,
        coreCsScore,
        softSkillsScore,
        strengthsSummary: JSON.stringify(strengthsSummary),
        weaknessesSummary: JSON.stringify(weaknessesSummary),
        recommendations: JSON.stringify(recommendations),
        completedAt: new Date(),
      },
      create: {
        profileId: profile.id,
        overallScore,
        quantScore,
        logicalScore,
        verbalScore,
        codingScore,
        coreCsScore,
        softSkillsScore,
        strengthsSummary: JSON.stringify(strengthsSummary),
        weaknessesSummary: JSON.stringify(weaknessesSummary),
        recommendations: JSON.stringify(recommendations),
      },
    });

    await recalculateStudentReadiness(profile.id);

    res.json({
      message: 'Placement readiness diagnostic completed successfully!',
      diagnostic,
    });
  } catch (err) {
    next(err);
  }
});

// Get Student Diagnostic
router.get('/diagnostic', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: req.user!.userId },
      include: { diagnosticResult: true },
    });
    if (!profile || !profile.diagnosticResult) {
      res.status(404).json({ error: 'Diagnostic assessment has not been completed yet.' });
      return;
    }
    res.json(profile.diagnosticResult);
  } catch (err) {
    next(err);
  }
});

// Student Dashboard Summary
router.get('/dashboard', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const userId = req.user!.userId;
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
      include: {
        diagnosticResult: true,
        roadmapTasks: true,
      },
    });

    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    const readinessScore = await recalculateStudentReadiness(profile.id);
    const tasksDueToday = profile.roadmapTasks.filter((t) => !t.completed).slice(0, 4);

    const submissions = await prisma.codingSubmission.findMany({
      where: { userId, status: 'ACCEPTED' },
    });
    const solvedProblemIds = new Set(submissions.map((s) => s.problemId));

    const practiceLogs = await prisma.practiceLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    const correctCount = practiceLogs.filter((p) => p.isCorrect).length;
    const practiceAccuracy = practiceLogs.length > 0 ? Math.round((correctCount / practiceLogs.length) * 100) : 0;

    const attempts = await prisma.testAttempt.findMany({
      where: { userId },
      include: { mockTest: true },
      orderBy: { completedAt: 'desc' },
      take: 5,
    });

    const upcomingInterviews = await prisma.mockInterview.findMany({
      where: {
        studentId: userId,
        status: { in: ['SCHEDULED', 'IN_PROGRESS'] },
      },
      include: { interviewer: true },
      orderBy: { scheduledFor: 'asc' },
    });

    const resume = await prisma.resumeAnalysis.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      readinessScore,
      streakDays: profile.streakDays || 1,
      targetDate: profile.targetDate,
      dailyHours: profile.dailyHours,
      skillLevel: profile.skillLevel,
      targetCompanies: JSON.parse(profile.targetCompanies || '[]'),
      targetRoles: JSON.parse(profile.targetRoles || '[]'),
      roadmap: {
        total: profile.roadmapTasks.length,
        completed: profile.roadmapTasks.filter((t) => t.completed).length,
        percentage:
          profile.roadmapTasks.length > 0
            ? Math.round((profile.roadmapTasks.filter((t) => t.completed).length / profile.roadmapTasks.length) * 100)
            : 0,
      },
      tasksDueToday,
      codingSolvedCount: solvedProblemIds.size,
      practiceStats: {
        totalPracticed: practiceLogs.length,
        accuracy: practiceAccuracy,
      },
      latestTestAttempts: attempts,
      upcomingInterviews,
      latestResumeScore: resume ? resume.overallScore : null,
      diagnostic: profile.diagnosticResult,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
