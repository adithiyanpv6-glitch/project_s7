import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Video,
  UserCheck,
  Calendar,
  ExternalLink,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  Edit3,
} from 'lucide-react';

export const MentorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useNotifications();

  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Evaluation modal
  const [evaluatingInterview, setEvaluatingInterview] = useState<any | null>(null);
  const [commScore, setCommScore] = useState(8);
  const [techScore, setTechScore] = useState(8);
  const [problemSolving, setProblemSolving] = useState(8);
  const [confidence, setConfidence] = useState(8);
  const [overallRating, setOverallRating] = useState(8.0);
  const [strengths, setStrengths] = useState('Clear STAR communication, strong understanding of concurrency and threads');
  const [weaknesses, setWeaknesses] = useState('Needs more practice on 2D Dynamic Programming transitions');
  const [feedback, setFeedback] = useState('Very articulate and well-prepared. Keep practicing live whiteboarding problems.');
  const [submitting, setSubmitting] = useState(false);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const data = await api.get<any[]>('/interviews/my');
      setInterviews(data);
    } catch (err: any) {
      showToast(err.message || 'Failed to load interviews', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleOpenEvaluation = (iv: any) => {
    setEvaluatingInterview(iv);
    if (iv.overallRating) {
      setOverallRating(iv.overallRating);
    }
    if (iv.feedback) {
      setFeedback(iv.feedback);
    }
  };

  const handleSaveEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingInterview) return;
    setSubmitting(true);
    try {
      const calculatedOverall =
        Math.round(((commScore + techScore + problemSolving + confidence) / 4) * 10) / 10;

      await api.post(`/interviews/mentor/${evaluatingInterview.id}/evaluate`, {
        overallRating: calculatedOverall,
        ratings: {
          communication: commScore,
          technicalDepth: techScore,
          problemSolving,
          confidence,
        },
        strengths: strengths.split(',').map((s) => s.trim()),
        weaknesses: weaknesses.split(',').map((w) => w.trim()),
        feedback,
      });

      showToast('Evaluation report submitted to candidate!', 'success');
      setEvaluatingInterview(null);
      fetchInterviews();
    } catch (err: any) {
      showToast(err.message || 'Evaluation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Interviewer & Mentor Evaluation Hub
            </h1>
            <Badge variant="brand" size="sm">Staff Mentor Suite</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Conduct scheduled mock interviews, evaluate candidates on structured rubrics, and deliver actionable coaching.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-center">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Candidate Sessions</span>
            <span className="text-lg font-black text-brand-600 dark:text-brand-400">
              {interviews.length} Assigned
            </span>
          </div>
        </div>
      </div>

      {/* Interviews List */}
      <Card className="space-y-4">
        <CardHeader>
          <CardTitle>Assigned Candidate Mock Interviews</CardTitle>
          <Badge variant="neutral" size="sm">Active Roster</Badge>
        </CardHeader>

        {loading ? (
          <div className="py-8 text-center text-slate-400">Loading interview assignments...</div>
        ) : interviews.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">
            No candidates currently assigned for mock interviews.
          </p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-navy-800">
            {interviews.map((iv) => (
              <div
                key={iv.id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={iv.status === 'COMPLETED' ? 'success' : 'brand'} size="sm">
                      {iv.status}
                    </Badge>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {iv.type} Mock Interview ({iv.targetRole})
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Candidate: <strong>{iv.student?.name}</strong> ({iv.student?.email}) • Target: {iv.company || 'General'}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {iv.scheduledFor
                        ? new Date(iv.scheduledFor).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
                        : 'Scheduled soon'}
                    </span>
                    {iv.overallRating && (
                      <span className="font-bold text-emerald-600">
                        Score: {iv.overallRating} / 10
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {iv.meetingLink && iv.status !== 'COMPLETED' && (
                    <a href={iv.meetingLink} target="_blank" rel="noreferrer">
                      <Button size="sm">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        Launch Meeting Room
                      </Button>
                    </a>
                  )}

                  <Button
                    size="sm"
                    variant={iv.status === 'COMPLETED' ? 'outline' : 'secondary'}
                    onClick={() => handleOpenEvaluation(iv)}
                  >
                    <Edit3 className="w-3.5 h-3.5 mr-1" />
                    {iv.status === 'COMPLETED' ? 'Edit Evaluation' : 'Score Candidate'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Structured Rubric Evaluation Modal */}
      <Modal
        isOpen={!!evaluatingInterview}
        onClose={() => setEvaluatingInterview(null)}
        title="Candidate Placement Mock Evaluation"
        description={`Evaluating: ${evaluatingInterview?.student?.name} (${evaluatingInterview?.type} Mock for ${evaluatingInterview?.company})`}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveEvaluation} className="space-y-4 pt-2 text-xs">
          {/* 4 Rubric Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 space-y-1">
              <div className="flex justify-between font-semibold text-slate-900 dark:text-white">
                <span>Communication & Articulation</span>
                <span className="text-brand-600 font-bold">{commScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={commScore}
                onChange={(e) => setCommScore(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-navy-700 rounded-lg cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 space-y-1">
              <div className="flex justify-between font-semibold text-slate-900 dark:text-white">
                <span>Technical Depth & Accuracy</span>
                <span className="text-brand-600 font-bold">{techScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={techScore}
                onChange={(e) => setTechScore(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-navy-700 rounded-lg cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 space-y-1">
              <div className="flex justify-between font-semibold text-slate-900 dark:text-white">
                <span>Problem Solving & Algorithms</span>
                <span className="text-brand-600 font-bold">{problemSolving} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={problemSolving}
                onChange={(e) => setProblemSolving(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-navy-700 rounded-lg cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 space-y-1">
              <div className="flex justify-between font-semibold text-slate-900 dark:text-white">
                <span>Confidence & STAR Structure</span>
                <span className="text-brand-600 font-bold">{confidence} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-navy-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Candidate Strengths (comma-separated)
            </label>
            <input
              type="text"
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Candidate Weaknesses / Areas for Improvement
            </label>
            <input
              type="text"
              value={weaknesses}
              onChange={(e) => setWeaknesses(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Detailed Written Feedback (Visible on student report)
            </label>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setEvaluatingInterview(null)}>
              Cancel
            </Button>
            <Button size="sm" type="submit" isLoading={submitting}>
              Submit Evaluation Report
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
