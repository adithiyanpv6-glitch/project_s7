import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';
import { ArrowLeft } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<'STUDENT' | 'INTERVIEWER' | 'ADMIN'>('STUDENT');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await api.post<{ token: string; user: any }>('/auth/register', {
        name,
        email,
        password,
        role,
      });

      login(res.token, res.user);

      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'INTERVIEWER') navigate('/mentor');
      else navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check details.');
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
        to="/login"
        className="absolute top-4 left-4 sm:top-6 sm:left-8 z-20 text-zinc-500 hover:text-white transition-colors text-xs tracking-widest flex items-center gap-1.5 uppercase font-light"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Sign In
      </Link>

      {/* TOP RIGHT CORNER: NICHE LOGO */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20 flex items-center">
        <img
          src="/images/niche_logo.png"
          alt="NICHE Logo"
          className="h-7 sm:h-8 md:h-9 w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] filter brightness-95 hover:brightness-100 transition-all duration-300"
        />
      </div>

      {/* 2. BACKGROUND: Lighting Ambient Glow & Faded NICHE Centered with Box */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-center emerald/cyan ambient aura */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-[55vh] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 15%, rgba(200, 220, 215, 0.10) 0%, rgba(13, 148, 136, 0.12) 30%, rgba(10, 45, 45, 0.06) 60%, rgba(0, 0, 0, 0) 85%)',
          }}
        />

        {/* Faded NICHE Watermark Centered Directly with the Box */}
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

      {/* 4. CENTRE: GLASSMORPHISM REGISTER BOX */}
      <div className="relative z-10 w-full max-w-md my-auto px-2 py-4">
        <div className="relative rounded-3xl bg-zinc-950/45 backdrop-blur-xl border border-zinc-800/80 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(255,255,255,0.03)] p-6 sm:p-8 space-y-5 overflow-hidden">
          <div className="relative z-10 space-y-5">
          
          {/* 3 Role Options in Exact Order: Student, Mentor, Admin */}
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-light block text-center">
              Register Role Category
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
              <button
                type="button"
                onClick={() => setRole('STUDENT')}
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
                onClick={() => setRole('INTERVIEWER')}
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
                onClick={() => setRole('ADMIN')}
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

          <div className="text-center space-y-1">
            <h3 className="text-lg font-light tracking-wide text-white uppercase">
              Create Profile
            </h3>
            <p className="text-[11px] text-zinc-400 font-light tracking-wider">
              {role === 'STUDENT'
                ? 'Join NICHE CSE Placement Cohort 2026'
                : role === 'INTERVIEWER'
                ? 'Register Placement Mentor Credentials'
                : 'Request Institutional Admin Access'}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs text-center font-light tracking-wide">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[11px] font-light tracking-wider uppercase text-zinc-300">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Adithiyan P V"
                className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-light tracking-wider uppercase text-zinc-300">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@niuniv.edu"
                className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-light tracking-wider uppercase text-zinc-300">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-zinc-200 text-black font-semibold tracking-[0.15em] text-xs uppercase py-3.5 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? 'Registering...' : 'Submit'}
              </button>
            </div>
          </form>

          <div className="text-center pt-2 border-t border-zinc-900 text-xs">
            <span className="text-zinc-400 font-light">Already registered? </span>
            <Link
              to="/login"
              className="text-zinc-200 hover:text-white underline underline-offset-4 tracking-wider uppercase text-[11px]"
            >
              Sign In
            </Link>
          </div>

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

export default RegisterPage;
