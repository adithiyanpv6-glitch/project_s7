import { Router, Response } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { executeCode } from '../services/codeRunner.service';
import { recalculateStudentReadiness } from '../services/readiness.service';

const router = Router();

// Get Coding Problems
router.get('/problems', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const userId = req.user!.userId;
    const { category, difficulty, search } = req.query as Record<string, string>;

    const where: any = {};
    if (category && category !== 'ALL') where.category = category;
    if (difficulty && difficulty !== 'ALL') where.difficulty = difficulty;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { category: { contains: search } },
      ];
    }

    const [problems, userSubmissions] = await Promise.all([
      prisma.codingProblem.findMany({
        where,
        orderBy: { title: 'asc' },
      }),
      prisma.codingSubmission.findMany({
        where: { userId },
        select: { problemId: true, status: true },
      }),
    ]);

    const solvedSet = new Set(
      userSubmissions.filter((s) => s.status === 'ACCEPTED').map((s) => s.problemId)
    );
    const attemptedSet = new Set(userSubmissions.map((s) => s.problemId));

    const formatted = problems.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      difficulty: p.difficulty,
      category: p.category,
      companyTags: JSON.parse(p.companyTags || '[]'),
      isSolved: solvedSet.has(p.id),
      isAttempted: attemptedSet.has(p.id),
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

// Single Coding Problem
router.get('/problems/:slug', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const slug = req.params.slug as string;
    const userId = req.user!.userId;

    const problem = await prisma.codingProblem.findUnique({
      where: { slug },
      include: {
        submissions: {
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!problem) {
      res.status(404).json({ error: 'Coding problem not found' });
      return;
    }

    const testCasesAll = JSON.parse(problem.testCases || '[]');
    const publicTestCases = testCasesAll.filter((tc: any) => !tc.isHidden);

    res.json({
      id: problem.id,
      title: problem.title,
      slug: problem.slug,
      difficulty: problem.difficulty,
      category: problem.category,
      description: problem.description,
      examples: JSON.parse(problem.examples || '[]'),
      constraints: JSON.parse(problem.constraints || '[]'),
      starterCode: JSON.parse(problem.starterCode || '{}'),
      testCases: publicTestCases,
      hints: JSON.parse(problem.hints || '[]'),
      editorial: problem.editorial,
      companyTags: JSON.parse(problem.companyTags || '[]'),
      pastSubmissions: problem.submissions,
      isSolved: problem.submissions.some((s: any) => s.status === 'ACCEPTED'),
    });
  } catch (err) {
    next(err);
  }
});

// Run Code (Public Test Cases Only)
router.post('/run', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const { problemId, code, language = 'javascript' } = req.body;

    const problem = await prisma.codingProblem.findUnique({ where: { id: problemId } });
    if (!problem) {
      res.status(404).json({ error: 'Problem not found' });
      return;
    }

    const allTestCases = JSON.parse(problem.testCases || '[]');
    const publicTestCases = allTestCases.filter((tc: any) => !tc.isHidden);

    const result = await executeCode(code, language, publicTestCases, problem.slug);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Submit Code (All Test Cases)
router.post('/submit', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const { problemId, code, language = 'javascript' } = req.body;
    const userId = req.user!.userId;

    const problem = await prisma.codingProblem.findUnique({ where: { id: problemId } });
    if (!problem) {
      res.status(404).json({ error: 'Problem not found' });
      return;
    }

    const allTestCases = JSON.parse(problem.testCases || '[]');
    const result = await executeCode(code, language, allTestCases, problem.slug);

    // Persist submission
    const submission = await prisma.codingSubmission.create({
      data: {
        userId,
        problemId,
        code,
        language,
        status: result.status,
        passedCount: result.passedCount,
        totalCount: result.totalCount,
        runtimeMs: result.runtimeMs,
        memoryKb: result.memoryKb,
      },
    });

    // Update readiness score
    const profile = await prisma.studentProfile.findUnique({ where: { userId } });
    if (profile) {
      await recalculateStudentReadiness(profile.id);
    }

    res.json({
      submission,
      evaluation: result,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
