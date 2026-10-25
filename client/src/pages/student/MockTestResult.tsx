import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { api } from '../../api/client';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Building2,
  Clock,
  Award,
  ChevronDown,
} from 'lucide-react';

export const MockTestResult: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const location = useLocation();
  const [data, setData] = useState<any | null>(location.state?.resultData || null);
  const [attemptDetail, setAttemptDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        setLoading(true);
        const res = await api.get<any>(`/mocktests/attempts/${attemptId}`);
        setAttemptDetail(res);
        if (!data) {
          setData({
            score: res.attempt.score,
            totalMarks: res.attempt.totalMarks,
            accuracy: res.attempt.accuracy,
            attempted: res.attempt.attempted,
            correct: res.attempt.correct,
            incorrect: res.attempt.incorrect,
            skipped: res.attempt.skipped,
            timeSpentSec: res.attempt.timeSpentSec,
            sectionScores: JSON.parse(res.attempt.sectionScores || '{}'),
            cutoffPercentage: res.attempt.mockTest?.cutoffPercentage || 70,
            targetCompany: res.attempt.mockTest?.targetCompany || 'General',
            passed: (res.attempt.score / res.attempt.totalMarks) * 100 >= (res.attempt.mockTest?.cutoffPercentage || 70),
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (attemptId) fetchAttempt();
  }, [attemptId]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const scorePct = Math.round((data.score / (data.totalMarks || 1)) * 100);
  const passed = scorePct >= (data.cutoffPercentage || 70);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Result Banner */}
      <Card
        className={`p-6 text-center space-y-3 ${
          passed
            ? 'border-emerald-300 dark:border-emerald-900 bg-emerald-50/30 dark:bg-emerald-950/20'
            : 'border-amber-300 dark:border-amber-900 bg-amber-50/30 dark:bg-amber-950/20'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          {passed ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          ) : (
            <AlertCircle className="w-8 h-8 text-amber-600" />
          )}
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {passed ? 'Assessment Cleared!' : 'Assessment Completed'}
          </h1>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300">
          {passed
            ? `Congratulations! Your score of ${scorePct}% exceeds the ${data.targetCompany || 'Campus'} target cutoff threshold of ${data.cutoffPercentage}%.`
            : `You scored ${scorePct}%. Below the ${data.targetCompany || 'Campus'} cutoff of ${data.cutoffPercentage}%. Review incorrect questions below.`}
        </p>

        {/* Big Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Final Score</span>
            <div className="text-2xl font-black text-brand-600 dark:text-brand-400">
              {data.score} / {data.totalMarks}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Accuracy</span>
            <div className="text-2xl font-black text-emerald-600">
              {data.accuracy}%
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Correct / Wrong</span>
            <div className="text-xl font-black text-slate-800 dark:text-slate-200">
              {data.correct} <span className="text-xs text-slate-400">/</span> {data.incorrect}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Time Spent</span>
            <div className="text-xl font-black text-slate-800 dark:text-slate-200">
              {Math.floor((data.timeSpentSec || 1800) / 60)} mins
            </div>
          </div>
        </div>
      </Card>

      {/* Section-Wise Breakdown */}
      {data.sectionScores && Object.keys(data.sectionScores).length > 0 && (
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Section-Wise Performance Breakdown</CardTitle>
            <Badge variant="neutral" size="sm">Accuracy & Score</Badge>
          </CardHeader>

          <div className="space-y-3">
            {Object.keys(data.sectionScores).map((sectionName) => {
              const sec = data.sectionScores[sectionName];
              const secAccuracy = sec.attempted > 0 ? Math.round((sec.correct / sec.attempted) * 100) : 0;
              return (
                <div key={sectionName} className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">{sectionName}</span>
                    <span className="font-mono text-slate-600 dark:text-slate-300">
                      Score: <strong>{sec.score || sec.correct}</strong> | Attempted: {sec.attempted}/{sec.total} | Accuracy: {secAccuracy}%
                    </span>
                  </div>
                  <ProgressBar value={secAccuracy} size="sm" color={secAccuracy >= 75 ? 'emerald' : 'amber'} />
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Question by Question Review */}
      {attemptDetail && attemptDetail.questions && (
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Question Solutions & Detailed Explanations</CardTitle>
            <span className="text-xs text-slate-400">Review every concept tested</span>
          </CardHeader>

          <div className="space-y-4 divide-y divide-slate-100 dark:divide-navy-800">
            {attemptDetail.questions.map((q: any, i: number) => (
              <div key={q.questionId} className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    Q{i + 1}. {q.title}
                  </span>
                  <Badge variant="neutral" size="sm">{q.category}</Badge>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {q.prompt}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  {q.options.map((opt: string, optIdx: number) => (
                    <div
                      key={optIdx}
                      className={`p-2 rounded border ${
                        optIdx === q.correctOpt
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-bold'
                          : 'border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}. {opt}
                      {optIdx === q.correctOpt && ' (Correct Answer)'}
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-[11px] text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-800 dark:text-slate-200">Explanation:</strong> {q.explanation}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Bottom Nav */}
      <div className="flex items-center justify-between pt-2">
        <Link to="/mocktests">
          <Button variant="outline" size="sm">
            ← Back to Mock Tests
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button size="sm">
            Go to Student Dashboard →
          </Button>
        </Link>
      </div>
    </div>
  );
};
