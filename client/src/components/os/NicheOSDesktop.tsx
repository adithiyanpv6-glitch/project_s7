import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { NICHE_BRAND } from '../../constants/nicheBrand';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import confetti from 'canvas-confetti';
import {
  LayoutDashboard,
  Compass,
  Code2,
  FileText,
  Video,
  Calendar,
  Building2,
  Camera,
  ShieldCheck,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  Search,
  Sparkles,
  Terminal,
  Layers,
  Award,
  BookOpen,
  ArrowUpRight,
  HelpCircle,
  Cpu,
  Monitor,
  Check,
  Download,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';

export type OSAppId =
  | 'desk'
  | 'readiness'
  | 'codestudio'
  | 'resume'
  | 'interview'
  | 'roadmap'
  | 'recruiters'
  | 'facilities'
  | 'tpo';

interface OSAppConfig {
  id: OSAppId;
  name: string;
  shortLabel: string;
  icon: React.ElementType;
  badge?: string;
  tagline: string;
  hotkey: string;
}

const APPS: OSAppConfig[] = [
  { id: 'desk', name: 'Campus Desk', shortLabel: 'Desk', icon: Monitor, tagline: 'Executive Placement Dashboard & Live Announcements', hotkey: '1' },
  { id: 'readiness', name: 'Readiness Engine', shortLabel: 'Readiness', icon: Compass, badge: 'PRS 78.5', tagline: 'Placement Readiness Score & Competency Diagnostic', hotkey: '2' },
  { id: 'codestudio', name: 'DSA CodeStudio', shortLabel: 'CodeStudio', icon: Code2, badge: 'LeetCode', tagline: 'In-Browser Algorithmic Compiler & Problem Solver', hotkey: '3' },
  { id: 'resume', name: 'ATS Resume Auditor', shortLabel: 'Resume', icon: FileText, badge: '84/100', tagline: 'Institutional ATS Keyword Density & Parsing Evaluator', hotkey: '4' },
  { id: 'interview', name: 'AI Mock Interview', shortLabel: 'Interview', icon: Video, tagline: 'STAR-Method Behavioral & Technical Interview Simulator', hotkey: '5' },
  { id: 'roadmap', name: '30-60-90 Roadmap', shortLabel: 'Roadmap', icon: Calendar, badge: 'Phase 2', tagline: 'Structured CSE Placement Curriculum Milestones', hotkey: '6' },
  { id: 'recruiters', name: 'Recruiter Matrix', shortLabel: 'Recruiters', icon: Building2, badge: '85+ Tiers', tagline: 'Campus Placement Partners, Cutoffs & Drive Schedule', hotkey: '7' },
  { id: 'facilities', name: 'Campus Facilities', shortLabel: 'Campus', icon: Camera, tagline: 'Authentic ICT Labs & Infrastructure of NICHE University', hotkey: '8' },
  { id: 'tpo', name: 'TPO Accreditation', shortLabel: 'TPO Console', icon: ShieldCheck, badge: 'NAAC A', tagline: 'Institutional NAAC Criterion 5 & NIRF Placement Analytics', hotkey: '9' },
];

export const NicheOSDesktop: React.FC = () => {
  const { user, switchRoleDemo } = useAuth();
  const { showToast } = useNotifications();

  // Active App State
  const [activeApp, setActiveApp] = useState<OSAppId>('desk');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Clock updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Hotkey listener for 1-9 to switch apps
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key;
      const matched = APPS.find((a) => a.hotkey === key);
      if (matched) {
        setActiveApp(matched.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- SUB-APP 1: CODE STUDIO STATE ---
  const sampleProblems = [
    {
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'Easy',
      acceptance: '53.4%',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      starterCode: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write optimal O(n) hash map solution\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n}`,
      testCases: [
        { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
        { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' },
        { input: 'nums = [3,3], target = 6', expected: '[0, 1]' },
      ],
    },
    {
      id: 'lru-cache',
      title: 'LRU Cache Design',
      difficulty: 'Hard',
      acceptance: '42.1%',
      description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put operations.',
      starterCode: `class LRUCache {\n    private final int capacity;\n    private final Map<Integer, Node> map = new HashMap<>();\n    // Doubly linked list pointers\n\n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n    }\n\n    public int get(int key) {\n        // O(1) retrieval and node elevation\n        return map.containsKey(key) ? map.get(key).val : -1;\n    }\n}`,
      testCases: [
        { input: 'LRUCache(2), put(1,1), put(2,2), get(1)', expected: '1' },
        { input: 'put(3,3), get(2)', expected: '-1 (evicted)' },
      ],
    },
    {
      id: 'binary-tree-max-path',
      title: 'Binary Tree Maximum Path Sum',
      difficulty: 'Hard',
      acceptance: '39.8%',
      description: 'A path in a binary tree is a sequence of nodes where each pair has an edge. Return the maximum path sum of any non-empty path.',
      starterCode: `class Solution {\n    int maxSum = Integer.MIN_VALUE;\n    public int maxPathSum(TreeNode root) {\n        maxGain(root);\n        return maxSum;\n    }\n    private int maxGain(TreeNode node) {\n        if (node == null) return 0;\n        int left = Math.max(maxGain(node.left), 0);\n        int right = Math.max(maxGain(node.right), 0);\n        maxSum = Math.max(maxSum, left + right + node.val);\n        return node.val + Math.max(left, right);\n    }\n}`,
      testCases: [
        { input: 'root = [1,2,3]', expected: '6' },
        { input: 'root = [-10,9,20,null,null,15,7]', expected: '42' },
      ],
    },
  ];

  const [selectedProblem, setSelectedProblem] = useState(sampleProblems[0]);
  const [codeContent, setCodeContent] = useState(sampleProblems[0].starterCode);
  const [selectedLang, setSelectedLang] = useState('Java 21');
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [isRunningCode, setIsRunningCode] = useState(false);

  const handleRunCode = () => {
    setIsRunningCode(true);
    setCodeOutput('Compiling solution against test suite...');
    setTimeout(() => {
      setIsRunningCode(false);
      setCodeOutput(`✓ Compilation Successful (24ms)\nAll 3 Test Cases Passed.\nRuntime: 1ms (Beats 98.4% of Java submissions)\nMemory Usage: 42.1 MB (Beats 87.2% of submissions)\nStatus: Accepted for NICHE Placement Drive evaluation.`);
      showToast('DSA Solution compiled and passed all test cases!', 'success');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    }, 600);
  };

  // --- SUB-APP 2: RESUME AUDITOR STATE ---
  const [resumeText, setResumeText] = useState(`ADITYA VARDHAN\nNoorul Islam Centre for Higher Education (NICHE) — B.Tech Computer Science (CGPA: 8.65)\nEmail: aditya@niuniv.edu | GitHub: github.com/aditya | Phone: +91 98765 43210\n\nTECHNICAL EXPERTISE:\nLanguages: Java, Python, C++, TypeScript, SQL\nFrameworks: Spring Boot, Node.js, Express, React, Tailwind CSS\nDatabases: PostgreSQL, Redis, MongoDB\nDeveloper Tools: Git, Docker, Linux, Postman\n\nPROJECTS:\n1. Autonomous Placement Readiness System\n- Engineered full-stack diagnostic evaluation platform using Node.js & React.\n- Automated test case runner handling 100+ concurrent student evaluations.\n\n2. Distributed Task Queue\n- Built high-throughput task worker in Go and Redis with sub-millisecond latency.`);
  const [isAuditingResume, setIsAuditingResume] = useState(false);
  const [atsScore, setAtsScore] = useState(84);
  const [missingKeywords, setMissingKeywords] = useState([
    'CI/CD Pipeline',
    'Kubernetes',
    'Microservices Architecture',
    'RESTful API Security',
    'STAR Metrics',
  ]);

  const handleAuditResume = () => {
    setIsAuditingResume(true);
    setTimeout(() => {
      setIsAuditingResume(false);
      setAtsScore(89);
      showToast('Resume ATS audit complete! Score: 89/100', 'success');
    }, 700);
  };

  // --- SUB-APP 3: INTERVIEW MOCK STATE ---
  const interviewQuestions = [
    {
      role: 'SDE Technical (Zoho / TCS Digital)',
      q: 'Explain how you would handle race conditions when updating inventory in a high-concurrency ticket booking application.',
      hint: 'Discuss pessimistic vs optimistic locking, database isolation levels (SERIALIZABLE), and Redis distributed locks (Redlock).',
    },
    {
      role: 'STAR Behavioral (Amazon Leadership Principles)',
      q: 'Tell me about a project where you took a calculated risk and faced pushback from teammates. What was the outcome?',
      hint: 'Structure using STAR: Situation, Task, Action (how you built consensus), and Result (quantitative metrics).',
    },
  ];
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [interviewAnswer, setInterviewAnswer] = useState('');
  const [interviewFeedback, setInterviewFeedback] = useState<string | null>(null);

  const handleEvaluateAnswer = () => {
    if (!interviewAnswer.trim()) {
      showToast('Please type your response before submitting.', 'info');
      return;
    }
    setInterviewFeedback(
      `✓ STAR Evaluation:\n• Situation & Task: Clearly established technical scope.\n• Action: Strong articulation of distributed locking and error fallback.\n• Result: Excellent quantitative impact.\nRubric Grade: 9.2/10 (Ready for Tier-1 Product Round)`
    );
    showToast('Interview response evaluated successfully!', 'success');
  };

  // --- SUB-APP 4: ROADMAP TASK CHECKLIST ---
  const [roadmapTasks, setRoadmapTasks] = useState([
    { id: 1, phase: 'Phase 1: Foundations', title: 'Array Two-Pointers & Sliding Window mastery (25 problems)', done: true },
    { id: 2, phase: 'Phase 1: Foundations', title: 'Quantitative Aptitude: Probability, Permutations, Time & Work', done: true },
    { id: 3, phase: 'Phase 2: Core CS', title: 'Operating Systems: Semaphores, Mutex, Virtual Memory Paging', done: true },
    { id: 4, phase: 'Phase 2: Core CS', title: 'Binary Trees & Graphs: DFS, BFS, Dijkstra, Topological Sort', done: false },
    { id: 5, phase: 'Phase 2: Core CS', title: 'DBMS: SQL Normalization (3NF/BCNF), Indexing & Transactions (ACID)', done: true },
    { id: 6, phase: 'Phase 3: Drives', title: 'ATS Resume tailored with NICHE Placement Cell Header & PDF export', done: true },
    { id: 7, phase: 'Phase 3: Drives', title: 'AI Mock Technical Interview with STAR rubric evaluation', done: false },
    { id: 8, phase: 'Phase 3: Drives', title: 'TCS Digital & Zoho Mock Coding Assessment simulation', done: false },
  ]);

  const toggleRoadmapTask = (id: number) => {
    setRoadmapTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
    showToast('Roadmap milestone updated', 'success');
  };

  const completedRoadmapCount = roadmapTasks.filter((t) => t.done).length;
  const roadmapPct = Math.round((completedRoadmapCount / roadmapTasks.length) * 100);

  const currentAppConfig = APPS.find((a) => a.id === activeApp) || APPS[0];

  return (
    <div className={`flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors select-none ${isFullscreen ? 'fixed inset-0 z-50 overflow-hidden' : 'min-h-[88vh] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden'}`}>
      
      {/* 1. OS TOP SYSTEM MENUBAR */}
      <header className="h-10 bg-slate-900 text-slate-200 px-3.5 flex items-center justify-between text-xs border-b border-slate-800 shrink-0 font-sans">
        {/* Left: University Crest & System ID */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src={NICHE_BRAND.images.logo}
              alt="NICHE Logo"
              className="w-5 h-5 object-contain rounded-sm bg-white/10 p-0.5"
              onError={(e) => {
                // fallback if image blocked
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-semibold text-white tracking-tight">
              {NICHE_BRAND.systemName}
            </span>
            <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
              v2.4 LTS
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-800 text-[11px] text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => setActiveApp('desk')}>Overview</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => setActiveApp('readiness')}>PRS Engine</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => setActiveApp('codestudio')}>DSA Studio</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => setActiveApp('recruiters')}>Drives</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => setActiveApp('facilities')}>Campus Labs</span>
          </div>
        </div>

        {/* Center: Accreditation & Department Mark */}
        <div className="hidden sm:flex items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Core Online
          </span>
          <span className="text-slate-400 hidden xl:inline">
            Noorul Islam Centre for Higher Education
          </span>
          <span className="text-slate-500 hidden md:inline">• NAAC 'A' Accredited</span>
        </div>

        {/* Right: Quick Role Switcher, Clock & Controls */}
        <div className="flex items-center gap-3">
          {/* Real-time Clock */}
          <div className="font-mono text-[11px] text-slate-300 tabular-nums flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentTime || '12:00:00 PM'}</span>
          </div>

          {/* User Role Tag */}
          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-800 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span className="font-medium text-slate-300">
              {user?.name || 'Student Candidate'}
            </span>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Workstation'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* 2. OS DESKTOP WORKSPACE & ACTIVE APPLICATION WINDOW */}
      <div className="flex-1 flex flex-col p-2 sm:p-4 overflow-hidden relative bg-slate-100 dark:bg-slate-950">
        
        {/* Background Wallpaper Watermark: Institutional NICHE Campus View */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${NICHE_BRAND.images.campus})` }}
        />

        {/* ACTIVE WINDOW FRAME */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden z-10">
          
          {/* WINDOW TITLE BAR */}
          <div className="h-10 px-3.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
            {/* Window Dots & App Title */}
            <div className="flex items-center gap-3">
              {/* Traffic Light Dots (Flat Unslop Style) */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveApp('desk')}
                  className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-rose-500 transition-colors"
                  title="Close to Desk"
                />
                <button
                  onClick={() => setActiveApp('desk')}
                  className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-amber-500 transition-colors"
                  title="Minimize"
                />
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-emerald-500 transition-colors"
                  title="Toggle Fullscreen"
                />
              </div>

              {/* Title & Path */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <currentAppConfig.icon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  {currentAppConfig.name}
                </span>
                <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
                  /apps/{currentAppConfig.id}.app
                </span>
              </div>
            </div>

            {/* Window Tagline & Hotkey Guide */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden lg:inline">
                {currentAppConfig.tagline}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                Hotkey: [{currentAppConfig.hotkey}]
              </span>
            </div>
          </div>

          {/* WINDOW CONTENT CANVAS */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            
            {/* ========================================================= */}
            {/* APP 1: CAMPUS PLACEMENT DESK (OVERVIEW)                   */}
            {/* ========================================================= */}
            {activeApp === 'desk' && (
              <div className="space-y-6 max-w-6xl mx-auto">
                {/* Institutional Welcome Card with Authentic Campus Image */}
                <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-white">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                            Department of Computer Science & Engineering
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Academic Year 2026–2027
                          </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                          Noorul Islam Centre for Higher Education
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                          Campus Placement Intelligence & Operating System. Continuous readiness benchmarking, LeetCode-grade algorithmic training, and automated recruitment pipelines for NICHE engineers.
                        </p>
                      </div>

                      {/* Approval Logos Strip */}
                      <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="font-medium text-slate-300">Statutory Approvals:</span>
                        {NICHE_BRAND.approvals.map((appr) => (
                          <div key={appr.name} className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700/60">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                            <span className="text-[11px] text-slate-200 font-medium">{appr.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Campus Image Right Showcase */}
                    <div className="lg:col-span-4 relative min-h-[200px] border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-950">
                      <img
                        src={NICHE_BRAND.images.campus}
                        alt="NICHE University Campus"
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-[11px] text-slate-300 bg-slate-900/80 backdrop-blur-sm p-2 rounded border border-slate-800">
                        <span className="font-semibold text-white block">NICHE Main University Campus</span>
                        <span className="text-[10px] text-slate-400">Kumaracoil, Thuckalay, Tamil Nadu</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Institutional Placement Metrics (Tabular Unslop) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Placement Rate</div>
                    <div className="text-2xl font-semibold font-mono tracking-tight text-slate-900 dark:text-white mt-1 tabular-nums">
                      {NICHE_BRAND.stats.placementPercentage}
                    </div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                      +4.2% YoY Growth
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Highest Package</div>
                    <div className="text-2xl font-semibold font-mono tracking-tight text-slate-900 dark:text-white mt-1 tabular-nums">
                      {NICHE_BRAND.stats.highestPackage}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      International Tier-1
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Average Product CTC</div>
                    <div className="text-2xl font-semibold font-mono tracking-tight text-slate-900 dark:text-white mt-1 tabular-nums">
                      {NICHE_BRAND.stats.averagePackage}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Core Engineering
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Campus Recruiters</div>
                    <div className="text-2xl font-semibold font-mono tracking-tight text-slate-900 dark:text-white mt-1 tabular-nums">
                      {NICHE_BRAND.stats.activeRecruiters}
                    </div>
                    <div className="text-[11px] text-teal-600 dark:text-teal-400 mt-1 font-medium">
                      Zoho, TCS, Infosys, CTS
                    </div>
                  </div>
                </div>

                {/* Quick App Launcher Grid (Page-wise OS Apps) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                      NICHE Operating System Applications
                    </h2>
                    <span className="text-xs text-slate-500 font-mono">
                      8 Applications Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {APPS.filter((a) => a.id !== 'desk').map((app) => {
                      const Icon = app.icon;
                      return (
                        <div
                          key={app.id}
                          onClick={() => setActiveApp(app.id)}
                          className="group p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-slate-400 dark:hover:border-slate-600 cursor-pointer transition-all hover:shadow-sm"
                        >
                          <div className="flex items-start justify-between">
                            <div className="w-9 h-9 rounded bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-slate-700 dark:text-slate-200 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-teal-600 transition-colors">
                              <Icon className="w-5 h-5" />
                            </div>
                            {app.badge && (
                              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                {app.badge}
                              </span>
                            )}
                          </div>
                          <div className="mt-3">
                            <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              {app.name}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                              {app.tagline}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Campus Announcements & Recruitment Drive Notice Board */}
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-800/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      NICHE Placement Cell — Live Bulletin
                    </span>
                  </div>
                  <div className="space-y-2 text-xs divide-y divide-slate-200 dark:divide-slate-800/80">
                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          Zoho Corporation Product Developer Assessment scheduled for Nov 04, 2026.
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">10:00 AM • Lab 4</span>
                    </div>
                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          TCS Digital & Ninja National Qualifier Test (NQT) practice test live in CodeStudio.
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">Continuous</span>
                    </div>
                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          Mandatory Resume ATS Verification deadline for B.Tech CSE Class of 2026.
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">Oct 30, 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* APP 2: PLACEMENT READINESS SCORE ENGINE (PRS)             */}
            {/* ========================================================= */}
            {activeApp === 'readiness' && (
              <div className="space-y-6 max-w-5xl mx-auto">
                {/* Header Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono uppercase">Readiness Metric</span>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Placement Readiness Score (PRS)
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Weighted diagnostic score derived from algorithmic tests, core CS fundamentals, and resume audit.
                    </p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-semibold font-mono tracking-tight text-teal-600 dark:text-teal-400 tabular-nums">
                      78.5
                    </span>
                    <span className="text-xs text-slate-500 font-mono">/ 100</span>
                  </div>
                </div>

                {/* 5 Competency Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                      Technical Competency Matrix
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-slate-700 dark:text-slate-300">Data Structures & Algorithms</span>
                          <span className="font-mono text-teal-600 dark:text-teal-400 font-semibold">88%</span>
                        </div>
                        <div className="w-full h-2 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-teal-600 dark:bg-teal-500 rounded" style={{ width: '88%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-slate-700 dark:text-slate-300">Operating Systems & Core CS</span>
                          <span className="font-mono text-teal-600 dark:text-teal-400 font-semibold">74%</span>
                        </div>
                        <div className="w-full h-2 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-teal-600 dark:bg-teal-500 rounded" style={{ width: '74%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-slate-700 dark:text-slate-300">Quantitative & Logical Aptitude</span>
                          <span className="font-mono text-teal-600 dark:text-teal-400 font-semibold">82%</span>
                        </div>
                        <div className="w-full h-2 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-teal-600 dark:bg-teal-500 rounded" style={{ width: '82%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-slate-700 dark:text-slate-300">System Design & Databases</span>
                          <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">65%</span>
                        </div>
                        <div className="w-full h-2 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-amber-500 rounded" style={{ width: '65%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-slate-700 dark:text-slate-300">STAR Behavioral & Communication</span>
                          <span className="font-mono text-teal-600 dark:text-teal-400 font-semibold">70%</span>
                        </div>
                        <div className="w-full h-2 rounded bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-teal-600 dark:bg-teal-500 rounded" style={{ width: '70%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Target Company Eligibility Matrix */}
                  <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                      Tier Eligibility Forecast
                    </h3>

                    <div className="space-y-2.5">
                      <div className="p-3 rounded border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                            Tier-1 Product Roles (Zoho, Amazon, Freshworks)
                          </div>
                          <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                            Cutoff: PRS 75.0 • Candidate: 78.5 (Eligible)
                          </div>
                        </div>
                        <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded">
                          QUALIFIED
                        </span>
                      </div>

                      <div className="p-3 rounded border border-teal-200 dark:border-teal-900/60 bg-teal-50/50 dark:bg-teal-950/20 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold text-teal-900 dark:text-teal-200">
                            Tier-2 Differential Drives (TCS Digital, Cognizant Elevate)
                          </div>
                          <div className="text-[11px] text-teal-700 dark:text-teal-400">
                            Cutoff: PRS 65.0 • Candidate: 78.5 (Eligible)
                          </div>
                        </div>
                        <span className="text-xs font-mono font-semibold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/50 px-2 py-0.5 rounded">
                          QUALIFIED
                        </span>
                      </div>

                      <div className="p-3 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                            Core Mass Recruiters (Infosys, Wipro, HCL)
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Cutoff: PRS 50.0 • Candidate: 78.5 (Exceeds Threshold)
                          </div>
                        </div>
                        <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-700 px-2 py-0.5 rounded">
                          100% READY
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button size="sm" onClick={() => setActiveApp('codestudio')} className="w-full">
                        Elevate PRS with DSA Practice <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* APP 3: DSA CODE STUDIO (IN-BROWSER COMPILER)              */}
            {/* ========================================================= */}
            {activeApp === 'codestudio' && (
              <div className="h-full flex flex-col space-y-4 max-w-6xl mx-auto">
                {/* Problem Selector & Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Select Problem:</span>
                    <select
                      value={selectedProblem.id}
                      onChange={(e) => {
                        const found = sampleProblems.find((p) => p.id === e.target.value);
                        if (found) {
                          setSelectedProblem(found);
                          setCodeContent(found.starterCode);
                          setCodeOutput(null);
                        }
                      }}
                      className="text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-slate-900 dark:text-white font-medium focus:outline-none"
                    >
                      {sampleProblems.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({p.difficulty})
                        </option>
                      ))}
                    </select>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Acceptance: {selectedProblem.acceptance}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedLang}
                      onChange={(e) => setSelectedLang(e.target.value)}
                      className="text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1 text-slate-900 dark:text-white font-mono"
                    >
                      <option value="Java 21">Java 21</option>
                      <option value="Python 3.12">Python 3.12</option>
                      <option value="C++ 20">C++ 20 (GCC)</option>
                      <option value="TypeScript">TypeScript 5.4</option>
                    </select>

                    <Button size="sm" onClick={handleRunCode} disabled={isRunningCode}>
                      {isRunningCode ? (
                        <>Running...</>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 mr-1 fill-current" /> Run Test Cases
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Problem Description & Editor Split View */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
                  {/* Left: Problem Statement & Test Suite */}
                  <div className="lg:col-span-5 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 overflow-y-auto">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {selectedProblem.title}
                        </h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${selectedProblem.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'}`}>
                          {selectedProblem.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                        {selectedProblem.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
                        Sample Test Cases:
                      </div>
                      <div className="space-y-2">
                        {selectedProblem.testCases.map((tc, idx) => (
                          <div key={idx} className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/50 text-[11px] font-mono border border-slate-200 dark:border-slate-800 space-y-1">
                            <div><span className="text-slate-400">Input:</span> {tc.input}</div>
                            <div><span className="text-teal-600 dark:text-teal-400 font-semibold">Expected:</span> {tc.expected}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Code Editor & Terminal Output */}
                  <div className="lg:col-span-7 flex flex-col space-y-3">
                    <div className="flex-1 rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 relative flex flex-col">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                        <span>Solution.{selectedLang.toLowerCase().includes('java') ? 'java' : 'py'}</span>
                        <span>UTF-8 • 4 Spaces</span>
                      </div>
                      <textarea
                        value={codeContent}
                        onChange={(e) => setCodeContent(e.target.value)}
                        className="flex-1 w-full bg-transparent resize-none font-mono text-xs text-teal-300 focus:outline-none leading-relaxed min-h-[200px]"
                        spellCheck={false}
                      />
                    </div>

                    {/* Terminal Output */}
                    <div className="h-32 rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-[11px] text-slate-300 overflow-y-auto">
                      <div className="text-slate-500 mb-1 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" /> Output Console
                      </div>
                      {codeOutput ? (
                        <pre className="text-emerald-400 whitespace-pre-wrap">{codeOutput}</pre>
                      ) : (
                        <span className="text-slate-600">Click "Run Test Cases" to compile and execute solution.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* APP 4: ATS RESUME AUDITOR                                 */}
            {/* ========================================================= */}
            {activeApp === 'resume' && (
              <div className="space-y-6 max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono uppercase">ATS Compatibility</span>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      NICHE Placement Cell ATS Auditor
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Evaluates parse rate against corporate applicant tracking systems (Workday, Greenhouse, Taleo).
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-3xl font-semibold font-mono tracking-tight text-teal-600 dark:text-teal-400 tabular-nums">
                        {atsScore}/100
                      </div>
                      <div className="text-[10px] text-emerald-600 font-medium">ATS High Compliance</div>
                    </div>
                    <Button size="sm" onClick={handleAuditResume} disabled={isAuditingResume}>
                      {isAuditingResume ? 'Scanning...' : 'Re-scan Document'}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Resume Text Preview */}
                  <div className="lg:col-span-7 rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">
                        Standard University Template
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">B.Tech CSE 2026</span>
                    </div>
                    <textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      rows={14}
                      className="w-full bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 p-3 rounded border border-slate-200 dark:border-slate-800 resize-none focus:outline-none"
                    />
                  </div>

                  {/* Right: Missing Keywords & Criteria */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                      <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                        High-Impact Keywords Missing
                      </h3>
                      <p className="text-xs text-slate-500">
                        Adding these keywords will increase recruiter match percentage for Product and Tier-1 roles:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {missingKeywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-mono border border-amber-200 dark:border-amber-800/60"
                          >
                            + {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                      <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                        Compliance Checklist
                      </h3>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Institution Name: Noorul Islam Centre for Higher Education (Verified)</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Standard Section Headings (Experience, Skills, Projects)</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>No nested tables or unparseable graphics</span>
                        </div>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>Include quantitative metrics in project bullets (% improvement, ms latency)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* APP 5: AI MOCK INTERVIEW HUB                              */}
            {/* ========================================================= */}
            {activeApp === 'interview' && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono uppercase">AI Agent Evaluator</span>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      STAR Behavioral & Technical Interview Simulator
                    </h2>
                  </div>
                  <span className="text-xs font-mono bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 px-2.5 py-1 rounded border border-teal-200 dark:border-teal-800">
                    Live Coach Active
                  </span>
                </div>

                {/* Question Box */}
                <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                      Track: {interviewQuestions[currentQIndex].role}
                    </span>
                    <button
                      onClick={() => {
                        setCurrentQIndex((prev) => (prev === 0 ? 1 : 0));
                        setInterviewAnswer('');
                        setInterviewFeedback(null);
                      }}
                      className="text-slate-500 hover:text-slate-900 dark:hover:text-white text-xs underline"
                    >
                      Next Question →
                    </button>
                  </div>

                  <div className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
                    "{interviewQuestions[currentQIndex].q}"
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded border border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">STAR Framing Tip:</span> {interviewQuestions[currentQIndex].hint}
                  </div>
                </div>

                {/* Candidate Response Workspace */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Your Response (Type your structured answer below):
                  </label>
                  <textarea
                    rows={6}
                    value={interviewAnswer}
                    onChange={(e) => setInterviewAnswer(e.target.value)}
                    placeholder="In my final-year project at NICHE, we faced a high-volume concurrency bottleneck when... (Situation & Task). I implemented... (Action), resulting in... (Result)"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500 leading-relaxed"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {interviewAnswer.split(/\s+/).filter(Boolean).length} words
                    </span>
                    <Button size="sm" onClick={handleEvaluateAnswer}>
                      <Sparkles className="w-3.5 h-3.5 mr-1" /> Evaluate STAR Delivery
                    </Button>
                  </div>
                </div>

                {/* Feedback Panel */}
                {interviewFeedback && (
                  <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 font-mono text-xs text-emerald-800 dark:text-emerald-300 whitespace-pre-wrap leading-relaxed">
                    {interviewFeedback}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* APP 6: 30-60-90 DAY CURRICULUM ROADMAP                     */}
            {/* ========================================================= */}
            {activeApp === 'roadmap' && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono uppercase">Structured Preparation</span>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      30-60-90 Day Placement Curriculum
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Accredited engineering placement roadmap developed by NICHE CSE Department.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold font-mono tracking-tight text-teal-600 dark:text-teal-400 tabular-nums">
                      {roadmapPct}% Done
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {completedRoadmapCount} of {roadmapTasks.length} milestones
                    </div>
                  </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-2">
                  {roadmapTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleRoadmapTask(task.id)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${task.done ? 'bg-slate-50/70 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800/60 text-slate-500' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-slate-300 dark:hover:border-slate-700'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${task.done ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                          {task.done && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className={`text-xs font-medium ${task.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                            {task.title}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {task.phase}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {task.done ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* APP 7: RECRUITER MATRIX & PARTNER DRIVES                  */}
            {/* ========================================================= */}
            {activeApp === 'recruiters' && (
              <div className="space-y-6 max-w-5xl mx-auto">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 font-mono uppercase">Campus Recruitment Cell</span>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    NICHE Placement Partners & Drive Matrix
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Official corporate hiring partners visiting Noorul Islam Centre for Higher Education for 2026–2027.
                  </p>
                </div>

                {/* Recruiter Logos Grid with Real niuniv.com Assets */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {NICHE_BRAND.recruiters.map((recruiter) => (
                    <div
                      key={recruiter.id}
                      className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-between text-center space-y-3 hover:border-teal-500/40 transition-colors"
                    >
                      <div className="w-24 h-14 flex items-center justify-center p-1 bg-white rounded border border-slate-100">
                        <img
                          src={recruiter.url}
                          alt={recruiter.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120x60?text=' + encodeURIComponent(recruiter.name);
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white">
                          {recruiter.name}
                        </div>
                        <div className="text-[11px] text-teal-600 dark:text-teal-400 font-mono mt-0.5">
                          Cutoff: 60% / 6.5 CGPA
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        Active Partner
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* APP 8: CAMPUS FACILITIES & LABS SHOWCASE                 */}
            {/* ========================================================= */}
            {activeApp === 'facilities' && (
              <div className="space-y-6 max-w-6xl mx-auto">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 font-mono uppercase">Institutional Infrastructure</span>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    NICHE University Campus & Advanced Laboratories
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    State-of-the-art computing clusters, smart classrooms, and incubation spaces at Noorul Islam University.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Campus Aerial */}
                  <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={NICHE_BRAND.images.campus}
                        alt="Central Campus"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">Main University Campus</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Kumaracoil, Thuckalay • Serene 550-acre hillside learning environment</div>
                    </div>
                  </div>

                  {/* ICT Labs */}
                  <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={NICHE_BRAND.images.ictLabs}
                        alt="Advanced ICT Computing Labs"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">Advanced ICT Computing Labs</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Department of CSE • High-performance workstation clusters for AI & cloud engineering</div>
                    </div>
                  </div>

                  {/* Central Auditorium */}
                  <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={NICHE_BRAND.images.auditorium}
                        alt="Hill Top Central Auditorium"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">Hill Top Central Auditorium</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">2,500-seat capacity auditorium for university placement drives & conferences</div>
                    </div>
                  </div>

                  {/* Smart Classrooms */}
                  <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={NICHE_BRAND.images.classrooms}
                        alt="Smart Multimedia Classrooms"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">Smart Multimedia Classrooms</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Interactive digital learning suites for technical placement workshops</div>
                    </div>
                  </div>

                  {/* Incubation Centre */}
                  <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={NICHE_BRAND.images.incubation}
                        alt="Innovation & Incubation Centre"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">Innovation & Incubation Centre</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">MSME-recognized technology business incubator fostering student startups</div>
                    </div>
                  </div>

                  {/* Research Centre */}
                  <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="h-44 overflow-hidden relative">
                      <img
                        src={NICHE_BRAND.images.research}
                        alt="Advanced Research & Nano-Tech Centre"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">Advanced Research Laboratories</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Interdisciplinary R&D centres funded by ISRO, DRDO & DST</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* APP 9: TPO CONSOLE & ACCREDITATION COMPLIANCE             */}
            {/* ========================================================= */}
            {activeApp === 'tpo' && (
              <div className="space-y-6 max-w-5xl mx-auto">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono uppercase">Institutional Accreditation</span>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      NAAC Criterion 5.2.1 & NIRF Placement Analytics
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Statutory compliance dashboard for Noorul Islam Centre for Higher Education.
                    </p>
                  </div>
                  <Button size="sm" onClick={() => showToast('NAAC Criterion 5.2.1 Report exported as CSV.', 'success')}>
                    <Download className="w-3.5 h-3.5 mr-1.5" /> Export NAAC Data
                  </Button>
                </div>

                {/* Compliance Table */}
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white">
                    Department of Computer Science & Engineering — Cohort 2026 Summary
                  </div>
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-mono text-[11px] border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="p-3">Metric Category</th>
                        <th className="p-3">NIRF Standard</th>
                        <th className="p-3">NICHE Actuals</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                      <tr>
                        <td className="p-3 font-sans font-medium text-slate-900 dark:text-white">Graduating Batch Size (B.Tech CSE)</td>
                        <td className="p-3 text-slate-500">N/A</td>
                        <td className="p-3 text-slate-900 dark:text-white font-semibold">240 Students</td>
                        <td className="p-3"><span className="text-emerald-600 font-semibold">100% Registered</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-sans font-medium text-slate-900 dark:text-white">Placement & Higher Studies Conversion</td>
                        <td className="p-3 text-slate-500">&gt; 80.0%</td>
                        <td className="p-3 text-slate-900 dark:text-white font-semibold">94.2%</td>
                        <td className="p-3"><span className="text-emerald-600 font-semibold">NAAC A Met</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-sans font-medium text-slate-900 dark:text-white">Median Salary (LPA)</td>
                        <td className="p-3 text-slate-500">&gt; ₹4.5 LPA</td>
                        <td className="p-3 text-slate-900 dark:text-white font-semibold">₹7.2 LPA</td>
                        <td className="p-3"><span className="text-emerald-600 font-semibold">Exceeds Norm</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-sans font-medium text-slate-900 dark:text-white">Active Corporate MoUs</td>
                        <td className="p-3 text-slate-500">&gt; 15 MoUs</td>
                        <td className="p-3 text-slate-900 dark:text-white font-semibold">32 Active MoUs</td>
                        <td className="p-3"><span className="text-emerald-600 font-semibold">Verified</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. OS DOCK (PAGE-WISE SWITCHER & LAUNCHER) */}
        <div className="pt-2 pb-1 flex justify-center shrink-0">
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 text-white shadow-lg border border-slate-800 backdrop-blur-md">
            {APPS.map((app) => {
              const Icon = app.icon;
              const isActive = activeApp === app.id;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveApp(app.id)}
                  className={`group relative flex flex-col items-center justify-center w-10 h-10 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/20 text-white scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={`${app.name} [${app.hotkey}]`}
                >
                  <Icon className="w-4 h-4" />
                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-teal-400" />
                  )}
                  {/* Tooltip on Hover */}
                  <span className="absolute -top-8 px-2 py-0.5 rounded bg-slate-950 text-white text-[10px] font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-800 shadow">
                    {app.shortLabel} <span className="text-slate-400 font-mono">[{app.hotkey}]</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. OS BOTTOM STATUS BAR */}
        <div className="flex items-center justify-between px-3 py-1 text-[10px] font-mono text-slate-400 shrink-0 border-t border-slate-200 dark:border-slate-900">
          <div className="flex items-center gap-2">
            <span>NICHE PlacementOS v2.4</span>
            <span>•</span>
            <span>Kumaracoil, Tamil Nadu</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400">Node Cluster: BOM-08 (24ms)</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span>Press keys [1-9] to switch apps</span>
            <span>•</span>
            <span>Dept. of CSE</span>
          </div>
        </div>

      </div>
    </div>
  );
};
