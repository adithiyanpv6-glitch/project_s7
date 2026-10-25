import { prisma } from '../utils/prisma';

interface RoadmapGenerationParams {
  profileId: string;
  skillLevel: string;
  preferredLang: string;
  targetRoles: string[];
  targetCompanies: string[];
  weakAreas: string[];
  durationDays: number; // 30, 60, 90
}

export async function generatePersonalizedRoadmap(params: RoadmapGenerationParams) {
  const { profileId, skillLevel, preferredLang, targetRoles, targetCompanies, weakAreas, durationDays } = params;

  // Clear any existing non-completed tasks
  await prisma.roadmapTask.deleteMany({
    where: { profileId, completed: false },
  });

  const totalDays = Math.min(90, Math.max(30, durationDays || 60));
  const tasksToCreate = [];

  // Master syllabus blocks
  const weeklyThemes = [
    { week: 1, title: 'Aptitude Foundations & Initial Diagnostic', cat: 'QUANTITATIVE' },
    { week: 2, weekTitle: 'Core Arrays, Strings & Logical Deduction', cat: 'DSA' },
    { week: 3, weekTitle: 'Operating Systems & Relational Databases', cat: 'CORE_CS' },
    { week: 4, weekTitle: 'Verbal Mastery & Professional Resume Audit', cat: 'VERBAL' },
    { week: 5, weekTitle: 'Stacks, Queues, Sliding Window & Heaps', cat: 'DSA' },
    { week: 6, weekTitle: 'Computer Networks & System Architecture', cat: 'CORE_CS' },
    { week: 7, weekTitle: 'Dynamic Programming & Binary Search Trees', cat: 'DSA' },
    { week: 8, weekTitle: 'STAR Behavioral Preparation & System Mock Interview', cat: 'HR_INTERVIEW' },
    { week: 9, weekTitle: 'Company-Specific Deep Dive & Speed Math Drills', cat: 'COMPANY_SPECIFIC' },
    { week: 10, weekTitle: 'Full-Length Mock Assessments & Cutoff Analysis', cat: 'MOCK_TEST' },
    { week: 11, weekTitle: 'Advanced Graph Algorithms & Live Mentor Mock', cat: 'TECHNICAL_INTERVIEW' },
    { week: 12, weekTitle: 'Final Placement Simulation & Revision Polish', cat: 'MOCK_TEST' },
  ];

  const totalWeeks = Math.ceil(totalDays / 7);

  for (let day = 1; day <= totalDays; day++) {
    const week = Math.ceil(day / 7);
    const dayOfWeek = ((day - 1) % 7) + 1; // 1 to 7

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + day);

    let category = 'QUANTITATIVE';
    let title = '';
    let description = '';
    let targetCount = 10;

    // Allocate balanced category across week days
    if (dayOfWeek === 1) {
      category = 'QUANTITATIVE';
      title = `Day ${day}: Quantitative Aptitude - Arithmetic & Time Efficiency`;
      description = `Practice speed problem solving for Percentages, Profit/Loss, and Time & Work in under 1.5 mins per question.`;
      targetCount = skillLevel === 'BEGINNER' ? 8 : 15;
    } else if (dayOfWeek === 2) {
      category = 'DSA';
      title = `Day ${day}: Coding Practice in ${preferredLang} - Linear Data Structures`;
      description = `Solve two algorithmic problems focused on arrays, two pointers, or sliding window techniques in ${preferredLang}.`;
      targetCount = 2;
    } else if (dayOfWeek === 3) {
      category = 'CORE_CS';
      title = `Day ${day}: Core Engineering CS - OS, DBMS & Networks`;
      description = `Revise concurrency, indexing, ACID transactions, and TCP/IP protocol stack fundamentals.`;
      targetCount = 10;
    } else if (dayOfWeek === 4) {
      category = 'LOGICAL';
      title = `Day ${day}: Logical Reasoning & Analytical Deduction`;
      description = `Solve seating arrangements, blood relations, and syllogisms under timed constraints.`;
      targetCount = 12;
    } else if (dayOfWeek === 5) {
      category = day % 2 === 0 ? 'RESUME' : 'HR_INTERVIEW';
      if (category === 'RESUME') {
        title = `Day ${day}: Resume Optimization & Keyword Alignment`;
        description = `Audit resume against target role specifications (${targetRoles[0] || 'Software Engineer'}) and quantify project accomplishments.`;
        targetCount = 1;
      } else {
        title = `Day ${day}: HR & Behavioral STAR Articulation`;
        description = `Draft and rehearse structured STAR responses for leadership, conflict resolution, and technical setbacks.`;
        targetCount = 3;
      }
    } else if (dayOfWeek === 6) {
      const company = targetCompanies[(day % targetCompanies.length)] || 'TCS';
      category = 'COMPANY_SPECIFIC';
      title = `Day ${day}: Target Company Preparation - ${company}`;
      description = `Review ${company} exam patterns, previous hiring questions, and syllabus priorities.`;
      targetCount = 15;
    } else {
      category = 'MOCK_TEST';
      title = `Day ${day}: Weekly Milestone Mock Test Assessment`;
      description = `Attempt a timed full-length or sectional mock test, analyze mistakes, and bookmark incorrect questions for revision.`;
      targetCount = 1;
    }

    // Inject customizations if user has specific weak areas
    if (weakAreas.some((w) => w.toLowerCase().includes('dynamic programming')) && dayOfWeek === 2 && week > 2) {
      title = `Day ${day}: Targeted Weakness Focus - Dynamic Programming in ${preferredLang}`;
      description = `Solve 1D and 2D DP problems (Coin Change, Kadane, Knapsack) to systematically turn weak area into strength.`;
    } else if (weakAreas.some((w) => w.toLowerCase().includes('networks')) && dayOfWeek === 3) {
      title = `Day ${day}: Targeted Weakness Focus - Computer Networks & Protocols`;
      description = `Drill down into Subnetting calculations, OSI Layers, and HTTP/HTTPS handshakes.`;
    }

    tasksToCreate.push({
      profileId,
      dayNumber: day,
      weekNumber: week,
      category,
      title,
      description,
      targetCount,
      completed: false,
      dueDate,
    });
  }

  // Batch insert
  await prisma.roadmapTask.createMany({
    data: tasksToCreate,
  });

  return tasksToCreate;
}
