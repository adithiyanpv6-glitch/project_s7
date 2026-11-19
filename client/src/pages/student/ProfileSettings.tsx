import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { api } from '../../api/client';
import { Save } from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useNotifications();

  const profile = user?.studentProfile;

  const [college, setCollege] = useState(profile?.college || 'Noorul Islam Centre for Higher Education (NICHE)');
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

      showToast('Settings saved successfully!', 'success');
      await refreshUser();
    } catch (err: any) {
      showToast(err.message || 'Update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="p-6 sm:p-8 max-w-4xl mx-auto space-y-6 select-none bg-[#090a0f] text-zinc-100 min-h-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
          Settings
        </h1>
      </div>

      {/* 2. Form Settings Card */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-5">
          <h2 className="text-sm font-medium text-white">
            Academic & Placement Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Institution</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white outline-none focus:border-zinc-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Branch / Department</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white outline-none focus:border-zinc-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Graduation Year</label>
              <input
                type="number"
                value={gradYear}
                onChange={(e) => setGradYear(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white outline-none focus:border-zinc-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Cumulative CGPA</label>
              <input
                type="number"
                step="0.01"
                value={cgpa}
                onChange={(e) => setCgpa(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white outline-none focus:border-zinc-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Primary Programming Language</label>
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white outline-none focus:border-zinc-600"
              >
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="C++">C++</option>
                <option value="JavaScript">JavaScript</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Daily Preparation Hours</label>
              <input
                type="number"
                step="0.5"
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white outline-none focus:border-zinc-600"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="py-2.5 px-6 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-medium transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
