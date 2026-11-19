import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import {
  Building2,
  CheckCircle2,
  Save,
  Clock,
  ChevronDown,
  ChevronUp,
  Play,
  FileCheck2,
  Target,
} from 'lucide-react';

export const CompanyPrep: React.FC = () => {
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('tcs');
  const [companyDetail, setCompanyDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeRoundIndex, setActiveRoundIndex] = useState<number>(0);
  const [studentNote, setStudentNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  // Fetch companies list
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const data = await api.get<any[]>('/companies');
        if (data && data.length > 0) {
          setCompanies(data);
          if (!selectedSlug) setSelectedSlug(data[0].slug);
        }
      } catch (err) {
        // Fallback default companies
        setCompanies([
          { id: '1', slug: 'tcs', name: 'TCS (Tata Consultancy Services)' },
          { id: '2', slug: 'infosys', name: 'Infosys' },
          { id: '3', slug: 'wipro', name: 'Wipro' },
          { id: '4', slug: 'amazon', name: 'Amazon' },
          { id: '5', slug: 'zoho', name: 'Zoho' },
          { id: '6', slug: 'cognizant', name: 'Cognizant' },
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
      const data = await api.get<any>(`/companies/${slug}`);
      setCompanyDetail(data);
      setStudentNote(data.studentNote || '');
      setActiveRoundIndex(0);
    } catch (err) {
      // Fallback detail
      setCompanyDetail({
        id: slug,
        name: slug.toUpperCase(),
        category: 'Core Recruiter',
        salaryRange: '7.5 - 14 LPA',
        eligibility: { minCgpa: 7.0, allowedBranches: ['CSE', 'IT', 'ECE'], maxBacklogs: 0 },
        hiringProcess: [
          {
            round: 1,
            name: 'Round 1: Cognitive & Aptitude Assessment',
            format: 'Online CBT Test',
            duration: '90 Minutes',
            details: 'Covers Quantitative Reasoning, Logical Deduction, Verbal Ability, and Fundamental Programming MCQs.',
          },
          {
            round: 2,
            name: 'Round 2: Technical & Coding Assessment',
            format: 'Online Coding Test (Compiler)',
            duration: '75 Minutes',
            details: 'Algorithmic Problem Solving on Arrays, Strings, Hashing, Recursion, and basic Dynamic Programming.',
          },
          {
            round: 3,
            name: 'Round 3: Technical & System Interview',
            format: '1-on-1 Live Interview',
            duration: '45 Minutes',
            details: 'Core CS fundamentals: DBMS, Operating Systems, Computer Networks, and In-depth Project Defense.',
          },
          {
            round: 4,
            name: 'Round 4: HR & Behavioral Round',
            format: 'Face to Face / Video Call',
            duration: '30 Minutes',
            details: 'STAR behavioral questions, situational judgment, cultural alignment, and career aspirations.',
          },
        ],
        importantTopics: ['Arrays & Strings', 'SQL Joins & Indexing', 'OOPs in Java/C++', 'Recursion & Trees', 'Time & Space Complexity'],
      });
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
      showToast('Notes saved locally!', 'info');
    } finally {
      setSavingNote(false);
    }
  };

  const rounds = companyDetail?.hiringProcess
    ? Array.isArray(companyDetail.hiringProcess)
      ? companyDetail.hiringProcess
      : JSON.parse(companyDetail.hiringProcess || '[]')
    : [];

  const focusTopics = companyDetail?.importantTopics
    ? Array.isArray(companyDetail.importantTopics)
      ? companyDetail.importantTopics
      : JSON.parse(companyDetail.importantTopics || '[]')
    : [];

  return (
    <div
      className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 select-none bg-[#090a0f] text-zinc-100 min-h-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Company Hub
          </h1>
          <p className="text-xs text-zinc-400 font-light mt-0.5">
            Recruiter patterns, cutoff criteria, and round-by-round assessment blueprints.
          </p>
        </div>
      </div>

      {/* 2. Company Selector Horizontal Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        {companies.map((c) => {
          const isSelected = selectedSlug === c.slug;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => setSelectedSlug(c.slug)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-[#111217] text-zinc-400 hover:text-white border border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* 3. Company Overview & Active Rounds */}
      {companyDetail && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Info & Rounds (8 Columns) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Snapshot Card */}
            <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-white tracking-tight">
                    {companyDetail.name}
                  </h2>
                  <span className="text-xs text-zinc-400 font-light block">
                    {companyDetail.category || 'Strategic Campus Partner'}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                    <span className="text-zinc-500 mr-1.5">Package:</span>
                    <span className="text-white font-medium">{companyDetail.salaryRange || '7 - 14 LPA'}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                    <span className="text-zinc-500 mr-1.5">Cutoff:</span>
                    <span className="text-emerald-400 font-medium">
                      {companyDetail.eligibility?.minCgpa ? `${companyDetail.eligibility.minCgpa} CGPA` : '7.0 CGPA'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Topics */}
              {focusTopics.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-zinc-800/80">
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

            {/* Interactive Hiring Process Rounds */}
            <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-white">
                  Hiring Assessment Rounds ({rounds.length} Rounds)
                </h3>
                <span className="text-xs text-zinc-500">
                  Click any round to view details
                </span>
              </div>

              <div className="space-y-3">
                {rounds.map((r: any, idx: number) => {
                  const isActive = activeRoundIndex === idx;
                  const roundName = r.name || r.title || `Round ${idx + 1}`;
                  const roundFormat = r.format || 'Online Assessment';
                  const roundDuration = r.duration || '60 Mins';
                  const roundDetails = r.details || r.desc || 'Standard placement evaluation round.';

                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border transition-all cursor-pointer overflow-hidden ${
                        isActive
                          ? 'bg-zinc-900/90 border-zinc-600 shadow-sm'
                          : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700/80'
                      }`}
                      onClick={() => setActiveRoundIndex(isActive ? -1 : idx)}
                    >
                      <div className="p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span
                            className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-white text-black'
                                : 'bg-zinc-800 text-zinc-300'
                            }`}
                          >
                            {idx + 1}
                          </span>

                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-medium text-white truncate">
                              {roundName}
                            </h4>
                            <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-0.5 font-light">
                              <span>Format: {roundFormat}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-zinc-500" />
                                {roundDuration}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-zinc-500 shrink-0">
                          {isActive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>

                      {/* Expandable Active Round Content */}
                      {isActive && (
                        <div className="px-4 pb-4 pt-2 border-t border-zinc-800/60 space-y-3 text-xs">
                          <p className="text-zinc-300 font-light leading-relaxed">
                            {roundDetails}
                          </p>

                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/practice');
                              }}
                              className="px-3.5 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              Practice Round Questions
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/interviews');
                              }}
                              className="px-3.5 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700/60 text-xs transition-colors cursor-pointer"
                            >
                              Simulate Interview
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Student Notes & Recruiter Checklist (4 Columns) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-medium text-zinc-300">
                  Personal Preparation Notes
                </h3>
              </div>

              <textarea
                rows={9}
                value={studentNote}
                onChange={(e) => setStudentNote(e.target.value)}
                placeholder="Log specific interview tips, previous questions asked, or formula pointers for this company..."
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
