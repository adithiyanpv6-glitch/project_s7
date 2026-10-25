import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressRing, ProgressBar } from '../../components/common/ProgressBar';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  Calendar,
} from 'lucide-react';

export const Diagnostic: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useNotifications();

  const [loading, setLoading] = useState(false);
  const [existingResult, setExistingResult] = useState<any>(null);
  const [isTakingTest, setIsTakingTest] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 mins

  // Load existing diagnostic result if any
  useEffect(() => {
    const loadDiagnostic = async () => {
      try {
        const res = await api.get<any>('/student/diagnostic');
        setExistingResult(res);
      } catch (e) {
        // not yet taken
      }
    };
    loadDiagnostic();
  }, []);

  // Timer
  useEffect(() => {
    let timer: any;
    if (isTakingTest && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (isTakingTest && timeLeft === 0) {
      handleSubmitTest();
    }
    return () => clearInterval(timer);
  }, [isTakingTest, timeLeft]);

  const startAssessment = async () => {
    setLoading(true);
    try {
      // Fetch 12 diagnostic questions covering all 6 key areas
      const res = await api.get<{ questions: any[] }>('/practice/questions?limit=12');
      setQuestions(res.questions || []);
      setAnswers({});
      setCurrentIdx(0);
      setTimeLeft(1200);
      setIsTakingTest(true);
    } catch (err: any) {
      showToast(err.message || 'Failed to load diagnostic', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (optIdx: number) => {
    const q = questions[currentIdx];
    setAnswers({ ...answers, [q.id]: optIdx });
  };

  const handleSubmitTest = async () => {
    setLoading(true);
    try {
      const res = await api.post<any>('/student/diagnostic/submit', { answers });
      setExistingResult(res.diagnostic);
      setIsTakingTest(false);
      await refreshUser();
      showToast('Diagnostic completed! Placement readiness recalculated.', 'success');
    } catch (err: any) {
      showToast(err.message || 'Submission failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Render Live Assessment
  if (isTakingTest && questions.length > 0) {
    const currentQ = questions[currentIdx];
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const answeredCount = Object.keys(answers).length;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-4 rounded-xl shadow-xs">
          <div>
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
              Placement Readiness Diagnostic
            </span>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Question {currentIdx + 1} of {questions.length}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm font-bold px-3 py-1 rounded bg-slate-100 dark:bg-navy-800 text-slate-900 dark:text-white border border-slate-200 dark:border-navy-700">
              ⏱ {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <Button size="sm" variant="secondary" onClick={handleSubmitTest} isLoading={loading}>
              Submit Assessment
            </Button>
          </div>
        </div>

        {/* Question Body */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="brand" size="sm">{currentQ.category}</Badge>
            <Badge variant="neutral" size="sm">{currentQ.subCategory}</Badge>
          </div>

          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6 leading-relaxed">
            {currentQ.prompt}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((opt: string, idx: number) => {
              const selected = answers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                    selected
                      ? 'bg-brand-50 border-brand-500 text-brand-900 dark:bg-brand-950 dark:text-brand-100 ring-2 ring-brand-500'
                      : 'border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800'
                  }`}
                >
                  <span className="inline-block w-6 font-bold">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Navigation Palette */}
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(currentIdx - 1)}
            >
              Previous
            </Button>

            <span className="text-xs text-slate-500">
              {answeredCount} of {questions.length} Answered
            </span>

            {currentIdx < questions.length - 1 ? (
              <Button size="sm" onClick={() => setCurrentIdx(currentIdx + 1)}>
                Next Question
              </Button>
            ) : (
              <Button size="sm" onClick={handleSubmitTest} isLoading={loading}>
                Finish & View Score
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // Render Result View (or Prompt to take)
  const strengths = existingResult ? JSON.parse(existingResult.strengthsSummary || '[]') : [];
  const weaknesses = existingResult ? JSON.parse(existingResult.weaknessesSummary || '[]') : [];
  const recommendations = existingResult ? JSON.parse(existingResult.recommendations || '[]') : [];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950 dark:text-white">
            Placement Readiness Diagnostic
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comprehensive baseline across Quantitative, Logical, Verbal, DSA, OS, DBMS, Networks, and HR
          </p>
        </div>

        <Button onClick={startAssessment} isLoading={loading} size="sm">
          <RotateCcw className="w-4 h-4 mr-1.5" />
          {existingResult ? 'Retake Diagnostic' : 'Start Diagnostic (20 Mins)'}
        </Button>
      </div>

      {existingResult ? (
        <div className="space-y-6">
          {/* Top Score Summary Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex flex-col items-center justify-center p-6 text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Overall Readiness
              </span>
              <ProgressRing score={existingResult.overallScore} size={150} strokeWidth={11} label="Score" />
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-3">
                {existingResult.overallScore >= 75 ? 'On-track for Tier-1 Recruiters' : 'Targeted Practice Needed'}
              </p>
            </Card>

            <Card className="md:col-span-2 space-y-4">
              <CardHeader>
                <CardTitle>Category-Wise Score Breakdown</CardTitle>
                <Badge variant="brand" size="sm">6 Pillars</Badge>
              </CardHeader>

              <div className="space-y-3">
                {[
                  { label: 'Quantitative Aptitude', score: existingResult.quantScore },
                  { label: 'Logical Reasoning', score: existingResult.logicalScore },
                  { label: 'Verbal Ability & Grammar', score: existingResult.verbalScore },
                  { label: 'Programming & Data Structures', score: existingResult.codingScore },
                  { label: 'Core CS (OS, DBMS, Networks)', score: existingResult.coreCsScore },
                  { label: 'Soft Skills & Behavioral HR', score: existingResult.softSkillsScore },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>{item.label}</span>
                      <span>{item.score}%</span>
                    </div>
                    <ProgressBar
                      value={item.score}
                      color={item.score >= 80 ? 'emerald' : item.score >= 65 ? 'brand' : 'amber'}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Strengths and Critical Improvement Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card className="space-y-3 border-emerald-200 dark:border-emerald-950">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-bold text-sm">Key Strengths Identified</h3>
              </div>
              <ul className="space-y-2">
                {strengths.map((str: string, idx: number) => (
                  <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Critical Weaknesses */}
            <Card className="space-y-3 border-rose-200 dark:border-rose-950">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-sm">Critical Improvement Areas</h3>
              </div>
              <ul className="space-y-2">
                {weaknesses.map((w: string, idx: number) => (
                  <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Recommendations & Daily Plan */}
          <Card className="space-y-4">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <CardTitle>Recommended Action Plan</CardTitle>
              </div>
            </CardHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommendations.map((rec: string, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-navy-800 text-xs flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{rec}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link to="/roadmap">
                <Button size="sm">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  View Updated Roadmap
                </Button>
              </Link>
              <Link to="/practice">
                <Button size="sm" variant="outline">
                  <BookOpen className="w-4 h-4 mr-1.5" />
                  Practice Weak Topics
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 mx-auto flex items-center justify-center">
            <Compass className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-navy-950 dark:text-white">
            Take Your Baseline Readiness Diagnostic
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            A 20-minute calibrated assessment to pinpoint your current standing across aptitude, DSA, OS, DBMS, Networks, and interview readiness.
          </p>
          <div>
            <Button size="lg" onClick={startAssessment} isLoading={loading}>
              Begin Diagnostic Assessment
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
