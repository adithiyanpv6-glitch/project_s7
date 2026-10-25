import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-navy-950 border-t border-slate-200 dark:border-navy-900 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy-900 border border-navy-700 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-brand-400" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white tracking-tight">
                PlacementPrep
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Intelligent student campus placement preparation platform. Structured diagnostic, 30/60/90-day roadmaps, coding sandbox, mock tests, and resume analytics.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Preparation Modules
            </h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/practice" className="hover:text-brand-600">Aptitude & Reasoning Practice</Link></li>
              <li><Link to="/coding" className="hover:text-brand-600">DSA & Coding Sandbox</Link></li>
              <li><Link to="/mocktests" className="hover:text-brand-600">Full-Length Mock Tests</Link></li>
              <li><Link to="/interviews" className="hover:text-brand-600">STAR Mock Interviews</Link></li>
              <li><Link to="/resume" className="hover:text-brand-600">Resume Intelligence & ATS</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Target Companies
            </h5>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/companies" className="hover:text-brand-600">TCS NQT Preparation</Link></li>
              <li><Link to="/companies" className="hover:text-brand-600">Amazon SDE-1 Roadmap</Link></li>
              <li><Link to="/companies" className="hover:text-brand-600">Infosys InfyTQ & DSE</Link></li>
              <li><Link to="/companies" className="hover:text-brand-600">Accenture & Cognizant</Link></li>
              <li><Link to="/companies" className="hover:text-brand-600">Zoho & Freshworks SaaS</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Institution & Accreditation
            </h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Integrated with university TPO portals and outcome accreditation systems.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Role-Based Enterprise Security</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-navy-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 PlacementPrep Platform Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-brand-500" />
              Production v1.0.4
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
