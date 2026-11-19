import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutGrid,
  Video,
  CheckSquare,
  Calendar,
  FileText,
  Building2,
  Settings,
  Search,
  ChevronRight,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  Users,
  Database,
  Download,
  FileCheck2,
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { user, logout, switchRoleDemo } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentPlatformLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { to: '/interviews', label: 'Mock Interviews', icon: Video },
    { to: '/practice', label: 'Practice & Tests', icon: CheckSquare },
    { to: '/roadmap', label: 'Curated Roadmap', icon: Calendar },
    { to: '/resume', label: 'Resume AI', icon: FileText },
    { to: '/companies', label: 'Company Hub', icon: Building2 },
  ];

  const adminPlatformLinks = [
    { to: '/admin', label: 'Overview', icon: LayoutGrid },
    { to: '/admin/students', label: 'Student Cohort', icon: Users },
    { to: '/admin/questions', label: 'Question Bank', icon: Database },
    { to: '/admin/tests', label: 'Test Publisher', icon: FileCheck2 },
    { to: '/admin/reports', label: 'Reports Export', icon: Download },
  ];

  const mentorPlatformLinks = [
    { to: '/mentor', label: 'Interview Schedule', icon: Video },
    { to: '/mocktests', label: 'Question Bank Review', icon: Database },
  ];

  const platformLinks =
    user.role === 'ADMIN'
      ? adminPlatformLinks
      : user.role === 'INTERVIEWER'
      ? mentorPlatformLinks
      : studentPlatformLinks;

  const filteredLinks = searchQuery
    ? platformLinks.filter((l) => l.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : platformLinks;

  return (
    <aside
      className={`h-screen bg-[#0e0f14] border-r border-zinc-800/70 flex flex-col shrink-0 select-none transition-all duration-300 z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. Header with Logo & Collapse Toggle */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-zinc-800/60">
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src="/images/niche_logo.png"
            alt="NICHE"
            className="h-7 w-auto object-contain brightness-95"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {!collapsed && (
            <span className="text-xs font-semibold tracking-wider uppercase text-zinc-200 truncate">
              NICHE PRP
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-zinc-500 hover:text-zinc-200 transition-colors p-1.5 rounded-lg hover:bg-zinc-800/60"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. Search Input (Like Reference Image: Search... ⌘K) */}
      {!collapsed && (
        <div className="p-3">
          <div className="relative flex items-center rounded-xl bg-zinc-900/80 border border-zinc-800/80 px-3 py-2 text-xs text-zinc-400 focus-within:border-zinc-700 transition-colors">
            <Search className="w-3.5 h-3.5 text-zinc-500 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-zinc-200 placeholder-zinc-500 text-xs w-full"
            />
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800/90 text-[10px] text-zinc-400 font-mono tracking-widest shrink-0 border border-zinc-700/50">
              ⌘K
            </kbd>
          </div>
        </div>
      )}

      {/* 3. Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5">
        {/* Section: Platform */}
        <div className="space-y-1">
          {!collapsed && (
            <div className="px-3 pt-1 pb-1.5 text-[10px] font-medium tracking-wider text-zinc-500 uppercase">
              Platform
            </div>
          )}
          <nav className="space-y-1">
            {filteredLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  title={collapsed ? link.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-normal transition-all duration-200 ${
                      isActive
                        ? 'bg-zinc-800/90 text-white font-medium shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                    } ${collapsed ? 'justify-center px-0' : ''}`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-200" />
                  {!collapsed && <span className="truncate">{link.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Section: System */}
        <div className="space-y-1">
          {!collapsed && (
            <div className="px-3 pt-1 pb-1.5 text-[10px] font-medium tracking-wider text-zinc-500 uppercase">
              System
            </div>
          )}
          <NavLink
            to="/profile"
            title={collapsed ? 'Settings' : undefined}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all duration-200 ${
                isActive
                  ? 'bg-zinc-800/90 text-white font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              } ${collapsed ? 'justify-center px-0' : ''}`
            }
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 shrink-0 text-zinc-400" />
              {!collapsed && <span>Settings</span>}
            </div>
            {!collapsed && <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />}
          </NavLink>
        </div>
      </div>

      {/* 4. Bottom User Profile Card (Reference Image Style) */}
      <div className="p-3 border-t border-zinc-800/60">
        <div
          className={`flex items-center gap-3 p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 ${
            collapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-xs font-semibold text-white shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-xs font-medium text-white truncate">{user.name || 'Student User'}</div>
                <div className="text-[10px] text-zinc-500 truncate capitalize">
                  {user.role === 'STUDENT' ? 'Student' : user.role === 'ADMIN' ? 'TPO Admin' : 'Mentor'}
                </div>
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleLogout}
                className="text-zinc-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-zinc-800/80 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
