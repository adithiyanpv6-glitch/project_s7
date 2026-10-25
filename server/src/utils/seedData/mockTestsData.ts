export interface RawMockTest {
  title: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  passingMarks: number;
  negativeMarking: number;
  category: string;
  targetCompany?: string;
  cutoffPercentage: number;
  questionFilters: {
    category?: string;
    subCategory?: string;
    companyTag?: string;
    limit: number;
  }[];
}

export const mockTestsData: RawMockTest[] = [
  {
    title: "TCS NQT National Qualifier Comprehensive Mock",
    description: "Realistic full-length TCS NQT test simulating Foundation and Advanced sections with Numerical, Verbal, Reasoning, and Programming questions.",
    durationMinutes: 60,
    totalQuestions: 30,
    passingMarks: 21,
    negativeMarking: 0.25,
    category: "Full-Length Company Mock",
    targetCompany: "TCS",
    cutoffPercentage: 70.0,
    questionFilters: [
      { category: "QUANTITATIVE", limit: 8 },
      { category: "LOGICAL", limit: 8 },
      { category: "VERBAL", limit: 6 },
      { category: "PROGRAMMING", limit: 4 },
      { companyTag: "TCS", limit: 4 }
    ]
  },
  {
    title: "Amazon SDE-1 Technical Assessment",
    description: "Amazon SDE screening mock test evaluating Data Structures, Algorithms, Core CS systems knowledge, and Technical problem solving.",
    durationMinutes: 60,
    totalQuestions: 25,
    passingMarks: 20,
    negativeMarking: 0.0,
    category: "Product & SDE Assessment",
    targetCompany: "Amazon",
    cutoffPercentage: 80.0,
    questionFilters: [
      { category: "DSA", limit: 10 },
      { category: "CORE_CS", limit: 7 },
      { category: "TECHNICAL_INTERVIEW", limit: 5 },
      { companyTag: "Amazon", limit: 3 }
    ]
  },
  {
    title: "Campus Aptitude & Cognitive Readiness Mock",
    description: "Standardized cognitive aptitude assessment covering Quantitative, Logical Reasoning, and Verbal Ability for on-campus mass hiring drives.",
    durationMinutes: 45,
    totalQuestions: 30,
    passingMarks: 18,
    negativeMarking: 0.25,
    category: "General Aptitude",
    cutoffPercentage: 60.0,
    questionFilters: [
      { category: "QUANTITATIVE", limit: 10 },
      { category: "LOGICAL", limit: 10 },
      { category: "VERBAL", limit: 10 }
    ]
  },
  {
    title: "Core CS Engineering Diagnostic Test (OS, DBMS, CN)",
    description: "Deep technical assessment covering Operating Systems, Database Management Systems, and Computer Networks fundamentals.",
    durationMinutes: 45,
    totalQuestions: 25,
    passingMarks: 18,
    negativeMarking: 0.25,
    category: "Core CS Fundamentals",
    cutoffPercentage: 72.0,
    questionFilters: [
      { category: "CORE_CS", limit: 20 },
      { category: "TECHNICAL_INTERVIEW", limit: 5 }
    ]
  },
  {
    title: "Cognizant GenC Elevate Assessment",
    description: "Curated assessment modeled after the Cognizant GenC Elevate pattern focusing on Analytical Reasoning, Code Debugging, and Technical Acumen.",
    durationMinutes: 50,
    totalQuestions: 25,
    passingMarks: 17,
    negativeMarking: 0.0,
    category: "Full-Length Company Mock",
    targetCompany: "Cognizant",
    cutoffPercentage: 68.0,
    questionFilters: [
      { category: "LOGICAL", limit: 8 },
      { category: "PROGRAMMING", limit: 7 },
      { category: "CORE_CS", limit: 5 },
      { companyTag: "Cognizant", limit: 5 }
    ]
  }
];
