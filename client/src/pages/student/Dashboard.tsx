import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';
import {
  Info,
  MoreVertical,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface StudentDashboardData {
  readinessScore: number;
  streakDays: number;
  dailyHours?: number;
  codingSolvedCount?: number;
  practiceStats?: {
    totalPracticed: number;
    accuracy: number;
  };
  roadmap?: {
    total: number;
    completed: number;
    percentage: number;
  };
  upcomingInterviews?: any[];
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'status' | 'domains' | 'milestones'>('status');
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(1); // Index 1 is Feb 17 like reference

  useEffect(() => {
    let isMounted = true;
    const fetchDashboard = async () => {
      try {
        const res = await api.get<StudentDashboardData>('/student/dashboard');
        if (isMounted) setData(res);
      } catch (err) {
        // Fallback default mock data for clean preview
        if (isMounted) {
          setData({
            readinessScore: 84,
            streakDays: 4,
            dailyHours: 2.5,
            codingSolvedCount: 38,
            practiceStats: {
              totalPracticed: 124,
              accuracy: 78,
            },
            roadmap: {
              total: 24,
              completed: 16,
              percentage: 67,
            },
            upcomingInterviews: [],
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  const readinessScore = data?.readinessScore ? Math.round(data.readinessScore) : 84;
  const accuracy = data?.practiceStats?.accuracy || 78;
  const totalCompleted = data?.roadmap?.completed || 16;
  const totalTasks = data?.roadmap?.total || 24;
  const openTasks = totalTasks - totalCompleted;

  // Chart Coordinates & Timeline Points (Exactly like reference: Feb 14 through Mar 15)
  const chartPoints = [
    { date: 'Feb 14', fullDate: 'Sat, Feb 14', value: 72, label: '72%' },
    { date: 'Feb 17', fullDate: 'Tue, Feb 17', value: 84, label: '84%' },
    { date: 'Feb 20', fullDate: 'Fri, Feb 20', value: 79, label: '79%' },
    { date: 'Feb 25', fullDate: 'Wed, Feb 25', value: 82, label: '82%' },
    { date: 'Mar 3', fullDate: 'Tue, Mar 3', value: 85, label: '85%' },
    { date: 'Mar 9', fullDate: 'Mon, Mar 9', value: 81, label: '81%' },
    { date: 'Mar 15', fullDate: 'Sun, Mar 15', value: 88, label: '88%' },
  ];

  const selectedPoint = chartPoints[selectedPointIndex];

  return (
    <div
      className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 select-none bg-[#090a0f] text-zinc-100 min-h-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. Header: Simple 'Dashboard' (Reference Image format) */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
          Dashboard
        </h1>
      </div>

      {/* 2. Top Row: 3 Metric KPI Cards (Reference Image format) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Readiness Score */}
        <div className="p-5 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm transition-all hover:border-zinc-700/80">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-medium">Readiness Score</span>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{readinessScore}%</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-white">
              {readinessScore}%
            </span>
            <span className="text-xs text-zinc-500 font-normal">
              +5.2% vs last week
            </span>
          </div>
        </div>

        {/* Card 2: Practice Accuracy */}
        <div className="p-5 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm transition-all hover:border-zinc-700/80">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-medium">Practice Accuracy</span>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{accuracy}%</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-white">
              {accuracy}%
            </span>
            <span className="text-xs text-zinc-500 font-normal">
              +8 vs last week
            </span>
          </div>
        </div>

        {/* Card 3: Interview Standing */}
        <div className="p-5 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm transition-all hover:border-zinc-700/80">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-zinc-400 font-medium">
              <span>Cohort Standing</span>
              <Info className="w-3 h-3 text-zinc-500" />
            </div>
            <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Top 10%</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight text-white">
              8.8
            </span>
            <span className="text-xs text-zinc-500 font-normal">
              +2d vs last week
            </span>
          </div>
        </div>
      </div>

      {/* 3. Center Row: Large Chart Card (Readiness Progress Over Time) */}
      <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-6">
        {/* Chart Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
              <span>Readiness over time</span>
              <Info className="w-3 h-3 text-zinc-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              88% Target Pace
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>+7.5% vs last month</span>
          </div>
        </div>

        {/* Sleek SVG Area Chart with Tooltip Node */}
        <div className="relative w-full h-56 sm:h-64 mt-4">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 700 200"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="60%" stopColor="#14b8a6" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Subtle Grid Lines */}
            <line x1="0" y1="40" x2="700" y2="40" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="90" x2="700" y2="90" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="140" x2="700" y2="140" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />

            {/* Smooth Spline Area */}
            <path
              d="M 20 120 Q 80 70, 140 75 T 260 85 T 380 70 T 500 65 T 620 75 T 680 50 L 680 180 L 20 180 Z"
              fill="url(#areaGradient)"
            />

            {/* Smooth Spline Curve Stroke */}
            <path
              d="M 20 120 Q 80 70, 140 75 T 260 85 T 380 70 T 500 65 T 620 75 T 680 50"
              fill="none"
              stroke="#e4e4e7"
              strokeWidth="2.5"
            />

            {/* Active Vertical Guideline for Feb 17 (x = 140) */}
            <line
              x1="140"
              y1="40"
              x2="140"
              y2="180"
              stroke="#71717a"
              strokeWidth="1.5"
            />

            {/* Active Node Marker on Curve */}
            <circle
              cx="140"
              cy="75"
              r="4.5"
              fill="#ffffff"
              stroke="#090a0f"
              strokeWidth="2.5"
            />
          </svg>

          {/* Floating Pill Tooltip (Like Reference Image: Tue, Feb 17 • Readiness 84%) */}
          <div
            className="absolute top-8 left-[18%] sm:left-[20%] -translate-x-1/2 rounded-xl bg-zinc-900 border border-zinc-700/80 px-3 py-1.5 shadow-xl flex items-center gap-2.5 text-xs select-none pointer-events-none z-10"
          >
            <span className="text-zinc-400 font-light">{selectedPoint.fullDate}</span>
            <div className="flex items-center gap-1.5 font-medium text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>Readiness</span>
              <span className="font-semibold">{selectedPoint.label}</span>
            </div>
          </div>

          {/* X-Axis Dates */}
          <div className="flex justify-between items-center text-[11px] text-zinc-500 font-normal px-2 pt-3">
            {chartPoints.map((pt, idx) => (
              <button
                key={pt.date}
                type="button"
                onClick={() => setSelectedPointIndex(idx)}
                className={`transition-colors py-1 px-2 rounded-lg cursor-pointer ${
                  selectedPointIndex === idx
                    ? 'bg-zinc-800 text-white font-medium'
                    : 'hover:text-zinc-300'
                }`}
              >
                {pt.date}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: 2 Split Cards (Reference Image format) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bottom Left Card: Preparation Focus (Reference Leads Management) */}
        <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">
              Preparation Focus
            </h3>

            {/* Clean Minimalist Tabs (Status / Domains / Milestones) */}
            <div className="flex items-center gap-6 border-b border-zinc-800/80 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('status')}
                className={`pb-2 transition-all font-medium relative ${
                  activeTab === 'status'
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Status
                {activeTab === 'status' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('domains')}
                className={`pb-2 transition-all font-medium relative ${
                  activeTab === 'domains'
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Domains
                {activeTab === 'domains' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('milestones')}
                className={`pb-2 transition-all font-medium relative ${
                  activeTab === 'milestones'
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Milestones
                {activeTab === 'milestones' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Progress Indicators & Metric Counters */}
          <div className="space-y-5">
            {/* Minimal Progress Line */}
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${(totalCompleted / (totalTasks || 1)) * 100}%` }}
              />
            </div>

            {/* Split Counter Cards (Reference: Open 114 leads | In Progress 62 leads) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                <span className="text-[11px] text-zinc-400 font-medium block">
                  Open Tasks
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold text-white">
                    {openTasks > 0 ? openTasks : 4}
                  </span>
                  <span className="text-xs text-zinc-500 font-normal">
                    pending
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                <span className="text-[11px] text-zinc-400 font-medium block">
                  In Progress
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold text-white">
                    {totalCompleted > 0 ? totalCompleted : 12}
                  </span>
                  <span className="text-xs text-zinc-500 font-normal">
                    completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right Card: Retention Rate (Reference Retention Rate) */}
        <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-300">
              Retention Rate
            </h3>
            <button className="text-zinc-500 hover:text-zinc-300 p-1">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Metric & Legends */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight text-white">
                95%
              </span>
              <span className="text-xs text-emerald-400 font-medium">
                12% vs last month
              </span>
            </div>

            {/* Legends */}
            <div className="flex items-center gap-4 text-[11px] text-zinc-400 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-white" />
                <span>Core DSA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-zinc-500" />
                <span>Aptitude</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-zinc-700" />
                <span>Technical</span>
              </div>
            </div>
          </div>

          {/* Minimalist Grouped Bar Charts (6 checkpoint weeks) */}
          <div className="h-32 flex items-end justify-between gap-3 pt-4 border-t border-zinc-800/60">
            {/* Week 1 */}
            <div className="flex items-end gap-1 h-full w-full justify-center">
              <div className="w-1.5 bg-white rounded-t-sm h-[50%]" />
              <div className="w-1.5 bg-zinc-500 rounded-t-sm h-[35%]" />
              <div className="w-1.5 bg-zinc-700 rounded-t-sm h-[20%]" />
            </div>

            {/* Week 2 */}
            <div className="flex items-end gap-1 h-full w-full justify-center">
              <div className="w-1.5 bg-white rounded-t-sm h-[75%]" />
              <div className="w-1.5 bg-zinc-500 rounded-t-sm h-[55%]" />
              <div className="w-1.5 bg-zinc-700 rounded-t-sm h-[40%]" />
            </div>

            {/* Week 3 */}
            <div className="flex items-end gap-1 h-full w-full justify-center">
              <div className="w-1.5 bg-white rounded-t-sm h-[60%]" />
              <div className="w-1.5 bg-zinc-500 rounded-t-sm h-[45%]" />
              <div className="w-1.5 bg-zinc-700 rounded-t-sm h-[30%]" />
            </div>

            {/* Week 4 */}
            <div className="flex items-end gap-1 h-full w-full justify-center">
              <div className="w-1.5 bg-white rounded-t-sm h-[85%]" />
              <div className="w-1.5 bg-zinc-500 rounded-t-sm h-[70%]" />
              <div className="w-1.5 bg-zinc-700 rounded-t-sm h-[55%]" />
            </div>

            {/* Week 5 */}
            <div className="flex items-end gap-1 h-full w-full justify-center">
              <div className="w-1.5 bg-white rounded-t-sm h-[92%]" />
              <div className="w-1.5 bg-zinc-500 rounded-t-sm h-[80%]" />
              <div className="w-1.5 bg-zinc-700 rounded-t-sm h-[65%]" />
            </div>

            {/* Week 6 */}
            <div className="flex items-end gap-1 h-full w-full justify-center">
              <div className="w-1.5 bg-white rounded-t-sm h-[98%]" />
              <div className="w-1.5 bg-zinc-500 rounded-t-sm h-[88%]" />
              <div className="w-1.5 bg-zinc-700 rounded-t-sm h-[78%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
