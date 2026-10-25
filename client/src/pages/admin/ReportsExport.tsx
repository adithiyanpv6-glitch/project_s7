import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Download,
  FileSpreadsheet,
  FileJson,
  ArrowLeft,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export const ReportsExport: React.FC = () => {
  const { showToast } = useNotifications();
  const [reportData, setReportData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await api.get<any>('/admin/export');
        setReportData(data.report || []);
      } catch (err: any) {
        showToast(err.message || 'Failed to generate report data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  const handleDownloadCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        ['Name', 'Email', 'College', 'Branch', 'CGPA', 'Readiness Score', 'Streak Days', 'Coding Solved', 'Tests Taken'].join(','),
        ...reportData.map((r) =>
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
    showToast('Downloaded Cohort CSV report!', 'success');
  };

  const handleDownloadJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(reportData, null, 2)
    )}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `PlacementPrep_Cohort_Report_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded Cohort JSON report!', 'success');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin" className="text-slate-400 hover:text-slate-600">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Institutional Reports & Accreditation Exports
            </h1>
            <Badge variant="brand" size="sm">Audit Ready</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Export comprehensive student placement readiness data for NAAC, NBA, and campus placement audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleDownloadCsv}>
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1" />
            Download CSV Format
          </Button>
          <Button size="sm" variant="outline" onClick={handleDownloadJson}>
            <FileJson className="w-3.5 h-3.5 mr-1" />
            Download JSON Format
          </Button>
        </div>
      </div>

      {/* Preview Table */}
      <Card className="space-y-4">
        <CardHeader>
          <CardTitle>Cohort Readiness Data Preview ({reportData.length} Records)</CardTitle>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 dark:bg-navy-950 text-slate-500 font-semibold border-b border-slate-200 dark:border-navy-800">
              <tr>
                <th className="py-2.5 px-3">Candidate</th>
                <th className="py-2.5 px-3">Branch</th>
                <th className="py-2.5 px-3">CGPA</th>
                <th className="py-2.5 px-3">Readiness</th>
                <th className="py-2.5 px-3">Streak</th>
                <th className="py-2.5 px-3">Coding Solved</th>
                <th className="py-2.5 px-3">Tests Attempted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">Loading export preview...</td>
                </tr>
              ) : (
                reportData.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-navy-800/40">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">{r.name}</div>
                      <div className="text-[11px] text-slate-400">{r.email}</div>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-700 dark:text-slate-300">{r.branch}</td>
                    <td className="py-3 px-3 font-mono font-bold">{r.cgpa}</td>
                    <td className="py-3 px-3 font-mono font-black text-emerald-600">{r.readinessScore}%</td>
                    <td className="py-3 px-3 font-mono">{r.streakDays}d 🔥</td>
                    <td className="py-3 px-3 font-mono">{r.solvedCodingCount} Qs</td>
                    <td className="py-3 px-3 font-mono">{r.testsTaken} Mocks</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
