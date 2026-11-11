import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { NICHE_BRAND } from '../../constants/nicheBrand';
import { Button } from '../common/Button';
import {
  Bell,
  Sun,
  Moon,
  LogOut,
  GraduationCap,
  ChevronDown,
  Monitor,
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
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand: NICHE PlacementOS with official crest */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={NICHE_BRAND.images.logo}
              alt="NICHE University Logo"
              className="w-7 h-7 object-contain rounded bg-white p-0.5 border border-slate-200 dark:border-slate-800 shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">
                NICHE PlacementOS
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                Dept. of CSE
              </span>
            </div>
          </Link>
        </div>

        {/* Right Actions: Quiet controls, 4px grid spacing */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-8 h-8 rounded border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Role Switcher for Institutional Demo */}
          {user && (
            <div className="hidden lg:flex items-center border border-slate-200 dark:border-slate-800 rounded p-0.5 text-xs text-slate-600 dark:text-slate-400">
              <button
                onClick={() => switchRoleDemo('STUDENT')}
                className={`px-2 py-1 rounded transition-colors ${
                  user.role === 'STUDENT'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-medium'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => switchRoleDemo('ADMIN')}
                className={`px-2 py-1 rounded transition-colors ${
                  user.role === 'ADMIN'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-medium'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                TPO Admin
              </button>
              <button
                onClick={() => switchRoleDemo('INTERVIEWER')}
                className={`px-2 py-1 rounded transition-colors ${
                  user.role === 'INTERVIEWER'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-medium'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Mentor
              </button>
            </div>
          )}

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-8 h-8 rounded border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-teal-600" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-50 py-2">
                <div className="px-3 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-slate-500 hover:text-slate-900 dark:hover:text-white text-[11px] font-normal"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.length === 0 ? (
                    <div className="px-3 py-6 text-center text-xs text-slate-500">
                      No unread alerts
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-3 text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                          !n.read ? 'bg-slate-50/50 dark:bg-slate-800/30 font-medium' : ''
                        }`}
                      >
                        <div className="text-slate-900 dark:text-slate-100">{n.title}</div>
                        <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{n.message}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Account / Session Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 h-8 px-2 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-200">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200 max-w-[120px] truncate hidden sm:inline">
                  {user.name}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg py-1 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">{user.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Profile settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
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
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
