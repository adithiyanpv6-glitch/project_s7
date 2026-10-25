import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { api } from '../../api/client';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  User,
  GraduationCap,
  Briefcase,
  Code2,
  Calendar,
  Save,
  CheckCircle2,
} from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useNotifications();

  const profile = user?.studentProfile;

  const [college, setCollege] = useState(profile?.college || 'National Institute of Technology');
  const [branch, setBranch] = useState(profile?.branch || 'Computer Science & Engineering');
  const [gradYear, setGradYear] = useState(profile?.gradYear || 2026);
  const [cgpa, setCgpa] = useState(profile?.cgpa || 8.65);
  const [preferredLang, setPreferredLang] = useState(profile?.preferredLang || 'Java');
  const [dailyHours, setDailyHours] = useState(profile?.dailyHours || 3.0);
  const [targetDate, setTargetDate] = useState(
    profile?.targetDate ? profile.targetDate.split('T')[0] : '2026-12-15'
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/student/onboarding', {
        college,
        branch,
        gradYear: Number(gradYear),
        cgpa: Number(cgpa),
        targetRoles: JSON.parse(profile?.targetRoles || '["Software Development Engineer"]'),
        targetCompanies: JSON.parse(profile?.targetCompanies || '["TCS", "Amazon"]'),
        skillLevel: profile?.skillLevel || 'INTERMEDIATE',
        preferredLang,
        dailyHours: Number(dailyHours),
        targetDate,
        roadmapDuration: profile?.roadmapDuration || 60,
      });

      showToast('Profile and roadmap settings updated successfully!', 'success');
      await refreshUser();
    } catch (err: any) {
      showToast(err.message || 'Update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs">
        <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
          Student Profile & Placement Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Keep your academic metrics, target companies, and daily preparation parameters up to date.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 space-y-4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-brand-600" />
              <CardTitle>Personal & Academic Profile</CardTitle>
            </div>
            <Badge variant="brand" size="sm">
              Readiness: {profile?.readinessScore || 78.5}%
            </Badge>
          </CardHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Candidate Name
              </label>
              <input
                type="text"
                disabled
                value={user?.name || ''}
                className="w-full px-3 py-2 text-sm bg-slate-100 dark:bg-navy-950/60 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                University Email Address
              </label>
              <input
                type="text"
                disabled
                value={user?.email || ''}
                className="w-full px-3 py-2 text-sm bg-slate-100 dark:bg-navy-950/60 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                College / Institution
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Engineering Branch
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Graduation Year
              </label>
              <input
                type="number"
                value={gradYear}
                onChange={(e) => setGradYear(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Cumulative CGPA (out of 10)
              </label>
              <input
                type="number"
                step="0.01"
                value={cgpa}
                onChange={(e) => setCgpa(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </Card>

        {/* Schedule & Language Parameters */}
        <Card className="p-6 space-y-4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-brand-600" />
              <CardTitle>Preparation & Language Preferences</CardTitle>
            </div>
          </CardHeader>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Primary Programming Language
              </label>
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option>Java</option>
                <option>C++</option>
                <option>Python</option>
                <option>JavaScript</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily Commitment (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="10"
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Placement Target Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" isLoading={saving} size="sm">
              <Save className="w-3.5 h-3.5 mr-1" />
              Save Changes
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};
