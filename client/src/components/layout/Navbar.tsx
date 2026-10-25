import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Badge } from '../common/Badge';
import {
  Bell,
  Sun,
  Moon,
  LogOut,
  Flame,
  Award,
  UserCheck,
  Briefcase,
  GraduationCap,
  Shield,
} from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const { user, logout, switchRoleDemo } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-navy-900/95 backdrop-blur border-b border-slate-200 dark:border-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-900 to-navy-800 border border-navy-700 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <span className="text-lg font-bold text-navy-900 dark:text-white tracking-tight flex items-center gap-1.5">
                PlacementPrep
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                  PRO
                </span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">
                Campus Readiness Platform
              </p>
            </div>
          </Link>
        </div>

        {/* Center / Stats (Only for logged-in students) */}
        {user && user.role === 'STUDENT' && (
          <div className="hidden md:flex items-center gap-4 bg-slate-50 dark:bg-navy-950/60 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-navy-800">
            {/* Readiness Score */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Readiness:</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                {user.studentProfile?.readinessScore || 78.5}%
              </span>
            </div>

            <div className="h-3 w-px bg-slate-300 dark:bg-navy-700" />

            {/* Streak */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{user.studentProfile?.streakDays || 14} Day Streak</span>
            </div>
          </div>
        )}

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher for seamless testing */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-navy-800 p-0.5 rounded-lg border border-slate-200 dark:border-navy-700 text-xs">
            <span className="px-2 text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">
              Role:
            </span>
            <button
              onClick={() => switchRoleDemo('STUDENT')}
              className={`px-2 py-1 rounded font-medium transition-all ${
                user?.role === 'STUDENT'
                  ? 'bg-white dark:bg-navy-900 shadow-xs text-brand-700 dark:text-brand-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => switchRoleDemo('ADMIN')}
              className={`px-2 py-1 rounded font-medium transition-all ${
                user?.role === 'ADMIN'
                  ? 'bg-white dark:bg-navy-900 shadow-xs text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Admin/TPO
            </button>
            <button
              onClick={() => switchRoleDemo('INTERVIEWER')}
              className={`px-2 py-1 rounded font-medium transition-all ${
                user?.role === 'INTERVIEWER'
                  ? 'bg-white dark:bg-navy-900 shadow-xs text-teal-700 dark:text-teal-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Mentor
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl shadow-xl p-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-navy-800">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      Notifications ({unreadCount} new)
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[11px] text-brand-600 hover:underline font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-navy-800/60 mt-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 py-4 text-center">No notifications yet</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                          className={`p-2.5 text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-navy-800/50 rounded transition-colors ${
                            !n.read ? 'bg-brand-50/40 dark:bg-brand-950/20' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {n.title}
                            </span>
                            {!n.read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                            )}
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 mt-0.5">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Profile / Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-brand-500 transition-all"
              >
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0F172A&color=fff`
                  }
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-300 dark:border-navy-700"
                />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-navy-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    <Badge variant="brand" size="sm" className="mt-1">
                      {user.role}
                    </Badge>
                  </div>

                  <div className="py-1">
                    {user.role === 'STUDENT' && (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded"
                        >
                          <GraduationCap className="w-3.5 h-3.5" />
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          Profile & Roadmap Settings
                        </Link>
                      </>
                    )}
                    {user.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        Admin Dashboard
                      </Link>
                    )}
                    {user.role === 'INTERVIEWER' && (
                      <Link
                        to="/mentor"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        Mentor Portal
                      </Link>
                    )}
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-navy-800">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-600 px-3 py-1.5"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white px-3.5 py-1.5 rounded-lg shadow-sm"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
