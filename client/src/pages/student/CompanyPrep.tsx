import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Building2,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  BookOpen,
  FileCheck2,
  Save,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const CompanyPrep: React.FC = () => {
  const { showToast } = useNotifications();

  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('tcs');
  const [companyDetail, setCompanyDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [studentNote, setStudentNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  // Fetch companies list
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const data = await api.get<any[]>('/companies');
        setCompanies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // Fetch selected company details
  const fetchDetail = async (slug: string) => {
    try {
      setDetailLoading(true);
      const data = await api.get<any>(`/companies/${slug}`);
      setCompanyDetail(data);
      setStudentNote(data.studentNote || '');
    } catch (err) {
      console.error(err);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSlug) {
      fetchDetail(selectedSlug);
    }
  }, [selectedSlug]);

  const handleSaveNote = async () => {
    if (!companyDetail) return;
    setSavingNote(true);
    try {
      await api.post(`/companies/${companyDetail.id}/notes`, { content: studentNote });
      showToast('Preparation notes saved successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to save notes', 'error');
    } finally {
      setSavingNote(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
            Company-Specific Preparation Blueprints
          </h1>
          <Badge variant="brand" size="sm">10 Major Recruiters</Badge>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Targeted recruitment rounds, exam patterns, cutoff criteria, previous questions, and personal preparation notes.
        </p>
      </div>

      {/* Main Grid: Companies Tab Strip & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Company Selector Strip (3 cols) */}
        <div className="lg:col-span-3 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 block mb-2">
            Target Recruiters
          </span>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedSlug(c.slug)}
                className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                  selectedSlug === c.slug
                    ? 'bg-navy-900 border-navy-900 text-white dark:bg-brand-600 dark:border-brand-600 shadow-sm'
                    : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-navy-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div>
                  <span className="block">{c.name}</span>
                  <span className="text-[10px] font-normal opacity-70">{c.category}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: In-depth Company Profile & Notes (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {detailLoading || !companyDetail ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <>
              {/* Company Header Card */}
              <Card className="p-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {companyDetail.name}
                      </h2>
                      <Badge variant="brand" size="sm">{companyDetail.category}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {companyDetail.description}
                    </p>
                  </div>

                  <div className="shrink-0 p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-right">
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                      Salary Band (CTC)
                    </span>
                    <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                      {companyDetail.salaryRange}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Hiring Process Rounds */}
              <Card className="p-6 space-y-4">
                <CardHeader>
                  <CardTitle>Recruitment Process & Hiring Rounds</CardTitle>
                  <Badge variant="neutral" size="sm">
                    {companyDetail.hiringProcess?.length || 3} Stages
                  </Badge>
                </CardHeader>

                <div className="space-y-3">
                  {companyDetail.hiringProcess?.map((round: any) => (
                    <div
                      key={round.round}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-navy-900 text-white dark:bg-brand-600 text-[10px] flex items-center justify-center font-bold">
                            {round.round}
                          </span>
                          {round.name}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span>{round.format}</span>
                          <span>•</span>
                          <span>{round.duration}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 pl-6.5 pt-0.5 leading-relaxed">
                        {round.details}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Exam Pattern & Cutoffs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-5 space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Online Exam Pattern
                  </h3>
                  <div className="space-y-2 text-xs">
                    {companyDetail.examPattern?.sections?.map((sec: any, i: number) => (
                      <div
                        key={i}
                        className="p-2.5 rounded bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 flex justify-between"
                      >
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{sec.name}</span>
                        <span className="text-slate-500 font-mono text-[11px]">
                          {sec.questions} Qs | {sec.timeMinutes}m
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-5 space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Eligibility & Cutoff Criteria
                  </h3>
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between border-b border-slate-100 dark:border-navy-800 pb-1.5">
                      <span>Minimum CGPA Required:</span>
                      <strong className="text-slate-900 dark:text-white">
                        {companyDetail.eligibility?.minCgpa || 6.0} CGPA
                      </strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 dark:border-navy-800 pb-1.5">
                      <span>Active Backlogs Allowed:</span>
                      <strong className="text-slate-900 dark:text-white">
                        {companyDetail.eligibility?.backlogsAllowed || 0}
                      </strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900 text-[11px] text-brand-900 dark:text-brand-200">
                      <strong>Cutoff Note:</strong> {companyDetail.cutoffDetails?.notes}
                    </div>
                  </div>
                </Card>
              </div>

              {/* High-Yield Topics & Interview Themes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-5 space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Priority Syllabus Topics
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {companyDetail.importantTopics?.map((top: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{top}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-5 space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Core Technical & HR Themes
                  </h3>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {companyDetail.interviewThemes?.map((thm: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-brand-500 font-bold">•</span>
                        <span>{thm}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Student Personal Preparation Notes */}
              <Card className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-600" />
                    <CardTitle>My Personal {companyDetail.name} Notes</CardTitle>
                  </div>
                  <Button size="sm" onClick={handleSaveNote} isLoading={savingNote}>
                    <Save className="w-3.5 h-3.5 mr-1" />
                    Save Notes
                  </Button>
                </div>
                <textarea
                  rows={4}
                  value={studentNote}
                  onChange={(e) => setStudentNote(e.target.value)}
                  placeholder={`Write down your personal prep notes, specific project talking points, or company trivia for ${companyDetail.name}...`}
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed font-sans"
                />
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
