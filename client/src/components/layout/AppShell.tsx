import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  hideSidebar?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({ hideSidebar = false }) => {
  return (
    <div
      className="h-screen w-screen bg-[#090a0f] text-zinc-100 flex overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {!hideSidebar && <Sidebar />}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto bg-[#090a0f]">
        <Outlet />
      </main>
    </div>
  );
};
