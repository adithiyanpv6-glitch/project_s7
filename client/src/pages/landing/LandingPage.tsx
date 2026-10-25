import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
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
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { label: 'Avg Readiness Gain', value: '+38%' },
    { label: 'Campus Placement Success', value: '94.2%' },
    { label: 'Vetted Question Bank', value: '184+ Qs' },
    { label: 'Top Tier Hiring Companies', value: '10 Guides' },
  ];

  const features = [
    {
      icon: Compass,
      title: 'Placement Readiness Diagnostic',
      desc: '360° diagnostic covering Quant, Logical, Verbal, DSA, OS, DBMS, Networks, and Soft Skills with a dynamic readiness score out of 100.',
    },
    {
      icon: Calendar,
      title: 'Adaptive 30/60/90-Day Roadmaps',
      desc: 'Personalized preparation milestones tailored to your target graduation date, target roles (SDE, Analyst), and verified weak areas.',
    },
    {
      icon: Code2,
      title: 'Sandboxed DSA Coding Workspace',
      desc: 'Solve curated LeetCode/HackerRank style DSA challenges in Java, Python, C++, or JavaScript with instant test case evaluation and editorials.',
    },
    {
      icon: FileCheck2,
      title: 'Full-Length Realistic Mock Tests',
      desc: 'Simulate TCS NQT, Amazon SDE-1, and Core CS assessments with timed sectional cutoffs, negative markings, and instant percentile analytics.',
    },
    {
      icon: Video,
      title: 'System & Mentor Mock Interviews',
      desc: 'Interactive STAR behavioral interview simulator plus 1-on-1 scheduled mock interviews evaluated against structured industry rubrics.',
    },
    {
      icon: FileText,
      title: 'ATS Resume Intelligence',
      desc: 'Automated resume audit detecting keyword gaps, action verbs, quantified accomplishments, and Google X-Y-Z bullet rewrites.',
    },
  ];

  const testimonials = [
    {
      name: 'Aditya Vardhan',
      role: 'Placed at Amazon (SDE-1, ₹44 LPA)',
      college: 'National Institute of Technology',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      text: 'The 60-day roadmap took the guesswork out of daily practice. Tracking my readiness score jump from 58% to 92% gave me tremendous confidence going into the Amazon OA and Bar Raiser rounds.',
    },
    {
      name: 'Priya Patel',
      role: 'Placed at TCS Prime (₹11.5 LPA)',
      college: 'Vellore Institute of Technology',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      text: 'The company-specific mock tests and pseudo-code tracing drills were identical to the real TCS NQT pattern. I cleared the Prime upgrade on my first attempt!',
    },
    {
      name: 'Rohan Deshmukh',
      role: 'Placed at Freshworks (SaaS SDE, ₹14 LPA)',
      college: 'PSG College of Technology',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      text: 'The Resume Analyzer flagged that my project descriptions lacked quantified impact. After applying the recommended bullet point rewrites, I got shortlisted by every company that visited campus.',
    },
  ];

  const faqs = [
    {
      q: 'How does the Placement Readiness Score work?',
      a: 'The Placement Readiness Score is a dynamic 0–100 composite index calculated across 7 pillars: diagnostic baseline (20%), roadmap task completion (20%), practice engine volume & accuracy (15%), coding challenges solved (15%), mock test scores (15%), resume score (10%), and mock interview ratings (5%).',
    },
    {
      q: 'Can colleges and Placement Officers (TPOs) track batch performance?',
      a: 'Yes. The platform includes a dedicated Admin/TPO portal providing batch analytics, branch-wise readiness comparisons, question bank management, test publishing, and one-click report exports.',
    },
    {
      q: 'Are the coding problems evaluated against real test cases?',
      a: 'Yes. The coding workspace features both public and hidden test cases, providing runtime execution metrics (milliseconds), memory consumption, and line-by-line editorial walkthroughs.',
    },
    {
      q: 'How do mentor-led mock interviews work?',
      a: 'Students can schedule mock interview sessions with assigned mentors. Mentors provide real-time verbal discussion and submit structured rubric scores for communication, technical depth, and problem solving.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="text-center pt-8 md:pt-14 max-w-4xl mx-auto px-4">
        <Badge variant="brand" size="md" className="mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          The Intelligent Campus Placement OS for Engineering Colleges
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-[1.15]">
          Crack Your Dream Campus Placement with{' '}
          <span className="text-brand-600 dark:text-brand-400 underline decoration-brand-300 dark:decoration-brand-800">
            Intelligent Preparation
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From initial readiness diagnostics and personalized 30/60/90-day roadmaps to sandboxed DSA coding, company cutoffs, and mock interviews—everything you need to get placed.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {user ? (
            <Link to={user.role === 'ADMIN' ? '/admin' : user.role === 'INTERVIEWER' ? '/mentor' : '/dashboard'}>
              <Button size="lg" className="w-full sm:w-auto shadow-md">
                Open Your Dashboard
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto shadow-md">
                  Start Free Diagnostic Assessment
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In with Demo Account
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Demo Credentials Pill */}
        <div className="mt-6 inline-flex items-center gap-2 p-2 px-3 rounded-lg bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-xs text-slate-600 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Demo Student: <strong className="text-slate-900 dark:text-white">student@placementprep.com</strong> (Student@123)</span>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="bg-navy-900 text-white rounded-2xl p-8 max-w-6xl mx-auto shadow-lg border border-navy-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-400">{s.value}</div>
              <div className="text-xs text-slate-300 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white">
            Built for Systematic Placement Readiness
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            No more random YouTube playlists or fragmented question sheets. A structured, data-driven methodology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Card key={idx} hoverable className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{f.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Target Companies Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Badge variant="neutral" size="sm" className="mb-2">Targeted Syllabus</Badge>
          <h2 className="text-2xl font-bold text-navy-950 dark:text-white">
            Company-Specific Hiring Blueprints
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Exam patterns, previous-year question themes, cutoffs, and hiring processes for 10 top campus recruiters.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { name: 'TCS NQT', cat: 'IT Services', pkg: '₹3.36 - ₹11.5 LPA' },
            { name: 'Amazon SDE', cat: 'Big Tech', pkg: '₹28 - ₹44 LPA' },
            { name: 'Microsoft', cat: 'Big Tech', pkg: '₹24 - ₹48 LPA' },
            { name: 'Infosys', cat: 'IT Services', pkg: '₹3.6 - ₹9.5 LPA' },
            { name: 'Accenture', cat: 'Consulting', pkg: '₹4.5 - ₹6.5 LPA' },
            { name: 'Zoho', cat: 'Product SaaS', pkg: '₹6.0 - ₹12.0 LPA' },
            { name: 'Freshworks', cat: 'Product SaaS', pkg: '₹12 - ₹18 LPA' },
            { name: 'Cognizant', cat: 'IT Services', pkg: '₹4.0 - ₹9.0 LPA' },
            { name: 'Wipro NLTH', cat: 'IT Services', pkg: '₹3.5 - ₹6.5 LPA' },
            { name: 'Deloitte', cat: 'Consulting', pkg: '₹6.5 - ₹10 LPA' },
          ].map((c, idx) => (
            <Link key={idx} to="/companies" className="block">
              <Card hoverable className="p-3 text-center transition-transform hover:-translate-y-0.5">
                <span className="font-bold text-xs text-slate-900 dark:text-white block">{c.name}</span>
                <span className="text-[10px] text-slate-400 block">{c.cat}</span>
                <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 mt-1 block">
                  {c.pkg}
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="brand" size="sm" className="mb-2">Student Outcomes</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white">
            Proven Results Across Campuses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-navy-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-navy-700"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">{t.role}</p>
                  <p className="text-[10px] text-slate-400">{t.college}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-navy-950 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-navy-800 rounded-xl bg-white dark:bg-navy-900 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-navy-800/40"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaq === idx ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-navy-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white rounded-3xl p-10 shadow-2xl border border-navy-700 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to Accelerate Your Placement Preparation?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Take the 20-minute diagnostic, receive your personalized 60-day roadmap, and practice with real campus assessments today.
          </p>
          <div className="pt-2">
            <Link to="/register">
              <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white shadow-lg">
                Create Free Student Account
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
