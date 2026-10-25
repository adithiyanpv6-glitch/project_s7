import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Video,
  Send,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const MockInterviewLive: React.FC = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useNotifications();
  const { refreshUser } = useAuth();

  const initialData = location.state?.interviewData;
  const questions: string[] = initialData?.questions || [
    "Tell me about yourself and your background in software engineering.",
    "Describe a challenging technical project you worked on and how you resolved unexpected obstacles.",
    "Tell me about a time you strongly disagreed with a team member on a technical decision.",
    "What is an area of technical weakness you are actively trying to improve?"
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<any | null>(null);

  const handleAnswerChange = (val: string) => {
    const updated = [...answers];
    updated[currentIdx] = val;
    setAnswers(updated);
  };

  const handleFinishAndEvaluate = async () => {
    // Check if at least one answer has substance
    if (answers.every((a) => !a || a.trim().length < 10)) {
      showToast('Please provide substantive answers before submitting.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = questions.map((q, i) => ({
        question: q,
        answer: answers[i] || '',
      }));

      const res = await api.post<any>('/interviews/system/evaluate', {
        interviewId,
        answers: payload,
      });

      setEvaluation(res.interview);
      showToast('Evaluation complete! Detailed scorecard generated.', 'success');
      await refreshUser();
    } catch (err: any) {
      showToast(err.message || 'Evaluation submission failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If evaluated, show comprehensive scorecard
  if (evaluation) {
    const ratings = evaluation.ratings ? JSON.parse(evaluation.ratings) : {};
    const strengths = evaluation.strengths ? JSON.parse(evaluation.strengths) : [];
    const weaknesses = evaluation.weaknesses ? JSON.parse(evaluation.weaknesses) : [];

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center space-y-4 border-emerald-300 dark:border-emerald-950 bg-emerald-50/20 dark:bg-emerald-950/10">
          <Badge variant="brand" size="md">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            Interview Evaluation Completed
          </Badge>

          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Performance Scorecard: {evaluation.overallRating} / 10
          </h1>

          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            {evaluation.feedback}
          </p>

          {/* Rubrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            {Object.entries(ratings).map(([rubric, val]: any) => (
              <div
                key={rubric}
                className="p-3 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-center"
              >
                <span className="text-[10px] text-slate-400 uppercase font-semibold block capitalize">
                  {rubric.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="text-xl font-black text-brand-600 dark:text-brand-400">
                  {val} / 10
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Key Strengths Observed</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {strengths.map((str: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="space-y-3">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Actionable Coaching Areas</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {weaknesses.map((w: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="flex justify-between items-center pt-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/interviews')}>
            ← Back to Interview Hub
          </Button>
          <Button size="sm" onClick={() => navigate('/dashboard')}>
            Go to Student Dashboard →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-4 rounded-xl shadow-xs">
        <div>
          <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
            Interactive AI Mock Simulator
          </span>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Question {currentIdx + 1} of {questions.length}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="destructive"
            onClick={handleFinishAndEvaluate}
            isLoading={isSubmitting}
          >
            Finish & Evaluate
          </Button>
        </div>
      </div>

      {/* Main Question & Answer Input Card */}
      <Card className="p-6 space-y-5">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 space-y-2">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interviewer Prompt</span>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
            "{questions[currentIdx]}"
          </p>
        </div>

        {/* Answer Text Area */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Your Response (Apply STAR framework: Situation, Task, Action, Result)
            </label>
            <span>{answers[currentIdx].split(/\s+/).filter(Boolean).length} words</span>
          </div>
          <textarea
            rows={8}
            value={answers[currentIdx]}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Structure your answer clearly: Situation (context) -> Task (your goal) -> Action (steps you took) -> Result (quantified impact)..."
            className="w-full p-4 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-sans leading-relaxed"
          />
        </div>

        {/* Nav Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-navy-800">
          <Button
            variant="outline"
            size="sm"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Previous
          </Button>

          {currentIdx < questions.length - 1 ? (
            <Button size="sm" onClick={() => setCurrentIdx(currentIdx + 1)}>
              Next Question
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          ) : (
            <Button size="sm" onClick={handleFinishAndEvaluate} isLoading={isSubmitting}>
              Complete & Evaluate
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
