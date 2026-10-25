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
import confetti from 'canvas-confetti';
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
  Award,
  Zap,
  BookOpen,
  Building2,
  ChevronRight,
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
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#0d9488', '#f59e0b'],
      });
      await fetchDashboard();
      await refreshUser();
    } catch (err: any) {
      showToast(err.message || 'Failed to update task', 'error');
    }
  };

  if (loading && !dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-medium">Synchronizing placement readiness profile...</p>
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

  const getTier = (score: number) => {
    if (score >= 80) return { label: 'Elite Tier-1 Product Ready', color: 'emerald', bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' };
    if (score >= 65) return { label: 'Mid-Market & Premium Tech', color: 'brand', bg: 'bg-brand-500/10 text-brand-600 border-brand-500/20' };
    return { label: 'Core Placement Foundation', color: 'amber', bg: 'bg-amber-500/10 text-amber-600 border-amber-500/20' };
  };

  const tier = getTier(readinessScore);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Executive Command Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-slate-900 text-white p-6 sm:p-8 border border-navy-800 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center text-white font-black text-2xl shadow-lg ring-4 ring-white/10">
                {user?.name ? user.name[0] : 'S'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-navy-950 flex items-center justify-center text-[10px] text-white font-bold" title="Online & Active">
                ✓
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Welcome back, {user?.name.split(' ')[0] || 'Candidate'}!
                </h1>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${tier.bg}`}>
                  {tier.label}
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <span>Class of {user?.studentProfile?.gradYear || '2026'}</span>
                <span>•</span>
                <span>{user?.studentProfile?.college || 'National Institute of Technology'}</span>
                <span>•</span>
                <span className="text-brand-300 font-semibold">{user?.studentProfile?.branch || 'Computer Science'}</span>
              </p>
            </div>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link to="/coding">
              <Button size="sm" className="shadow-md shadow-brand-500/20">
                <Code2 className="w-4 h-4 mr-1.5" />
                Solve DSA Problem
              </Button>
            </Link>
            <Link to="/practice">
              <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                <BookOpen className="w-4 h-4 mr-1.5" />
                Practice Engine
              </Button>
            </Link>
            <Link to="/diagnostic">
              <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                <Compass className="w-4 h-4 mr-1.5" />
                Diagnostic
              </Button>
            </Link>
          </div>
        </div>

        {/* Milestone Bar */}
        <div className="mt-6 pt-5 border-t border-navy-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Target Companies:</span>
            <div className="flex flex-wrap gap-1.5">
              {(dashboardData?.targetCompanies || ['Amazon', 'Microsoft', 'TCS']).map((comp: string) => (
                <span key={comp} className="px-2 py-0.5 rounded-md bg-white/10 text-white font-semibold text-[11px]">
                  {comp}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span>Roadmap Completion:</span>
            <span className="font-bold text-brand-400 font-mono text-sm">
              {dashboardData?.roadmap?.percentage || 35}%
            </span>
          </div>
        </div>
      </div>

      {/* Top 4 Quick Metric Cards with Hover Elevation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <Card className="flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-200 border-l-4 border-l-amber-500">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-amber-500 animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {streakDays} Days
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Daily Preparation Streak
            </span>
          </div>
        </Card>

        {/* Practice Accuracy */}
        <Card className="flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-200 border-l-4 border-l-brand-500">
          <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {practiceStats.accuracy}%
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Practice Accuracy ({practiceStats.totalPracticed} Qs)
            </span>
          </div>
        </Card>

        {/* Coding Solved */}
        <Card className="flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-200 border-l-4 border-l-indigo-500">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center shrink-0">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {solvedCodingCount} / 15
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              DSA Problems Accepted
            </span>
          </div>
        </Card>

        {/* Resume ATS Score */}
        <Card className="flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-200 border-l-4 border-l-emerald-500">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
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
        <Card className="flex flex-col items-center justify-between text-center p-6 hover:shadow-md transition-all">
          <CardHeader className="w-full justify-between items-center pb-2">
            <CardTitle>Placement Readiness</CardTitle>
            <Badge variant="brand" size="sm">Dynamic 0–100</Badge>
          </CardHeader>

          <div className="my-3 relative">
            <ProgressRing score={readinessScore} size={155} strokeWidth={12} label="Readiness" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full bg-brand-500/5 blur-xl animate-pulse" />
            </div>
          </div>

          <div className="w-full space-y-3 mt-2 text-left">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-xs">
              <div className="flex justify-between items-center mb-1 font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Roadmap Phase</span>
                <span className="text-brand-600 dark:text-brand-400">Day 14 of 60</span>
              </div>
              <ProgressBar value={dashboardData?.roadmap?.percentage || 35} size="sm" color="brand" />
            </div>

            <div className="pt-1">
              <Link to="/diagnostic">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <Compass className="w-3.5 h-3.5 mr-1.5 text-brand-600" />
                  Retake Diagnostic Baseline
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Radar Assessment Breakdown */}
        <Card className="lg:col-span-2 hover:shadow-md transition-all">
          <CardHeader>
            <div>
              <CardTitle>Category Competency Radar</CardTitle>
              <p className="text-xs text-slate-500">Evaluated across all tests, diagnostic assessment, and practice sets</p>
            </div>
            <Badge variant="brand" size="sm">360° Evaluation</Badge>
          </CardHeader>
          <ReadinessRadar />
        </Card>
      </div>

      {/* Bottom Section: Tasks Due Today + Upcoming Interview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks Due Today (Roadmap Quick Action) */}
        <Card className="lg:col-span-2 hover:shadow-md transition-all">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-600" />
              <CardTitle>Milestone Tasks Due Today</CardTitle>
            </div>
            <Link to="/roadmap" className="text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1">
              View Full 60-Day Roadmap <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>

          <div className="divide-y divide-slate-100 dark:divide-navy-800">
            {tasksDue.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-500 mx-auto flex items-center justify-center font-bold">
                  ✓
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">All tasks for today completed!</p>
                <p className="text-[11px] text-slate-400">Outstanding velocity. Your readiness score is trending up.</p>
              </div>
            ) : (
              tasksDue.map((t: any) => (
                <div key={t.id} className="py-3.5 flex items-start justify-between gap-3 group">
                  <button
                    onClick={() => handleToggleTask(t.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors"
                    title={t.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {t.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 group-hover:text-emerald-500 transition-colors" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold text-xs transition-colors ${t.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                        {t.title}
                      </span>
                      <Badge variant="neutral" size="sm">
                        {t.category}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {t.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={t.completed ? 'outline' : 'ghost'}
                    onClick={() => handleToggleTask(t.id)}
                    className="text-[11px] shrink-0"
                  >
                    {t.completed ? 'Done ✓' : 'Mark Done'}
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Scheduled Interview Card */}
        <Card className="flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-teal-600" />
                <CardTitle>Mock Interview Hub</CardTitle>
              </div>
            </CardHeader>

            {upcomingInterviews.length > 0 ? (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <Badge variant="brand" size="sm">
                      {upcomingInterviews[0].type} Mock
                    </Badge>
                    <span className="text-[10px] text-teal-700 dark:text-teal-300 font-bold bg-teal-100 dark:bg-teal-900/60 px-2 py-0.5 rounded">
                      SCHEDULED
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {upcomingInterviews[0].company} • {upcomingInterviews[0].targetRole}
                  </h4>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
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
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Join Google Meet Room
                    </Button>
                  </a>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-navy-950 text-brand-600 mx-auto flex items-center justify-center">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">Simulate STAR-Method Interview</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Test technical depth, communication, and confidence.</p>
                </div>
                <Link to="/interviews">
                  <Button size="sm" className="w-full">
                    Launch AI Mock Interview
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 text-center">
            <Link to="/companies" className="text-xs font-semibold text-brand-600 hover:underline flex items-center justify-center gap-1">
              Browse 10 Company Blueprints <Building2 className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Weekly Velocity Chart */}
      <Card className="hover:shadow-md transition-all">
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
