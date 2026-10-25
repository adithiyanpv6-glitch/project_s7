export type UserRole = 'STUDENT' | 'ADMIN' | 'INTERVIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  studentProfile?: StudentProfile;
}

export interface StudentProfile {
  id: string;
  userId: string;
  college: string;
  branch: string;
  gradYear: number;
  cgpa: number;
  targetRoles: string; // JSON array string
  targetCompanies: string; // JSON array string
  skillLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  preferredLang: string;
  dailyHours: number;
  targetDate?: string;
  strengths?: string;
  weakAreas?: string;
  readinessScore: number;
  streakDays: number;
  onboardingDone: boolean;
  roadmapDuration: number;
  diagnosticResult?: DiagnosticResult;
}

export interface DiagnosticResult {
  id: string;
  overallScore: number;
  quantScore: number;
  logicalScore: number;
  verbalScore: number;
  codingScore: number;
  coreCsScore: number;
  softSkillsScore: number;
  strengthsSummary: string; // JSON array string
  weaknessesSummary: string; // JSON array string
  recommendations: string; // JSON array string
  completedAt: string;
}

export interface RoadmapTask {
  id: string;
  dayNumber: number;
  weekNumber: number;
  title: string;
  description: string;
  category: string;
  targetCount: number;
  completed: boolean;
  completedAt?: string;
  dueDate?: string;
}

export interface Question {
  id: string;
  title: string;
  prompt: string;
  category: string;
  subCategory: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  options: string[];
  correctOpt?: number;
  explanation?: string;
  companyTags: string[];
  isBookmarked?: boolean;
  lastAttempt?: {
    selectedOpt?: number;
    isCorrect?: boolean;
    timeTakenSec?: number;
  };
}

export interface CodingProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  category: string;
  description?: string;
  examples?: { input: string; output: string; explanation?: string }[];
  constraints?: string[];
  starterCode?: Record<string, string>;
  testCases?: { input: string; expectedOutput: string }[];
  hints?: string[];
  editorial?: string;
  companyTags?: string[];
  isSolved?: boolean;
  isAttempted?: boolean;
}

export interface MockTest {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  passingMarks: number;
  negativeMarking: number;
  category: string;
  targetCompany?: string;
  cutoffPercentage: number;
  userAttemptsCount?: number;
  bestScore?: number;
  lastAttemptAt?: string;
}

export interface TestAttempt {
  id: string;
  score: number;
  totalMarks: number;
  accuracy: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  timeSpentSec: number;
  sectionScores: string;
  completedAt: string;
  mockTest?: MockTest;
}

export interface MockInterview {
  id: string;
  type: string;
  company?: string;
  targetRole: string;
  scheduledFor?: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  meetingLink?: string;
  overallRating?: number;
  ratings?: string;
  strengths?: string;
  weaknesses?: string;
  feedback?: string;
  student?: User;
  interviewer?: User;
  createdAt: string;
  completedAt?: string;
}

export interface ResumeAnalysis {
  id: string;
  fileName: string;
  overallScore: number;
  categoryScores: {
    impact: number;
    formatting: number;
    keywords: number;
    sections: number;
  };
  matchedKeywords: string[];
  missingKeywords: string[];
  bulletFeedback: {
    original: string;
    improved: string;
    issue: string;
  }[];
  generalTips: string[];
  createdAt: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  salaryRange: string;
  hiringProcess?: { round: number; name: string; format: string; duration: string; details: string }[];
  eligibility?: { minCgpa: number; backlogsAllowed: number; branches: string[]; graduationYears: number[] };
  examPattern?: { sections: { name: string; questions: number; timeMinutes: number; negativeMarking: boolean }[]; totalTimeMinutes: number };
  importantTopics?: string[];
  cutoffDetails?: { aptitudeCutoff: number; codingCutoff: number; overallCutoff: number; notes: string };
  interviewThemes?: string[];
  checklist?: string[];
  studentNote?: string;
  sampleQuestions?: Question[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}
