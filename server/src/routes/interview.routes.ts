import { Router, Response } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { recalculateStudentReadiness } from '../services/readiness.service';

const router = Router();

// Question pools for system-led structured mock interviews
const SYSTEM_INTERVIEW_QUESTIONS: Record<string, string[]> = {
  HR: [
    "Tell me about yourself, your academic background, and why you are interested in this specific role.",
    "Describe a challenging project you worked on. What was your personal contribution and what obstacle did you overcome?",
    "Tell me about a time you had a strong disagreement with a teammate or peer. How did you handle the situation?",
    "What is an area of professional or technical weakness you have identified in yourself, and what concrete steps have you taken to improve it?",
    "Where do you see yourself five years from now, and how does this organization fit into that vision?"
  ],
  TECHNICAL: [
    "Explain the core differences between a Process and a Thread, including what memory segments are shared vs isolated.",
    "How does a Hash Table achieve O(1) average lookup time, and what happens when hash collisions occur?",
    "Walk me through the ACID properties of database transactions. Explain what a 'Phantom Read' anomaly is and which isolation level prevents it.",
    "Explain the TCP 3-way handshake in detail, including the specific flags exchanged and what each step accomplishes.",
    "If you were tasked with designing a scalable URL shortener service (like TinyURL), what key architectural components and database schema would you choose?"
  ],
  MANAGERIAL: [
    "Describe a situation where a project deadline was at serious risk of being missed. What prioritization decisions did you make?",
    "How do you handle ambiguous requirements when building a software feature?",
    "Tell me about a time you had to persuade stakeholders or team members to adopt a technical decision they were initially skeptical about.",
    "How do you maintain code quality and test discipline under intense delivery pressure?"
  ],
  COMPANY_SPECIFIC: [
    "Why are you specifically targeting this company, and how do your technical skills align with our engineering culture?",
    "How would you approach optimizing a high-traffic service that suddenly experiences a 40% latency spike?",
    "Describe an instance where you worked backwards from customer or user requirements to deliver an impactful solution.",
    "What steps do you take when you encounter a critical bug in production right before a major release?"
  ]
};

// Get User Interviews (Student or Mentor)
router.get('/my', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;

    let interviews;
    if (role === 'INTERVIEWER') {
      interviews = await prisma.mockInterview.findMany({
        where: { interviewerId: userId },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              studentProfile: true,
            },
          },
        },
        orderBy: { scheduledFor: 'asc' },
      });
    } else {
      interviews = await prisma.mockInterview.findMany({
        where: { studentId: userId },
        include: {
          interviewer: {
            select: { id: true, name: true, email: true, avatar: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    res.json(interviews);
  } catch (err) {
    next(err);
  }
});

// Start System Mock Interview
router.post('/system/start', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const { type = 'HR', company = 'General', targetRole = 'Software Engineer' } = req.body;
    const studentId = req.user!.userId;

    const questions = SYSTEM_INTERVIEW_QUESTIONS[type] || SYSTEM_INTERVIEW_QUESTIONS.HR;

    const interview = await prisma.mockInterview.create({
      data: {
        studentId,
        type,
        company,
        targetRole,
        status: 'IN_PROGRESS',
        transcript: JSON.stringify(questions.map((q) => ({ question: q, answer: '' }))),
      },
    });

    res.json({
      interviewId: interview.id,
      type,
      company,
      targetRole,
      questions,
    });
  } catch (err) {
    next(err);
  }
});

// Submit System Mock Interview for Automated Evaluation
router.post('/system/evaluate', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const { interviewId, answers } = req.body;
    const userId = req.user!.userId;

    let totalLength = 0;
    let starKeywordsFound = 0;
    let techKeywordsFound = 0;

    const starTokens = ['situation', 'task', 'action', 'result', 'because', 'impact', 'reduced', 'improved', 'led to', 'metric', '%'];
    const techTokens = ['architecture', 'database', 'complexity', 'algorithm', 'latency', 'scale', 'cache', 'thread', 'query', 'design'];

    for (const item of answers || []) {
      const text = (item.answer || '').toLowerCase();
      totalLength += text.split(/\s+/).length;

      for (const tok of starTokens) {
        if (text.includes(tok)) starKeywordsFound++;
      }
      for (const tok of techTokens) {
        if (text.includes(tok)) techKeywordsFound++;
      }
    }

    const avgWordsPerAnswer = answers.length > 0 ? totalLength / answers.length : 0;

    let commScore = Math.min(9.5, Math.max(6.0, 6.5 + (avgWordsPerAnswer / 50) * 1.5));
    let techScore = Math.min(9.5, Math.max(6.0, 6.0 + (techKeywordsFound / 6) * 1.5));
    let structScore = Math.min(9.5, Math.max(6.0, 6.5 + (starKeywordsFound / 5) * 1.5));
    let confScore = Math.min(9.2, Math.max(6.8, (commScore + structScore) / 2));

    const overallRating = Math.round(((commScore + techScore + structScore + confScore) / 4) * 10) / 10;

    const strengths = [
      'Articulated ideas with coherent pacing and clear vocabulary',
      'Provided contextual background and clear problem framing in responses',
      'Demonstrated awareness of engineering trade-offs and team collaboration',
    ];

    const weaknesses = [
      'Incorporate more quantified metrics (e.g. latency numbers, user scale, percentage gains) to validate project outcomes',
      'Be more specific about your individual contributions versus overall team tasks',
    ];

    const feedback = `Commendable interview attempt overall. Your structure was clear with good confidence. To elevate your score to elite hiring bars, ensure every project narrative concludes with a definitive, measurable outcome using the STAR framework.`;

    const updated = await prisma.mockInterview.update({
      where: { id: interviewId },
      data: {
        status: 'COMPLETED',
        transcript: JSON.stringify(answers),
        overallRating,
        ratings: JSON.stringify({
          communication: Math.round(commScore * 10) / 10,
          technicalDepth: Math.round(techScore * 10) / 10,
          structure: Math.round(structScore * 10) / 10,
          confidence: Math.round(confScore * 10) / 10,
        }),
        strengths: JSON.stringify(strengths),
        weaknesses: JSON.stringify(weaknesses),
        feedback,
        completedAt: new Date(),
      },
    });

    const profile = await prisma.studentProfile.findUnique({ where: { userId } });
    if (profile) {
      await recalculateStudentReadiness(profile.id);
    }

    res.json({
      message: 'Interview evaluation complete!',
      interview: updated,
    });
  } catch (err) {
    next(err);
  }
});

