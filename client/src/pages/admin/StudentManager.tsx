import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Modal } from '../../components/common/Modal';
import {
  Users,
  Search,
  Filter,
  ArrowLeft,
  Mail,
  Building2,
  Calendar,
  Award,
  Sparkles,
  CheckCircle2,
  Send,
} from 'lucide-react';

export const StudentManager: React.FC = () => {
  const { showToast } = useNotifications();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get<any>(`/admin/students?search=${encodeURIComponent(search)}`);
      setStudents(res.students || []);
    } catch (err: any) {
      showToast(err.message || 'Failed to load students', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const branches = ['ALL', ...Array.from(new Set(students.map((s) => s.branch).filter(Boolean)))];

  const filteredStudents = students.filter((s) => {
    if (selectedBranch !== 'ALL' && s.branch !== selectedBranch) return false;
    return true;
  });

  const handleSendReminder = (student: any) => {
    showToast(`Study reminder dispatched to ${student.name} (${student.email})`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Student Cohort Directory
            </h1>
            <Badge variant="brand" size="sm">Active Batch</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitor individual student readiness milestones, target companies, and intervene for students needing placement support.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/admin/reports">
            <Button size="sm" variant="outline">
              Export Roster
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name or email..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-500">Branch:</span>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {branches.map((b) => (
              <option key={b} value={b}>
                {b === 'ALL' ? 'All Departments' : b}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-400">Loading student cohort...</div>
        ) : filteredStudents.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400">No students found matching your filters.</div>
        ) : (
          filteredStudents.map((s) => (
            <Card key={s.id} className="flex flex-col justify-between hover:border-brand-200 dark:hover:border-brand-800 transition-all">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-navy-950 dark:text-white">{s.name}</h3>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" />
                      <span>{s.email}</span>
                    </div>
                  </div>
                  <Badge
                    variant={s.readinessScore >= 80 ? 'success' : s.readinessScore >= 60 ? 'brand' : 'warning'}
                    size="sm"
                  >
                    {s.readinessScore}% Score
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 dark:border-navy-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Department</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{s.branch}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">CGPA</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{s.cgpa}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Practice Streak</span>
                    <span className="font-mono font-semibold text-amber-600">{s.streakDays} Days 🔥</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Graduation</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Class of {s.graduationYear || 2026}</span>
                  </div>
                </div>

                {/* Target Companies */}
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Target Recruiters</span>
                  <div className="flex flex-wrap gap-1">
                    {s.targetCompanies?.slice(0, 3).map((comp: string) => (
                      <span
                        key={comp}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {comp}
                      </span>
                    ))}
                    {(s.targetCompanies?.length || 0) > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-navy-800 text-slate-400">
                        +{s.targetCompanies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
                <Button size="sm" variant="ghost" onClick={() => setSelectedStudent(s)}>
                  View Profile
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleSendReminder(s)}>
                  <Send className="w-3 h-3 mr-1" />
                  Nudge
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Candidate Profile: ${selectedStudent.name}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs font-sans">
            <div className="p-3 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-slate-400 block">College</span>
                <span className="font-bold">{selectedStudent.college}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Branch</span>
                <span className="font-bold">{selectedStudent.branch}</span>
              </div>
              <div>
                <span className="text-slate-400 block">CGPA</span>
                <span className="font-mono font-bold">{selectedStudent.cgpa}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Readiness Score</span>
                <span className="font-mono font-black text-emerald-600 text-sm">
                  {selectedStudent.readinessScore}%
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Target Placements</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.targetCompanies?.map((comp: string) => (
                  <Badge key={comp} variant="brand" size="sm">
                    {comp}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Daily Study Commitment</h4>
              <p className="text-slate-600 dark:text-slate-400">
                {selectedStudent.dailyTimeMinutes || 90} minutes scheduled per day.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-navy-800 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
              <Button size="sm" onClick={() => { handleSendReminder(selectedStudent); setSelectedStudent(null); }}>
                Dispatch Study Plan Nudge
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
