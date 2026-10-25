import { Router, Response } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { recalculateStudentReadiness } from '../services/readiness.service';

const router = Router();

// Get Mock Tests
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const userId = req.user!.userId;

    const tests = await prisma.mockTest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        attempts: {
          where: { userId },
          orderBy: { completedAt: 'desc' },
        },
      },
    });

    const formatted = tests.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      durationMinutes: t.durationMinutes,
      totalQuestions: t.totalQuestions,
      passingMarks: t.passingMarks,
      negativeMarking: t.negativeMarking,
      category: t.category,
      targetCompany: t.targetCompany,
      cutoffPercentage: t.cutoffPercentage,
      userAttemptsCount: t.attempts.length,
      bestScore: t.attempts.length > 0 ? Math.max(...t.attempts.map((a) => a.score)) : null,
      lastAttemptAt: t.attempts[0]?.completedAt || null,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

// Get Single Mock Test for Live Attempt (hides correctOpt & explanation)
router.get('/:id', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const id = req.params.id as string;

    const test = await prisma.mockTest.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { orderIndex: 'asc' },
          include: { question: true },
        },
      },
    });

    if (!test) {
      res.status(404).json({ error: 'Mock test not found' });
      return;
    }

    const sanitizedQuestions = (test as any).questions.map((tq: any) => ({
      orderIndex: tq.orderIndex,
      questionId: tq.question.id,
      title: tq.question.title,
      prompt: tq.question.prompt,
      category: tq.question.category,
      subCategory: tq.question.subCategory,
      difficulty: tq.question.difficulty,
      options: JSON.parse(tq.question.options || '[]'),
    }));

    res.json({
      id: test.id,
      title: test.title,
      description: test.description,
      durationMinutes: test.durationMinutes,
      totalQuestions: test.totalQuestions,
      passingMarks: test.passingMarks,
      negativeMarking: test.negativeMarking,
      category: test.category,
      targetCompany: test.targetCompany,
      cutoffPercentage: test.cutoffPercentage,
      questions: sanitizedQuestions,
    });
  } catch (err) {
    next(err);
  }
});

// Submit Mock Test
router.post('/:id/submit', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const id = req.params.id as string;
    const { answers, timeSpentSec = 0 } = req.body;
    const userId = req.user!.userId;

    const test = await prisma.mockTest.findUnique({
      where: { id },
      include: {
        questions: {
          include: { question: true },
        },
      },
    });

    if (!test) {
      res.status(404).json({ error: 'Mock test not found' });
      return;
    }

    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;
    const sectionBreakdown: Record<string, { total: number; attempted: number; correct: number; incorrect: number; score: number }> = {};

    for (const tq of (test as any).questions) {
      const q = tq.question;
      const selected = answers ? answers[q.id] : undefined;
      const cat = q.category;

      if (!sectionBreakdown[cat]) {
        sectionBreakdown[cat] = { total: 0, attempted: 0, correct: 0, incorrect: 0, score: 0 };
      }
      sectionBreakdown[cat].total++;

      if (selected === undefined || selected === null) {
        skippedCount++;
      } else {
        sectionBreakdown[cat].attempted++;
        if (selected === q.correctOpt) {
          correctCount++;
          sectionBreakdown[cat].correct++;
          sectionBreakdown[cat].score += 1.0;
        } else {
          incorrectCount++;
          sectionBreakdown[cat].incorrect++;
          sectionBreakdown[cat].score -= test.negativeMarking;
        }
      }
    }

    const attemptedCount = correctCount + incorrectCount;
    const rawScore = correctCount * 1.0 - incorrectCount * test.negativeMarking;
    const finalScore = Math.max(0, Math.round(rawScore * 100) / 100);
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const scorePercentage = test.totalQuestions > 0 ? Math.round((finalScore / test.totalQuestions) * 100) : 0;
    const passed = scorePercentage >= test.cutoffPercentage;

    const attempt = await prisma.testAttempt.create({
      data: {
        userId,
        mockTestId: test.id,
        score: finalScore,
        totalMarks: test.totalQuestions * 1.0,
        accuracy,
        attempted: attemptedCount,
        correct: correctCount,
        incorrect: incorrectCount,
        skipped: skippedCount,
        timeSpentSec,
        sectionScores: JSON.stringify(sectionBreakdown),
      },
    });

    // Update readiness score
    const profile = await prisma.studentProfile.findUnique({ where: { userId } });
    if (profile) {
      await recalculateStudentReadiness(profile.id);
    }

    res.json({
      attemptId: attempt.id,
      score: finalScore,
      totalMarks: test.totalQuestions,
      scorePercentage,
      accuracy,
      attempted: attemptedCount,
      correct: correctCount,
      incorrect: incorrectCount,
      skipped: skippedCount,
      passed,
      cutoffPercentage: test.cutoffPercentage,
      targetCompany: test.targetCompany,
      sectionScores: sectionBreakdown,
      timeSpentSec,
    });
  } catch (err) {
    next(err);
  }
});

// Get User Test Attempts History
router.get('/attempts/my', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const attempts = await prisma.testAttempt.findMany({
      where: { userId: req.user!.userId },
      include: { mockTest: true },
      orderBy: { completedAt: 'desc' },
    });
    res.json(attempts);
  } catch (err) {
    next(err);
  }
});

// Get Detailed Attempt Review
router.get('/attempts/:attemptId', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const attemptId = req.params.attemptId as string;
    const userId = req.user!.userId;

    const attempt = await prisma.testAttempt.findUnique({
      where: { id: attemptId },
      include: {
        mockTest: {
          include: {
            questions: {
              orderBy: { orderIndex: 'asc' },
              include: { question: true },
            },
          },
        },
      },
    });

    if (!attempt || (attempt.userId !== userId && req.user!.role !== 'ADMIN')) {
      res.status(404).json({ error: 'Attempt record not found' });
      return;
    }

    const questionsWithSolutions = (attempt as any).mockTest.questions.map((tq: any) => ({
      orderIndex: tq.orderIndex,
      questionId: tq.question.id,
      title: tq.question.title,
      prompt: tq.question.prompt,
      category: tq.question.category,
      subCategory: tq.question.subCategory,
      difficulty: tq.question.difficulty,
      options: JSON.parse(tq.question.options || '[]'),
      correctOpt: tq.question.correctOpt,
      explanation: tq.question.explanation,
    }));

    res.json({
      attempt,
      questions: questionsWithSolutions,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
