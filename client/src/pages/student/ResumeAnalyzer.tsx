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
      showToast(`Loaded ${file.name}.`, 'info');
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    if (!rawText || rawText.trim().length < 50) {
      showToast('Please paste resume text with at least 50 characters.', 'warning');
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
      showToast('Resume audited successfully!', 'success');
      await fetchHistory();
      await refreshUser();
    } catch (err: any) {
      showToast(err.message || 'Analysis failed', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div
      className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 select-none bg-[#090a0f] text-zinc-100 min-h-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
          Resume AI
        </h1>
      </div>

      {/* 2. Main Two-Column Analysis Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload / Paste Content (6 Columns) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-4">
            <h2 className="text-sm font-medium text-white">
              Target Role & Input
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
                <label className="text-[11px] text-zinc-400 hover:text-white cursor-pointer flex items-center gap-1 font-light">
                  <Upload className="w-3 h-3" /> Upload File (.txt)
                  <input
                    type="file"
                    accept=".txt,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <textarea
                rows={9}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste your full resume text here (projects, skills, education, experience)..."
                className="w-full p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 font-mono leading-relaxed outline-none focus:border-zinc-600 resize-none"
              />
            </div>

            <button
              type="button"
              disabled={isAnalyzing || !rawText}
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

        {/* Right Column: ATS Evaluation Results (6 Columns) */}
        <div className="lg:col-span-6">
          {currentAnalysis ? (
            <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-6">
              {/* Score Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
                <div>
                  <span className="text-xs text-zinc-400 font-medium block">
                    ATS Readiness Rating
                  </span>
                  <h3 className="text-xl font-semibold text-white tracking-tight mt-1">
                    {currentAnalysis.targetRole || targetRole}
                  </h3>
                </div>

                <ProgressRing
                  value={currentAnalysis.overallScore || 80}
                  size={85}
                  strokeWidth={7}
                  label="Score"
                />
              </div>

              {/* Strengths */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Key Strengths
                </span>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 font-light leading-relaxed">
                  {currentAnalysis.strengths
                    ? typeof currentAnalysis.strengths === 'string'
                      ? JSON.parse(currentAnalysis.strengths).join(' • ')
                      : currentAnalysis.strengths.join(' • ')
                    : 'Clear project impact metrics, strong technical proficiencies in core languages.'}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Recommended Keywords
                </span>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 font-light leading-relaxed">
                  {currentAnalysis.missingKeywords
                    ? typeof currentAnalysis.missingKeywords === 'string'
                      ? JSON.parse(currentAnalysis.missingKeywords).join(', ')
                      : currentAnalysis.missingKeywords.join(', ')
                    : 'CI/CD Pipelines, System Architecture, Unit Testing, AWS Cloud Deployment'}
                </div>
              </div>

              {/* Improvement Suggestions */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-zinc-300 block">
                  Actionable Feedback
                </span>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {currentAnalysis.suggestions ||
                    'Quantify achievements with measurable percentages and specify your exact role in collaborative project deliveries.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-[#111217] border border-dashed border-zinc-800/80 text-center text-xs text-zinc-500">
              Paste or upload your resume on the left to view comprehensive ATS analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
