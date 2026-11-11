import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { NICHE_BRAND } from '../../constants/nicheBrand';
import {
  Compass,
  Calendar,
  CheckCircle2,
  Code2,
  FileCheck2,
  Video,
  FileText,
  Building2,
  ArrowRight,
  GraduationCap,
  Users,
  ShieldCheck,
  ChevronDown,
  Monitor,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Camera,
  Play,
  Award,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { user, switchRoleDemo } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'coding' | 'interview' | 'resume'>('diagnostic');
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunchOS = async (role: 'STUDENT' | 'ADMIN' = 'STUDENT') => {
    setIsLaunching(true);
    try {
      if (!user) {
        await switchRoleDemo(role);
      }
      navigate('/dashboard');
    } catch (e) {
      navigate('/login');
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-slate-200 dark:selection:bg-slate-800">
      
      {/* 1. TOP STATUTORY & UNIVERSITY BANNER */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-wide uppercase">
              Noorul Islam Centre for Higher Education
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">
              Deemed to be University under Section 3 of UGC Act 1956
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-mono">
            <span className="text-teal-400 font-semibold">NAAC 'A' ACCREDITED</span>
            <span>•</span>
            <span className="text-slate-300">AICTE APPROVED</span>
            <span>•</span>
            <span className="text-slate-400 hidden md:inline">KUMARACOIL, TAMIL NADU</span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION HEADER: Quiet, standard height 56px, clean border */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={NICHE_BRAND.images.logo}
              alt="NICHE University Logo"
              className="w-8 h-8 object-contain rounded bg-white p-0.5 border border-slate-200 dark:border-slate-800"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-sm tracking-tight text-slate-900 dark:text-white">
                NICHE PlacementOS
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Dept. of CSE
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <a href="#os-preview" className="hover:text-slate-900 dark:hover:text-white transition-colors">OS Desktop</a>
            <a href="#facilities" className="hover:text-slate-900 dark:hover:text-white transition-colors">Campus Labs</a>
            <a href="#recruiters" className="hover:text-slate-900 dark:hover:text-white transition-colors">Recruiters</a>
            <a href="#accreditation" className="hover:text-slate-900 dark:hover:text-white transition-colors">Accreditations</a>
            <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => handleLaunchOS('STUDENT')} disabled={isLaunching}>
              <Play className="w-3.5 h-3.5 mr-1 fill-current" />
              {isLaunching ? 'Booting OS...' : 'Launch PlacementOS'}
            </Button>
            {!user && (
              <Button variant="ghost" size="sm" onClick={() => handleLaunchOS('ADMIN')} title="TPO Admin Demo">
                TPO Console
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION: Unslop Asymmetric Split with Authentic Campus Backdrop */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Specific Copy, no exclamation marks, calm space */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded border border-slate-200 dark:border-slate-700">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span>Noorul Islam Centre for Higher Education • Institutional Placement OS</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.14]">
                An institutional operating system for campus placements.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                Engineered specifically for Noorul Islam Centre for Higher Education (NICHE University). Combines continuous Placement Readiness Scoring (PRS), LeetCode-grade algorithmic assessments, real-time ATS resume auditing, and autonomous STAR interview training into a page-wise operating environment.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button size="lg" onClick={() => handleLaunchOS('STUDENT')} disabled={isLaunching}>
                  Launch NICHE PlacementOS <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => handleLaunchOS('ADMIN')}>
                  TPO Admin Console
                </Button>
              </div>

              {/* Factual Institutional Metrics: Tabular numerals */}
              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-semibold font-mono text-slate-900 dark:text-white tabular-nums">
                    {NICHE_BRAND.stats.placementPercentage}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Placement conversion</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold font-mono text-slate-900 dark:text-white tabular-nums">
                    {NICHE_BRAND.stats.highestPackage}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Highest package</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold font-mono text-slate-900 dark:text-white tabular-nums">
                    {NICHE_BRAND.stats.activeRecruiters}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Active recruiters</div>
                </div>
              </div>
            </div>

            {/* Right Column: Campus Aerial & Institutional Card */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-xs">
                {/* Genuine Campus Facade Photo */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
                  <img
                    src={NICHE_BRAND.images.campus}
                    alt="NICHE University Campus at Kumaracoil"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                    <div className="font-semibold">Main Campus Facade & Academic Towers</div>
                    <div className="text-[11px] text-slate-300">Kumaracoil, Thuckalay • Kanyakumari District</div>
                  </div>
                </div>

                {/* Statutory Badges Strip */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Institutional Accreditations & Recognitions
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {NICHE_BRAND.approvals.map((appr) => (
                      <div
                        key={appr.name}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                        <span className="text-[11px] font-medium">{appr.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE OS DESKTOP PREVIEW SECTION */}
      <section id="os-preview" className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase text-teal-600 dark:text-teal-400 tracking-wider">
              Page-wise Operating System
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              A unified workstation for students & placement officers.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Zero context switching. Every assessment, compiler, diagnostic score, and ATS auditor lives in a dedicated OS window.
            </p>
          </div>

          {/* OS Window Frame Mockup */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            {/* System Menubar */}
            <div className="h-10 px-4 bg-slate-900 text-slate-200 flex items-center justify-between text-xs border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
                <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                  <Monitor className="w-3.5 h-3.5 text-teal-400" />
                  <span className="font-semibold text-white">NICHE PlacementOS</span>
                  <span className="text-[10px] text-slate-400 font-mono">v2.4 LTS</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded text-[11px]">
                <button
                  onClick={() => setActiveTab('diagnostic')}
                  className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'diagnostic' ? 'bg-slate-900 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
                >
                  Readiness PRS
                </button>
                <button
                  onClick={() => setActiveTab('coding')}
                  className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'coding' ? 'bg-slate-900 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
                >
                  CodeStudio
                </button>
                <button
                  onClick={() => setActiveTab('resume')}
                  className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'resume' ? 'bg-slate-900 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
                >
                  ATS Auditor
                </button>
                <button
                  onClick={() => setActiveTab('interview')}
                  className={`px-2.5 py-1 rounded transition-colors ${activeTab === 'interview' ? 'bg-slate-900 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
                >
                  Mock Interview
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </div>
            </div>

            {/* Tab Content Display */}
            <div className="p-6">
              {activeTab === 'diagnostic' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[11px] text-slate-500 font-mono">CURRENT PRS</span>
                    <div className="text-4xl font-semibold font-mono text-teal-600 dark:text-teal-400 tabular-nums">78.5</div>
                    <div className="text-xs text-emerald-600 font-medium">Eligible for Tier-1 Product Drives</div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[11px] text-slate-500 font-mono">STRONGEST PILLAR</span>
                    <div className="text-xl font-semibold text-slate-900 dark:text-white">Data Structures (88%)</div>
                    <div className="text-xs text-slate-500">Solved 42 LeetCode Medium/Hard</div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[11px] text-slate-500 font-mono">TARGET COMPANY</span>
                    <div className="text-xl font-semibold text-slate-900 dark:text-white">Zoho Corporation</div>
                    <div className="text-xs text-teal-600 dark:text-teal-400">Match score: 91% • Cutoff cleared</div>
                  </div>
                </div>
              )}

              {activeTab === 'coding' && (
                <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300 space-y-2">
                  <div className="text-slate-500 text-[11px] flex justify-between border-b border-slate-800 pb-2">
                    <span>Solution.java — Two Sum Optimal O(N) Hash Map</span>
                    <span className="text-teal-400">Memory: 42.1 MB • Runtime: 1ms</span>
                  </div>
                  <pre className="text-teal-300 leading-relaxed overflow-x-auto">
{`public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) return new int[] { map.get(complement), i };
        map.put(nums[i], i);
    }
    return new int[] {};
}`}
                  </pre>
                  <div className="text-[11px] text-emerald-400 pt-2 border-t border-slate-800">
                    ✓ 3/3 Test cases passed. Approved by NICHE Code Engine.
                  </div>
                </div>
              )}

              {activeTab === 'resume' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex justify-between font-semibold">
                      <span>ATS Structural Score</span>
                      <span className="font-mono text-teal-600 dark:text-teal-400">84 / 100</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      Validated against NICHE Placement Cell formatting guidelines. No nested graphics or columns.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="font-semibold">Recommended Keyword Additions</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[11px] font-mono">+ Docker</span>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[11px] font-mono">+ CI/CD Pipeline</span>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[11px] font-mono">+ Kubernetes</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'interview' && (
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 space-y-3 text-xs">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Track: STAR Behavioral (Amazon Leadership Principles & Zoho Culture)
                  </div>
                  <blockquote className="italic text-slate-700 dark:text-slate-300 border-l-2 border-teal-500 pl-3">
                    "Tell me about a time you optimized a critical database query or resolved a race condition under tight deadlines."
                  </blockquote>
                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                    AI Rubric Ready: Situation (20%), Task (20%), Action (35%), Result (25%).
                  </div>
                </div>
              )}
            </div>

            {/* Launch Callout Bar */}
            <div className="p-3 bg-slate-100 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Ready to enter your institutional workspace?</span>
              <Button size="sm" onClick={() => handleLaunchOS('STUDENT')}>
                Enter Full PlacementOS <ChevronDown className="w-3.5 h-3.5 -rotate-90 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAMPUS FACILITIES & ADVANCED INFRASTRUCTURE */}
      <section id="facilities" className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono font-semibold uppercase text-teal-600 dark:text-teal-400 tracking-wider">
                Institutional Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mt-1">
                World-class computing laboratories & campus.
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Noorul Islam University hosts cutting-edge computing clusters, smart classrooms, and incubation spaces for modern engineering education.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <div className="h-44 overflow-hidden">
                <img
                  src={NICHE_BRAND.images.ictLabs}
                  alt="NICHE ICT Computing Labs"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Advanced ICT Computing Labs</div>
                <div className="text-[11px] text-slate-500 mt-1">Dedicated high-throughput computing nodes for algorithmic assessments and research.</div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <div className="h-44 overflow-hidden">
                <img
                  src={NICHE_BRAND.images.auditorium}
                  alt="Hill Top Central Auditorium"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Hill Top Central Auditorium</div>
                <div className="text-[11px] text-slate-500 mt-1">2,500-seat amphitheatre for university recruitment pre-placement talks and symposiums.</div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <div className="h-44 overflow-hidden">
                <img
                  src={NICHE_BRAND.images.incubation}
                  alt="Innovation & Incubation Centre"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Innovation & Incubation Centre</div>
                <div className="text-[11px] text-slate-500 mt-1">MSME-recognized hub supporting student patent filings and tech venture development.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CORPORATE RECRUITER PARTNERS (REAL NIUNIV RECRUITER LOGOS) */}
      <section id="recruiters" className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase text-teal-600 dark:text-teal-400 tracking-wider">
              Campus Hiring Partners
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Trusted by 85+ industry leaders.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Top technology corporations actively recruiting from Noorul Islam Centre for Higher Education.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {NICHE_BRAND.recruiters.map((rec) => (
              <div
                key={rec.id}
                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col items-center justify-center text-center space-y-2 hover:border-slate-400 dark:hover:border-slate-700 transition-colors"
              >
                <div className="h-10 w-full flex items-center justify-center">
                  <img
                    src={rec.url}
                    alt={rec.name}
                    className="max-h-8 max-w-full object-contain filter dark:brightness-95"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                  {rec.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INSTITUTIONAL ACCREDITATIONS & STATUTORY APPROVALS */}
      <section id="accreditation" className="py-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <div className="space-y-1">
              <div className="text-xs font-mono font-semibold uppercase text-teal-600 dark:text-teal-400">
                Statutory Compliance
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                NAAC 'A' Accredited Deemed to be University
              </h3>
              <p className="text-xs text-slate-500 max-w-xl">
                Approved by the Ministry of Human Resource Development (MHRD), AICTE, UGC, and Association of Indian Universities (AIU).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {NICHE_BRAND.approvals.map((appr) => (
                <div key={appr.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 shadow-xs">
                  <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>{appr.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER: Institutional Contact & Copyright */}
      <footer className="py-10 bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-semibold text-white">
              Noorul Islam Centre for Higher Education (NICHE University)
            </div>
            <div className="text-slate-400 text-[11px]">
              {NICHE_BRAND.location} • Dept. of Computer Science & Engineering
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a href="https://www.niuniv.com" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
              Official University Website <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span>PlacementOS v2.4 LTS</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
