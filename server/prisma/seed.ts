import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { questionsData } from '../src/utils/seedData/questionsData';
import { codingProblemsData } from '../src/utils/seedData/codingProblemsData';
import { companyData } from '../src/utils/seedData/companyData';
import { mockTestsData } from '../src/utils/seedData/mockTestsData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seeding...');

  // Clean existing tables in correct order
  await prisma.notification.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.practiceLog.deleteMany();
  await prisma.testQuestion.deleteMany();
  await prisma.testAttempt.deleteMany();
  await prisma.mockTest.deleteMany();
  await prisma.codingSubmission.deleteMany();
  await prisma.codingProblem.deleteMany();
  await prisma.mockInterview.deleteMany();
  await prisma.resumeAnalysis.deleteMany();
  await prisma.roadmapTask.deleteMany();
  await prisma.diagnosticResult.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.companyNote.deleteMany();
  await prisma.companyProfile.deleteMany();
  await prisma.question.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing database records.');

  // 1. Create Core Users for All 3 Roles
  const passwordHash = await bcrypt.hash('Student@123', 10);
  const adminHash = await bcrypt.hash('Admin@123', 10);
  const mentorHash = await bcrypt.hash('Mentor@123', 10);

  const studentUser = await prisma.user.create({
    data: {
      email: 'student@placementprep.com',
      passwordHash: passwordHash,
      name: 'Aditya Vardhan',
      role: 'STUDENT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@placementprep.com',
      passwordHash: adminHash,
      name: 'Dr. Ramesh Sundaram (Dean Placements)',
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
    },
  });

  const mentorUser = await prisma.user.create({
    data: {
      email: 'mentor@placementprep.com',
      passwordHash: mentorHash,
      name: 'Anjali Menon (Staff SDE @ Amazon)',
      role: 'INTERVIEWER',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    },
  });

  // Additional Students for Admin Dashboard Analytics
  const student2 = await prisma.user.create({
    data: {
      email: 'arjun.sharma@placementprep.com',
      passwordHash: passwordHash,
      name: 'Arjun Sharma',
      role: 'STUDENT',
      studentProfile: {
        create: {
          college: 'National Institute of Technology',
          branch: 'Computer Science & Engineering',
          gradYear: 2026,
          cgpa: 9.2,
          targetRoles: JSON.stringify(['SDE', 'Systems Engineer']),
          targetCompanies: JSON.stringify(['Amazon', 'Microsoft']),
          skillLevel: 'ADVANCED',
          preferredLang: 'C++',
          dailyHours: 4.0,
          readinessScore: 92.0,
          streakDays: 28,
          onboardingDone: true,
          roadmapDuration: 90,
        },
      },
    },
  });

  const student3 = await prisma.user.create({
    data: {
      email: 'priya.patel@placementprep.com',
      passwordHash: passwordHash,
      name: 'Priya Patel',
      role: 'STUDENT',
      studentProfile: {
        create: {
          college: 'National Institute of Technology',
          branch: 'Information Technology',
          gradYear: 2026,
          cgpa: 8.7,
          targetRoles: JSON.stringify(['Full Stack Developer', 'Cloud Engineer']),
          targetCompanies: JSON.stringify(['TCS', 'Freshworks', 'Cognizant']),
          skillLevel: 'INTERMEDIATE',
          preferredLang: 'Java',
          dailyHours: 3.0,
          readinessScore: 84.5,
          streakDays: 19,
          onboardingDone: true,
          roadmapDuration: 60,
        },
      },
    },
  });

  const student4 = await prisma.user.create({
    data: {
      email: 'rahul.verma@placementprep.com',
      passwordHash: passwordHash,
      name: 'Rahul Verma',
      role: 'STUDENT',
      studentProfile: {
        create: {
          college: 'National Institute of Technology',
          branch: 'Electronics & Communication',
          gradYear: 2026,
          cgpa: 7.8,
          targetRoles: JSON.stringify(['Software Engineer', 'Embedded Developer']),
          targetCompanies: JSON.stringify(['Wipro', 'Accenture', 'TCS']),
          skillLevel: 'BEGINNER',
          preferredLang: 'Python',
          dailyHours: 2.0,
          readinessScore: 68.0,
          streakDays: 8,
          onboardingDone: true,
          roadmapDuration: 60,
        },
      },
    },
  });

  // 2. Student Profile for Main Demo Student
  const studentProfile = await prisma.studentProfile.create({
    data: {
      userId: studentUser.id,
      college: 'National Institute of Technology',
      branch: 'Computer Science & Engineering',
      gradYear: 2026,
      cgpa: 8.65,
      targetRoles: JSON.stringify(['Software Development Engineer', 'Full Stack Developer']),
      targetCompanies: JSON.stringify(['Amazon', 'Microsoft', 'TCS', 'Freshworks']),
      skillLevel: 'INTERMEDIATE',
      preferredLang: 'Java',
      dailyHours: 3.0,
      targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      strengths: JSON.stringify(['Data Structures & Algorithms', 'Operating Systems', 'Quantitative Problem Solving']),
      weakAreas: JSON.stringify(['Dynamic Programming', 'Computer Networks Subnetting', 'STAR Behavioral Articulation']),
      readinessScore: 78.5,
      streakDays: 14,
      lastActiveDate: new Date(),
      onboardingDone: true,
      roadmapDuration: 60,
    },
  });

  // 3. Diagnostic Result for Main Demo Student
  await prisma.diagnosticResult.create({
    data: {
      profileId: studentProfile.id,
      overallScore: 78.5,
      quantScore: 82.0,
      logicalScore: 85.0,
      verbalScore: 75.0,
      codingScore: 80.0,
      coreCsScore: 74.0,
      softSkillsScore: 75.0,
      strengthsSummary: JSON.stringify([
        'High accuracy in Quantitative Speed, Distance, and Profit calculations',
        'Strong mastery of linear data structures (Arrays, Stacks, Queues)',
        'Solid grasp of OS Process Scheduling and Concurrency basics',
      ]),
      weaknessesSummary: JSON.stringify([
        'Subnet calculations and OSI Transport Header edge cases in Networks',
        'Complex 2D Dynamic Programming state transitions',
        'Need more structured quantifiable metric framing in behavioral interview answers',
      ]),
      recommendations: JSON.stringify([
        'Focus Daily Practice on 2D DP and Graph traversals (BFS/DFS)',
        'Complete the 30-day Core CS Networks reinforcement track',
        'Schedule a mentor mock interview to refine STAR answering technique',
        'Target full-length TCS NQT and Amazon SDE mock assessments this weekend',
      ]),
    },
  });

  // 4. Generate 60-Day Roadmap Tasks for the Student
  console.log('📅 Generating personalized 60-day roadmap...');
  const roadmapItems = [
    // Week 1: Diagnostics & Foundations
    { day: 1, week: 1, cat: 'QUANTITATIVE', title: 'Percentages & Profit Loss Mastery', desc: 'Solve 15 foundational aptitude questions with shortcut techniques.', target: 15, done: true },
    { day: 2, week: 1, cat: 'DSA', title: 'Arrays & Two Pointers Fundamentals', desc: 'Implement Two Sum and Container With Most Water in Java.', target: 2, done: true },
    { day: 3, week: 1, cat: 'CORE_CS', title: 'Operating Systems: Process vs Threads', desc: 'Revise Process Lifecycle, Context Switching overhead, and IPC.', target: 10, done: true },
    { day: 4, week: 1, cat: 'VERBAL', title: 'Sentence Correction & Grammar Rules', desc: 'Practice 15 subject-verb agreement and modifier placement drills.', target: 15, done: true },
    { day: 5, week: 1, cat: 'RESUME', title: 'Initial Resume ATS Audit & Upload', desc: 'Run resume through the AI Analyzer to inspect keyword gaps for SDE roles.', target: 1, done: true },
    { day: 6, week: 1, cat: 'DSA', title: 'Sliding Window Maximum & Substrings', desc: 'Solve Longest Substring Without Repeating Characters.', target: 2, done: true },
    { day: 7, week: 1, cat: 'QUANTITATIVE', title: 'Weekly Speed Math Benchmark', desc: 'Take a timed 20-minute quantitative test on ratios and proportions.', target: 1, done: true },

    // Week 2: Hashing, Stacks & DBMS
    { day: 8, week: 2, cat: 'DSA', title: 'Stack Monotonic Patterns', desc: 'Solve Valid Parentheses and Daily Temperatures.', target: 2, done: true },
    { day: 9, week: 2, cat: 'CORE_CS', title: 'DBMS: Normalization 1NF to BCNF', desc: 'Practice functional dependency decomposition and candidate key analysis.', target: 12, done: true },
    { day: 10, week: 2, cat: 'LOGICAL', title: 'Syllogisms & Seating Arrangements', desc: 'Master circular and linear arrangement deductions under 2 minutes.', target: 15, done: true },
    { day: 11, week: 2, cat: 'HR_INTERVIEW', title: 'STAR Technique Story Preparation', desc: 'Draft 3 structured behavioral stories covering leadership and teamwork.', target: 3, done: true },
    { day: 12, week: 2, cat: 'DSA', title: 'Linked List Inversion & Cycle Detection', desc: 'Solve Reverse Linked List and Floyd Tortoise & Hare cycle detection.', target: 2, done: true },
    { day: 13, week: 2, cat: 'COMPANY_SPECIFIC', title: 'TCS NQT Pattern Practice', desc: 'Attempt 20 previous-year TCS NQT numerical questions.', target: 20, done: true },
    { day: 14, week: 2, cat: 'MOCK_TEST', title: 'Full-Length Campus Aptitude Mock 1', desc: 'Attempt full 45-minute Campus Aptitude assessment and review mistakes.', target: 1, done: true },

    // Week 3: Trees, SQL & Networks
    { day: 15, week: 3, cat: 'DSA', title: 'Binary Trees Traversals & Diameter', desc: 'Implement Pre/In/Post order traversals and Tree Diameter recursively.', target: 3, done: false },
    { day: 16, week: 3, cat: 'CORE_CS', title: 'SQL Joins & Group By Aggregations', desc: 'Write 10 complex multi-table SQL queries with HAVING clauses.', target: 10, done: false },
    { day: 17, week: 3, cat: 'CORE_CS', title: 'Computer Networks: TCP 3-Way Handshake', desc: 'Understand TCP control flags, sequence numbers, and congestion control.', target: 12, done: false },
    { day: 18, week: 3, cat: 'DSA', title: 'Binary Search in Rotated Arrays', desc: 'Solve Search in Rotated Sorted Array in O(log N) time.', target: 2, done: false },
    { day: 19, week: 3, cat: 'LOGICAL', title: 'Critical Reasoning & Assumption Analysis', desc: 'Practice 15 statement-assumption and cause-effect problems.', target: 15, done: false },
    { day: 20, week: 3, cat: 'TECHNICAL_INTERVIEW', title: 'System Design Basics: REST vs GraphQL', desc: 'Review API idempotency, HTTP methods, and status codes.', target: 8, done: false },
    { day: 21, week: 3, cat: 'MOCK_TEST', title: 'Core CS Diagnostic Assessment', desc: 'Take the 45-minute Core CS (OS, DBMS, Networks) mock test.', target: 1, done: false },

    // Week 4: Dynamic Programming & Mock Interviews
    { day: 22, week: 4, cat: 'DSA', title: '1D Dynamic Programming: Kadane & Stairs', desc: 'Solve Maximum Subarray and Climbing Stairs bottom-up.', target: 2, done: false },
    { day: 23, week: 4, cat: 'DSA', title: 'DP Coin Change & Unbounded Knapsack', desc: 'Implement optimal Coin Change with space-optimized 1D array.', target: 2, done: false },
    { day: 24, week: 4, cat: 'HR_INTERVIEW', title: 'Interactive System Mock Interview (HR)', desc: 'Complete interactive AI/System HR interview simulation.', target: 1, done: false },
    { day: 25, week: 4, cat: 'CORE_CS', title: 'DBMS: B+ Tree Indexing & ACID Transactions', desc: 'Deep dive into storage engine B+ Trees, WAL, and Isolation Levels.', target: 10, done: false },
    { day: 26, week: 4, cat: 'RESUME', title: 'Resume Bullet Points Rewriting', desc: 'Apply quantified metrics (X-Y-Z formula) to top 2 projects.', target: 1, done: false },
    { day: 27, week: 4, cat: 'COMPANY_SPECIFIC', title: 'Amazon OA Simulation Prep', desc: 'Review Amazon Leadership Principles and 2 OA coding questions.', target: 3, done: false },
    { day: 28, week: 4, cat: 'MOCK_TEST', title: 'TCS NQT Comprehensive Mock Test', desc: 'Take official full-length TCS NQT mock test under strict timer.', target: 1, done: false },

    // Week 5-8: Advanced Prep & Live Mock Milestones
    { day: 35, week: 5, cat: 'TECHNICAL_INTERVIEW', title: 'Mentor Mock Interview (Live Technical)', desc: 'Conduct 1-on-1 scheduled mock interview with mentor Anjali Menon.', target: 1, done: false },
    { day: 42, week: 6, cat: 'MOCK_TEST', title: 'Amazon SDE-1 Comprehensive Mock', desc: 'Full-length 60-minute Amazon SDE technical assessment.', target: 1, done: false },
    { day: 50, week: 7, cat: 'COMPANY_SPECIFIC', title: 'Company Target Drill: Freshworks & Zoho', desc: 'Solve custom C/Java mini-design application challenges.', target: 5, done: false },
    { day: 60, week: 8, cat: 'MOCK_TEST', title: 'Final Placement Readiness Simulation', desc: 'Final comprehensive diagnostic across all placement domains.', target: 1, done: false },
  ];

  for (const item of roadmapItems) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (item.day - 14)); // relative to day 14 (today)

    await prisma.roadmapTask.create({
      data: {
        profileId: studentProfile.id,
        dayNumber: item.day,
        weekNumber: item.week,
        category: item.cat,
        title: item.title,
        description: item.desc,
        targetCount: item.target,
        completed: item.done,
        completedAt: item.done ? new Date(Date.now() - (14 - item.day) * 86400000) : null,
        dueDate: dueDate,
      },
    });
  }

  // 5. Seed 169+ Questions
  console.log(`📚 Seeding ${questionsData.length} comprehensive placement questions...`);
  const createdQuestions = [];
  for (const q of questionsData) {
    const created = await prisma.question.create({
      data: {
        title: q.title,
        prompt: q.prompt,
        category: q.category,
        subCategory: q.subCategory,
        difficulty: q.difficulty,
        options: JSON.stringify(q.options),
        correctOpt: q.correctOpt,
        explanation: q.explanation,
        companyTags: JSON.stringify(q.companyTags),
      },
    });
    createdQuestions.push(created);
  }

  // 6. Seed 15 Coding Problems
  console.log(`💻 Seeding ${codingProblemsData.length} DSA coding problems...`);
  const createdProblems = [];
  for (const p of codingProblemsData) {
    const created = await prisma.codingProblem.create({
      data: {
        title: p.title,
        slug: p.slug,
        difficulty: p.difficulty,
        category: p.category,
        description: p.description,
        examples: JSON.stringify(p.examples),
        constraints: JSON.stringify(p.constraints),
        starterCode: JSON.stringify(p.starterCode),
        testCases: JSON.stringify(p.testCases),
        hints: JSON.stringify(p.hints),
        editorial: p.editorial,
        companyTags: JSON.stringify(p.companyTags),
      },
    });
    createdProblems.push(created);
  }

  // 7. Seed 10 Company Profiles
  console.log(`🏢 Seeding ${companyData.length} target company profiles...`);
  for (const c of companyData) {
    await prisma.companyProfile.create({
      data: {
        name: c.name,
        slug: c.slug,
        category: c.category,
        description: c.description,
        hiringProcess: JSON.stringify(c.hiringProcess),
        eligibility: JSON.stringify(c.eligibility),
        examPattern: JSON.stringify(c.examPattern),
        importantTopics: JSON.stringify(c.importantTopics),
        cutoffDetails: JSON.stringify(c.cutoffDetails),
        interviewThemes: JSON.stringify(c.interviewThemes),
        checklist: JSON.stringify(c.checklist),
        salaryRange: c.salaryRange,
      },
    });
  }

  // 8. Seed 5 Mock Tests and link questions
  console.log(`📝 Seeding ${mockTestsData.length} full-length mock tests...`);
  for (const testMeta of mockTestsData) {
    const test = await prisma.mockTest.create({
      data: {
        title: testMeta.title,
        description: testMeta.description,
        durationMinutes: testMeta.durationMinutes,
        totalQuestions: testMeta.totalQuestions,
        passingMarks: testMeta.passingMarks,
        negativeMarking: testMeta.negativeMarking,
        category: testMeta.category,
        targetCompany: testMeta.targetCompany || null,
        cutoffPercentage: testMeta.cutoffPercentage,
      },
    });

    // Pick questions matching filters
    let selectedQIds: string[] = [];
    for (const filter of testMeta.questionFilters) {
      const candidates = createdQuestions.filter((q) => {
        if (filter.category && q.category !== filter.category) return false;
        if (filter.companyTag && !q.companyTags?.includes(filter.companyTag)) return false;
        return !selectedQIds.includes(q.id);
      });
      const slice = candidates.slice(0, filter.limit).map((q) => q.id);
      selectedQIds.push(...slice);
    }

    // If still need more to meet totalQuestions, fill with random unselected questions
    if (selectedQIds.length < testMeta.totalQuestions) {
      const remaining = createdQuestions.filter((q) => !selectedQIds.includes(q.id));
      const extra = remaining.slice(0, testMeta.totalQuestions - selectedQIds.length).map((q) => q.id);
      selectedQIds.push(...extra);
    }

    // Link test questions
    for (let i = 0; i < selectedQIds.length; i++) {
      await prisma.testQuestion.create({
        data: {
          mockTestId: test.id,
          questionId: selectedQIds[i],
          orderIndex: i + 1,
        },
      });
    }
  }

  // 9. Seed Sample Mock Test Attempt for Student
  const firstTest = await prisma.mockTest.findFirst({ where: { targetCompany: 'TCS' } });
  if (firstTest) {
    await prisma.testAttempt.create({
      data: {
        userId: studentUser.id,
        mockTestId: firstTest.id,
        score: 24.5,
        totalMarks: 30.0,
        accuracy: 85.0,
        attempted: 28,
        correct: 25,
        incorrect: 3,
        skipped: 2,
        timeSpentSec: 2840,
        sectionScores: JSON.stringify({
          'Numerical Ability': { score: 7.5, total: 8, accuracy: 90 },
          'Logical Reasoning': { score: 7.0, total: 8, accuracy: 87.5 },
          'Verbal Ability': { score: 5.0, total: 6, accuracy: 83.3 },
          'Programming Concepts': { score: 5.0, total: 8, accuracy: 75.0 },
        }),
        completedAt: new Date(Date.now() - 3 * 86400000),
      },
    });
  }

  // 10. Seed Coding Submissions for Student
  const twoSum = createdProblems.find((p) => p.slug === 'two-sum');
  if (twoSum) {
    await prisma.codingSubmission.create({
      data: {
        userId: studentUser.id,
        problemId: twoSum.id,
        code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
        language: 'javascript',
        status: 'ACCEPTED',
        passedCount: 5,
        totalCount: 5,
        runtimeMs: 48.2,
        memoryKb: 42100,
        createdAt: new Date(Date.now() - 2 * 86400000),
      },
    });
  }

  const validParens = createdProblems.find((p) => p.slug === 'valid-parentheses');
  if (validParens) {
    await prisma.codingSubmission.create({
      data: {
        userId: studentUser.id,
        problemId: validParens.id,
        code: `function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (let ch of s) {\n    if (['(', '{', '['].includes(ch)) stack.push(ch);\n    else if (stack.pop() !== map[ch]) return false;\n  }\n  return stack.length === 0;\n}`,
        language: 'javascript',
        status: 'ACCEPTED',
        passedCount: 5,
        totalCount: 5,
        runtimeMs: 52.1,
        memoryKb: 41800,
        createdAt: new Date(Date.now() - 1 * 86400000),
      },
    });
  }

  // 11. Seed Mock Interviews (One System Completed, One Scheduled with Mentor)
  await prisma.mockInterview.create({
    data: {
      studentId: studentUser.id,
      type: 'HR',
      company: 'Amazon',
      targetRole: 'Software Development Engineer',
      status: 'COMPLETED',
      overallRating: 8.2,
      ratings: JSON.stringify({
        communication: 8.5,
        technicalDepth: 8.0,
        structure: 8.2,
        confidence: 8.0,
      }),
      strengths: JSON.stringify([
        'Used clear STAR framework structure for answering conflict resolution',
        'Strong contextual knowledge of Amazon Leadership Principles',
        'Quantified project impact accurately with metrics',
      ]),
      weaknesses: JSON.stringify([
        'Could elaborate more on personal contributions vs team responsibilities in final year project',
        'Slight hesitance when challenged on why leaving existing college research lab',
      ]),
      feedback: 'Very solid communication and professional poise. Continue practicing concise 2-minute elevator answers for project overviews.',
      completedAt: new Date(Date.now() - 4 * 86400000),
    },
  });

  await prisma.mockInterview.create({
    data: {
      studentId: studentUser.id,
      interviewerId: mentorUser.id,
      type: 'TECHNICAL',
      company: 'Amazon',
      targetRole: 'Software Development Engineer - I',
      status: 'SCHEDULED',
      scheduledFor: new Date(Date.now() + 2 * 86400000), // In 2 days
      meetingLink: 'https://meet.google.com/placementprep-mock-tech-room-1',
    },
  });

  // 12. Seed Resume Analysis for Student
  await prisma.resumeAnalysis.create({
    data: {
      userId: studentUser.id,
      fileName: 'Aditya_Vardhan_Software_Engineer_Resume.pdf',
      rawText: 'Aditya Vardhan | CSE 2026 | NIT\nSkills: Java, Python, C++, React, Node.js, PostgreSQL, Docker, AWS, Git\nProjects:\n- Distributed Task Scheduler: Built a fault-tolerant microservice using Node.js and Redis, handling 5,000 tasks/min.\n- E-Commerce Microservices: Engineered checkout and inventory services in Java Spring Boot with PostgreSQL and Docker.\nExperience: Software Intern at TechCorp. Optimized database queries and reduced latency by 35%.',
      overallScore: 82,
      categoryScores: JSON.stringify({
        impact: 84,
        formatting: 90,
        keywords: 78,
        sections: 88,
      }),
      matchedKeywords: JSON.stringify(['Java', 'Python', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'Microservices', 'Redis']),
      missingKeywords: JSON.stringify(['CI/CD', 'Kubernetes', 'Unit Testing / Jest / JUnit', 'System Design', 'Agile / Scrum', 'GraphQL']),
      bulletFeedback: JSON.stringify([
        {
          original: 'Built a fault-tolerant microservice using Node.js and Redis, handling 5,000 tasks/min.',
          improved: 'Architected a distributed fault-tolerant task queue using Node.js and Redis; processed 5,000+ async tasks/min with zero dropped events and 99.9% uptime.',
          issue: 'Strong metric, but can emphasize architectural ownership and reliability SLA.',
        },
        {
          original: 'Optimized database queries and reduced latency by 35%.',
          improved: 'Indexed PostgreSQL relational tables and restructured SQL join operations, cutting p95 query latency by 35% across 200k monthly active queries.',
          issue: 'Specify the database type, indexing strategies applied, and scale of query volume.',
        },
      ]),
      generalTips: JSON.stringify([
        'Add a dedicated Certifications or Honors section highlighting hackathons and rankings.',
        'Incorporate CI/CD pipeline and automated unit test coverage percentages to pass senior SDE ATS filters.',
        'Maintain single-page format with consistent 0.5-inch margins for optimal ATS OCR parsing.',
      ]),
    },
  });

  // 13. Seed Practice Logs & Bookmarks
  for (let i = 0; i < 12; i++) {
    const q = createdQuestions[i];
    await prisma.practiceLog.create({
      data: {
        userId: studentUser.id,
        questionId: q.id,
        selectedOpt: q.correctOpt,
        isCorrect: true,
        timeTakenSec: Math.floor(Math.random() * 45) + 25,
        createdAt: new Date(Date.now() - (i % 5) * 86400000),
      },
    });
  }

  // Bookmark 3 questions
  await prisma.bookmark.create({ data: { userId: studentUser.id, questionId: createdQuestions[3].id } });
  await prisma.bookmark.create({ data: { userId: studentUser.id, questionId: createdQuestions[8].id } });
  await prisma.bookmark.create({ data: { userId: studentUser.id, questionId: createdQuestions[15].id } });

  // 14. Seed In-App Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: studentUser.id,
        title: 'Mock Interview Scheduled',
        message: 'Your 1-on-1 Technical Mock Interview with Anjali Menon (Amazon) is confirmed for 2 days from now.',
        type: 'INTERVIEW',
        read: false,
      },
      {
        userId: studentUser.id,
        title: 'Streak Milestone Achieved! 🔥',
        message: 'Congratulations! You have maintained a 14-day study streak on PlacementPrep.',
        type: 'ACHIEVEMENT',
        read: false,
      },
      {
        userId: studentUser.id,
        title: 'Daily Roadmap Reminder',
        message: "You have 3 tasks due today: 'Binary Trees Traversals', 'SQL Joins', and 'TCP Handshake'.",
        type: 'REMINDER',
        read: true,
      },
      {
        userId: studentUser.id,
        title: 'TCS NQT Full Mock Results Available',
        message: 'You scored 24.5/30 (81.6%) on TCS NQT Mock Test #1. Above TCS Digital cutoff!',
        type: 'TEST_RESULT',
        read: true,
      },
    ],
  });

  console.log('✅ Master seed script completed successfully!');
  console.log(`
  Demo Credentials:
  -----------------------------------------------
  🎓 Student:     student@placementprep.com / Student@123
  🏛️ Admin / TPO: admin@placementprep.com   / Admin@123
  💼 Interviewer: mentor@placementprep.com  / Mentor@123
  -----------------------------------------------
  `);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
