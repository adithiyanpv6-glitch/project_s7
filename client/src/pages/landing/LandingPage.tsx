import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
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
  ArrowRight,
  GraduationCap,
  Users,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'coding' | 'interview' | 'resume'>('diagnostic');

  const partnerCompanies = [
    { name: 'Amazon', role: 'Software Engineer', pkg: '₹32 LPA' },
    { name: 'Microsoft', role: 'SWE-1', pkg: '₹28 LPA' },
    { name: 'Google', role: 'Associate Engineer', pkg: '₹38 LPA' },
    { name: 'Zoho', role: 'Product Developer', pkg: '₹12 LPA' },
    { name: 'TCS Digital', role: 'Systems Engineer', pkg: '₹9 LPA' },
    { name: 'Infosys', role: 'Specialist Programmer', pkg: '₹9.5 LPA' },
    { name: 'Cognizant', role: 'GenC Elevate', pkg: '₹7.5 LPA' },
    { name: 'Deloitte', role: 'Tech Consultant', pkg: '₹11 LPA' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-slate-200 dark:selection:bg-slate-800">
      {/* Navigation Header: Quiet, standard height 56px, clean border */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-sm tracking-tight text-slate-900 dark:text-white">
                PlacementPrep
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Institutional Edition
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <a href="#curriculum" className="hover:text-slate-900 dark:hover:text-white transition-colors">Curriculum</a>
            <a href="#preview" className="hover:text-slate-900 dark:hover:text-white transition-colors">Platform preview</a>
            <a href="#recruiters" className="hover:text-slate-900 dark:hover:text-white transition-colors">Recruiters</a>
            <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <Link to="/dashboard">
                <Button size="sm">
                  Go to dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Get started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section: Unslop Asymmetric Split Layout */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Specific Copy, no exclamation marks, calm space */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">
                <span>Autonomous recruitment intelligence for engineering institutions</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                An objective readiness standard for campus placements.
              </h1>

              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                PlacementPrep replaces disconnected preparation tools with a single institutional platform: dynamic readiness scoring, diagnostic benchmarking, sandboxed DSA practice, and rubric-calibrated mock evaluations.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link to="/register">
                  <Button size="lg">
                    Begin student assessment <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    TPO demo login
                  </Button>
                </Link>
              </div>

              {/* Plausible Metrics: Tabular numerals, no hype */}
              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-semibold text-slate-900 dark:text-white num-tabular">16</div>
                  <div className="text-xs text-slate-500 mt-1">Relational models</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-slate-900 dark:text-white num-tabular">0–100</div>
                  <div className="text-xs text-slate-500 mt-1">Readiness score</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-slate-900 dark:text-white num-tabular">&lt; 35 ms</div>
                  <div className="text-xs text-slate-500 mt-1">Score latency</div>
                </div>
              </div>
            </div>

            {/* Right Column: Real Product UI Preview in Code (Not a floating blob or stock art) */}
            <div className="lg:col-span-5">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 shadow-xs">
                {/* Browser bar */}
                <div className="flex items-center gap-1.5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="ml-2 text-[11px] font-mono text-slate-400">placementprep.edu/dashboard</span>
                </div>

                {/* Dashboard Card Preview */}
                <div className="pt-4 space-y-4">
                  <div className="p-4 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Placement Readiness Score</span>
                      <span className="text-[11px] font-medium text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                        Tier-1 Ready
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-4xl font-semibold text-slate-900 dark:text-white num-tabular">78.4</span>
                      <span className="text-xs text-slate-500">/ 100</span>
                    </div>
                    <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded overflow-hidden">
                      <div className="bg-slate-900 dark:bg-white h-full w-[78.4%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-[11px] text-slate-500">DSA challenges</div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mt-1 num-tabular">12 / 15</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Accepted submissions</div>
                    </div>
                    <div className="p-3 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-[11px] text-slate-500">ATS resume match</div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-white mt-1 num-tabular">84%</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Standard formatting</div>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-slate-700 dark:text-slate-300">Diagnostic baseline complete</span>
                    </div>
                    <span className="text-[11px] text-slate-400 num-tabular">72/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Grid: Varied rhythm, clean lines */}
      <section id="curriculum" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-12">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Curriculum architecture</span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Five computational modules designed for institutional rigor.
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Every module feeds into the central Placement Readiness Score formula, providing continuous evaluation across foundational aptitude, algorithmic coding, and interview competencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <Compass className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Diagnostic evaluation</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Standardized baseline testing across Quantitative Aptitude, Operating Systems, Database Management, and Verbal ability.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <Code2 className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Sandboxed DSA judge</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Node.js VM isolated code execution evaluating algorithmic correctness against hidden edge suites under 2,000ms timeouts.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <Calendar className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Adaptive 30/60/90-day roadmaps</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Synthesizes daily practice milestones specifically targeted toward individual student deficiency vectors.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <FileText className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">ATS resume intelligence</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Natural language heuristic parser scoring resume section structural integrity, tech keyword density, and action verbs.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <Video className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">STAR mock interviews</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Calibrated technical and HR interview rounds evaluated by mentors using standardized rubric metrics.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <Users className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">TPO cohort analytics</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Aggregated institutional reporting identifying at-risk students before company recruitment drives commence.
            </p>
          </div>
        </div>
      </section>

      {/* Recruiter Benchmarks Table: Clean tabular presentation */}
      <section id="recruiters" className="py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recruitment benchmarks</span>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Target role criteria and institutional compensation tiers.
            </h2>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                <tr>
                  <th className="p-3">Recruiting organization</th>
                  <th className="p-3">Target engineering role</th>
                  <th className="p-3">Typical package</th>
                  <th className="p-3">Assessment format</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
                {partnerCompanies.map((c) => (
                  <tr key={c.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3 font-medium text-slate-900 dark:text-slate-200">{c.name}</td>
                    <td className="p-3">{c.role}</td>
                    <td className="p-3 font-mono text-slate-800 dark:text-slate-300">{c.pkg}</td>
                    <td className="p-3">Online assessment + Technical interview</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ: Clean, quiet disclosure */}
      <section id="faq" className="py-20 border-t border-slate-200 dark:border-slate-800 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-2 text-center mb-12">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Frequently asked questions
          </h2>
          <p className="text-xs text-slate-500">
            Institutional deployment specifications and system policies
          </p>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
          {[
            {
              q: 'How is the Placement Readiness Score calculated?',
              a: 'PRS is calculated via a dynamic weighted formula: 20% Diagnostic baseline, 20% Roadmap completion velocity, 15% Practice accuracy and volume, 15% Accepted DSA coding solutions, 15% Proctored mock tests, 10% ATS resume score, and 5% STAR mock interview evaluation.',
            },
            {
              q: 'Can the platform be self-hosted on collegiate infrastructure?',
              a: 'Yes. PlacementPrep is architected with Docker and Node.js with a Prisma ORM persistence layer that runs on local PostgreSQL or SQLite servers with zero external API dependencies required for core operations.',
            },
            {
              q: 'Is student code execution safe on multi-tenant servers?',
              a: 'Yes. Algorithmic submissions execute inside isolated Node.js Virtual Machine contexts with 128MB memory bounds, strict 2,000ms timeouts, and zero access to the host file system or network sockets.',
            },
          ].map((item, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-sm font-medium text-slate-900 dark:text-white"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer: Quiet hairline, formal copyright */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 bg-white dark:bg-slate-900 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 dark:text-white">PlacementPrep</span>
            <span>— Noorul Islam Centre for Higher Education</span>
          </div>
          <div>Academic Year 2026–2027 • All rights reserved</div>
        </div>
      </footer>
    </div>
  );
};
