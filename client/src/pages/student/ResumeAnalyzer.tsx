import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { ProgressRing } from '../../components/common/ProgressBar';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  History,
  Loader2,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface CategoryScores {
  impact: number;
  formatting: number;
  keywords: number;
  sections: number;
}

interface BulletFeedback {
  original: string;
  improved: string;
  issue: string;
}

interface ResumeAnalysisData {
  id?: string;
  fileName?: string;
  targetRole?: string;
  overallScore: number;
  categoryScores?: CategoryScores;
  matchedKeywords?: string[];
  missingKeywords?: string[];
  bulletFeedback?: BulletFeedback[];
  generalTips?: string[];
  createdAt?: string;
}

export const ResumeAnalyzer: React.FC = () => {
  const { showToast } = useNotifications();
  const { refreshUser } = useAuth();

  const [rawText, setRawText] = useState('');
  const [fileName, setFileName] = useState('My_Resume.txt');
  const [targetRole, setTargetRole] = useState('Software Development Engineer');
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ResumeAnalysisData | null>(null);
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    if (file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf') {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('placementprep_token');
        const response = await fetch('/api/resume/upload-pdf', {
          method: 'POST',
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: formData,
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to parse PDF document.');
        }

        setRawText(data.text);
        showToast(`Parsed PDF "${file.name}" successfully! Review text or click Analyze.`, 'success');
      } catch (err: any) {
        showToast(err.message || 'Failed to extract text from PDF.', 'error');
      } finally {
        setIsUploading(false);
      }
    } else {
      // Text or Markdown file
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setRawText(content || '');
        showToast(`Loaded ${file.name}.`, 'info');
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = async () => {
    if (!rawText || rawText.trim().length < 50) {
      showToast('Please paste or upload resume content with at least 50 characters.', 'warning');
      return;
    }

    setIsAnalyzing(true);
    try {
      const res = await api.post<ResumeAnalysisData>('/resume/analyze', {
        rawText,
        fileName,
        targetRole,
      });

      setCurrentAnalysis(res);
      showToast('Resume audited successfully!', 'success');
      await fetchHistory();
      await refreshUser();
    } catch (err: any) {
      showToast(err.message || 'Analysis failed', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper to ensure array format
  const getArray = (val: any): string[] => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  };

  const matchedKws = getArray(currentAnalysis?.matchedKeywords);
  const missingKws = getArray(currentAnalysis?.missingKeywords);
  const tips = getArray(currentAnalysis?.generalTips);
  const bulletFeedbacks = currentAnalysis?.bulletFeedback
    ? Array.isArray(currentAnalysis.bulletFeedback)
      ? currentAnalysis.bulletFeedback
      : typeof currentAnalysis.bulletFeedback === 'string'
      ? JSON.parse(currentAnalysis.bulletFeedback)
      : []
    : [];

  const categoryScores = currentAnalysis?.categoryScores
    ? typeof currentAnalysis.categoryScores === 'string'
      ? JSON.parse(currentAnalysis.categoryScores)
      : currentAnalysis.categoryScores
    : null;

  return (
    <div
      className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 select-none bg-[#090a0f] text-zinc-100 min-h-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Resume AI
          </h1>
          <p className="text-xs text-zinc-400 font-light mt-0.5">
            ATS algorithm audit, keyword gap analysis, and role alignment scoring.
          </p>
        </div>
      </div>

      {/* 2. Main Two-Column Analysis Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input, Upload & History (5 Columns) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-4">
            <h2 className="text-sm font-medium text-white">
              Target Role & Document Upload
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Target Placement Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Software Development Engineer"
                className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white outline-none focus:border-zinc-600"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-zinc-400 font-medium">Resume Text</label>
                <label className="text-[11px] text-zinc-300 hover:text-white cursor-pointer flex items-center gap-1.5 bg-zinc-850 hover:bg-zinc-800 border border-zinc-700/60 px-2.5 py-1 rounded-lg transition-colors font-medium">
                  {isUploading ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />
                      <span>Parsing PDF...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3 h-3" />
                      <span>Upload PDF / TXT</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".pdf,.txt,.md"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>

              <textarea
                rows={11}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Upload your resume PDF above or paste resume text here (projects, technical skills, education, work experience)..."
                className="w-full p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 font-mono leading-relaxed outline-none focus:border-zinc-600 resize-none"
              />
            </div>

            <button
              type="button"
              disabled={isAnalyzing || isUploading || !rawText}
              onClick={handleAnalyze}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 disabled:opacity-40 text-black text-xs font-medium tracking-wide transition-all shadow-sm cursor-pointer"
            >
              {isAnalyzing ? 'Analyzing ATS Alignment...' : 'Analyze Resume'}
            </button>
          </div>

          {/* Past History */}
          {history.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-3">
              <h3 className="text-xs font-medium text-zinc-400">Past Resume Audits</h3>
              <div className="divide-y divide-zinc-800/60">
                {history.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => setCurrentAnalysis(h)}
                    className="py-2.5 flex items-center justify-between cursor-pointer hover:text-white text-xs transition-colors"
                  >
                    <span className="text-zinc-300 font-light truncate max-w-[200px]">
                      {h.targetRole || h.fileName || 'Resume'}
                    </span>
                    <span className="font-semibold text-emerald-400">
                      {h.overallScore} / 100
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Comprehensive ATS Evaluation Report (7 Columns) */}
        <div className="lg:col-span-7">
          {currentAnalysis ? (
            <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-6">
              {/* Score Header */}
              <div className="flex items-center justify-between pb-5 border-b border-zinc-800/80">
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400 font-medium block">
                    ATS Placement Readiness Score
                  </span>
                  <h3 className="text-xl font-semibold text-white tracking-tight">
                    {currentAnalysis.targetRole || targetRole}
                  </h3>
                  <span className="text-[11px] text-zinc-500 font-light block">
                    Target Role: {targetRole}
                  </span>
                </div>

                <div className="text-right">
                  <ProgressRing
                    value={currentAnalysis.overallScore || 0}
                    size={85}
                    strokeWidth={7}
                    label="Score"
                  />
                </div>
              </div>

              {/* 4 Category Pillar Diagnostic Bars */}
              {categoryScores && (
                <div className="space-y-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-xs font-medium text-white block">
                    Category Diagnostic Breakdown
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-zinc-400">
                        <span>Impact & Metrics</span>
                        <span className="font-mono text-white">{categoryScores.impact}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${categoryScores.impact}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-zinc-400">
                        <span>Keyword Density</span>
                        <span className="font-mono text-white">{categoryScores.keywords}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-400 rounded-full" style={{ width: `${categoryScores.keywords}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-zinc-400">
                        <span>Standard Sections</span>
                        <span className="font-mono text-white">{categoryScores.sections}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: `${categoryScores.sections}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-zinc-400">
                        <span>Formatting & Length</span>
                        <span className="font-mono text-white">{categoryScores.formatting}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-400 rounded-full" style={{ width: `${categoryScores.formatting}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Matched Keywords */}
              {matchedKws.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Matched Industry Keywords ({matchedKws.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {matchedKws.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-light"
                      >
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Recommended Keywords */}
              {missingKws.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-medium text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Missing High-Demand Skills for {targetRole} ({missingKws.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {missingKws.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs font-light"
                      >
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bullet Point AI Improvements */}
              {bulletFeedbacks.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-zinc-800/80">
                  <span className="text-xs font-medium text-white block">
                    AI Bullet Point Rewrites (Google X-Y-Z Impact Formula)
                  </span>
                  <div className="space-y-3">
                    {bulletFeedbacks.map((bf: BulletFeedback, idx: number) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-xs">
                        <div className="space-y-1">
                          <span className="text-[10px] text-zinc-500 font-mono uppercase">Original Bullet:</span>
                          <p className="text-zinc-400 line-through font-light leading-relaxed">{bf.original}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-emerald-400 font-mono uppercase">AI Enhanced (High Impact):</span>
                          <p className="text-white font-medium leading-relaxed">{bf.improved}</p>
                        </div>
                        <p className="text-[11px] text-zinc-500 italic pt-1">{bf.issue}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* General Tips & Recommendations */}
              {tips.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <span className="text-xs font-medium text-zinc-300 block">
                    Actionable Placement Optimization Tips
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-400 font-light leading-relaxed list-disc list-inside">
                    {tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="p-16 rounded-2xl bg-[#111217] border border-dashed border-zinc-800/80 text-center text-xs text-zinc-500">
              Upload your PDF resume on the left to view comprehensive ATS analysis and keyword suggestions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
