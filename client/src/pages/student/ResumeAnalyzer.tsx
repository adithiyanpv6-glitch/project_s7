import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar, ProgressRing } from '../../components/common/ProgressBar';
import confetti from 'canvas-confetti';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  History,
  FileCheck2,
} from 'lucide-react';

export const ResumeAnalyzer: React.FC = () => {
  const { showToast } = useNotifications();
  const { refreshUser } = useAuth();

  const [rawText, setRawText] = useState('');
  const [fileName, setFileName] = useState('My_Resume.txt');
  const [targetRole, setTargetRole] = useState('Software Development Engineer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<any | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const fetchHistory = async () => {
    try {
      const data = await api.get<any[]>('/resume/history');
      setHistory(data);
      if (data.length > 0 && !currentAnalysis) {
        setCurrentAnalysis(data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setRawText(content || '');
      showToast(`Loaded ${file.name}. Click "Audit Resume" to analyze.`, 'info');
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    if (!rawText || rawText.trim().length < 50) {
      showToast('Please paste or upload resume text with at least 50 characters.', 'warning');
      return;
    }

    setIsAnalyzing(true);
    try {
      const res = await api.post<any>('/resume/analyze', {
        rawText,
        fileName,
        targetRole,
      });

      setCurrentAnalysis(res);
      if (res.overallScore >= 75) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0d9488', '#10b981', '#38bdf8'],
        });
      }
      showToast(`Resume Audit Complete! Score: ${res.overallScore}/100`, 'success');
      await refreshUser();
      fetchHistory();
    } catch (err: any) {
      showToast(err.message || 'Analysis failed', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSampleResume = () => {
    setFileName('Aditya_Vardhan_Resume.txt');
    setRawText(`Aditya Vardhan
Email: aditya@university.edu | Phone: +91 9876543210 | GitHub: github.com/aditya | LinkedIn: linkedin.com/in/aditya

EDUCATION:
National Institute of Technology — B.Tech in Computer Science & Engineering (2022 - 2026)
Cumulative GPA: 8.65 / 10.0

TECHNICAL SKILLS:
Languages: Java, Python, C++, JavaScript, TypeScript, SQL
Frameworks & Tools: React, Node.js, Express, Spring Boot, PostgreSQL, Docker, Git, Redis, AWS

PROJECTS:
• Distributed Task Queue Service: Engineered a fault-tolerant asynchronous task scheduler in Node.js and Redis, processing 5,000 requests per minute with 99.9% uptime.
• E-Commerce Microservices Platform: Architected authentication and checkout microservices in Java Spring Boot with PostgreSQL; deployed containerized services using Docker.
• Algorithmic Real-Time Visualizer: Developed interactive React visualization tool for graph traversal algorithms (Dijkstra, A*), improving user retention by 35%.

EXPERIENCE:
Software Engineering Intern | TechCorp Solutions (May 2025 - July 2025)
- Refactored high-traffic database queries and applied B+ tree indexes on PostgreSQL tables, decreasing API latency by 42%.
- Integrated automated CI/CD pipeline using GitHub Actions, reducing deployment test runtimes by 25 minutes.`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              ATS Resume Intelligence & Enhancer
            </h1>
            <Badge variant="brand" size="sm">
              <Sparkles className="w-3.5 h-3.5" />
              Google X-Y-Z Method
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Instant ATS parseability score, keyword gap detection, action verb analysis, and high-impact bullet point rewrites.
          </p>
        </div>

        <Button size="sm" variant="outline" onClick={loadSampleResume}>
          Load Sample Placement Resume
        </Button>
      </div>

      {/* Main Grid: Upload & Editor Pane (Left) vs Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Text Input & Upload (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>Resume Content</CardTitle>
              <label className="cursor-pointer text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload TXT/Doc</span>
                <input
                  type="file"
                  accept=".txt,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Job Role
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option>Software Development Engineer</option>
                <option>Full Stack Developer</option>
                <option>Data Analyst</option>
                <option>Cloud & DevOps Engineer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Resume Plain Text
              </label>
              <div className="relative overflow-hidden rounded-xl">
                <textarea
                  rows={12}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste your full resume text here to analyze..."
                  className="w-full p-3 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-brand-500/10 backdrop-blur-[1px] pointer-events-none flex flex-col items-center justify-center">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent shadow-lg shadow-brand-500/50 absolute animate-scan" />
                    <span className="text-xs font-bold text-brand-700 dark:text-brand-300 bg-white/90 dark:bg-navy-900/90 px-3 py-1 rounded-full shadow-md">
                      Auditing keywords, action verbs & metrics...
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Button
              className="w-full"
              size="sm"
              onClick={handleAnalyze}
              isLoading={isAnalyzing}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Audit Resume Against Placement ATS
            </Button>
          </Card>

          {/* Past History */}
          {history.length > 0 && (
            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white mb-1">
                <History className="w-3.5 h-3.5" />
                <span>Audit Version History</span>
              </div>
              <div className="space-y-1 max-h-36 overflow-y-auto divide-y divide-slate-100 dark:divide-navy-800">
                {history.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => setCurrentAnalysis(h)}
                    className="py-2 flex items-center justify-between text-xs cursor-pointer hover:text-brand-600"
                  >
                    <span className="truncate max-w-[160px] font-medium">{h.fileName}</span>
                    <Badge variant="brand" size="sm">{h.overallScore}/100</Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: ATS Report & Upgrades (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {!currentAnalysis ? (
            <Card className="p-12 text-center text-xs text-slate-500">
              Paste or upload your resume on the left and click "Audit Resume" to generate scores and bullet point recommendations.
            </Card>
          ) : (
            <>
              {/* Overall Score Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="flex flex-col items-center justify-center p-5 text-center">
                  <span className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                    ATS Readiness Score
                  </span>
                  <ProgressRing score={currentAnalysis.overallScore} size={130} strokeWidth={10} label="ATS Score" />
                </Card>

                <Card className="sm:col-span-2 p-5 space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Score Components
                  </h3>
                  <div className="space-y-2 font-mono text-[11px]">
                    {[
                      { label: 'Measurable Impact & Metrics', val: currentAnalysis.categoryScores?.impact || 85 },
                      { label: 'Keyword Density & Match', val: currentAnalysis.categoryScores?.keywords || 80 },
                      { label: 'Standard Section Completeness', val: currentAnalysis.categoryScores?.sections || 90 },
                      { label: 'ATS Format & Length Hygiene', val: currentAnalysis.categoryScores?.formatting || 92 },
                    ].map((item, i) => (
                      <div key={i} className="space-y-0.5">
                        <div className="flex justify-between font-sans text-xs">
                          <span>{item.label}</span>
                          <span className="font-bold text-slate-900 dark:text-white">{item.val}%</span>
                        </div>
                        <ProgressBar value={item.val} size="sm" color={item.val >= 80 ? 'emerald' : 'brand'} />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Matched vs Missing Keywords */}
              <Card className="p-5 space-y-4">
                <CardHeader>
                  <CardTitle>Skill & Keyword Placement Analysis</CardTitle>
                </CardHeader>

                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1.5">
                      ✓ Detected Role Keywords:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentAnalysis.matchedKeywords?.map((kw: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block mb-1.5">
                      ⚠ High-Demand Missing Keywords for {targetRole}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentAnalysis.missingKeywords?.map((kw: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                        >
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Bullet Point Rewriter (Google X-Y-Z) */}
              <Card className="p-5 space-y-4">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <CardTitle>Bullet Point Upgrades (Google X-Y-Z Method)</CardTitle>
                  </div>
                  <Badge variant="brand" size="sm">High Impact</Badge>
                </CardHeader>

                <div className="space-y-3">
                  {currentAnalysis.bulletFeedback?.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-2 text-xs"
                    >
                      <div className="text-slate-500 line-through">
                        <strong className="text-slate-700 dark:text-slate-300">Original:</strong> "{item.original}"
                      </div>
                      <div className="text-emerald-700 dark:text-emerald-400 font-medium">
                        <strong className="text-slate-900 dark:text-white">Enhanced:</strong> "{item.improved}"
                      </div>
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-navy-800">
                        <strong>Insight:</strong> {item.issue}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* General Placement Tips */}
              <Card className="p-5 space-y-3">
                <CardHeader>
                  <CardTitle>Actionable Recommendations for Shortlisting</CardTitle>
                </CardHeader>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {currentAnalysis.generalTips?.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
