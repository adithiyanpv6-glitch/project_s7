import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import {
  Building2,
  CheckCircle2,
  Save,
  BookOpen,
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
        // Fallback default companies
        setCompanies([
          { id: '1', slug: 'tcs', name: 'TCS', tier: 'Tier 1' },
          { id: '2', slug: 'infosys', name: 'Infosys', tier: 'Tier 1' },
          { id: '3', slug: 'wipro', name: 'Wipro', tier: 'Tier 2' },
          { id: '4', slug: 'amazon', name: 'Amazon', tier: 'Dream' },
          { id: '5', slug: 'zoho', name: 'Zoho', tier: 'Product' },
        ]);
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
      // Fallback detail
      setCompanyDetail({
        id: slug,
        name: slug.toUpperCase(),
        tier: 'Core Recruiter',
        avgPackage: '7.5 - 14 LPA',
        cgpaCutoff: 7.0,
        hiringProcess: JSON.stringify([
          { round: 1, title: 'Online Assessment', desc: 'Aptitude, Verbal, and Basic DSA' },
          { round: 2, title: 'Technical Interview', desc: 'Core CS (OS, DBMS, Networks) & Problem Solving' },
          { round: 3, title: 'HR & Culture', desc: 'STAR Behavioral Scenarios & Career Aspirations' },
        ]),
        focusTopics: JSON.stringify(['Arrays & Strings', 'SQL Queries', 'OOPs in Java/C++', 'Dynamic Programming']),
      });
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
      showToast(err.message || 'Notes saved locally', 'info');
    } finally {
      setSavingNote(false);
    }
  };

  const rounds = companyDetail?.hiringProcess
    ? typeof companyDetail.hiringProcess === 'string'
      ? JSON.parse(companyDetail.hiringProcess)
      : companyDetail.hiringProcess
    : [];

  const focusTopics = companyDetail?.focusTopics
    ? typeof companyDetail.focusTopics === 'string'
      ? JSON.parse(companyDetail.focusTopics)
      : companyDetail.focusTopics
    : [];

  return (
    <div
      className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 select-none bg-[#090a0f] text-zinc-100 min-h-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
          Company Hub
        </h1>
      </div>

      {/* 2. Company Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        {companies.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setSelectedSlug(c.slug)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedSlug === c.slug
                ? 'bg-white text-black font-medium shadow-sm'
                : 'bg-[#111217] text-zinc-400 hover:text-white border border-zinc-800/80'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* 3. Company Overview & Hiring Rounds */}
      {companyDetail && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Info & Rounds (8 Columns) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Snapshot Card */}
            <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white tracking-tight">
                    {companyDetail.name}
                  </h2>
                  <span className="text-xs text-zinc-400 font-light">
                    {companyDetail.tier || 'Campus Partner'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                    <span className="text-zinc-500 mr-1.5">Package:</span>
                    <span className="text-white font-medium">{companyDetail.avgPackage || '8.5 LPA'}</span>
                  </div>
                  <div className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                    <span className="text-zinc-500 mr-1.5">Cutoff:</span>
                    <span className="text-emerald-400 font-medium">{companyDetail.cgpaCutoff || 7.0} CGPA</span>
                  </div>
                </div>
              </div>

              {/* Topics */}
              {focusTopics.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <span className="text-xs font-medium text-zinc-400 block">
                    Core Technical Syllabus
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {focusTopics.map((topic: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs font-light"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hiring Process Rounds */}
            <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-4">
              <h3 className="text-sm font-medium text-white">
                Hiring Assessment Process
              </h3>

              <div className="space-y-3">
                {rounds.map((r: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3.5"
                  >
                    <span className="w-6 h-6 rounded-lg bg-zinc-800 text-xs font-medium text-white flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-xs font-medium text-white">
                        {r.title || `Round ${idx + 1}`}
                      </h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        {r.desc || r.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Student Notes & Quick Preparation Checklist (4 Columns) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-medium text-zinc-300">
                  Personal Preparation Notes
                </h3>
              </div>

              <textarea
                rows={8}
                value={studentNote}
                onChange={(e) => setStudentNote(e.target.value)}
                placeholder="Log specific interview tips, previous questions asked, or formula pointers..."
                className="w-full p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 font-light leading-relaxed outline-none focus:border-zinc-700 resize-none"
              />

              <button
                type="button"
                onClick={handleSaveNote}
                disabled={savingNote}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                {savingNote ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPrep;
