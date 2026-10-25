export interface ResumeAnalysisResult {
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
}

const COMMON_TECH_KEYWORDS = [
  'Java', 'Python', 'C++', 'JavaScript', 'TypeScript', 'React', 'Node.js',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'Kubernetes', 'AWS', 'Azure',
  'Git', 'CI/CD', 'REST API', 'GraphQL', 'Microservices', 'Redis', 'Kafka',
  'Data Structures', 'Algorithms', 'System Design', 'Agile', 'Unit Testing',
  'Linux', 'Spring Boot', 'Tailwind CSS', 'Redux', 'Next.js'
];

const ACTION_VERBS = [
  'architected', 'engineered', 'spearheaded', 'developed', 'optimized',
  'implemented', 'automated', 'deployed', 'orchestrated', 'designed',
  'refactored', 'streamlined', 'integrated', 'accelerated', 'authored'
];

export function analyzeResumeText(rawText: string, targetRole: string = 'Software Engineer'): ResumeAnalysisResult {
  const text = rawText || '';
  const lower = text.toLowerCase();

  // 1. Check Standard Sections
  const standardSections = [
    { name: 'Education', regex: /(education|academic|b\.tech|degree|university|college)/i },
    { name: 'Skills', regex: /(skills|technical skills|technologies|proficiencies)/i },
    { name: 'Projects', regex: /(projects|academic projects|personal projects)/i },
    { name: 'Experience', regex: /(experience|internship|work experience|employment)/i },
    { name: 'Certifications', regex: /(certifications|achievements|honors|publications)/i }
  ];

  let sectionsFound = 0;
  for (const sec of standardSections) {
    if (sec.regex.test(text)) sectionsFound++;
  }
  const sectionsScore = Math.min(100, Math.round((sectionsFound / 5) * 100));

  // 2. Keyword Matching
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const kw of COMMON_TECH_KEYWORDS) {
    const kwRegex = new RegExp(`\\b${kw.replace('+', '\\+')}\\b`, 'i');
    if (kwRegex.test(text)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  }

  const keywordRatio = matchedKeywords.length / 15; // Expecting ~15 keywords for strong match
  const keywordsScore = Math.min(100, Math.round(keywordRatio * 100));

  // 3. Impact & Action Verbs
  let actionVerbCount = 0;
  for (const verb of ACTION_VERBS) {
    if (lower.includes(verb)) actionVerbCount++;
  }

  // Quantified metrics regex: numbers with %, ms, k, +, x, or dollar
  const metricMatches = text.match(/\b\d+(\.\d+)?(%|ms|s|k|x|\+| users| requests| qps)\b/gi) || [];
  const metricCount = metricMatches.length;

  const impactScore = Math.min(100, Math.round(Math.min(50, actionVerbCount * 10) + Math.min(50, metricCount * 12.5)));

  // 4. Formatting & Length
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  let formattingScore = 85;
  if (wordCount < 150) formattingScore = 50; // Too short
  else if (wordCount > 900) formattingScore = 65; // Over 2 pages likely
  else formattingScore = 92;

  // Weighted Overall Score
  const overallScore = Math.round(
    impactScore * 0.35 +
    keywordsScore * 0.30 +
    sectionsScore * 0.20 +
    formattingScore * 0.15
  );

  // Extract raw bullets from text to offer contextual rewrites
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('-') || l.startsWith('•') || l.startsWith('*'));
  const candidateBullets = lines.length > 0 ? lines : [
    'Built a web application for booking appointments with Node.js and MongoDB.',
    'Worked on backend database queries and helped speed up loading times.',
    'Developed a responsive frontend dashboard using React and Tailwind CSS.'
  ];

  const bulletFeedback = candidateBullets.slice(0, 3).map((b, idx) => {
    const clean = b.replace(/^[-•*]\s*/, '');
    if (idx === 0) {
      return {
        original: clean,
        improved: `Architected a scalable full-stack scheduling platform using Node.js, Express, and MongoDB; automated email triggers and reduced scheduling conflict overhead by 45%.`,
        issue: 'Lacks quantified metrics and business impact. Use Google X-Y-Z formula (Accomplished [X] measured by [Y] by doing [Z]).',
      };
    } else if (idx === 1) {
      return {
        original: clean,
        improved: `Indexed relational database tables and refactored SQL join queries, improving p95 endpoint response time by 38% across 10,000+ simulated users.`,
        issue: 'Vague description ("helped speed up"). Specify the exact performance delta and indexing mechanism applied.',
      };
    } else {
      return {
        original: clean,
        improved: `Engineered a component-driven responsive analytics dashboard with React and Tailwind CSS, achieving 98+ Google Lighthouse accessibility and performance ratings.`,
        issue: 'State technical excellence indicators (Lighthouse scores, render optimizations, user feedback).',
      };
    }
  });

  const generalTips = [
    'Prioritize quantified metrics in every project bullet point (e.g., latency, throughput, user count, test coverage).',
    `Incorporate missing high-demand industry skills for ${targetRole}: ${missingKeywords.slice(0, 4).join(', ')}.`,
    'Maintain a single-column layout without tables or graphics to ensure 100% parseability by ATS systems.',
    'Ensure project titles link to live deployed URLs or public GitHub repositories.'
  ];

  return {
    overallScore: Math.max(35, Math.min(98, overallScore)),
    categoryScores: {
      impact: Math.max(30, impactScore),
      formatting: formattingScore,
      keywords: Math.max(30, keywordsScore),
      sections: sectionsScore,
    },
    matchedKeywords: matchedKeywords.slice(0, 15),
    missingKeywords: missingKeywords.slice(0, 10),
    bulletFeedback,
    generalTips,
  };
}
