import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import confetti from 'canvas-confetti';
import {
  Compass,
  Calendar,
  CheckCircle2,
  Code2,
  FileCheck2,
  Video,
  FileText,
  Building2,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Users,
  Award,
  Zap,
  Play,
  Terminal,
  Clock,
  Star,
  Layers,
  ArrowUpRight,
  Check,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'coding' | 'interview' | 'resume'>('diagnostic');
  const [simHours, setSimHours] = useState(2);
  const [simBranch, setSimBranch] = useState('Computer Science');

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0d9488', '#14b8a6', '#0f172a', '#38bdf8'],
    });
  };

  const partnerCompanies = [
    { name: 'Amazon', role: 'SDE-1', pkg: '₹32 LPA', color: 'from-amber-500/20 to-orange-500/20', text: 'text-amber-500' },
    { name: 'Microsoft', role: 'Software Engineer', pkg: '₹28 LPA', color: 'from-blue-500/20 to-cyan-500/20', text: 'text-blue-500' },
    { name: 'Google', role: 'SWE-Intern', pkg: '₹38 LPA', color: 'from-red-500/20 to-yellow-500/20', text: 'text-rose-500' },
    { name: 'Zoho', role: 'Product Developer', pkg: '₹12 LPA', color: 'from-emerald-500/20 to-teal-500/20', text: 'text-emerald-500' },
    { name: 'TCS Digital', role: 'Systems Engineer', pkg: '₹9 LPA', color: 'from-indigo-500/20 to-purple-500/20', text: 'text-indigo-500' },
    { name: 'Cognizant', role: 'GenC Elevate', pkg: '₹7.5 LPA', color: 'from-cyan-500/20 to-blue-500/20', text: 'text-cyan-500' },
    { name: 'Infosys', role: 'DSE Specialist', pkg: '₹9.5 LPA', color: 'from-blue-600/20 to-indigo-600/20', text: 'text-blue-600' },
    { name: 'Deloitte', role: 'Tech Consultant', pkg: '₹11 LPA', color: 'from-lime-500/20 to-emerald-500/20', text: 'text-lime-600' },
    { name: 'Accenture', role: 'Advanced ASE', pkg: '₹8 LPA', color: 'from-purple-500/20 to-pink-500/20', text: 'text-purple-500' },
    { name: 'Freshworks', role: 'Associate Engineer', pkg: '₹14 LPA', color: 'from-orange-500/20 to-amber-500/20', text: 'text-orange-500' },
  ];

  const testimonials = [
    {
      name: 'Rohan Sharma',
      college: 'NIT Trichy, B.Tech CSE \'25',
      company: 'Amazon',
      package: '₹32.5 LPA',
      role: 'Software Development Engineer I',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      comment:
        'PlacementPrep was a game-changer. The 90-day adaptive roadmap eliminated my analysis paralysis. The sandboxed DSA workspace and mock tests exactly mirrored Amazon’s OA format.',
    },
    {
      name: 'Ananya Deshmukh',
      college: 'BITS Pilani, ECE \'25',
      company: 'Microsoft',
      package: '₹28 LPA',
      role: 'Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      comment:
        'Coming from an electronics branch, I was nervous about CS fundamentals. The diagnostic pinpointed my OS and DBMS gaps, and the STAR AI mock interview gave me the confidence to ace technical rounds.',
    },
    {
      name: 'Karthik Raja',
      college: 'VIT Vellore, IT \'25',
      company: 'Zoho',
      package: '₹12.2 LPA',
      role: 'Product Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      comment:
        'The ATS Resume Analyzer increased my interview callbacks from 1 out of 10 to 6 out of 10 by highlighting quantifiable impact and action verbs. A must-have for every final year student!',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white transition-colors overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-brand-500/10 dark:bg-brand-500/15 blur-[120px] animate-blob" />
        <div className="absolute top-[30%] right-[-5%] w-[450px] h-[450px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/10 dark:bg-teal-500/15 blur-[140px] animate-blob animation-delay-4000" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass border-b border-slate-200/80 dark:border-navy-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-navy-900 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-navy-950 dark:text-white block leading-tight">
                Placement<span className="text-brand-600 dark:text-brand-400">Prep</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">
                Student Success Platform
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Features</a>
            <a href="#demo" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Interactive Demo</a>
            <a href="#companies" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Recruiters</a>
            <a href="#outcomes" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Student Outcomes</a>
            <a href="#faq" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/dashboard">
                <Button size="sm" className="shadow-md shadow-brand-500/20">
                  Go to Dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden sm:inline-block">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="shadow-md shadow-brand-500/20">
                    Get Started Free <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Institutional Trust Ribbon */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/80 text-brand-700 dark:text-brand-300 text-xs font-semibold shadow-xs animate-float">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Trusted across 45+ Premier Campuses • Over 12,000 Verified Placements</span>
          </div>

          {/* Main Hero Header */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-navy-950 dark:text-white leading-[1.12]">
              Crack Your Dream Campus Placement with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-teal-500 to-indigo-600 dark:from-brand-400 dark:via-teal-300 dark:to-indigo-400">
                Precision Intelligence.
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Stop wandering between random coding websites and PDF notes. Get a personalized 30/60/90-day roadmap, sandboxed DSA practice, STAR-method mock interviews, ATS resume auditing, and real-time readiness scoring.
            </p>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/register" onClick={triggerConfetti}>
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-brand-500/25 text-sm font-bold px-8">
                Start Free Diagnostic Test <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm font-semibold">
                Explore Demo Portals (Student / TPO / Mentor)
              </Button>
            </Link>
          </div>

          {/* High-Impact Interactive Preview Mockup Showcase */}
          <div className="pt-10 max-w-5xl mx-auto relative">
            <div className="relative rounded-2xl p-2 bg-gradient-to-b from-slate-200 via-slate-100 to-transparent dark:from-navy-800 dark:via-navy-900 dark:to-navy-950 shadow-2xl border border-slate-300/50 dark:border-navy-700/50">
              {/* Window Controls */}
              <div className="bg-slate-100 dark:bg-navy-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-navy-800 text-left">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-navy-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-slate-400">placementprep.app/student/dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      ● Live Session
                    </span>
                  </div>
                </div>

                {/* Simulated Mock Dashboard Content */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                  {/* Left Column: Readiness Score */}
                  <div className="p-4 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Placement Readiness</span>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">84.5%</span>
                        <Badge variant="success" size="sm">Elite Product Tier</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Surpassed cutoff for Amazon, Microsoft & TCS Digital.</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Aptitude</span>
                        <span>88%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-navy-800 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-500 rounded-full w-[88%]" />
                      </div>
                      <div className="flex justify-between text-xs font-semibold">
                        <span>DSA Coding</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-navy-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Daily Task Velocity */}
                  <div className="p-4 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-navy-800 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Today's Milestone</span>
                      <span className="text-xs font-mono font-bold text-amber-500">Day 24 of 90 🔥</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-900 border border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="font-medium text-slate-800 dark:text-slate-200">Solve Two Sum & 3Sum (Two Pointers)</span>
                        </div>
                        <Badge variant="brand" size="sm">DSA</Badge>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-navy-900 border border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="font-medium text-slate-800 dark:text-slate-200">15 Time & Work Aptitude Problems</span>
                        </div>
                        <Badge variant="neutral" size="sm">Aptitude</Badge>
                      </div>
                      <div className="p-2.5 rounded-lg bg-brand-50/50 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-800/60 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-brand-600 shrink-0" />
                          <span className="font-semibold text-brand-900 dark:text-brand-200">Simulate Amazon SDE-1 Mock Assessment</span>
                        </div>
                        <span className="text-[10px] font-bold text-brand-600">Pending</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Code Runner & Feedback */}
                  <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-xs flex flex-col justify-between font-mono text-xs">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                        <span className="text-[11px] text-slate-400 font-bold">Safe Sandbox Judge</span>
                        <span className="text-emerald-400 font-bold">ACCEPTED (32ms)</span>
                      </div>
                      <div className="space-y-1 text-slate-300 text-[11px]">
                        <div><span className="text-brand-400">const</span> twoSum = (nums, target) =&gt; &#123;</div>
                        <div className="pl-3 text-slate-400">// O(N) Hash Map Solution</div>
                        <div className="pl-3"><span className="text-brand-400">const</span> map = <span className="text-brand-400">new</span> Map();</div>
                        <div className="pl-3">for (let i = 0; i &lt; nums.length; i++) &#123;</div>
                        <div className="pl-6"><span className="text-emerald-400">return</span> [map.get(diff), i];</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Memory: 42.1 MB (Beats 91%)</span>
                      <span className="text-brand-400 font-bold">✓ 3/3 Test Cases Passed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="hidden lg:flex items-center gap-3 absolute -top-4 -right-4 p-3 rounded-xl glass-card shadow-xl border border-white/40 dark:border-white/10 animate-float">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white">Placed at Amazon</div>
                <div className="text-[10px] text-slate-500">₹32 LPA SDE-1 Offer</div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3 absolute -bottom-4 -left-4 p-3 rounded-xl glass-card shadow-xl border border-white/40 dark:border-white/10 animate-float-delayed">
              <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold">
                📄
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white">ATS Resume Score: 94/100</div>
                <div className="text-[10px] text-slate-500">14 Quantified Metrics Added</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moving Marquee of Hiring Partners */}
      <section id="companies" className="py-12 border-y border-slate-200/80 dark:border-navy-800/80 bg-white/60 dark:bg-navy-900/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Target Recruitment Blueprints Preloaded in Platform
          </span>
        </div>

        <div className="relative overflow-hidden w-full flex">
          <div className="flex shrink-0 gap-6 animate-marquee py-2">
            {[...partnerCompanies, ...partnerCompanies].map((comp, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 shadow-xs hover:border-brand-300 dark:hover:border-brand-700 transition-all shrink-0"
              >
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${comp.color} flex items-center justify-center font-black text-sm ${comp.text}`}>
                  {comp.name[0]}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{comp.name}</div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {comp.role} • <span className="font-semibold text-emerald-600 dark:text-emerald-400">{comp.pkg}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Feature Demo Showcase */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="brand" size="md">Complete Preparation Engine</Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-navy-950 dark:text-white tracking-tight">
            Engineered for Modern Engineering Recruitment
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Everything you need to surpass placement cutoffs in one synchronized platform.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl bg-slate-200/80 dark:bg-navy-900 border border-slate-300/60 dark:border-navy-800 gap-1 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'diagnostic'
                  ? 'bg-white dark:bg-brand-600 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              01. Diagnostic & Roadmaps
            </button>
            <button
              onClick={() => setActiveTab('coding')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'coding'
                  ? 'bg-white dark:bg-brand-600 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              02. Sandboxed DSA IDE
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'interview'
                  ? 'bg-white dark:bg-brand-600 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              03. STAR AI Mock Interviews
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'resume'
                  ? 'bg-white dark:bg-brand-600 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              04. ATS Resume Optimizer
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl p-6 sm:p-10 shadow-sm">
          {activeTab === 'diagnostic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge variant="brand">Adaptive Intelligence</Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-950 dark:text-white">
                  360° Placement Readiness Diagnostic & Dynamic Roadmap
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Take a 12-question calibrated baseline test assessing your Quantitative Aptitude, Logical Reasoning, Verbal Ability, CS Fundamentals, and DSA. The system immediately outputs your dynamic Readiness Score and auto-schedules daily actionable tasks for 30, 60, or 90 days.
                </p>
                <ul className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Automatic weak-area detection and remediation targets
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Real-time score recalculation as you solve practice questions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Daily streak tracking to maintain placement momentum
                  </li>
                </ul>
                <div className="pt-2">
                  <Link to="/diagnostic">
                    <Button size="sm">
                      Take Diagnostic Baseline <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-navy-800">
                  <span className="text-xs font-bold">Diagnostic Radar Breakdown</span>
                  <span className="text-xs font-bold text-emerald-500">Tier: Product Specialist</span>
                </div>
                <div className="space-y-3 font-sans text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Quantitative Aptitude</span>
                      <span className="font-bold">85%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-navy-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full w-[85%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Data Structures & Algorithms</span>
                      <span className="font-bold">92%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-navy-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Operating Systems & DBMS</span>
                      <span className="font-bold">78%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-navy-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full w-[78%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'coding' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge variant="brand">DSA Practice</Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-950 dark:text-white">
                  Safe Sandboxed In-Browser Coding Judge
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Practice 15+ curated LeetCode-style algorithmic challenges across Arrays, Two Pointers, Sliding Window, Trees, and Dynamic Programming. Run against sample test cases and submit against hidden edge cases with execution time and memory benchmarks.
                </p>
                <ul className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Multi-language support: JavaScript, Python, C++, and Java
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Structured hints and editorial solution after attempts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Company tags showing where each question was previously asked
                  </li>
                </ul>
                <div className="pt-2">
                  <Link to="/coding">
                    <Button size="sm">
                      Open Coding Workspace <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-3">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                  <span>LongestSubstringWithoutRepeating.js</span>
                  <span className="text-emerald-400 font-bold">Passed (28ms)</span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-1">
                  <div><span className="text-brand-400">function</span> lengthOfLongestSubstring(s) &#123;</div>
                  <div className="pl-4">let map = new Map(), maxLen = 0, start = 0;</div>
                  <div className="pl-4">for (let i = 0; i &lt; s.length; i++) &#123;</div>
                  <div className="pl-8">if (map.has(s[i])) start = Math.max(start, map.get(s[i]) + 1);</div>
                  <div className="pl-8">map.set(s[i], i);</div>
                  <div className="pl-8">maxLen = Math.max(maxLen, i - start + 1);</div>
                  <div className="pl-4">&#125;</div>
                  <div className="pl-4"><span className="text-emerald-400">return</span> maxLen;</div>
                  <div>&#125;</div>
                </div>
                <div className="p-2.5 rounded bg-navy-950 border border-slate-800 text-[11px] flex justify-between">
                  <span className="text-slate-400">Test Cases: 15 / 15 Passed</span>
                  <span className="text-emerald-400 font-bold">100% Correct</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge variant="brand">Interview Coaching</Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-950 dark:text-white">
                  STAR-Method Mock Interviews & Mentor Feedback
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Prepare for Technical, HR, and Company-specific interviews. The system automatically evaluates responses against STAR criteria (Situation, Task, Action, Result) with scores across Communication, Technical Depth, Structure, and Confidence.
                </p>
                <div className="pt-2">
                  <Link to="/interviews">
                    <Button size="sm">
                      Start Mock Interview <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">AI Rubric Evaluation</span>
                  <Badge variant="success">Overall: 8.8 / 10</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800">
                    <span className="text-[10px] text-slate-400 block">Communication</span>
                    <span className="font-bold text-emerald-600">8.5 / 10</span>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800">
                    <span className="text-[10px] text-slate-400 block">Technical Depth</span>
                    <span className="font-bold text-brand-600">9.0 / 10</span>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800">
                    <span className="text-[10px] text-slate-400 block">STAR Structure</span>
                    <span className="font-bold text-indigo-600">8.7 / 10</span>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800">
                    <span className="text-[10px] text-slate-400 block">Confidence</span>
                    <span className="font-bold text-teal-600">9.0 / 10</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-navy-900 p-2.5 rounded border border-slate-100 dark:border-navy-800">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Key Tip:</span> Highlight latency numbers and database indexing metrics when narrating backend optimization.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resume' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge variant="brand">ATS Optimization</Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-950 dark:text-white">
                  Heuristic ATS Resume Analyzer & Bullet Rewriter
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Recruiters spend an average of 6 seconds per resume. Our NLP heuristic parser identifies missing role-specific keywords, audits action verbs (Spearheaded, Architected), and scores quantifiable impact percentages.
                </p>
                <div className="pt-2">
                  <Link to="/resume">
                    <Button size="sm">
                      Audit Your Resume <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">ATS Audit Score</span>
                  <span className="text-2xl font-black text-emerald-600">92 / 100</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300">
                    <div className="font-bold text-[11px]">Recommended Bullet Rewrite:</div>
                    <p className="text-[11px] mt-0.5">"Spearheaded backend API latency reduction by 45% using Redis caching and query indexing across 100k users."</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Readiness Projection Calculator */}
      <section id="demo" className="py-16 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-navy-900/60 dark:to-navy-950 border-y border-slate-200 dark:border-navy-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <Badge variant="brand">Interactive Simulator</Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">
              Simulate Your 60-Day Placement Velocity
            </h2>
            <p className="text-xs text-slate-500">
              See how regular daily practice systematically drives your hiring readiness score.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl glass-card border border-slate-200 dark:border-navy-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Select Your Academic Department:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Computer Science', 'Information Tech', 'Electronics & Comm', 'Mechanical / Civil'].map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSimBranch(dept)}
                      className={`p-2.5 rounded-lg border text-left font-semibold transition-all ${
                        simBranch === dept
                          ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                          : 'border-slate-200 dark:border-navy-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span>Daily Study Commitment:</span>
                  <span className="text-brand-600 dark:text-brand-400 font-mono text-sm">{simHours} Hours / Day</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={simHours}
                  onChange={(e) => setSimHours(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-navy-800 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>1 hr (Foundation)</span>
                  <span>2.5 hrs (Target SDE)</span>
                  <span>4 hrs (Elite Product)</span>
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-navy-900 to-navy-950 text-white border border-navy-700 text-center space-y-4 shadow-xl">
              <span className="text-[11px] font-bold text-brand-400 uppercase tracking-widest">
                Projected 60-Day Readiness Score
              </span>
              <div className="text-5xl font-black text-white">
                {Math.min(96, Math.round(52 + simHours * 11.5))}%
              </div>
              <p className="text-xs text-slate-300">
                Qualifies candidate for{' '}
                <span className="font-bold text-emerald-400">
                  {simHours >= 3
                    ? 'Tier-1 Product Companies (₹20+ LPA)'
                    : simHours >= 2
                    ? 'Mid-Market & Premium Tech (₹9 - ₹18 LPA)'
                    : 'Core IT Service Recruiters (₹5 - ₹8 LPA)'}
                </span>
              </p>
              <div className="pt-2">
                <Link to="/register">
                  <Button size="sm" className="w-full">
                    Lock In This Plan Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Outcomes & Testimonials */}
      <section id="outcomes" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="brand" size="md">Verified Success</Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-navy-950 dark:text-white tracking-tight">
            Real Students. Real Placements. Real Offers.
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Hear from engineering seniors who converted their preparation into top tier offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-navy-800 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/30"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{t.name}</h4>
                  <div className="text-[10px] text-slate-400">{t.college}</div>
                  <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Placed at {t.company} ({t.package})
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="py-16 bg-slate-100/70 dark:bg-navy-900/40 border-t border-slate-200 dark:border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500">Everything you need to know about PlacementPrep.</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How does the Placement Readiness Score (0-100) work?',
                a: 'The Placement Readiness Score is calculated from a weighted dynamic algorithm synthesizing your Diagnostic Assessment baseline, daily practice consistency, DSA coding problem pass rate, timed Mock Test percentiles, and Mock Interview ratings.',
              },
              {
                q: 'Are the coding problems similar to LeetCode and real campus OAs?',
                a: 'Yes. All 15+ preloaded DSA problems mirror questions asked in Online Assessments (OAs) by Amazon, Microsoft, Infosys, and Cognizant, complete with starter templates, hidden test cases, and time/space complexity analysis.',
              },
              {
                q: 'Can placement cells (TPOs) and college admins use this platform?',
                a: 'Absolutely. PlacementPrep includes an institutional TPO suite that displays real-time cohort readiness distributions, highlights candidates needing intervention, and exports accreditation-ready CSV/JSON reports for NAAC and NBA audits.',
              },
              {
                q: 'How does the STAR-method AI mock interview evaluate answers?',
                a: 'Our interview evaluator scans answers for Situation, Task, Action, and Result indicators as well as technical depth keywords. It returns structured scores across Communication, Technical Depth, Structure, and Confidence with personalized coaching feedback.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white hover:text-brand-600"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-navy-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-950 to-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <Badge variant="brand" size="md">Get Started In Under 2 Minutes</Badge>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ready to Take Control of Your Campus Placement?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Join thousands of successful engineering seniors. Start with the free diagnostic baseline and get your personalized roadmap today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/register" onClick={triggerConfetti}>
              <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-brand-500/30 text-sm font-bold px-8">
                Take Diagnostic Assessment Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-navy-800 py-8 bg-white dark:bg-navy-900 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-brand-600" />
            <span className="font-bold text-slate-800 dark:text-slate-200">PlacementPrep</span>
            <span>— Intelligent Student Placement Preparation Platform</span>
          </div>
          <div>© {new Date().getFullYear()} PlacementPrep. All rights reserved. Built for engineering placement excellence.</div>
        </div>
      </footer>
    </div>
  );
};
