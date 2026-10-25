import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Modal } from '../../components/common/Modal';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Filter,
  Sparkles,
  CalendarDays,
  Target,
  ChevronRight,
} from 'lucide-react';

export const Roadmap: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useNotifications();

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [completionPct, setCompletionPct] = useState(0);
  const [duration, setDuration] = useState(60);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedWeek, setSelectedWeek] = useState<number | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED'>('ALL');

  // Reschedule Modal
  const [rescheduleTaskId, setRescheduleTaskId] = useState<string | null>(null);
  const [newDueDate, setNewDueDate] = useState('');

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      const res = await api.get<any>('/student/roadmap');
      setTasks(res.tasks || []);
      setCompletionPct(res.percentage || 0);
      setDuration(res.roadmapDuration || 60);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const handleToggle = async (taskId: string) => {
    try {
      const res = await api.patch<any>(`/student/roadmap/${taskId}/toggle`);
      showToast(res.message, 'success');
      await fetchRoadmap();
      await refreshUser();
    } catch (err: any) {
      showToast(err.message || 'Failed to update task', 'error');
    }
  };

  const handleRescheduleSubmit = async () => {
    if (!rescheduleTaskId || !newDueDate) return;
    try {
      await api.patch<any>(`/student/roadmap/${rescheduleTaskId}/reschedule`, { newDueDate });
      showToast('Task rescheduled successfully!', 'success');
      setRescheduleTaskId(null);
      await fetchRoadmap();
    } catch (err: any) {
      showToast(err.message || 'Reschedule failed', 'error');
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (selectedCategory !== 'ALL' && t.category !== selectedCategory) return false;
    if (selectedWeek !== 'ALL' && t.weekNumber !== selectedWeek) return false;
    if (statusFilter === 'COMPLETED' && !t.completed) return false;
    if (statusFilter === 'PENDING' && t.completed) return false;
    return true;
  });

  const totalWeeks = Math.ceil(duration / 7);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'QUANTITATIVE':
        return <Badge variant="brand">Quantitative</Badge>;
      case 'DSA':
        return <Badge variant="brand">DSA & Coding</Badge>;
      case 'CORE_CS':
        return <Badge variant="neutral">Core CS</Badge>;
      case 'LOGICAL':
        return <Badge variant="warning">Logical</Badge>;
      case 'VERBAL':
        return <Badge variant="outline">Verbal</Badge>;
      case 'HR_INTERVIEW':
        return <Badge variant="success">Interview Prep</Badge>;
      case 'RESUME':
        return <Badge variant="brand">Resume ATS</Badge>;
      case 'COMPANY_SPECIFIC':
        return <Badge variant="neutral">Company Target</Badge>;
      case 'MOCK_TEST':
        return <Badge variant="error">Mock Test</Badge>;
      default:
        return <Badge variant="neutral">{cat}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner & Progress */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
                Personalized {duration}-Day Preparation Roadmap
              </h1>
              <Badge variant="brand" size="sm">Adaptive Schedule</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Systematic daily and weekly milestones calibrated to your placement goals and diagnostic strengths.
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
              {completionPct}%
            </span>
            <span className="text-xs text-slate-400 block font-medium">Roadmap Completed</span>
          </div>
        </div>

        <ProgressBar value={completionPct} size="md" color="brand" />

        {/* Milestone Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-xs">
            <span className="text-slate-500 block">Total Days</span>
            <span className="font-bold text-slate-900 dark:text-white">{duration} Days</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-xs">
            <span className="text-slate-500 block">Completed Tasks</span>
            <span className="font-bold text-emerald-600">{tasks.filter((t) => t.completed).length} Tasks</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-xs">
            <span className="text-slate-500 block">Pending Tasks</span>
            <span className="font-bold text-amber-600">{tasks.filter((t) => !t.completed).length} Tasks</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-xs">
            <span className="text-slate-500 block">Current Milestone</span>
            <span className="font-bold text-brand-600">Week 3: Core CS & Trees</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'ALL', label: 'All Categories' },
            { id: 'QUANTITATIVE', label: 'Quantitative' },
            { id: 'DSA', label: 'DSA / Coding' },
            { id: 'CORE_CS', label: 'Core CS' },
            { id: 'LOGICAL', label: 'Logical' },
            { id: 'HR_INTERVIEW', label: 'HR / STAR' },
            { id: 'COMPANY_SPECIFIC', label: 'Company Target' },
            { id: 'MOCK_TEST', label: 'Mock Tests' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-navy-900 text-white dark:bg-brand-600'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status Dropdown & Week Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending Only</option>
            <option value="COMPLETED">Completed Only</option>
          </select>

          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
            className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="ALL">All Weeks</option>
            {Array.from({ length: totalWeeks }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Week {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="p-8 text-center text-xs text-slate-500">
            No roadmap tasks match the selected filters.
          </Card>
        ) : (
          filteredTasks.map((t) => (
            <Card
              key={t.id}
              className={`p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                t.completed
                  ? 'bg-slate-50/70 dark:bg-navy-950/40 opacity-80'
                  : 'hover:border-slate-300 dark:hover:border-navy-700'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => handleToggle(t.id)}
                  className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {t.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                      Day {t.dayNumber} (Week {t.weekNumber})
                    </span>
                    {getCategoryBadge(t.category)}
                    <h3
                      className={`text-sm font-semibold text-slate-900 dark:text-white ${
                        t.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
                      }`}
                    >
                      {t.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.description}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3 text-brand-500" />
                      Target: {t.targetCount} Items
                    </span>
                    {t.dueDate && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Due: {new Date(t.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setRescheduleTaskId(t.id);
                    setNewDueDate(t.dueDate ? t.dueDate.split('T')[0] : '');
                  }}
                  className="text-xs"
                >
                  Reschedule
                </Button>
                <Button
                  size="sm"
                  variant={t.completed ? 'outline' : 'primary'}
                  onClick={() => handleToggle(t.id)}
                  className="text-xs"
                >
                  {t.completed ? 'Reopen' : 'Mark Done'}
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Reschedule Modal */}
      <Modal
        isOpen={!!rescheduleTaskId}
        onClose={() => setRescheduleTaskId(null)}
        title="Reschedule Roadmap Task"
        description="Select a new target deadline for this preparation task."
      >
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              New Due Date
            </label>
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setRescheduleTaskId(null)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleRescheduleSubmit}>
              Save New Date
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
