import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  ArrowLeft,
  Book,
} from 'lucide-react';

interface Question {
  id: string;
  title: string;
  prompt: string;
  category: string;
  subCategory: string;
  difficulty: string;
  options: string[];
  correctOpt: number;
  explanation: string;
  lastAttempt?: {
    selectedOpt: number;
    isCorrect: boolean;
  };
}

interface VolumeConfig {
  id: string;
  roman: string;
  title: string;
  subtitle: string;
  totalChapters: number;
  totalLessons: number;
}

const VOLUMES: VolumeConfig[] = [
  {
    id: 'DSA',
    roman: 'Volume I',
    title: 'Data Structures & Algorithms',
    subtitle: 'Trees, Graphs, Dynamic Programming, and Sorting',
    totalChapters: 12,
    totalLessons: 18,
  },
  {
    id: 'CORE_CS',
    roman: 'Volume II',
    title: 'Core Computer Science',
    subtitle: 'Operating Systems, DBMS Architecture, and Networking',
    totalChapters: 3,
    totalLessons: 45,
  },
  {
    id: 'QUANTITATIVE',
    roman: 'Volume III',
    title: 'Quantitative Aptitude',
    subtitle: 'Arithmetic, Time & Work, Speed, Probability, and Algebra',
    totalChapters: 13,
    totalLessons: 18,
  },
  {
    id: 'LOGICAL',
    roman: 'Volume IV',
    title: 'Logical Reasoning',
    subtitle: 'Puzzles, Seating Arrangements, Syllogisms, and Deduction',
    totalChapters: 13,
    totalLessons: 17,
  },
  {
    id: 'VERBAL',
    roman: 'Volume V',
    title: 'Verbal Ability',
    subtitle: 'Reading Comprehension, Sentence Correction, and Vocabulary',
    totalChapters: 13,
    totalLessons: 16,
  },
  {
    id: 'COMPANY_SPECIFIC',
    roman: 'Volume VI',
    title: 'Recruiter Blueprints',
    subtitle: 'TCS, Infosys, Amazon, Zoho, and Wipro Specific Patterns',
    totalChapters: 10,
    totalLessons: 25,
  },
];

