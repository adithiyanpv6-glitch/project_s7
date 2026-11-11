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
  Download,
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
    { to: '/diagnostic', label: 'Readiness diagnostic', icon: Compass, badge: 'Required' },
    { to: '/roadmap', label: 'Curated roadmap', icon: Calendar },
    { to: '/practice', label: 'Practice engine', icon: CheckSquare },
    { to: '/coding', label: 'Coding workspace', icon: Code2 },
    { to: '/mocktests', label: 'Mock assessments', icon: FileCheck2 },
    { to: '/interviews', label: 'Mock interviews', icon: Video },
    { to: '/resume', label: 'Resume intelligence', icon: FileText },
    { to: '/companies', label: 'Company prep hub', icon: Building2 },
  ];

  const adminLinks: SidebarLink[] = [
    { to: '/admin', label: 'Admin overview', icon: LayoutDashboard },
    { to: '/admin/students', label: 'Student cohort', icon: Users },
    { to: '/admin/questions', label: 'Question bank', icon: Database },
    { to: '/admin/tests', label: 'Test publisher', icon: FileCheck2 },
    { to: '/admin/reports', label: 'Accreditation export', icon: Download },
  ];

  const mentorLinks: SidebarLink[] = [
    { to: '/mentor', label: 'Interview schedule', icon: Video },
    { to: '/mocktests', label: 'Question bank review', icon: Database },
  ];

  const currentLinks =
    user.role === 'ADMIN' ? adminLinks : user.role === 'INTERVIEWER' ? mentorLinks : studentLinks;

  return (
    <aside className="w-60 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 min-h-[calc(100vh-3.5rem)] select-none">
      <div className="p-3">
        {/* Navigation Category Label: Sentence case, quiet 24px above, 8px below */}
        <div className="px-3 pt-3 pb-2 text-[11px] font-medium text-slate-400 dark:text-slate-500">
          {user.role === 'ADMIN' ? 'Administration' : user.role === 'INTERVIEWER' ? 'Mentorship' : 'Placement Curriculum'}
        </div>

        {/* 36px Height, 2px Gap, Line Icons, Fixed 18px Icon Box */}
        <nav className="space-y-0.5">
          {currentLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center justify-between h-9 px-3 rounded text-xs transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-medium dark:bg-slate-800 dark:text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 shrink-0 text-slate-500 dark:text-slate-400" />
                  <span className="truncate">{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Info: Minimal, quiet text */}
      <div className="mt-auto p-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 leading-normal">
        <div>NICHE University Placement</div>
        <div className="text-[10px] text-slate-400">Academic Year 2026–2027</div>
      </div>
    </aside>
  );
};
