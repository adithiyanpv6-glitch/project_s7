import { Router, Response } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, requireRole, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Ensure only ADMIN can access these routes
router.use(authenticate);
router.use(requireRole(['ADMIN']));

// Admin Overview Analytics
router.get('/stats', async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const [
      totalStudents,
      totalQuestions,
      totalMockTests,
      totalAttempts,
      totalInterviews,
      profiles,
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.question.count(),
      prisma.mockTest.count(),
      prisma.testAttempt.count(),
      prisma.mockInterview.count(),
      prisma.studentProfile.findMany({ select: { readinessScore: true, branch: true, cgpa: true } }),
    ]);

    const avgReadiness =
      profiles.length > 0
        ? Math.round((profiles.reduce((acc, p) => acc + p.readinessScore, 0) / profiles.length) * 10) / 10
        : 0;

    const avgCgpa =
      profiles.length > 0
        ? Math.round((profiles.reduce((acc, p) => acc + p.cgpa, 0) / profiles.length) * 100) / 100
        : 0;

    // Readiness distribution
    const readinessBands = {
      'Tier 1 (80-100 Ready)': profiles.filter((p) => p.readinessScore >= 80).length,
      'Tier 2 (65-79 Moderate)': profiles.filter((p) => p.readinessScore >= 65 && p.readinessScore < 80).length,
      'Tier 3 (<65 Needs Prep)': profiles.filter((p) => p.readinessScore < 65).length,
    };

    // Branch breakdown
    const branchCounts: Record<string, number> = {};
    for (const p of profiles) {
      branchCounts[p.branch] = (branchCounts[p.branch] || 0) + 1;
    }

    res.json({
      totalStudents,
      totalQuestions,
      totalMockTests,
      totalAttempts,
      totalInterviews,
      avgReadiness,
      avgCgpa,
      readinessBands,
      branchCounts,
    });
  } catch (err) {
    next(err);
  }
});

// Student Management (Search, Filter, Pagination)
router.get('/students', async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const { search, page = '1', limit = '20' } = req.query as Record<string, string>;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const where: any = { role: 'STUDENT' };
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [total, students] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          studentProfile: {
            include: { diagnosticResult: true },
          },
          testAttempts: { orderBy: { completedAt: 'desc' }, take: 1 },
          interviewsAsStudent: { orderBy: { createdAt: 'desc' }, take: 1 },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const formatted = students.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      avatar: s.avatar,
      college: s.studentProfile?.college || 'N/A',
      branch: s.studentProfile?.branch || 'N/A',
      cgpa: s.studentProfile?.cgpa || 0,
      readinessScore: s.studentProfile?.readinessScore || 0,
      streakDays: s.studentProfile?.streakDays || 0,
      targetRoles: JSON.parse(s.studentProfile?.targetRoles || '[]'),
      targetCompanies: JSON.parse(s.studentProfile?.targetCompanies || '[]'),
      lastAttemptScore: s.testAttempts[0]?.score || null,
      lastInterviewStatus: s.interviewsAsStudent[0]?.status || null,
    }));

    res.json({
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      students: formatted,
    });
  } catch (err) {
    next(err);
  }
});

// Question Management: Create Question
router.post('/questions', async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const { title, prompt, category, subCategory, difficulty, options, correctOpt, explanation, companyTags } = req.body;

    const question = await prisma.question.create({
      data: {
        title,
        prompt,
        category,
        subCategory,
        difficulty,
        options: JSON.stringify(options),
        correctOpt: parseInt(correctOpt, 10),
        explanation,
        companyTags: JSON.stringify(companyTags || []),
      },
    });

    res.status(201).json({ message: 'Question created successfully in bank', question });
  } catch (err) {
    next(err);
  }
});

// Update Question
router.put('/questions/:id', async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const id = req.params.id as string;
    const { title, prompt, category, subCategory, difficulty, options, correctOpt, explanation, companyTags } = req.body;

    const updated = await prisma.question.update({
      where: { id },
      data: {
        title,
        prompt,
        category,
        subCategory,
        difficulty,
        options: JSON.stringify(options),
        correctOpt: parseInt(correctOpt, 10),
        explanation,
        companyTags: JSON.stringify(companyTags || []),
      },
    });

    res.json({ message: 'Question updated successfully', question: updated });
  } catch (err) {
    next(err);
  }
});

// Delete Question
router.delete('/questions/:id', async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const id = req.params.id as string;
    await prisma.question.delete({ where: { id } });
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// Create Mock Test
router.post('/mocktests', async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const {
      title,
      description,
      durationMinutes,
      passingMarks,
      negativeMarking = 0.25,
      category,
      targetCompany,
      cutoffPercentage = 70.0,
      questionIds = [],
    } = req.body;

    const test = await prisma.mockTest.create({
      data: {
        title,
        description,
        durationMinutes: parseInt(durationMinutes, 10),
        totalQuestions: questionIds.length,
        passingMarks: parseFloat(passingMarks),
        negativeMarking: parseFloat(negativeMarking),
        category,
        targetCompany: targetCompany || null,
        cutoffPercentage: parseFloat(cutoffPercentage),
      },
    });

    for (let i = 0; i < questionIds.length; i++) {
      await prisma.testQuestion.create({
        data: {
          mockTestId: test.id,
          questionId: questionIds[i],
          orderIndex: i + 1,
        },
      });
    }

    res.status(201).json({ message: 'Mock test created and published', test });
  } catch (err) {
    next(err);
  }
});

// Export Reports
router.get('/export', async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: {
        studentProfile: true,
        testAttempts: true,
        codingSubmissions: { where: { status: 'ACCEPTED' } },
      },
    });

    const report = students.map((s) => ({
      name: s.name,
      email: s.email,
      college: s.studentProfile?.college || 'N/A',
      branch: s.studentProfile?.branch || 'N/A',
      cgpa: s.studentProfile?.cgpa || 0,
      readinessScore: s.studentProfile?.readinessScore || 0,
      streakDays: s.studentProfile?.streakDays || 0,
      solvedCodingCount: s.codingSubmissions.length,
      testsTaken: s.testAttempts.length,
      targetCompanies: s.studentProfile?.targetCompanies || '[]',
      targetRoles: s.studentProfile?.targetRoles || '[]',
    }));

    res.json({
      generatedAt: new Date().toISOString(),
      studentCount: report.length,
      report,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
