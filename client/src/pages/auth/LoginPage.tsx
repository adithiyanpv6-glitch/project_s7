import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/client';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { GraduationCap, ShieldCheck, ArrowRight, Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
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
        if (res.user.studentProfile?.onboardingDone) {
          navigate('/dashboard');
        } else {
          navigate('/onboarding');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillCredentials = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-navy-900 border border-navy-700 items-center justify-center text-brand-400 shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-navy-950 dark:text-white tracking-tight">
            Sign In to PlacementPrep
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Access your personalized roadmap, mock tests, and readiness analytics
          </p>
        </div>

        {/* 1-Click Quick Demo Sign-in Cards */}
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block text-center">
            One-Click Demo Credentials
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillCredentials('student@placementprep.com', 'Student@123')}
              className="p-2 rounded-lg bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-left hover:border-brand-500 transition-all text-xs"
            >
              <span className="font-bold text-slate-900 dark:text-white block">Student</span>
              <span className="text-[10px] text-brand-600 dark:text-brand-400">Aditya V.</span>
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('admin@placementprep.com', 'Admin@123')}
              className="p-2 rounded-lg bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-left hover:border-brand-500 transition-all text-xs"
            >
              <span className="font-bold text-slate-900 dark:text-white block">Admin/TPO</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400">Dr. Ramesh</span>
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('mentor@placementprep.com', 'Mentor@123')}
              className="p-2 rounded-lg bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 text-left hover:border-brand-500 transition-all text-xs"
            >
              <span className="font-bold text-slate-900 dark:text-white block">Mentor</span>
              <span className="text-[10px] text-teal-600 dark:text-teal-400">Anjali M.</span>
            </button>
          </div>
        </div>

        <Card className="p-6 shadow-md">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                Register as Student
              </Link>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};