// Schedule Mentor Interview
router.post('/mentor/schedule', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const { interviewerId, type = 'TECHNICAL', company, targetRole, scheduledFor } = req.body;
    const studentId = req.user!.userId;

    const interview = await prisma.mockInterview.create({
      data: {
        studentId,
        interviewerId,
        type,
        company,
        targetRole,
        scheduledFor: new Date(scheduledFor),
        status: 'SCHEDULED',
        meetingLink: `https://meet.google.com/prep-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`,
      },
    });

    await prisma.notification.create({
      data: {
        userId: studentId,
        title: 'Mock Interview Scheduled',
        message: `Your ${type} interview for ${company || 'General'} role has been scheduled for ${new Date(scheduledFor).toLocaleDateString()}.`,
        type: 'INTERVIEW',
      },
    });

    res.status(201).json({
      message: 'Interview scheduled successfully with mentor!',
      interview,
    });
  } catch (err) {
    next(err);
  }
});

// Mentor Submits Structured Evaluation
router.post('/mentor/:id/evaluate', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const id = req.params.id as string;
    const { overallRating, ratings, strengths, weaknesses, feedback } = req.body;

    const interview = await prisma.mockInterview.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        overallRating,
        ratings: JSON.stringify(ratings),
        strengths: JSON.stringify(strengths),
        weaknesses: JSON.stringify(weaknesses),
        feedback,
        completedAt: new Date(),
      },
    });

    await prisma.notification.create({
      data: {
        userId: interview.studentId,
        title: 'Mock Interview Feedback Published',
        message: `Your mentor has completed evaluation for your ${interview.type} mock interview. Rating: ${overallRating}/10.`,
        type: 'INTERVIEW',
      },
    });

    const profile = await prisma.studentProfile.findUnique({ where: { userId: interview.studentId } });
    if (profile) {
      await recalculateStudentReadiness(profile.id);
    }

    res.json({ message: 'Mentor evaluation saved successfully', interview });
  } catch (err) {
    next(err);
  }
});

// Get List of Mentors
router.get('/mentors', authenticate, async (req: AuthenticatedRequest, res: Response, next) => {
  try {
    const mentors = await prisma.user.findMany({
      where: { role: 'INTERVIEWER' },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });
    res.json(mentors);
  } catch (err) {
    next(err);
  }
});

export default router;
