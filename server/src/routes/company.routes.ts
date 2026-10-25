import { Router, Response } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// List All Companies
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const companies = await prisma.companyProfile.findMany({
      orderBy: { name: 'asc' },
    });

    const formatted = companies.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      category: c.category,
      description: c.description,
      salaryRange: c.salaryRange,
      importantTopics: JSON.parse(c.importantTopics || '[]'),
      hiringRoundsCount: JSON.parse(c.hiringProcess || '[]').length,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

// Single Company Profile
router.get('/:slug', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const slug = req.params.slug as string;
    const userId = req.user!.userId;

    const company = await prisma.companyProfile.findUnique({
      where: { slug },
    });

    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    // Fetch student's personal notes for this company
    const note = await prisma.companyNote.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId: company.id,
        },
      },
    });

    // Fetch company-specific questions
    const questions = await prisma.question.findMany({
      where: {
        companyTags: { contains: company.name.split(' ')[0] },
      },
      take: 10,
    });

    res.json({
      id: company.id,
      name: company.name,
      slug: company.slug,
      category: company.category,
      description: company.description,
      salaryRange: company.salaryRange,
      hiringProcess: JSON.parse(company.hiringProcess || '[]'),
      eligibility: JSON.parse(company.eligibility || '{}'),
      examPattern: JSON.parse(company.examPattern || '{}'),
      importantTopics: JSON.parse(company.importantTopics || '[]'),
      cutoffDetails: JSON.parse(company.cutoffDetails || '{}'),
      interviewThemes: JSON.parse(company.interviewThemes || '[]'),
      checklist: JSON.parse(company.checklist || '[]'),
      studentNote: note ? note.content : '',
      sampleQuestions: questions.map((q) => ({
        id: q.id,
        title: q.title,
        prompt: q.prompt,
        category: q.category,
        subCategory: q.subCategory,
        difficulty: q.difficulty,
        options: JSON.parse(q.options || '[]'),
        correctOpt: q.correctOpt,
        explanation: q.explanation,
      })),
    });
  } catch (err) {
    next(err);
  }
});

// Save / Update Student Note for Company
router.post('/:companyId/notes', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const companyId = req.params.companyId as string;
    const { content } = req.body;
    const userId = req.user!.userId;

    const note = await prisma.companyNote.upsert({
      where: {
        userId_companyId: { userId, companyId },
      },
      update: { content },
      create: { userId, companyId, content },
    });

    res.json({ message: 'Company preparation note saved!', note });
  } catch (err) {
    next(err);
  }
});

export default router;
