import { Router, Response } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { analyzeResumeText } from '../services/resumeParser.service';
import { recalculateStudentReadiness } from '../services/readiness.service';

const router = Router();

// Analyze Resume
router.post('/analyze', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const { rawText, fileName = 'Resume_Uploaded.txt', targetRole = 'Software Engineer' } = req.body;
    const userId = req.user!.userId;

    if (!rawText || rawText.trim().length < 50) {
      res.status(400).json({ error: 'Please provide substantive resume content (at least 50 characters) to analyze.' });
      return;
    }

    const analysis = analyzeResumeText(rawText, targetRole);

    const savedRecord = await prisma.resumeAnalysis.create({
      data: {
        userId,
        fileName,
        rawText,
        overallScore: analysis.overallScore,
        categoryScores: JSON.stringify(analysis.categoryScores),
        matchedKeywords: JSON.stringify(analysis.matchedKeywords),
        missingKeywords: JSON.stringify(analysis.missingKeywords),
        bulletFeedback: JSON.stringify(analysis.bulletFeedback),
        generalTips: JSON.stringify(analysis.generalTips),
      },
    });

    // Notify student
    await prisma.notification.create({
      data: {
        userId,
        title: 'Resume Audit Complete 📄',
        message: `Your resume received an ATS placement readiness score of ${analysis.overallScore}/100. Check recommended bullet point upgrades.`,
        type: 'ACHIEVEMENT',
      },
    });

    // Recalculate readiness
    const profile = await prisma.studentProfile.findUnique({ where: { userId } });
    if (profile) {
      await recalculateStudentReadiness(profile.id);
    }

    res.json({
      id: savedRecord.id,
      fileName,
      createdAt: savedRecord.createdAt,
      ...analysis,
    });
  } catch (err) {
    next(err);
  }
});

// Resume History
router.get('/history', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const userId = req.user!.userId;
    const records = await prisma.resumeAnalysis.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const formatted = records.map((r) => ({
      id: r.id,
      fileName: r.fileName,
      overallScore: r.overallScore,
      categoryScores: JSON.parse(r.categoryScores || '{}'),
      matchedKeywords: JSON.parse(r.matchedKeywords || '[]'),
      missingKeywords: JSON.parse(r.missingKeywords || '[]'),
      bulletFeedback: JSON.parse(r.bulletFeedback || '[]'),
      generalTips: JSON.parse(r.generalTips || '[]'),
      createdAt: r.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

export default router;
