import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Compass,
  Calendar,
  CheckSquare,
  Code2,
  FileCheck2,
  Video,
  FileText,
  Building2,
  Users,
  Database,
  SlidersHorizontal,
  Download,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface SidebarLink {
  to: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const studentLinks: SidebarLink[] = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/diagnostic', label: 'Readiness Diagnostic', icon: Compass, badge: 'Key' },
    { to: '/roadmap', label: 'Preparation Roadmap', icon: Calendar },
    { to: '/practice', label: 'Practice Engine', icon: CheckSquare },
    { to: '/coding', label: 'Coding Workspace', icon: Code2 },
    { to: '/mocktests', label: 'Mock Assessments', icon: FileCheck2 },
    { to: '/interviews', label: 'Mock Interviews', icon: Video },
    { to: '/resume', label: 'Resume Intelligence', icon: FileText },
    { to: '/companies', label: 'Company Prep Hub', icon: Building2 },
  ];

  const adminLinks: SidebarLink[] = [
    { to: '/admin', label: 'Admin Overview', icon: LayoutDashboard },
    { to: '/admin/students', label: 'Student Cohort', icon: Users },
    { to: '/admin/questions', label: 'Question Bank', icon: Database },
    { to: '/admin/tests', label: 'Mock Test Publisher', icon: FileCheck2 },
    { to: '/admin/reports', label: 'Export Reports', icon: Download },
  ];

  const mentorLinks: SidebarLink[] = [
    { to: '/mentor', label: 'Assigned Interviews', icon: Video },
    { to: '/practice', label: 'Review Question Bank', icon: BookOpen },
    { to: '/coding', label: 'Review DSA Problems', icon: Code2 },
  ];

  const links =
    user.role === 'ADMIN'
      ? adminLinks
      : user.role === 'INTERVIEWER'
      ? mentorLinks
      : studentLinks;

  return (
    <aside className="w-64 shrink-0 hidden lg:block bg-white dark:bg-navy-900 border-r border-slate-200 dark:border-navy-800 min-h-[calc(100vh-4rem)] p-4 transition-colors">
      {/* Role Banner */}
      <div className="mb-4 px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-navy-800">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Portal Scope
        </span>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {user.role === 'ADMIN'
              ? 'TPO / Admin Suite'
              : user.role === 'INTERVIEWER'
              ? 'Mentor Evaluation'
              : 'Student Preparation'}
          </span>
        </div>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/admin' || link.to === '/dashboard' || link.to === '/mentor'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 font-bold shadow-xs border border-brand-100 dark:border-brand-900/50'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800/60'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 font-bold">
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Student Pro Readiness Callout */}
      {user.role === 'STUDENT' && (
        <div className="mt-8 p-3.5 rounded-xl bg-gradient-to-br from-navy-900 to-navy-800 text-white border border-navy-700 shadow-sm">
          <div className="flex items-center gap-1.5 text-brand-400 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Placement</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1">
            Maintain your daily streak to elevate your readiness score above 85% for top product cutoffs.
          </p>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
            <span>Current Score:</span>
            <span className="font-bold text-white">
              {user.studentProfile?.readinessScore || 78.5}%
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};
