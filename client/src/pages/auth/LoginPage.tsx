import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';
import { ArrowLeft, ArrowRight, GraduationCap, ShieldCheck, Users, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  // Step: 'roles' (first page with ONLY Student, Mentor, Admin) | 'credentials' (next page with email entering)
  const [step, setStep] = useState<'roles' | 'credentials'>('roles');
  const [role, setRole] = useState<'STUDENT' | 'INTERVIEWER' | 'ADMIN'>('STUDENT');
  const [email, setEmail] = useState('student@placementprep.com');
  const [password, setPassword] = useState('Student@123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, switchRoleDemo } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = (selectedRole: 'STUDENT' | 'INTERVIEWER' | 'ADMIN') => {
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
    // Advance to credentials entry on next page
    setStep('credentials');
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
      {/* 1. TOP LEFT CORNER: BACK BUTTON */}
      <Link
        to="/"
        className="absolute top-4 left-4 sm:top-6 sm:left-8 z-20 text-zinc-500 hover:text-white transition-colors text-xs tracking-widest flex items-center gap-1.5 uppercase font-light"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </Link>

      {/* TOP RIGHT CORNER: NICHE LOGO */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20 flex items-center">
        <img
          src="/images/niche_logo.png"
          alt="NICHE Logo"
          className="h-7 sm:h-8 md:h-9 w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] filter brightness-95 hover:brightness-100 transition-all duration-300"
        />
      </div>

      {/* 2. BACKGROUND: Lighting Ambient Glow & Faded NICHE Centered with Login Box */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Soft, Diffuse Ambient Halo */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-[55vh] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 15%, rgba(200, 220, 215, 0.10) 0%, rgba(13, 148, 136, 0.12) 30%, rgba(10, 45, 45, 0.06) 60%, rgba(0, 0, 0, 0) 85%)',
          }}
        />

        {/* Faded NICHE Watermark Centered Directly with the Login Box */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none px-4">
          <span className="font-extrabold text-[12vw] sm:text-[14vw] tracking-[0.22em] uppercase leading-none opacity-[0.10] whitespace-nowrap text-zinc-300">
            N I C H E
          </span>
        </div>

        {/* Subtle Bottom Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 3. TOP AT CENTRE: COLLEGE NAME IN MONTSERRAT */}
      <header className="relative z-10 w-full text-center max-w-4xl px-4 pt-3 sm:pt-4">
        <h2 className="text-xs sm:text-sm md:text-base font-light tracking-[0.22em] sm:tracking-[0.3em] text-zinc-200 uppercase">
          NOORUL ISLAM CENTRE FOR HIGHER EDUCATION
        </h2>
      </header>

      {/* 3. CENTRE: GLASSMORPHISM BOX */}
      <div className="relative z-10 w-full max-w-lg my-auto px-2 py-4">
        
        {/* STEP 1: FIRST PAGE — ONLY STUDENT, MENTOR, ADMIN OPTIONS (IN THIS ORDER) */}
        {step === 'roles' && (
          <div className="relative rounded-3xl bg-zinc-950/45 backdrop-blur-xl border border-zinc-800/80 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(255,255,255,0.03)] p-6 sm:p-8 space-y-6 overflow-hidden">
            {/* Header Caption */}
            <div className="relative z-10 text-center space-y-1.5 pb-2">
              <span className="text-[10px] sm:text-[11px] font-light tracking-[0.25em] uppercase text-zinc-400">
                Institutional Access
              </span>
              <h3 className="text-xl sm:text-2xl font-light tracking-wide text-white uppercase">
                Select Your Portal
              </h3>
            </div>

            {/* 3 Options Only: Student, Mentor, Admin (In Exact Order) */}
            <div className="space-y-3 font-montserrat">
              
              {/* Option 1: Student */}
              <button
                type="button"
                onClick={() => handleSelectRole('STUDENT')}
                className="group w-full p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-500/80 transition-all duration-300 flex items-center justify-between text-left cursor-pointer shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-teal-400 group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium tracking-wider text-white uppercase group-hover:text-teal-300 transition-colors">
                      Student
                    </div>
                    <div className="text-[11px] text-zinc-400 font-light tracking-wide mt-0.5">
                      B.Tech / M.Tech Placement Cohort 2026
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-800/60 group-hover:bg-white group-hover:text-black flex items-center justify-center text-zinc-400 transition-all shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Option 2: Mentor */}
              <button
                type="button"
                onClick={() => handleSelectRole('INTERVIEWER')}
                className="group w-full p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-500/80 transition-all duration-300 flex items-center justify-between text-left cursor-pointer shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-teal-400 group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium tracking-wider text-white uppercase group-hover:text-teal-300 transition-colors">
                      Mentor
                    </div>
                    <div className="text-[11px] text-zinc-400 font-light tracking-wide mt-0.5">
                      Technical Interview & Evaluation Panel
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-800/60 group-hover:bg-white group-hover:text-black flex items-center justify-center text-zinc-400 transition-all shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Option 3: Admin */}
              <button
                type="button"
                onClick={() => handleSelectRole('ADMIN')}
                className="group w-full p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-500/80 transition-all duration-300 flex items-center justify-between text-left cursor-pointer shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-teal-400 group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium tracking-wider text-white uppercase group-hover:text-teal-300 transition-colors">
                      Admin
                    </div>
                    <div className="text-[11px] text-zinc-400 font-light tracking-wide mt-0.5">
                      Training & Placement Officer (TPO Console)
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-800/60 group-hover:bg-white group-hover:text-black flex items-center justify-center text-zinc-400 transition-all shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

            </div>

          </div>
        )}

        {/* STEP 2: NEXT PAGE — CREDENTIAL / EMAIL ENTERING OPTION FOR THE CHOSEN ROLE */}
        {step === 'credentials' && (
          <div className="relative rounded-3xl bg-zinc-950/45 backdrop-blur-xl border border-zinc-800/80 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(255,255,255,0.03)] p-6 sm:p-8 space-y-5 overflow-hidden">
            <div className="relative z-10 space-y-5">
              {/* Back Button to Return to Role Selection */}
              <button
                type="button"
                onClick={() => {
                  setStep('roles');
                  setError(null);
                }}
                className="text-zinc-400 hover:text-white transition-colors text-xs tracking-wider flex items-center gap-1.5 uppercase font-light cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Role Selection
              </button>

            {/* Context Header */}
            <div className="text-center space-y-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-teal-400 font-light">
                {role === 'STUDENT' ? 'Student Portal' : role === 'INTERVIEWER' ? 'Mentor Portal' : 'Admin Portal'}
              </span>
              <h3 className="text-xl font-light tracking-wide text-white uppercase">
                {role === 'STUDENT' ? 'Student Sign In' : role === 'INTERVIEWER' ? 'Mentor Sign In' : 'TPO Admin Sign In'}
              </h3>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs text-center font-light tracking-wide">
                {error}
              </div>
            )}

            {/* Email & Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-light tracking-wider uppercase text-zinc-300">
                  Institutional Email / ID
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@placementprep.com"
                  className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-light tracking-wider uppercase text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Submit Pill Button */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-zinc-200 text-black font-semibold tracking-[0.15em] text-xs uppercase py-3.5 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? 'Verifying...' : 'Submit'}
                </button>

                {/* 1-Click Instant Demo Launch Option */}
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
              <span className="text-zinc-400 font-light">New candidate? </span>
              <Link
                to="/register"
                className="text-zinc-200 hover:text-white underline underline-offset-4 tracking-wider uppercase text-[11px]"
              >
                Register Account
              </Link>
            </div>

            </div>
          </div>
        )}

      </div>

      {/* 4. CENTRE AT BOTTOM: NAME OF THE WEBSITE IN MONTSERRAT (UNCHANGED) */}
      <footer className="relative z-10 w-full text-center pb-2 pt-4">
        <p className="text-[10px] sm:text-xs md:text-sm font-light tracking-[0.35em] sm:tracking-[0.45em] text-zinc-500 uppercase">
          PLACEMENT READINESS PLATFORM OF NICHE
        </p>
      </footer>
    </main>
  );
};

export default LoginPage;
