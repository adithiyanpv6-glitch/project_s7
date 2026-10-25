import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface AppShellProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  hideSidebar?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({ darkMode, setDarkMode, hideSidebar = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {!hideSidebar && <Sidebar />}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-w-0">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
