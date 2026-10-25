import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { api } from '../../api/client';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressRing, ProgressBar } from '../../components/common/ProgressBar';
import { ReadinessRadar } from '../../components/charts/ReadinessRadar';
import { WeeklyVelocityChart } from '../../components/charts/WeeklyVelocityChart';
import {
  Flame,
  CheckCircle2,
  Circle,
  ArrowRight,
  Code2,
  FileCheck2,
  Video,
  FileText,
  Calendar,
  Sparkles,
  ExternalLink,
  Clock,
  Compass,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useNotifications();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const data = await api.get<any>('/student/dashboard');
      setDashboardData(data);
    } catch (err: any) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleToggleTask = async (taskId: string) => {
    try {
      const res = await api.patch<any>(`/student/roadmap/${taskId}/toggle`);
      showToast(res.message, 'success');
      await fetchDashboard();
      await refreshUser();
    } catch (err: any) {
      showToast(err.message || 'Failed to update task', 'error');
    }
  };

  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const readinessScore = dashboardData?.readinessScore || user?.studentProfile?.readinessScore || 78.5;
  const streakDays = dashboardData?.streakDays || user?.studentProfile?.streakDays || 14;
  const tasksDue = dashboardData?.tasksDueToday || [];
  const practiceStats = dashboardData?.practiceStats || { totalPracticed: 24, accuracy: 82 };
  const solvedCodingCount = dashboardData?.codingSolvedCount || 2;
  const resumeScore = dashboardData?.latestResumeScore || 82;
  const upcomingInterviews = dashboardData?.upcomingInterviews || [];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Welcome back, {user?.name.split(' ')[0] || 'Candidate'}!
            </h1>
            <Badge variant="brand" size="sm">
              <Sparkles className="w-3 h-3" />
              Targeting: {(dashboardData?.targetCompanies || ['TCS', 'Amazon']).slice(0, 3).join(', ')}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {dashboardData?.roadmap?.percentage || 35}% of your personalized 60-day roadmap completed. Keep your daily streak active!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/practice">
            <Button size="sm" variant="outline">
              Practice Questions
            </Button>
          </Link>
          <Link to="/coding">
            <Button size="sm">
              <Code2 className="w-4 h-4 mr-1" />
              Solve DSA Problem
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 4 Quick Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {streakDays} Days
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Daily Preparation Streak
            </span>
          </div>
        </Card>

        {/* Practice Accuracy */}
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {practiceStats.accuracy}%
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Practice Accuracy ({practiceStats.totalPracticed} Qs)
            </span>
          </div>
        </Card>

        {/* Coding Solved */}
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center shrink-0">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {solvedCodingCount} / 15
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              DSA Problems Accepted
            </span>
          </div>
        </Card>

        {/* Resume ATS Score */}
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {resumeScore}/100
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Resume ATS Score
            </span>
          </div>
        </Card>
      </div>

      {/* Middle Section: Readiness Score & Diagnostic Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Placement Readiness Gauge Card */}
        <Card className="flex flex-col items-center justify-between text-center p-6">
          <CardHeader className="w-full justify-center">
            <CardTitle>Placement Readiness Score</CardTitle>
          </CardHeader>

          <div className="my-2">
            <ProgressRing score={readinessScore} size={150} strokeWidth={11} label="Readiness" />
          </div>

          <div className="w-full space-y-2 mt-4 text-left">
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
              <span>Roadmap Milestone Target:</span>
              <span className="font-bold text-slate-900 dark:text-white">Day 14 of 60</span>
            </div>
            <ProgressBar value={dashboardData?.roadmap?.percentage || 35} size="sm" color="brand" />

            <div className="pt-2 text-center">
              <Link to="/diagnostic">
                <Button variant="outline" size="sm" className="w-full">
                  <Compass className="w-3.5 h-3.5 mr-1 text-brand-600" />
                  Retake Diagnostic Assessment
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Radar Assessment Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Category Competency Breakdown</CardTitle>
              <p className="text-xs text-slate-500">Evaluated across all tests, diagnostic, and practice sets</p>
            </div>
            <Badge variant="brand" size="sm">360° Evaluation</Badge>
          </CardHeader>
          <ReadinessRadar />
        </Card>
      </div>

      {/* Bottom Section: Tasks Due Today + Weekly Velocity + Upcoming Interview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks Due Today (Roadmap Quick Action) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-600" />
              <CardTitle>Milestone Tasks Due Today</CardTitle>
            </div>
            <Link to="/roadmap" className="text-xs font-semibold text-brand-600 hover:underline">
              View All Tasks →
            </Link>
          </CardHeader>

          <div className="divide-y divide-slate-100 dark:divide-navy-800">
            {tasksDue.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">All tasks for today completed! Excellent work.</p>
            ) : (
              tasksDue.map((t: any) => (
                <div key={t.id} className="py-3 flex items-start justify-between gap-3">
                  <button
                    onClick={() => handleToggleTask(t.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors"
                  >
                    {t.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-900 dark:text-white">
                        {t.title}
                      </span>
                      <Badge variant="neutral" size="sm">
                        {t.category}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {t.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleToggleTask(t.id)}
                    className="text-[11px]"
                  >
                    Done
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Scheduled Interview Card */}
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-teal-600" />
                <CardTitle>Upcoming Interview</CardTitle>
              </div>
            </CardHeader>

            {upcomingInterviews.length > 0 ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <Badge variant="brand" size="sm">
                      {upcomingInterviews[0].type} Mock
                    </Badge>
                    <span className="text-[10px] text-teal-700 dark:text-teal-300 font-semibold">
                      CONFIRMED
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {upcomingInterviews[0].company} - {upcomingInterviews[0].targetRole}
                  </h4>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mt-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {upcomingInterviews[0].scheduledFor
                        ? new Date(upcomingInterviews[0].scheduledFor).toLocaleDateString()
                        : 'Scheduled soon'}
                    </span>
                  </div>
                </div>

                {upcomingInterviews[0].meetingLink && (
                  <a
                    href={upcomingInterviews[0].meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full block"
                  >
                    <Button size="sm" className="w-full">
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      Join Google Meet Room
                    </Button>
                  </a>
                )}
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <p className="text-xs text-slate-500">No mentor interview currently scheduled.</p>
                <Link to="/interviews">
                  <Button size="sm" variant="outline" className="w-full">
                    Schedule with Mentor
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 text-center">
            <Link to="/interviews" className="text-xs font-semibold text-brand-600 hover:underline">
              Or Launch AI System Mock Interview →
            </Link>
          </div>
        </Card>
      </div>

      {/* Weekly Velocity Chart */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Weekly Study & Practice Velocity</CardTitle>
            <p className="text-xs text-slate-500">Daily study minutes logged over the past 7 days</p>
          </div>
          <Badge variant="brand" size="sm">Active Pace</Badge>
        </CardHeader>
        <WeeklyVelocityChart />
      </Card>
    </div>
  );
};
