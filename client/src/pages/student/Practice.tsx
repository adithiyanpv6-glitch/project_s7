import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  CheckSquare,
  Search,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Flame,
  Filter,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen,
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
  const [company, setCompany] = useState('ALL');
  const [search, setSearch] = useState('');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [incorrectOnly, setIncorrectOnly] = useState(false);

  // Interactive Question Drawer / Practice State
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submissionResult, setSubmissionResult] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stats
  const [stats, setStats] = useState<any>(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: '15',
        category,
        difficulty,
        company,
        search,
        bookmarkedOnly: String(bookmarkedOnly),
        incorrectOnly: String(incorrectOnly),
      });

      const res = await api.get<any>(`/practice/questions?${params.toString()}`);
      setQuestions(res.questions || []);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);
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
  }, [category, difficulty, company, bookmarkedOnly, incorrectOnly, page]);

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
        timeTakenSec: 40,
      });

      setSubmissionResult(res);
      showToast(res.isCorrect ? 'Correct! Keep up the momentum.' : 'Incorrect. Review explanation.', res.isCorrect ? 'success' : 'warning');
      await fetchStats();
      // Update in local list
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

  const handleToggleBookmark = async (qId: string) => {
    try {
      const res = await api.post<any>(`/practice/bookmark/${qId}`);
      showToast(res.message, 'success');
      setQuestions((prev) =>
        prev.map((q) => (q.id === qId ? { ...q, isBookmarked: res.bookmarked } : q))
      );
      if (selectedQuestion?.id === qId) {
        setSelectedQuestion({ ...selectedQuestion, isBookmarked: res.bookmarked });
      }
      fetchStats();
    } catch (err: any) {
      showToast(err.message || 'Bookmark toggle failed', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Stats */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
                Comprehensive Practice Engine
              </h1>
              <Badge variant="brand" size="sm">
                184+ Vetted Questions
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Quantitative, Logical Reasoning, Verbal, Programming, OS, DBMS, Computer Networks, and HR
            </p>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-xs">
              <span className="text-slate-400 block text-[10px]">Attempted</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {stats?.totalAttempted || 24} Qs
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-xs">
              <span className="text-slate-400 block text-[10px]">Accuracy</span>
              <span className="font-bold text-emerald-600">
                {stats?.overallAccuracy || 82}%
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-xs">
              <span className="text-slate-400 block text-[10px]">Bookmarked</span>
              <span className="font-bold text-brand-600">
                {stats?.bookmarksCount || 3}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-4 rounded-xl space-y-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'ALL', label: 'All Categories' },
            { id: 'QUANTITATIVE', label: 'Quantitative' },
            { id: 'LOGICAL', label: 'Logical' },
            { id: 'VERBAL', label: 'Verbal' },
            { id: 'PROGRAMMING', label: 'Programming' },
            { id: 'DSA', label: 'DSA' },
            { id: 'CORE_CS', label: 'Core CS (OS/DBMS/CN)' },
            { id: 'TECHNICAL_INTERVIEW', label: 'System & Tech' },
            { id: 'HR_INTERVIEW', label: 'HR / Behavioral' },
            { id: 'COMPANY_SPECIFIC', label: 'Company Specific' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                category === cat.id
                  ? 'bg-navy-900 text-white dark:bg-brand-600'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sub-filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, formula, or concept..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </form>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value);
                setPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300"
            >
              <option value="ALL">All Difficulties</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>

            <select
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300"
            >
              <option value="ALL">All Companies</option>
              <option value="TCS">TCS</option>
              <option value="Amazon">Amazon</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Infosys">Infosys</option>
              <option value="Accenture">Accenture</option>
              <option value="Zoho">Zoho</option>
              <option value="Freshworks">Freshworks</option>
              <option value="Cognizant">Cognizant</option>
              <option value="Wipro">Wipro</option>
              <option value="Deloitte">Deloitte</option>
            </select>

            <button
              onClick={() => {
                setBookmarkedOnly(!bookmarkedOnly);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium border flex items-center gap-1.5 transition-colors ${
                bookmarkedOnly
                  ? 'bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                  : 'border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Bookmarked
            </button>

            <button
              onClick={() => {
                setIncorrectOnly(!incorrectOnly);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium border flex items-center gap-1.5 transition-colors ${
                incorrectOnly
                  ? 'bg-rose-50 border-rose-400 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  : 'border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              Incorrect Review
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Questions Table + Question Viewer Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Questions List (7 cols if drawer open, 12 if closed) */}
        <div className={selectedQuestion ? 'lg:col-span-6 space-y-3' : 'lg:col-span-12 space-y-3'}>
          {loading ? (
            <div className="py-12 text-center">
              <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : questions.length === 0 ? (
            <Card className="p-8 text-center text-xs text-slate-500">
              No questions found matching your filter criteria. Try clearing search or category filters.
            </Card>
          ) : (
            questions.map((q) => (
              <Card
                key={q.id}
                onClick={() => handleOpenQuestion(q)}
                className={`p-4 cursor-pointer transition-all hover:border-brand-500 ${
                  selectedQuestion?.id === q.id
                    ? 'ring-2 ring-brand-500 bg-brand-50/20 dark:bg-brand-950/20'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {q.title}
                      </span>
                      <Badge variant="neutral" size="sm">
                        {q.subCategory}
                      </Badge>
                      <Badge
                        variant={
                          q.difficulty === 'EASY'
                            ? 'success'
                            : q.difficulty === 'MEDIUM'
                            ? 'warning'
                            : 'error'
                        }
                        size="sm"
                      >
                        {q.difficulty}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {q.prompt}
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                      <span>Tags: {q.companyTags.join(', ') || 'General'}</span>
                      {q.lastAttempt && (
                        <span
                          className={`font-semibold ${
                            q.lastAttempt.isCorrect ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          • {q.lastAttempt.isCorrect ? 'Solved' : 'Attempted (Incorrect)'}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleBookmark(q.id);
                    }}
                    className="text-slate-400 hover:text-brand-600 p-1"
                  >
                    {q.isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-brand-600 fill-brand-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </Card>
            ))
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-slate-500">
                Page {page} of {totalPages} ({total} Total Questions)
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Practice / Solution Drawer */}
        {selectedQuestion && (
          <div className="lg:col-span-6 sticky top-20">
            <Card className="p-6 space-y-5 border-brand-200 dark:border-brand-900 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-800">
                <div className="flex items-center gap-2">
                  <Badge variant="brand">{selectedQuestion.category}</Badge>
                  <Badge variant="neutral">{selectedQuestion.subCategory}</Badge>
                </div>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                  {selectedQuestion.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {selectedQuestion.prompt}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {selectedQuestion.options.map((opt: string, idx: number) => {
                  const isChosen = selectedOpt === idx;
                  const isCorrect = submissionResult && submissionResult.correctOpt === idx;
                  const isWrongChosen = submissionResult && !submissionResult.isCorrect && isChosen;

                  let optClass = 'border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800';

                  if (isCorrect) {
                    optClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200 ring-2 ring-emerald-500';
                  } else if (isWrongChosen) {
                    optClass = 'bg-rose-50 border-rose-500 text-rose-900 dark:bg-rose-950/60 dark:text-rose-200 ring-2 ring-rose-500';
                  } else if (isChosen) {
                    optClass = 'bg-brand-50 border-brand-500 text-brand-900 dark:bg-brand-950/60 dark:text-brand-200 ring-2 ring-brand-500';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !submissionResult && setSelectedOpt(idx)}
                      disabled={!!submissionResult}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all ${optClass}`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              {!submissionResult ? (
                <div className="pt-2">
                  <Button
                    size="sm"
                    className="w-full"
                    disabled={selectedOpt === null}
                    isLoading={isSubmitting}
                    onClick={handleSubmitAnswer}
                  >
                    Check Answer & View Explanation
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-navy-800">
                  <div
                    className={`p-3 rounded-xl border text-xs flex items-center gap-2 font-semibold ${
                      submissionResult.isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                    }`}
                  >
                    {submissionResult.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Correct! Well reasoned.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Incorrect. The correct option is ({String.fromCharCode(65 + (submissionResult.correctOpt ?? selectedQuestion.correctOpt))}).</span>
                      </>
                    )}
                  </div>

                  {/* Detailed Explanation */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-1">
                    <span className="text-[11px] font-bold text-slate-900 dark:text-white block">
                      Detailed Solution & Method:
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {submissionResult.explanation || selectedQuestion.explanation}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => {
                      setSubmissionResult(null);
                      setSelectedOpt(null);
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
