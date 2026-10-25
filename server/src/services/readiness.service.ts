import { prisma } from '../utils/prisma';

export async function recalculateStudentReadiness(studentProfileId: string): Promise<number> {
  const profile = await prisma.studentProfile.findUnique({
    where: { id: studentProfileId },
    include: {
      diagnosticResult: true,
      roadmapTasks: true,
      user: {
        include: {
          testAttempts: true,
          codingSubmissions: { where: { status: 'ACCEPTED' } },
          resumeAnalyses: { orderBy: { createdAt: 'desc' }, take: 1 },
          interviewsAsStudent: { where: { status: 'COMPLETED' } },
          practiceLogs: true,
        },
      },
    },
  });

  if (!profile) return 0;

  // Weightings for placement readiness (Total: 100%)
  // 1. Diagnostic Assessment Baseline: 20%
  // 2. Roadmap Task Completion: 20%
  // 3. Practice Engine Accuracy & Volume: 15%
  // 4. Coding Problems Solved: 15%
  // 5. Mock Test Scores: 15%
  // 6. Resume Quality: 10%
  // 7. Mock Interview Performance: 5%

  const diagnosticScore = profile.diagnosticResult?.overallScore || 50;

  // Roadmap tasks completion rate
  const totalTasks = profile.roadmapTasks.length;
  const completedTasks = profile.roadmapTasks.filter((t) => t.completed).length;
  const roadmapPct = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 50;

  // Practice volume and accuracy
  const totalPracticed = profile.user.practiceLogs.length;
  const correctPracticed = profile.user.practiceLogs.filter((p) => p.isCorrect).length;
  const practiceAccuracy = totalPracticed > 0 ? (correctPracticed / totalPracticed) * 100 : 70;
  const practiceVolumeBonus = Math.min(100, (totalPracticed / 50) * 100);
  const practiceScore = practiceAccuracy * 0.7 + practiceVolumeBonus * 0.3;

  // Coding solved (Target 15 problems)
  const uniqueSolvedProblems = new Set(profile.user.codingSubmissions.map((s) => s.problemId)).size;
  const codingScore = Math.min(100, (uniqueSolvedProblems / 10) * 100);

  // Mock test average percentage
  let mockTestScore = 70;
  if (profile.user.testAttempts.length > 0) {
    const totalAttemptPct = profile.user.testAttempts.reduce(
      (sum, att) => sum + (att.score / (att.totalMarks || 1)) * 100,
      0
    );
    mockTestScore = Math.max(0, Math.min(100, totalAttemptPct / profile.user.testAttempts.length));
  }

  // Resume score
  const latestResume = profile.user.resumeAnalyses[0];
  const resumeScore = latestResume ? latestResume.overallScore : 65;

  // Mock interview rating (out of 10 converted to 100)
  let interviewScore = 75;
  if (profile.user.interviewsAsStudent.length > 0) {
    const validRatings = profile.user.interviewsAsStudent
      .filter((i) => i.overallRating != null)
      .map((i) => (i.overallRating! <= 10 ? i.overallRating! * 10 : i.overallRating!));
    if (validRatings.length > 0) {
      interviewScore = validRatings.reduce((a, b) => a + b, 0) / validRatings.length;
    }
  }

  // Weighted overall calculation
  const weightedReadiness =
    diagnosticScore * 0.20 +
    roadmapPct * 0.20 +
    practiceScore * 0.15 +
    codingScore * 0.15 +
    mockTestScore * 0.15 +
    resumeScore * 0.10 +
    interviewScore * 0.05;

  const roundedScore = Math.round(Math.min(99.5, Math.max(15, weightedReadiness)) * 10) / 10;

  // Update profile
  await prisma.studentProfile.update({
    where: { id: studentProfileId },
    data: { readinessScore: roundedScore },
  });

  return roundedScore;
}
