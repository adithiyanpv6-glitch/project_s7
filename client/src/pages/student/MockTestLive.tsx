import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Clock,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react';

export const MockTestLive: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useNotifications();

  const [test, setTest] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Test session state
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(3600);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        const data = await api.get<any>(`/mocktests/${id}`);
        setTest(data);
        setSecondsRemaining(data.durationMinutes * 60);
      } catch (err: any) {
        showToast(err.message || 'Failed to load test', 'error');
        navigate('/mocktests');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTest();
  }, [id]);

  // Countdown timer
  useEffect(() => {
    if (!test) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [test]);

  const handleSelectOption = (qId: string, optIdx: number) => {
    setAnswers({ ...answers, [qId]: optIdx });
  };

  const handleToggleReview = (qId: string) => {
    setMarkedForReview({ ...markedForReview, [qId]: !markedForReview[qId] });
  };

  const handleSubmitTest = async (auto: boolean = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const timeSpentSec = (test?.durationMinutes || 60) * 60 - secondsRemaining;
      const res = await api.post<any>(`/mocktests/${id}/submit`, {
        answers,
        timeSpentSec: Math.max(10, timeSpentSec),
      });

      showToast(auto ? 'Time expired. Assessment submitted!' : 'Test submitted successfully!', 'success');
      navigate(`/mocktests/attempts/${res.attemptId}/result`, { state: { resultData: res } });
    } catch (err: any) {
      showToast(err.message || 'Failed to submit test', 'error');
      setIsSubmitting(false);
    }
  };

  if (loading || !test) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentQ = test.questions[currentIdx];
  const totalQuestions = test.questions.length;
  const answeredCount = Object.keys(answers).length;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Top Test Banner with Timer */}
      <div className="bg-navy-950 text-white p-4 rounded-xl shadow-md border border-navy-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold tracking-tight">{test.title}</h2>
          <span className="text-[11px] text-slate-400">
            Target Cutoff: {test.cutoffPercentage}% | Negative Marking: -{test.negativeMarking}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-sm font-bold bg-navy-900 border border-navy-700 px-3 py-1 rounded-lg text-brand-300">
            <Clock className="w-4 h-4 text-brand-400" />
            <span>
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </span>
          </div>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleSubmitTest(false)}
            isLoading={isSubmitting}
          >
            Submit Test
          </Button>
        </div>
      </div>

      {/* Main Test Grid: Question Card + Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Question Pane (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-800">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-900 dark:text-white">
                  Question {currentIdx + 1} of {totalQuestions}
                </span>
                <Badge variant="brand" size="sm">{currentQ.category}</Badge>
                <Badge variant="neutral" size="sm">{currentQ.subCategory}</Badge>
              </div>

              <button
                onClick={() => handleToggleReview(currentQ.questionId)}
                className={`text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
                  markedForReview[currentQ.questionId]
                    ? 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {markedForReview[currentQ.questionId] ? 'Marked for Review' : 'Mark for Review'}
              </button>
            </div>

            {/* Prompt */}
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
              {currentQ.prompt}
            </p>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt: string, idx: number) => {
                const isSelected = answers[currentQ.questionId] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.questionId, idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 text-brand-900 dark:bg-brand-950/60 dark:text-brand-100 ring-2 ring-brand-500'
                        : 'border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Bottom Nav */}
            <div className="pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
              <Button
                size="sm"
                variant="outline"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Previous
              </Button>

              <button
                onClick={() => {
                  const newAns = { ...answers };
                  delete newAns[currentQ.questionId];
                  setAnswers(newAns);
                }}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Clear Response
              </button>

              {currentIdx < totalQuestions - 1 ? (
                <Button size="sm" onClick={() => setCurrentIdx(currentIdx + 1)}>
                  Next
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              ) : (
                <Button size="sm" onClick={() => handleSubmitTest(false)} isLoading={isSubmitting}>
                  Finish Test
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Right Palette (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-4 space-y-4">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Question Palette
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-brand-600" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500" />
                <span>Review ({reviewCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-200 dark:bg-navy-700" />
                <span>Unattempted ({totalQuestions - answeredCount})</span>
              </div>
            </div>

            {/* Number grid */}
            <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto pt-2">
              {test.questions.map((q: any, i: number) => {
                const isAnswered = answers[q.questionId] !== undefined;
                const isReview = markedForReview[q.questionId];
                const isCurrent = currentIdx === i;

                let btnBg = 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300';
                if (isReview) btnBg = 'bg-amber-500 text-white';
                else if (isAnswered) btnBg = 'bg-brand-600 text-white';

                return (
                  <button
                    key={q.questionId}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${btnBg} ${
                      isCurrent ? 'ring-2 ring-navy-950 dark:ring-white scale-105' : ''
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
