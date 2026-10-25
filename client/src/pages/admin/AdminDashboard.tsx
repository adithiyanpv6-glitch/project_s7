import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import {
  Users,
  Award,
  TrendingUp,
  FileCheck2,
  Download,
  Search,
  Database,
  Shield,
  ArrowRight,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { showToast } = useNotifications();

  const [stats, setStats] = useState<any | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resStats, resStudents] = await Promise.all([
        api.get<any>('/admin/stats'),
        api.get<any>(`/admin/students?search=${encodeURIComponent(search)}`),
      ]);
      setStats(resStats);
      setStudents(resStudents.students || []);
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to load admin analytics', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleExportCsv = async () => {
    try {
      const res = await api.get<any>('/admin/export');
      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [
          ['Name', 'Email', 'College', 'Branch', 'CGPA', 'Readiness Score', 'Streak Days', 'Coding Solved', 'Tests Taken'].join(','),
          ...res.report.map((r: any) =>
            [
              `"${r.name}"`,
              `"${r.email}"`,
              `"${r.college}"`,
              `"${r.branch}"`,
              r.cgpa,
              r.readinessScore,
              r.streakDays,
              r.solvedCodingCount,
              r.testsTaken,
            ].join(',')
          ),
        ].join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `PlacementPrep_Cohort_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Exported cohort report CSV!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Export failed', 'error');
    }
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Placement Officer (TPO) & Admin Command Center
            </h1>
            <Badge variant="brand" size="sm">Institution Suite</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time cohort readiness analytics, student tracking, question bank administration, and accreditation reporting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleExportCsv}>
            <Download className="w-3.5 h-3.5 mr-1" />
            Export Cohort CSV
          </Button>
          <Link to="/admin/questions">
            <Button size="sm">
              <Database className="w-3.5 h-3.5 mr-1" />
              Manage Question Bank
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats?.totalStudents || 4}
            </div>
            <span className="text-xs text-slate-500 font-medium">Registered Candidates</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-600">
              {stats?.avgReadiness || 80.8}%
            </div>
            <span className="text-xs text-slate-500 font-medium">Cohort Avg Readiness</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats?.totalQuestions || 184}
            </div>
            <span className="text-xs text-slate-500 font-medium">Questions in Bank</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center shrink-0">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats?.totalMockTests || 5} Tests
            </div>
            <span className="text-xs text-slate-500 font-medium">Published Mocks</span>
          </div>
        </Card>
      </div>

      {/* Cohort Readiness Distribution & Branch Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Cohort Readiness Tier Distribution</CardTitle>
            <Badge variant="neutral" size="sm">Cutoff Readiness</Badge>
          </CardHeader>

          <div className="space-y-3 font-sans text-xs">
            {stats?.readinessBands &&
              Object.entries(stats.readinessBands).map(([band, count]: any, i) => (
                <div key={band} className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span>{band}</span>
                    <span className="text-slate-900 dark:text-white">{count} Students</span>
                  </div>
                  <ProgressBar
                    value={(count / (stats.totalStudents || 1)) * 100}
                    color={i === 0 ? 'emerald' : i === 1 ? 'brand' : 'amber'}
                    size="sm"
                  />
                </div>
              ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Department & Branch Participation</CardTitle>
            <Badge variant="neutral" size="sm">Enrollments</Badge>
          </CardHeader>

          <div className="space-y-2.5 text-xs font-sans">
            {stats?.branchCounts &&
              Object.entries(stats.branchCounts).map(([branch, count]: any) => (
                <div
                  key={branch}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 flex justify-between items-center"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{branch}</span>
                  <Badge variant="brand" size="sm">{count} Students</Badge>
                </div>
              ))}
          </div>
        </Card>
      </div>

      {/* Student Cohort Table */}
      <Card className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-navy-800">
          <div>
            <CardTitle>Student Readiness Roster</CardTitle>
            <p className="text-xs text-slate-500">Live individual placement readiness metrics</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidate by name..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 dark:bg-navy-950 text-slate-500 font-semibold border-b border-slate-200 dark:border-navy-800">
              <tr>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Branch</th>
                <th className="py-2.5 px-3">CGPA</th>
                <th className="py-2.5 px-3">Streak</th>
                <th className="py-2.5 px-3">Readiness Score</th>
                <th className="py-2.5 px-3">Target Recruiters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-navy-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 dark:text-white">{s.name}</div>
                    <div className="text-[11px] text-slate-400">{s.email}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-medium">
                    {s.branch}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                    {s.cgpa}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className="text-amber-600 font-semibold">{s.streakDays}d 🔥</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-black font-mono text-sm ${
                          s.readinessScore >= 80
                            ? 'text-emerald-600'
                            : s.readinessScore >= 65
                            ? 'text-brand-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {s.readinessScore}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1">
                      {s.targetCompanies?.slice(0, 3).map((comp: string) => (
                        <span
                          key={comp}
                          className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
