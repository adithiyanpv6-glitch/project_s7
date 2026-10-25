import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Play,
  Send,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  Clock,
  Cpu,
  Code2,
  ChevronDown,
} from 'lucide-react';

export const CodingWorkspace: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { showToast } = useNotifications();
  const { refreshUser } = useAuth();

  const [problem, setProblem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'javascript' | 'python' | 'cpp' | 'java'>('javascript');
  const [code, setCode] = useState('');

  // Active Tab on left pane
  const [leftTab, setLeftTab] = useState<'DESCRIPTION' | 'HINTS' | 'EDITORIAL'>('DESCRIPTION');

  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evalResult, setEvalResult] = useState<any | null>(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const data = await api.get<any>(`/coding/problems/${slug}`);
        setProblem(data);
        const initialCode = (data.starterCode && data.starterCode[language]) || '';
        setCode(initialCode);
      } catch (err: any) {
        showToast(err.message || 'Problem not found', 'error');
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProblem();
  }, [slug]);

  // When language changes, load starter template
  const handleLanguageChange = (newLang: 'javascript' | 'python' | 'cpp' | 'java') => {
    setLanguage(newLang);
    if (problem?.starterCode?.[newLang]) {
      setCode(problem.starterCode[newLang]);
    }
  };

  const handleRun = async () => {
    if (!problem) return;
    setIsRunning(true);
    setEvalResult(null);
    try {
      const res = await api.post<any>('/coding/run', {
        problemId: problem.id,
        code,
        language,
      });
      setEvalResult(res);
      showToast(
        res.status === 'ACCEPTED' ? 'Sample test cases passed!' : `Run status: ${res.status}`,
        res.status === 'ACCEPTED' ? 'success' : 'warning'
      );
    } catch (err: any) {
      showToast(err.message || 'Run execution failed', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem) return;
    setIsSubmitting(true);
    setEvalResult(null);
    try {
      const res = await api.post<any>('/coding/submit', {
        problemId: problem.id,
        code,
        language,
      });
      setEvalResult(res.evaluation);
      if (res.evaluation.status === 'ACCEPTED') {
        showToast('Accepted! Problem solved successfully. Placement readiness updated.', 'success');
        await refreshUser();
      } else {
        showToast(`Evaluation: ${res.evaluation.status}`, 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Submission failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !problem) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-3 rounded-xl">
        <div className="flex items-center gap-3">
          <Link
            to="/coding"
            className="text-slate-500 hover:text-slate-800 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-slate-900 dark:text-white">{problem.title}</h1>
            <Badge
              variant={
                problem.difficulty === 'EASY'
                  ? 'success'
                  : problem.difficulty === 'MEDIUM'
                  ? 'warning'
                  : 'error'
              }
              size="sm"
            >
              {problem.difficulty}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleRun} isLoading={isRunning}>
            <Play className="w-3.5 h-3.5 mr-1 text-emerald-600 fill-emerald-600" />
            Run Code
          </Button>
          <Button size="sm" onClick={handleSubmit} isLoading={isSubmitting}>
            <Send className="w-3.5 h-3.5 mr-1" />
            Submit
          </Button>
        </div>
      </div>

      {/* Two Pane Split: Left Problem Details / Right Code Editor & Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-13rem)] min-h-[600px]">
        {/* Left Pane (Problem Description, Examples, Editorial) */}
        <div className="lg:col-span-5 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl overflow-hidden flex flex-col">
          {/* Sub Tabs */}
          <div className="flex border-b border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 px-3 text-xs">
            <button
              onClick={() => setLeftTab('DESCRIPTION')}
              className={`py-2.5 px-3 font-semibold border-b-2 transition-all ${
                leftTab === 'DESCRIPTION'
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setLeftTab('HINTS')}
              className={`py-2.5 px-3 font-semibold border-b-2 transition-all ${
                leftTab === 'HINTS'
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Hints ({problem.hints?.length || 0})
            </button>
            <button
              onClick={() => setLeftTab('EDITORIAL')}
              className={`py-2.5 px-3 font-semibold border-b-2 transition-all ${
                leftTab === 'EDITORIAL'
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Editorial Solution
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs leading-relaxed">
            {leftTab === 'DESCRIPTION' && (
              <>
                <div className="text-slate-800 dark:text-slate-200 whitespace-pre-line">
                  {problem.description}
                </div>

                {/* Examples */}
                <div className="space-y-3 pt-2">
                  <span className="font-bold text-slate-900 dark:text-white block">Examples:</span>
                  {problem.examples?.map((ex: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-1 font-mono text-[11px]"
                    >
                      <div>
                        <strong className="text-slate-600 dark:text-slate-400">Input:</strong>{' '}
                        <span className="text-slate-900 dark:text-slate-200">{ex.input}</span>
                      </div>
                      <div>
                        <strong className="text-slate-600 dark:text-slate-400">Output:</strong>{' '}
                        <span className="text-slate-900 dark:text-slate-200">{ex.output}</span>
                      </div>
                      {ex.explanation && (
                        <div className="font-sans text-slate-500 text-[10px] pt-1">
                          <strong>Explanation:</strong> {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                {problem.constraints && problem.constraints.length > 0 && (
                  <div className="pt-2">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">
                      Constraints:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                      {problem.constraints.map((c: string, idx: number) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {leftTab === 'HINTS' && (
              <div className="space-y-3">
                <span className="font-bold text-slate-900 dark:text-white block">Algorithmic Hints:</span>
                {problem.hints?.map((hint: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200"
                  >
                    <span className="font-bold mr-1">Hint {idx + 1}:</span>
                    {hint}
                  </div>
                ))}
              </div>
            )}

            {leftTab === 'EDITORIAL' && (
              <div className="space-y-3">
                <span className="font-bold text-slate-900 dark:text-white block">Official Solution Editorial:</span>
                <div className="prose prose-sm dark:prose-invert max-w-none text-xs whitespace-pre-line text-slate-700 dark:text-slate-300">
                  {problem.editorial}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane (Code Editor & Output Console) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Editor Header & Textarea */}
          <div className="flex-1 bg-navy-950 rounded-xl border border-navy-800 flex flex-col overflow-hidden shadow-sm">
            {/* Language Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-navy-800 bg-navy-900">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-brand-400" />
                <span className="text-xs font-bold text-white">Solution Editor</span>
              </div>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as any)}
                className="px-2.5 py-1 text-xs rounded bg-navy-800 border border-navy-700 text-white focus:outline-none"
              >
                <option value="javascript">JavaScript (Node.js)</option>
                <option value="python">Python 3</option>
                <option value="java">Java 17</option>
                <option value="cpp">C++ 20</option>
              </select>
            </div>

            {/* Code Input */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full p-4 bg-navy-950 text-slate-100 font-mono text-xs leading-relaxed resize-none focus:outline-none"
              placeholder="// Write your solution here..."
            />
          </div>

          {/* Test Case & Output Console */}
          <div className="h-52 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-navy-800 mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Execution Console
              </span>
              {evalResult && (
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3" />
                    {evalResult.runtimeMs} ms
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Cpu className="w-3 h-3" />
                    {Math.round(evalResult.memoryKb / 1024)} MB
                  </span>
                </div>
              )}
            </div>

            {!evalResult ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                Click "Run Code" to test against public samples, or "Submit" for full verification.
              </p>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={evalResult.status === 'ACCEPTED' ? 'success' : 'error'}
                    size="md"
                  >
                    {evalResult.status} ({evalResult.passedCount} / {evalResult.totalCount} Passed)
                  </Badge>
                </div>

                {/* Per Test Case Feedback */}
                <div className="space-y-1.5 font-mono text-[11px]">
                  {evalResult.testCaseResults?.map((tc: any, i: number) => (
                    <div
                      key={i}
                      className={`p-2 rounded border flex items-center justify-between ${
                        tc.passed
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {tc.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        )}
                        <span>
                          Test Case #{tc.testCaseIndex}
                          {tc.isHidden ? ' (Hidden)' : ''}:
                        </span>
                        {!tc.isHidden && (
                          <span className="text-slate-600 dark:text-slate-400">
                            Expected: {tc.expectedOutput} | Output: {tc.actualOutput}
                          </span>
                        )}
                      </div>
                      <span className="font-bold">{tc.passed ? 'PASSED' : 'FAILED'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
