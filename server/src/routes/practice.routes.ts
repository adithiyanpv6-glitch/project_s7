import { Router, Response } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { recalculateStudentReadiness } from '../services/readiness.service';

const router = Router();

// Get Questions with Filters
router.get('/questions', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const userId = req.user!.userId;
    const {
      category,
      subCategory,
      difficulty,
      company,
      search,
      bookmarkedOnly,
      incorrectOnly,
      page = '1',
      limit = '20',
    } = req.query as Record<string, string>;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (category && category !== 'ALL') {
      where.category = category;
    }
    if (subCategory) {
      where.subCategory = subCategory;
    }
    if (difficulty && difficulty !== 'ALL') {
      where.difficulty = difficulty;
    }
    if (company && company !== 'ALL') {
      where.companyTags = { contains: company };
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { prompt: { contains: search } },
      ];
    }

    if (bookmarkedOnly === 'true') {
      const userBookmarks = await prisma.bookmark.findMany({
        where: { userId },
        select: { questionId: true },
      });
      where.id = { in: userBookmarks.map((b) => b.questionId) };
    }

    if (incorrectOnly === 'true') {
      const incorrectLogs = await prisma.practiceLog.findMany({
        where: { userId, isCorrect: false },
        select: { questionId: true },
      });
      where.id = { in: incorrectLogs.map((l) => l.questionId) };
    }

    const [total, questions] = await Promise.all([
      prisma.question.count({ where }),
      prisma.question.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: {
          bookmarks: { where: { userId } },
          practiceLogs: { where: { userId }, orderBy: { createdAt: 'desc' }, take: 1 },
        },
      }),
    ]);

    const formatted = questions.map((q: any) => ({
      id: q.id,
      title: q.title,
      prompt: q.prompt,
      category: q.category,
      subCategory: q.subCategory,
      difficulty: q.difficulty,
      options: JSON.parse(q.options || '[]'),
      correctOpt: q.correctOpt,
      explanation: q.explanation,
      companyTags: JSON.parse(q.companyTags || '[]'),
      isBookmarked: q.bookmarks ? q.bookmarks.length > 0 : false,
      lastAttempt: q.practiceLogs && q.practiceLogs[0]
        ? {
            selectedOpt: q.practiceLogs[0].selectedOpt,
            isCorrect: q.practiceLogs[0].isCorrect,
            timeTakenSec: q.practiceLogs[0].timeTakenSec,
          }
        : null,
    }));

    res.json({
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      questions: formatted,
    });
  } catch (err) {
    next(err);
  }
});

// Single Question
router.get('/questions/:id', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const id = req.params.id as string;
    const userId = req.user!.userId;

    const q = await prisma.question.findUnique({
      where: { id },
      include: {
        bookmarks: { where: { userId } },
        practiceLogs: { where: { userId }, orderBy: { createdAt: 'desc' }, take: 3 },
      },
    });

    if (!q) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }

    res.json({
      id: q.id,
      title: q.title,
      prompt: q.prompt,
      category: q.category,
      subCategory: q.subCategory,
      difficulty: q.difficulty,
      options: JSON.parse(q.options || '[]'),
      correctOpt: q.correctOpt,
      explanation: q.explanation,
      companyTags: JSON.parse(q.companyTags || '[]'),
      isBookmarked: (q as any).bookmarks ? (q as any).bookmarks.length > 0 : false,
      attempts: (q as any).practiceLogs || [],
    });
  } catch (err) {
    next(err);
  }
});

// Submit Practice Question
router.post('/submit', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const { questionId, selectedOpt, timeTakenSec = 30 } = req.body;
    const userId = req.user!.userId;

    const question = await prisma.question.findUnique({ where: { id: questionId } });
    if (!question) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }

    const isCorrect = question.correctOpt === selectedOpt;

    const log = await prisma.practiceLog.create({
      data: {
        userId,
        questionId,
        selectedOpt,
        isCorrect,
        timeTakenSec,
      },
    });

    // Check student profile and update readiness / streak
    const profile = await prisma.studentProfile.findUnique({ where: { userId } });
    if (profile) {
      await recalculateStudentReadiness(profile.id);
    }

    res.json({
      isCorrect,
      correctOpt: question.correctOpt,
      explanation: question.explanation,
      log,
    });
  } catch (err) {
    next(err);
  }
});

// Toggle Bookmark
router.post('/bookmark/:questionId', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const questionId = req.params.questionId as string;
    const userId = req.user!.userId;

    const existing = await prisma.bookmark.findUnique({
      where: { userId_questionId: { userId, questionId } },
    });

    if (existing) {
      await prisma.bookmark.delete({ where: { id: existing.id } });
      res.json({ bookmarked: false, message: 'Question removed from bookmarks' });
    } else {
      await prisma.bookmark.create({ data: { userId, questionId } });
      res.json({ bookmarked: true, message: 'Question saved to bookmarks' });
    }
  } catch (err) {
    next(err);
  }
});

// Get Practice Statistics
router.get('/stats', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const userId = req.user!.userId;

    const [logs, bookmarksCount, totalQuestionsCount] = await Promise.all([
      prisma.practiceLog.findMany({
        where: { userId },
        include: { question: true },
      }),
      prisma.bookmark.count({ where: { userId } }),
      prisma.question.count(),
    ]);

    const totalAttempted = logs.length;
    const correctCount = logs.filter((l) => l.isCorrect).length;
    const incorrectCount = totalAttempted - correctCount;
    const overallAccuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

    // Category breakdown
    const categoryStats: Record<string, { attempted: number; correct: number; accuracy: number }> = {};
    for (const log of logs) {
      const cat = log.question.category;
      if (!categoryStats[cat]) {
        categoryStats[cat] = { attempted: 0, correct: 0, accuracy: 0 };
      }
      categoryStats[cat].attempted++;
      if (log.isCorrect) categoryStats[cat].correct++;
    }

    Object.keys(categoryStats).forEach((cat) => {
      const c = categoryStats[cat];
      c.accuracy = Math.round((c.correct / c.attempted) * 100);
    });

    res.json({
      totalQuestionsCount,
      totalAttempted,
      correctCount,
      incorrectCount,
      overallAccuracy,
      bookmarksCount,
      categoryStats,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