export const Practice: React.FC = () => {
  const { showToast } = useNotifications();

  // Navigation levels:
  // selectedVolume === null -> Library Shelf
  // selectedVolume && !activeQuestion -> Book Table of Contents
  // selectedVolume && activeQuestion -> Lesson Reading Desk
  const [selectedVolume, setSelectedVolume] = useState<VolumeConfig | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);

  // Data
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Lesson Practice State
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [submissionResult, setSubmissionResult] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Questions for Selected Volume
  useEffect(() => {
    if (!selectedVolume) {
      setQuestions([]);
      setActiveQuestion(null);
      return;
    }

    const fetchVolumeQuestions = async () => {
      setLoading(true);
      try {
        const res = await api.get<any>(`/practice/questions?category=${selectedVolume.id}&limit=100`);
        const fetched: Question[] = res.questions || [];
        setQuestions(fetched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVolumeQuestions();
  }, [selectedVolume]);

  // Group questions by Chapter (subCategory)
  const chapters: { [key: string]: Question[] } = {};
  questions.forEach((q) => {
    const chapterName = q.subCategory || 'General Chapter';
    if (!chapters[chapterName]) {
      chapters[chapterName] = [];
    }
    chapters[chapterName].push(q);
  });

  const chapterNames = Object.keys(chapters);

  const handleOpenLesson = (q: Question) => {
    setActiveQuestion(q);
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
    if (selectedOpt === null || !activeQuestion) return;
    setIsSubmitting(true);
    try {
      const res = await api.post<any>('/practice/submit', {
        questionId: activeQuestion.id,
        selectedOpt,
        timeTakenSec: 30,
      });

      setSubmissionResult(res);
      showToast(res.isCorrect ? 'Correct.' : 'Incorrect.', res.isCorrect ? 'success' : 'warning');

      // Update local question state
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === activeQuestion.id
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

  // Find index of active question in list for next/previous navigation
  const currentIndex = activeQuestion ? questions.findIndex((q) => q.id === activeQuestion.id) : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < questions.length - 1;

  const handlePreviousLesson = () => {
    if (hasPrevious) handleOpenLesson(questions[currentIndex - 1]);
  };

  const handleNextLesson = () => {
    if (hasNext) handleOpenLesson(questions[currentIndex + 1]);
  };

  return (
    <div
      className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8 select-none bg-[#090a0f] text-zinc-100 min-h-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* ============================================================== */}
      {/* LEVEL 1: THE LIBRARY SHELF (All Volumes)                       */}
      {/* ============================================================== */}
      {!selectedVolume && (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Library
            </h1>
            <p className="text-xs text-zinc-400 font-light mt-1">
              Curated preparation volumes and problem lessons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VOLUMES.map((vol) => (
              <div
                key={vol.id}
                onClick={() => setSelectedVolume(vol)}
                className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 hover:border-zinc-600 transition-all cursor-pointer group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400">
                    {vol.roman}
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-base font-medium text-white tracking-tight">
                    {vol.title}
                  </h2>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {vol.subtitle}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-400 font-light border-t border-zinc-800/60">
                  <span>{vol.totalChapters} Chapters</span>
                  <span>{vol.totalLessons} Lessons</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* LEVEL 2: TABLE OF CONTENTS (Inside Selected Volume)            */}
      {/* ============================================================== */}
      {selectedVolume && !activeQuestion && (
        <div className="space-y-6">
          {/* Back to Library Navigation */}
          <button
            type="button"
            onClick={() => setSelectedVolume(null)}
            className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Library</span>
          </button>

          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-zinc-400">
              {selectedVolume.roman}
            </span>
            <h1 className="text-2xl font-semibold tracking-tight text-white mt-0.5">
              {selectedVolume.title}
            </h1>
            <p className="text-xs text-zinc-400 font-light mt-1">
              Table of Contents • {chapterNames.length} Chapters • {questions.length} Lessons
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="space-y-4">
              {chapterNames.map((chapterName, cIdx) => {
                const chapterQuestions = chapters[chapterName];
                const completedCount = chapterQuestions.filter((q) => q.lastAttempt?.isCorrect).length;

                return (
                  <div
                    key={chapterName}
                    className="p-5 rounded-2xl bg-[#111217] border border-zinc-800/80 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-zinc-850 text-zinc-400 text-xs font-mono flex items-center justify-center">
                          {cIdx + 1}
                        </span>
                        <h3 className="text-sm font-medium text-white">
                          {chapterName}
                        </h3>
                      </div>
                      <span className="text-xs text-zinc-400 font-light">
                        {completedCount} / {chapterQuestions.length} completed
                      </span>
                    </div>

                    {/* Lessons inside chapter */}
                    <div className="divide-y divide-zinc-800/40">
                      {chapterQuestions.map((q, lIdx) => {
                        const isDone = q.lastAttempt?.isCorrect;
                        const statement = q.prompt || q.title;

                        return (
                          <div
                            key={q.id}
                            onClick={() => handleOpenLesson(q)}
                            className="py-3 px-2 flex items-center justify-between text-xs hover:bg-zinc-900/60 rounded-xl transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-4">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 shrink-0" />
                              )}
                              <span className="text-zinc-300 group-hover:text-white truncate">
                                Lesson {lIdx + 1}: {statement}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[11px] text-zinc-400 font-light">
                                {q.difficulty}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* LEVEL 3: LESSON READING & PRACTICE DESK                         */}
      {/* ============================================================== */}
      {selectedVolume && activeQuestion && (
        <div className="space-y-6">
          {/* Back to Book Index & Position Navigation */}
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <button
              type="button"
              onClick={() => setActiveQuestion(null)}
              className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Table of Contents</span>
            </button>

            <span className="text-xs font-mono text-zinc-400">
              Lesson {currentIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Reader Document View */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-8">
            {/* Chapter Header */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
                {selectedVolume.roman} • {activeQuestion.subCategory || 'Lesson'}
              </span>
              <h2 className="text-lg sm:text-xl font-medium text-white leading-relaxed">
                {activeQuestion.prompt || activeQuestion.title}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {(Array.isArray(activeQuestion.options) ? activeQuestion.options : []).map(
                (optText: string, idx: number) => {
                  const isSelected = selectedOpt === idx;
                  const isSubmitted = !!submissionResult;
                  const isCorrectOpt = submissionResult?.correctOpt === idx;

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => !isSubmitted && setSelectedOpt(idx)}
                      className={`w-full p-4 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSubmitted && isCorrectOpt
                          ? 'bg-emerald-950/30 border-emerald-500/80 text-emerald-200'
                          : isSubmitted && isSelected && !isCorrectOpt
                          ? 'bg-rose-950/30 border-rose-500/80 text-rose-200'
                          : isSelected
                          ? 'bg-white text-black font-medium border-white'
                          : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-md bg-zinc-800 text-[10px] font-mono flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{optText}</span>
                      </div>
                    </button>
                  );
                }
              )}
            </div>

            {/* Verification Result & Explanation */}
            {submissionResult && (
              <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">Solution Derivation</span>
                  <span
                    className={`font-semibold ${
                      submissionResult.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {submissionResult.isCorrect ? 'Verified Correct' : 'Incorrect Attempt'}
                  </span>
                </div>
                <p className="text-zinc-400 font-light leading-relaxed pt-1">
                  {submissionResult.explanation || 'No additional derivation notes recorded for this lesson.'}
                </p>
              </div>
            )}

            {/* Actions Bar */}
            <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
              <button
                type="button"
                disabled={!hasPrevious}
                onClick={handlePreviousLesson}
                className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Lesson</span>
              </button>

              {!submissionResult ? (
                <button
                  type="button"
                  disabled={selectedOpt === null || isSubmitting}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2 rounded-xl bg-white hover:bg-zinc-200 disabled:opacity-40 text-black text-xs font-medium tracking-wide transition-all shadow-sm cursor-pointer"
                >
                  {isSubmitting ? 'Evaluating...' : 'Submit'}
                </button>
              ) : (
                hasNext && (
                  <button
                    type="button"
                    onClick={handleNextLesson}
                    className="px-6 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-medium tracking-wide transition-all shadow-sm cursor-pointer"
                  >
                    Next Lesson
                  </button>
                )
              )}

              <button
                type="button"
                disabled={!hasNext}
                onClick={handleNextLesson}
                className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <span>Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;
