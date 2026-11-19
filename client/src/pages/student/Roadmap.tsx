import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/common/Modal';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Filter,
} from 'lucide-react';

export const Roadmap: React.FC = () => {
  const { refreshUser } = useAuth();
  const { showToast } = useNotifications();

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [completionPct, setCompletionPct] = useState(0);
  const [duration, setDuration] = useState(60);

  // Filters
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
    if (selectedWeek !== 'ALL' && t.weekNumber !== selectedWeek) return false;
    if (statusFilter === 'COMPLETED' && !t.completed) return false;
    if (statusFilter === 'PENDING' && t.completed) return false;
    return true;
  });

  const totalWeeks = Math.ceil(duration / 7) || 8;

  return (
    <div
      className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 select-none bg-[#090a0f] text-zinc-100 min-h-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. Header & Progress Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Curated Roadmap
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#111217] border border-zinc-800/80 text-xs flex items-center gap-2">
            <span className="text-zinc-400">Total Milestones:</span>
            <span className="font-semibold text-white">{tasks.length}</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-[#111217] border border-zinc-800/80 text-xs flex items-center gap-2">
            <span className="text-zinc-400">Completion:</span>
            <span className="font-semibold text-emerald-400">{completionPct}%</span>
          </div>
        </div>
      </div>

      {/* 2. Week Filter Pills & Status Filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Week Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedWeek('ALL')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedWeek === 'ALL'
                ? 'bg-white text-black font-medium shadow-sm'
                : 'bg-[#111217] text-zinc-400 hover:text-white border border-zinc-800/80'
            }`}
          >
            All Weeks
          </button>
          {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setSelectedWeek(w)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedWeek === w
                  ? 'bg-white text-black font-medium shadow-sm'
                  : 'bg-[#111217] text-zinc-400 hover:text-white border border-zinc-800/80'
              }`}
            >
              Week {w}
            </button>
          ))}
        </div>

        {/* Status Toggle */}
        <div className="flex items-center gap-1 bg-[#111217] p-1 rounded-xl border border-zinc-800/80 text-xs self-start md:self-auto">
          {(['ALL', 'PENDING', 'COMPLETED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-lg text-xs capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-zinc-800 text-white font-medium'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {st.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Task Milestones List */}
      <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-4">
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-6 h-6 border-2 border-zinc-500 border-t-white rounded-full animate-spin mx-auto" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="py-12 text-center text-xs text-zinc-500">
            No milestones found for the selected filter.
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/60">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleToggle(task.id)}
                    className="mt-0.5 text-zinc-500 hover:text-white transition-colors cursor-pointer shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-zinc-600 hover:text-zinc-400" />
                    )}
                  </button>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                        Week {task.weekNumber} • Day {task.dayNumber}
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase">
                        {task.category}
                      </span>
                    </div>

                    <h3
                      className={`text-xs sm:text-sm font-medium tracking-tight ${
                        task.completed ? 'line-through text-zinc-500' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 sm:self-center">
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1 font-light">
                    <Clock className="w-3 h-3 text-zinc-600" />
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Flexible'}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setRescheduleTaskId(task.id);
                      setNewDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/60 text-[11px] transition-colors cursor-pointer"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Reschedule Due Date */}
      <Modal
        isOpen={!!rescheduleTaskId}
        onClose={() => setRescheduleTaskId(null)}
        title="Reschedule Milestone Due Date"
      >
        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 font-medium">New Target Date</label>
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-zinc-600"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setRescheduleTaskId(null)}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRescheduleSubmit}
              className="px-5 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-medium cursor-pointer"
            >
              Update Due Date
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Roadmap;
