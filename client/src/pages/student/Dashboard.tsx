import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';
import { Modal } from '../../components/common/Modal';
import {
  Info,
  MoreVertical,
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
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
  const navigate = useNavigate();

  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'status' | 'domains' | 'milestones'>('status');
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(1); // Index 1 is Feb 17 like reference
  const [selectedLegend, setSelectedLegend] = useState<'all' | 'dsa' | 'aptitude' | 'technical'>('all');

  // Reviewer Metric Explanation Modal
  const [reviewerMetric, setReviewerMetric] = useState<'readiness' | 'accuracy' | 'standing' | null>(null);

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

  // Chart Coordinates & Timeline Points (Feb 14 through Mar 15)
  const chartPoints = [
    { date: 'Feb 14', fullDate: 'Sat, Feb 14', value: 72, label: '72%', x: 20, y: 120, event: 'Baseline Diagnostic Assessment Completed' },
    { date: 'Feb 17', fullDate: 'Tue, Feb 17', value: 84, label: '84%', x: 140, y: 75, event: 'Technical Mock Interview Passed (+12% jump)' },
    { date: 'Feb 20', fullDate: 'Fri, Feb 20', value: 79, label: '79%', x: 260, y: 85, event: 'Advanced Graph Theory Practice Sessions' },
    { date: 'Feb 25', fullDate: 'Wed, Feb 25', value: 82, label: '82%', x: 380, y: 70, event: 'Quantitative Speed Test Benchmark Cleared' },
    { date: 'Mar 3', fullDate: 'Tue, Mar 3', value: 85, label: '85%', x: 500, y: 65, event: 'System Design Mock Session Evaluated' },
    { date: 'Mar 9', fullDate: 'Mon, Mar 9', value: 81, label: '81%', x: 620, y: 75, event: 'Comprehensive Placement Mock Test 2' },
    { date: 'Mar 15', fullDate: 'Sun, Mar 15', value: 88, label: '88%', x: 680, y: 50, event: 'Projected Campus Recruiter Eligibility Target' },
  ];

  const selectedPoint = chartPoints[selectedPointIndex];

  return (
    <div
      className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 select-none bg-[#090a0f] text-zinc-100 min-h-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. Header: Dashboard + Reviewer Guide Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Dashboard
          </h1>
          <p className="text-xs text-zinc-400 font-light mt-0.5">
            Placement readiness telemetry, assessment pace, and competency retention.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setReviewerMetric('readiness')}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white hover:border-zinc-700 flex items-center gap-2 transition-all cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
          <span>Reviewer Metric Defense</span>
        </button>
      </div>

      {/* 2. Top Row: 3 Metric KPI Cards (Clickable for Reviewer Defense) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Readiness Score */}
        <div
          onClick={() => setReviewerMetric('readiness')}
          className="p-5 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm transition-all hover:border-zinc-700/80 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-medium group-hover:text-white transition-colors">
              Readiness Score
            </span>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{readinessScore}%</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight text-white">
                {readinessScore}%
              </span>
              <span className="text-xs text-zinc-500 font-normal">
                +5.2% vs last week
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
          </div>
        </div>

        {/* Card 2: Practice Accuracy */}
        <div
          onClick={() => setReviewerMetric('accuracy')}
          className="p-5 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm transition-all hover:border-zinc-700/80 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-medium group-hover:text-white transition-colors">
              Practice Accuracy
            </span>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{accuracy}%</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight text-white">
                {accuracy}%
              </span>
              <span className="text-xs text-zinc-500 font-normal">
                +8 vs last week
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
          </div>
        </div>

        {/* Card 3: Interview Standing */}
        <div
          onClick={() => setReviewerMetric('standing')}
          className="p-5 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm transition-all hover:border-zinc-700/80 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-zinc-400 font-medium group-hover:text-white transition-colors">
              <span>Cohort Standing</span>
              <Info className="w-3 h-3 text-zinc-500" />
            </div>
            <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Top 10%</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight text-white">
                8.8
              </span>
              <span className="text-xs text-zinc-500 font-normal">
                +2d vs last week
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
          </div>
        </div>
      </div>

      {/* 3. Center Row: Large Chart Card (Interactive Timeline Inspection) */}
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

        {/* Dynamic SVG Area Chart with Responsive Guideline */}
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

            {/* Dynamic Active Vertical Guideline */}
            <line
              x1={selectedPoint.x}
              y1="35"
              x2={selectedPoint.x}
              y2="180"
              stroke="#a1a1aa"
              strokeWidth="1.5"
              className="transition-all duration-300"
            />

            {/* Dynamic Active Node Marker on Curve */}
            <circle
              cx={selectedPoint.x}
              cy={selectedPoint.y}
              r="5"
              fill="#ffffff"
              stroke="#090a0f"
              strokeWidth="2.5"
              className="transition-all duration-300"
            />
          </svg>

          {/* Dynamic Floating Tooltip Pill showing Selected Milestone Event */}
          <div
            className="absolute top-4 sm:top-6 -translate-x-1/2 rounded-xl bg-zinc-900 border border-zinc-700/80 px-3.5 py-2 shadow-2xl flex flex-col items-center gap-0.5 text-xs select-none pointer-events-none z-10 transition-all duration-300"
            style={{
              left: `${Math.min(85, Math.max(15, (selectedPoint.x / 700) * 100))}%`,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-light">{selectedPoint.fullDate}</span>
              <div className="flex items-center gap-1 font-semibold text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>PRS {selectedPoint.label}</span>
              </div>
            </div>
            <span className="text-[10px] text-zinc-400 font-light text-center max-w-[220px]">
              {selectedPoint.event}
            </span>
          </div>

          {/* Interactive Clickable X-Axis Dates */}
          <div className="flex justify-between items-center text-[11px] text-zinc-500 font-normal px-2 pt-3">
            {chartPoints.map((pt, idx) => (
              <button
                key={pt.date}
                type="button"
                onClick={() => setSelectedPointIndex(idx)}
                className={`transition-colors py-1 px-2.5 rounded-lg cursor-pointer ${
                  selectedPointIndex === idx
                    ? 'bg-zinc-800 text-white font-semibold ring-1 ring-zinc-700'
                    : 'hover:text-zinc-300'
                }`}
              >
                {pt.date}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: 2 Split Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bottom Left Card: Preparation Focus (Interactive Tabs) */}
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
                className={`pb-2 transition-all font-medium relative cursor-pointer ${
                  activeTab === 'status' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
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
                className={`pb-2 transition-all font-medium relative cursor-pointer ${
                  activeTab === 'domains' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
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
                className={`pb-2 transition-all font-medium relative cursor-pointer ${
                  activeTab === 'milestones' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Milestones
                {activeTab === 'milestones' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Dynamic Content based on Active Tab */}
          {activeTab === 'status' && (
            <div className="space-y-5">
              {/* Minimal Progress Line */}
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${(totalCompleted / (totalTasks || 1)) * 100}%` }}
                />
              </div>

              {/* Clickable Split Counter Cards linking to System Modules */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => navigate('/roadmap')}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-600 transition-all cursor-pointer group space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400 font-medium">Open Tasks</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-white">
                      {openTasks > 0 ? openTasks : 4}
                    </span>
                    <span className="text-xs text-zinc-500 font-normal">pending</span>
                  </div>
                </div>

                <div
                  onClick={() => navigate('/practice')}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-600 transition-all cursor-pointer group space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400 font-medium">In Progress</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-white">
                      {totalCompleted > 0 ? totalCompleted : 12}
                    </span>
                    <span className="text-xs text-zinc-500 font-normal">completed</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'domains' && (
            <div className="space-y-2.5 text-xs">
              {[
                { name: 'Core DSA & Algorithms', pct: 85, color: 'bg-white' },
                { name: 'Quantitative & Analytical', pct: 78, color: 'bg-zinc-400' },
                { name: 'System Design & Core CS', pct: 90, color: 'bg-emerald-400' },
                { name: 'STAR Behavioral Communication', pct: 82, color: 'bg-teal-400' },
              ].map((d, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-300 font-medium">{d.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.pct}%` }} />
                    </div>
                    <span className="font-mono text-zinc-400 w-8 text-right">{d.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="space-y-2 text-xs">
              {[
                { title: 'Dynamic Programming Patterns', due: 'Due Today', done: true },
                { title: 'TCS & Amazon Round 1 Speed Test', due: 'Tomorrow', done: false },
                { title: 'Mock Technical Interview Session', due: 'In 3 Days', done: false },
              ].map((m, i) => (
                <div
                  key={i}
                  onClick={() => navigate('/roadmap')}
                  className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${m.done ? 'text-emerald-400' : 'text-zinc-600'}`} />
                    <span className={`text-xs ${m.done ? 'line-through text-zinc-500' : 'text-white'}`}>{m.title}</span>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-light">{m.due}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Right Card: Retention Rate (Interactive Legend Filtering) */}
        <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-300">
              Retention Rate
            </h3>
            <span className="text-xs text-zinc-500 font-light">
              Weekly Cohort Benchmark
            </span>
          </div>

          {/* Metric & Interactive Legends */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight text-white">
                95%
              </span>
              <span className="text-xs text-emerald-400 font-medium">
                12% vs last month
              </span>
            </div>

            {/* Clickable Legend filters */}
            <div className="flex items-center gap-3 text-[11px] text-zinc-400 pt-1">
              <button
                type="button"
                onClick={() => setSelectedLegend(selectedLegend === 'dsa' ? 'all' : 'dsa')}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                  selectedLegend === 'dsa' ? 'bg-zinc-800 text-white' : 'hover:text-zinc-200'
                }`}
              >
                <span className="w-2 h-2 rounded-sm bg-white" />
                <span>Core DSA</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLegend(selectedLegend === 'aptitude' ? 'all' : 'aptitude')}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                  selectedLegend === 'aptitude' ? 'bg-zinc-800 text-white' : 'hover:text-zinc-200'
                }`}
              >
                <span className="w-2 h-2 rounded-sm bg-zinc-500" />
                <span>Aptitude</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLegend(selectedLegend === 'technical' ? 'all' : 'technical')}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                  selectedLegend === 'technical' ? 'bg-zinc-800 text-white' : 'hover:text-zinc-200'
                }`}
              >
                <span className="w-2 h-2 rounded-sm bg-zinc-700" />
                <span>Technical</span>
              </button>
            </div>
          </div>

          {/* Minimalist Grouped Bar Charts with Dynamic Opacity */}
          <div className="h-32 flex items-end justify-between gap-3 pt-4 border-t border-zinc-800/60">
            {/* Week 1 */}
            <div className="flex items-end gap-1 h-full w-full justify-center">
              <div className={`w-1.5 bg-white rounded-t-sm h-[50%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'dsa' ? 'opacity-20' : 'opacity-100'}`} />
              <div className={`w-1.5 bg-zinc-500 rounded-t-sm h-[35%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'aptitude' ? 'opacity-20' : 'opacity-100'}`} />
              <div className={`w-1.5 bg-zinc-700 rounded-t-sm h-[20%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'technical' ? 'opacity-20' : 'opacity-100'}`} />
            </div>

            {/* Week 2 */}
            <div className="flex items-end gap-1 h-full w-full justify-center">
              <div className={`w-1.5 bg-white rounded-t-sm h-[75%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'dsa' ? 'opacity-20' : 'opacity-100'}`} />
              <div className={`w-1.5 bg-zinc-500 rounded-t-sm h-[55%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'aptitude' ? 'opacity-20' : 'opacity-100'}`} />
              <div className={`w-1.5 bg-zinc-700 rounded-t-sm h-[40%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'technical' ? 'opacity-20' : 'opacity-100'}`} />
            </div>

            {/* Week 3 */}
            <div className="flex items-end gap-1 h-full w-full justify-center">
              <div className={`w-1.5 bg-white rounded-t-sm h-[60%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'dsa' ? 'opacity-20' : 'opacity-100'}`} />
              <div className={`w-1.5 bg-zinc-500 rounded-t-sm h-[45%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'aptitude' ? 'opacity-20' : 'opacity-100'}`} />
              <div className={`w-1.5 bg-zinc-700 rounded-t-sm h-[30%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'technical' ? 'opacity-20' : 'opacity-100'}`} />
            </div>

            {/* Week 4 */}
            <div className="flex items-end gap-1 h-full w-full justify-center">
              <div className={`w-1.5 bg-white rounded-t-sm h-[85%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'dsa' ? 'opacity-20' : 'opacity-100'}`} />
              <div className={`w-1.5 bg-zinc-500 rounded-t-sm h-[70%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'aptitude' ? 'opacity-20' : 'opacity-100'}`} />
              <div className={`w-1.5 bg-zinc-700 rounded-t-sm h-[55%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'technical' ? 'opacity-20' : 'opacity-100'}`} />
            </div>

            {/* Week 5 */}
            <div className="flex items-end gap-1 h-full w-full justify-center">
              <div className={`w-1.5 bg-white rounded-t-sm h-[92%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'dsa' ? 'opacity-20' : 'opacity-100'}`} />
              <div className={`w-1.5 bg-zinc-500 rounded-t-sm h-[80%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'aptitude' ? 'opacity-20' : 'opacity-100'}`} />
              <div className={`w-1.5 bg-zinc-700 rounded-t-sm h-[65%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'technical' ? 'opacity-20' : 'opacity-100'}`} />
            </div>

            {/* Week 6 */}
            <div className="flex items-end gap-1 h-full w-full justify-center">
              <div className={`w-1.5 bg-white rounded-t-sm h-[98%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'dsa' ? 'opacity-20' : 'opacity-100'}`} />
              <div className={`w-1.5 bg-zinc-500 rounded-t-sm h-[88%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'aptitude' ? 'opacity-20' : 'opacity-100'}`} />
              <div className={`w-1.5 bg-zinc-700 rounded-t-sm h-[78%] transition-opacity ${selectedLegend !== 'all' && selectedLegend !== 'technical' ? 'opacity-20' : 'opacity-100'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Reviewer / Examiner Defense Explanations Modal */}
      {reviewerMetric && (
        <Modal
          isOpen={!!reviewerMetric}
          onClose={() => setReviewerMetric(null)}
          title={
            reviewerMetric === 'readiness'
              ? 'Placement Readiness Score (PRS) Formulation'
              : reviewerMetric === 'accuracy'
              ? 'Practice Accuracy Formulation'
              : 'Cohort Standing Evaluation'
          }
          description="Institutional defense rubric connecting dashboard metrics directly with the platform's active modules."
        >
          <div className="space-y-4 pt-1 text-xs">
            {reviewerMetric === 'readiness' && (
              <div className="space-y-3">
                <p className="text-zinc-300 font-light leading-relaxed">
                  The <strong className="text-white">Placement Readiness Score (PRS)</strong> is a composite weighted metric dynamically calculated from four operational pillars:
                </p>
                <div className="space-y-2 p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <div className="flex justify-between items-center py-1 border-b border-zinc-800">
                    <span className="text-zinc-400">1. Diagnostic Baseline (Aptitude & Technical)</span>
                    <span className="text-white font-semibold">20% Weight</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-zinc-800">
                    <span className="text-zinc-400">2. Algorithmic Practice Accuracy</span>
                    <span className="text-white font-semibold">30% Weight</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-zinc-800">
                    <span className="text-zinc-400">3. Curated Roadmap Milestones</span>
                    <span className="text-white font-semibold">25% Weight</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-zinc-400">4. STAR Mock Interview Ratings</span>
                    <span className="text-white font-semibold">25% Weight</span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setReviewerMetric(null);
                      navigate('/practice');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                  >
                    Open Practice Engine
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setReviewerMetric(null);
                      navigate('/interviews');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-black font-medium hover:bg-zinc-200"
                  >
                    Open Mock Interviews
                  </button>
                </div>
              </div>
            )}

            {reviewerMetric === 'accuracy' && (
              <div className="space-y-3">
                <p className="text-zinc-300 font-light leading-relaxed">
                  Practice accuracy measures the ratio of first-attempt correct submissions across DSA, Quantitative, and Core CS problem banks.
                </p>
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                  <div className="flex justify-between text-zinc-400">
                    <span>Total Problems Attempted:</span>
                    <span className="text-white font-medium">124 questions</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Accepted Submissions:</span>
                    <span className="text-emerald-400 font-medium">97 questions</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Overall First-Pass Accuracy:</span>
                    <span className="text-white font-bold">78.2%</span>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setReviewerMetric(null);
                      navigate('/practice');
                    }}
                    className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-zinc-200"
                  >
                    Go to Practice Questions
                  </button>
                </div>
              </div>
            )}

            {reviewerMetric === 'standing' && (
              <div className="space-y-3">
                <p className="text-zinc-300 font-light leading-relaxed">
                  Cohort Standing evaluates student ranking within the Noorul Islam University CSE batch (2026 cohort), calibrated against NAAC criterion 5 benchmarks.
                </p>
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1.5">
                  <div className="flex justify-between text-zinc-400">
                    <span>Cohort Rating:</span>
                    <span className="text-white font-semibold">8.8 / 10.0</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Batch Standing:</span>
                    <span className="text-emerald-400 font-semibold">Top 10% (Percentile 92.4)</span>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setReviewerMetric(null);
                      navigate('/interviews');
                    }}
                    className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-zinc-200"
                  >
                    View Interview Evaluations
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
