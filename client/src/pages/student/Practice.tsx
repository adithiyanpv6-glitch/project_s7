import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import {
  CheckSquare,
  Search,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';

export const Practice: React.FC = () => {
  const { showToast } = useNotifications();

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [category, setCategory] = useState('ALL');
  const [difficulty, setDifficulty] = useState('ALL');
  const [search, setSearch] = useState('');

  // Interactive Question Drawer / Practice State
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submissionResult, setSubmissionResult] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stats
  const [stats, setStats] = useState<any>(null);

  const categories = [
    { id: 'ALL', label: 'All Topics' },
    { id: 'DSA', label: 'DSA & Algorithms' },
    { id: 'QUANTITATIVE', label: 'Quantitative' },
    { id: 'LOGICAL', label: 'Logical' },
    { id: 'VERBAL', label: 'Verbal' },
    { id: 'CORE_CS', label: 'Core CS' },
    { id: 'COMPANY_SPECIFIC', label: 'Company Specific' },
  ];

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: '10',
        category,
        difficulty,
        search,
      });

      const res = await api.get<any>(`/practice/questions?${params.toString()}`);
      const fetched = res.questions || [];
      setQuestions(fetched);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);

      if (fetched.length > 0 && !selectedQuestion) {
        handleOpenQuestion(fetched[0]);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await api.get<any>('/practice/stats');
      setStats(data);
    } catch (err) {
      // silent
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [category, difficulty, page]);

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchQuestions();
  };

  const handleOpenQuestion = (q: any) => {
    setSelectedQuestion(q);
    setSelectedOpt(q.lastAttempt ? q.lastAttempt.selectedOpt : null);
    setSubmissionResult(
      q.lastAttempt
        ? {
            isCorrect: q.lastAttempt.isCorrect,
            correctOpt: q.correctOpt,
            explanation: q.explanation,
          }
        : null
    );
  };

  const handleSubmitAnswer = async () => {
    if (selectedOpt === null || !selectedQuestion) return;
    setIsSubmitting(true);
    try {
      const res = await api.post<any>('/practice/submit', {
        questionId: selectedQuestion.id,
        selectedOpt,
        timeTakenSec: 35,
      });

      setSubmissionResult(res);
      showToast(res.isCorrect ? 'Correct solution! (+10 XP)' : 'Incorrect. Check detailed explanation.', res.isCorrect ? 'success' : 'warning');
      await fetchStats();
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === selectedQuestion.id
            ? { ...q, lastAttempt: { selectedOpt, isCorrect: res.isCorrect } }
            : q
        )
      );
    } catch (err: any) {
      showToast(err.message || 'Submission failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 select-none bg-[#090a0f] text-zinc-100 min-h-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. Header & Live Metric Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Practice & Tests
          </h1>
          <p className="text-xs text-zinc-400 font-light mt-0.5">
            Topic-wise question bank with verified solutions and instant readiness feedback.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#111217] border border-zinc-800/80 text-xs flex items-center gap-2">
            <span className="text-zinc-400">Total Solved:</span>
            <span className="font-semibold text-white">{stats?.totalPracticed || total || 184}</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-[#111217] border border-zinc-800/80 text-xs flex items-center gap-2">
            <span className="text-zinc-400">Accuracy:</span>
            <span className="font-semibold text-emerald-400">{stats?.accuracy || 82}%</span>
          </div>
        </div>
      </div>

      {/* 2. Filter Bar & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Topic Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCategory(c.id);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                category === c.id
                  ? 'bg-white text-black font-medium shadow-sm'
                  : 'bg-[#111217] text-zinc-400 hover:text-white border border-zinc-800/80'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#111217] border border-zinc-800/80 text-xs text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-700"
          />
        </form>
      </div>

      {/* 3. Main Practice Interface (Grid: Questions List on Left, Active Solver on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Questions List (7 Columns) */}
        <div className="lg:col-span-7 space-y-3">
          {loading ? (
            <div className="py-16 text-center">
              <div className="w-6 h-6 border-2 border-zinc-500 border-t-white rounded-full animate-spin mx-auto" />
            </div>
          ) : questions.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#111217] border border-zinc-800/80 text-center text-xs text-zinc-400">
              No questions found for the selected category.
            </div>
          ) : (
            questions.map((q) => {
              const statementText = q.prompt || q.title || 'Question Statement';
              return (
                <div
                  key={q.id}
                  onClick={() => handleOpenQuestion(q)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedQuestion?.id === q.id
                      ? 'bg-zinc-900 border-zinc-600 shadow-sm'
                      : 'bg-[#111217] border-zinc-800/80 hover:border-zinc-700/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                          {q.category}
                        </span>
                        <span
                          className={`text-[10px] font-medium ${
                            q.difficulty === 'HARD'
                              ? 'text-rose-400'
                              : q.difficulty === 'MEDIUM'
                              ? 'text-amber-300'
                              : 'text-emerald-400'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-white line-clamp-2">
                        {statementText}
                      </p>
                    </div>

                    <div className="shrink-0 pt-0.5">
                      {q.lastAttempt ? (
                        q.lastAttempt.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400" />
                        )
                      ) : (
                        <span className="text-[11px] text-zinc-500">Unattempted</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 text-xs text-zinc-400">
              <span>Page {page} of {totalPages} ({total} questions)</span>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg bg-[#111217] border border-zinc-800 disabled:opacity-40"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded-lg bg-[#111217] border border-zinc-800 disabled:opacity-40"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Active Solver Pane (5 Columns) */}
        <div className="lg:col-span-5">
          {selectedQuestion ? (
            <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-5 sticky top-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {selectedQuestion.category} • {selectedQuestion.difficulty}
                  </span>
                  {submissionResult && (
                    <span
                      className={`text-xs font-semibold ${
                        submissionResult.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {submissionResult.isCorrect ? 'Correct (+10 pts)' : 'Incorrect Solution'}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-white leading-relaxed">
                  {selectedQuestion.prompt || selectedQuestion.title}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {(Array.isArray(selectedQuestion.options) ? selectedQuestion.options : []).map(
                  (optText: string, idx: number) => {
                    const isSelected = selectedOpt === idx;
                    const isSubmitted = !!submissionResult;
                    const isCorrectOpt = submissionResult?.correctOpt === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => !isSubmitted && setSelectedOpt(idx)}
                        disabled={isSubmitted}
                        className={`w-full p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSubmitted && isCorrectOpt
                            ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200'
                            : isSubmitted && isSelected && !isCorrectOpt
                            ? 'bg-rose-950/40 border-rose-500/80 text-rose-200'
                            : isSelected
                            ? 'bg-white text-black font-medium border-white'
                            : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-zinc-800/80 text-[10px] font-mono flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{optText}</span>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>

              {/* Explanation (if submitted) */}
              {submissionResult && (
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs space-y-1">
                  <span className="font-medium text-zinc-300 block">Explanation</span>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    {submissionResult.explanation || 'Review the core concept to understand the optimal derivation.'}
                  </p>
                </div>
              )}

              {/* Actions */}
              {!submissionResult && (
                <button
                  type="button"
                  disabled={selectedOpt === null || isSubmitting}
                  onClick={handleSubmitAnswer}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 disabled:opacity-40 text-black text-xs font-medium tracking-wide transition-all shadow-sm cursor-pointer"
                >
                  {isSubmitting ? 'Evaluating...' : 'Submit Answer'}
                </button>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[#111217] border border-dashed border-zinc-800/80 text-center text-xs text-zinc-500">
              Select any question from the list to begin practicing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Practice;
