import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';
import { ArrowLeft, Check, Lock, Mail, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [role, setRole] = useState<'STUDENT' | 'INTERVIEWER' | 'ADMIN'>('STUDENT');
  const [email, setEmail] = useState('student@placementprep.com');
  const [password, setPassword] = useState('Student@123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, switchRoleDemo } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (selectedRole: 'STUDENT' | 'INTERVIEWER' | 'ADMIN') => {
    setRole(selectedRole);
    setError(null);
    if (selectedRole === 'STUDENT') {
      setEmail('student@placementprep.com');
      setPassword('Student@123');
    } else if (selectedRole === 'INTERVIEWER') {
      setEmail('mentor@placementprep.com');
      setPassword('Mentor@123');
    } else {
      setEmail('admin@placementprep.com');
      setPassword('Admin@123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await api.post<{ token: string; user: any }>('/auth/login', {
        email,
        password,
      });

      login(res.token, res.user);

      if (res.user.role === 'ADMIN') {
        navigate('/admin');
      } else if (res.user.role === 'INTERVIEWER') {
        navigate('/mentor');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOneClickDemo = async () => {
    setIsLoading(true);
    try {
      await switchRoleDemo(role);
      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'INTERVIEWER') navigate('/mentor');
      else navigate('/dashboard');
    } catch (e: any) {
      setError('Failed to log in with demo account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between items-center py-6 sm:py-10 px-4 overflow-hidden select-none"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. BACKGROUND GLOW & TECH CIRCUIT TRACES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-center emerald/cyan ambient aura */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-4xl h-[45vh] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 0%, rgba(13, 148, 136, 0.22) 0%, rgba(5, 70, 65, 0.12) 45%, rgba(0, 0, 0, 0) 80%)',
          }}
        />

        {/* Left Tech Circuit Trace Lines with Glow */}
        <svg
          className="absolute top-12 left-0 w-64 sm:w-80 h-48 opacity-45 pointer-events-none"
          viewBox="0 0 320 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 40 L 140 40 L 190 90 L 260 90"
            stroke="url(#leftTraceGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="260" cy="90" r="3.5" fill="#2dd4bf" />
          <circle cx="260" cy="90" r="7" stroke="#2dd4bf" strokeWidth="1" opacity="0.4" />
          <path
            d="M 0 130 L 90 130 L 120 160 L 180 160"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="180" cy="160" r="2.5" fill="rgba(255,255,255,0.6)" />
          <defs>
            <linearGradient id="leftTraceGrad" x1="0" y1="40" x2="260" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.6)" />
              <stop offset="0.6" stopColor="rgba(45,212,191,0.8)" />
              <stop offset="1" stopColor="rgba(45,212,191,1)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Right Tech Circuit Trace Lines with Glow */}
        <svg
          className="absolute top-12 right-0 w-64 sm:w-80 h-48 opacity-45 pointer-events-none"
          viewBox="0 0 320 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 320 40 L 180 40 L 130 90 L 60 90"
            stroke="url(#rightTraceGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="60" cy="90" r="3.5" fill="#2dd4bf" />
          <circle cx="60" cy="90" r="7" stroke="#2dd4bf" strokeWidth="1" opacity="0.4" />
          <path
            d="M 320 130 L 230 130 L 200 160 L 140 160"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <circle cx="140" cy="160" r="2.5" fill="rgba(255,255,255,0.6)" />
          <defs>
            <linearGradient id="rightTraceGrad" x1="320" y1="40" x2="60" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.6)" />
              <stop offset="0.6" stopColor="rgba(45,212,191,0.8)" />
              <stop offset="1" stopColor="rgba(45,212,191,1)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Giant Watermark Text: N I C H E (Replaces the CONTACT text from reference image) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-extrabold text-[15vw] sm:text-[17vw] tracking-[0.25em] text-white/[0.045] uppercase leading-none transform -translate-y-12">
            N I C H E
          </span>
        </div>
      </div>

      {/* 2. TOP AT CENTRE: COLLEGE NAME IN MONTSERRAT */}
      <header className="relative z-10 w-full flex items-center justify-between max-w-6xl px-4 pt-1 sm:pt-2">
        <Link
          to="/"
          className="text-zinc-500 hover:text-white transition-colors text-xs tracking-widest flex items-center gap-1.5 uppercase font-light"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>

        <h2 className="text-xs sm:text-sm md:text-base font-light tracking-[0.22em] sm:tracking-[0.3em] text-zinc-200 uppercase text-center flex-1 px-2">
          NOORUL ISLAM CENTRE FOR HIGHER EDUCATION
        </h2>

        <div className="w-12 hidden sm:block" />
      </header>

      {/* 3. CENTRE: GLASSMORPHISM SIGN IN BOX */}
      <div className="relative z-10 w-full max-w-md my-auto px-2 py-4">
        <div className="relative rounded-3xl bg-zinc-950/70 backdrop-blur-2xl border border-zinc-800/90 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(13,148,136,0.08)] p-6 sm:p-8 space-y-6">
          
          {/* 3 Role Options in Exact Order: Student, Mentor, Admin */}
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-light block text-center">
              Select Institutional Portal
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
              <button
                type="button"
                onClick={() => handleRoleChange('STUDENT')}
                className={`py-2 px-2.5 rounded-lg text-xs tracking-wider uppercase transition-all duration-200 font-medium ${
                  role === 'STUDENT'
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/80'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('INTERVIEWER')}
                className={`py-2 px-2.5 rounded-lg text-xs tracking-wider uppercase transition-all duration-200 font-medium ${
                  role === 'INTERVIEWER'
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/80'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                Mentor
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('ADMIN')}
                className={`py-2 px-2.5 rounded-lg text-xs tracking-wider uppercase transition-all duration-200 font-medium ${
                  role === 'ADMIN'
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/80'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Form Context Caption */}
          <div className="text-center space-y-1">
            <h3 className="text-lg font-light tracking-wide text-white uppercase">
              {role === 'STUDENT' ? 'Student Sign In' : role === 'INTERVIEWER' ? 'Mentor Sign In' : 'TPO Admin Sign In'}
            </h3>
            <p className="text-[11px] text-zinc-400 font-light tracking-wider">
              {role === 'STUDENT'
                ? 'Department of Computer Science & Engineering'
                : role === 'INTERVIEWER'
                ? 'Technical Interview & Evaluation Panel'
                : 'Placement & Training Administration'}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs text-center font-light tracking-wide">
              {error}
            </div>
          )}

          {/* Sign In Form: Glass Inputs matching reference style */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-light tracking-wider uppercase text-zinc-300">
                Institutional Email / ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@placementprep.com"
                  className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-light tracking-wider uppercase text-zinc-300">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button: Solid White Pill like the reference Submit button */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-zinc-200 text-black font-semibold tracking-[0.15em] text-xs uppercase py-3.5 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? 'Verifying...' : 'Submit'}
              </button>

              {/* 1-Click Instant Demo Login Option */}
              <button
                type="button"
                onClick={handleOneClickDemo}
                disabled={isLoading}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 font-light tracking-[0.15em] text-[11px] uppercase py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-teal-400" />
                Quick Launch {role === 'STUDENT' ? 'Student' : role === 'INTERVIEWER' ? 'Mentor' : 'Admin'} Demo
              </button>
            </div>
          </form>

          {/* Registration Link */}
          <div className="text-center pt-2 border-t border-zinc-900 text-xs">
            <span className="text-zinc-400 font-light">New to the platform? </span>
            <Link
              to="/register"
              className="text-zinc-200 hover:text-white underline underline-offset-4 tracking-wider uppercase text-[11px]"
            >
              Register Candidate
            </Link>
          </div>

        </div>
      </div>

      {/* 4. CENTRE AT BOTTOM: NAME OF THE WEBSITE IN MONTSERRAT */}
      <footer className="relative z-10 w-full text-center pb-2 pt-4">
        <p className="text-[10px] sm:text-xs md:text-sm font-light tracking-[0.35em] sm:tracking-[0.45em] text-zinc-500 uppercase">
          PLACEMENT READINESS PLATFORM OF NICHE
        </p>
      </footer>
    </main>
  );
};

export default LoginPage;
