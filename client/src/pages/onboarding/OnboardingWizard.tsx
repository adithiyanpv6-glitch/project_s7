import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { api } from '../../api/client';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Briefcase,
  Code2,
  Calendar,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export const OnboardingWizard: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form states
  const [college, setCollege] = useState(user?.studentProfile?.college || 'National Institute of Technology');
  const [branch, setBranch] = useState(user?.studentProfile?.branch || 'Computer Science & Engineering');
  const [gradYear, setGradYear] = useState(user?.studentProfile?.gradYear || 2026);
  const [cgpa, setCgpa] = useState(user?.studentProfile?.cgpa || 8.5);

  const [targetRoles, setTargetRoles] = useState<string[]>(['Software Development Engineer', 'Full Stack Developer']);
  const [targetCompanies, setTargetCompanies] = useState<string[]>(['TCS', 'Amazon', 'Microsoft', 'Freshworks']);
  const [roadmapDuration, setRoadmapDuration] = useState<number>(60); // 30, 60, 90 days

  const [skillLevel, setSkillLevel] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('INTERMEDIATE');
  const [preferredLang, setPreferredLang] = useState('Java');
  const [dailyHours, setDailyHours] = useState(3.0);
  const [targetDate, setTargetDate] = useState('2026-12-15');

  const [strengths, setStrengths] = useState<string[]>(['Data Structures & Algorithms', 'Operating Systems']);
  const [weakAreas, setWeakAreas] = useState<string[]>(['Dynamic Programming', 'Computer Networks Subnetting']);
  const [resumeText, setResumeText] = useState('');

  const toggleItem = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await api.post('/student/onboarding', {
        college,
        branch,
        gradYear: Number(gradYear),
        cgpa: Number(cgpa),
        targetRoles,
        targetCompanies,
        skillLevel,
        preferredLang,
        dailyHours: Number(dailyHours),
        targetDate,
        strengths,
        weakAreas,
        roadmapDuration,
      });

      // If resume text provided, analyze it too
      if (resumeText.trim().length > 50) {
        try {
          await api.post('/resume/analyze', {
            rawText: resumeText,
            fileName: 'Onboarding_Resume.txt',
            targetRole: targetRoles[0] || 'Software Engineer',
          });
        } catch (e) {
          // non-blocking
        }
      }

      await refreshUser();
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#0d9488', '#14b8a6', '#0f172a', '#38bdf8', '#10b981'],
      });
      showToast('Personalized preparation roadmap generated successfully!', 'success');
      navigate('/dashboard');
    } catch (err: any) {
      showToast(err.message || 'Onboarding failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Step Tracker Header */}
      <div className="mb-8 text-center space-y-2">
        <Badge variant="brand" size="md">
          <Sparkles className="w-3.5 h-3.5" />
          Step {step} of 4: Personalized Plan Setup
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
          Configure Your Placement Trajectory
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Our adaptive engine generates daily tasks, practice targets, and mock milestones tailored to your schedule.
        </p>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 pt-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                step === i
                  ? 'w-8 bg-brand-600'
                  : step > i
                  ? 'w-2 bg-emerald-500'
                  : 'w-2 bg-slate-200 dark:bg-navy-800'
              }`}
            />
          ))}
        </div>
      </div>

      <Card className="p-6 sm:p-8 shadow-md">
        {/* Step 1: Academic Profile */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-navy-800">
              <GraduationCap className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Academic Background & Target Duration
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  College / Institution Name
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
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option>Computer Science & Engineering</option>
                  <option>Information Technology</option>
                  <option>Electronics & Communication</option>
                  <option>Electrical & Electronics</option>
                  <option>Mechanical Engineering</option>
                  <option>Civil Engineering</option>
                  <option>Other STEM Specialization</option>
                </select>
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
                  Current Cumulative CGPA (out of 10)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={cgpa}
                  onChange={(e) => setCgpa(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Roadmap Horizon Duration
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { days: 30, title: '30-Day Sprint', desc: 'Intensive brush-up for impending drives' },
                  { days: 60, title: '60-Day Comprehensive', desc: 'Balanced mastery across all topics' },
                  { days: 90, title: '90-Day Full Mastery', desc: 'Thorough foundations to advanced bar' },
                ].map((plan) => (
                  <button
                    key={plan.days}
                    type="button"
                    onClick={() => setRoadmapDuration(plan.days)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      roadmapDuration === plan.days
                        ? 'bg-brand-50 border-brand-500 text-brand-900 dark:bg-brand-950/60 dark:text-brand-200'
                        : 'border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="font-bold text-xs block">{plan.title}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                      {plan.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Target Roles & Companies */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-navy-800">
              <Briefcase className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Career Goals & Target Recruiters
              </h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Target Job Roles (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Software Development Engineer',
                  'Full Stack Developer',
                  'Data Analyst',
                  'Cloud & DevOps Engineer',
                  'Systems Engineer',
                  'QA / Automation Engineer',
                ].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleItem(targetRoles, setTargetRoles, role)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      targetRoles.includes(role)
                        ? 'bg-brand-600 border-brand-600 text-white'
                        : 'border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Priority Target Companies
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {['TCS', 'Amazon', 'Microsoft', 'Infosys', 'Accenture', 'Zoho', 'Freshworks', 'Cognizant', 'Wipro', 'Deloitte'].map(
                  (company) => (
                    <button
                      key={company}
                      type="button"
                      onClick={() => toggleItem(targetCompanies, setTargetCompanies, company)}
                      className={`p-2 rounded-lg text-xs font-semibold border text-center transition-all ${
                        targetCompanies.includes(company)
                          ? 'bg-navy-900 border-navy-900 text-white dark:bg-brand-600 dark:border-brand-600'
                          : 'border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {company}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Estimated Placement Drive Target Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        )}

        {/* Step 3: Technical Level & Study Schedule */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-navy-800">
              <Code2 className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Technical Proficiency & Availability
              </h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Current Coding & DSA Skill Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { level: 'BEGINNER', label: 'Beginner', desc: 'Know basic syntax, starting DSA' },
                  { level: 'INTERMEDIATE', label: 'Intermediate', desc: 'Can solve LeetCode Easy/Medium' },
                  { level: 'ADVANCED', label: 'Advanced', desc: 'Comfortable with DP, Graphs, Trees' },
                ].map((item) => (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setSkillLevel(item.level as any)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      skillLevel === item.level
                        ? 'bg-brand-50 border-brand-500 text-brand-900 dark:bg-brand-950/60 dark:text-brand-200'
                        : 'border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="font-bold text-xs block">{item.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Programming Language
                </label>
                <select
                  value={preferredLang}
                  onChange={(e) => setPreferredLang(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option>Java</option>
                  <option>C++</option>
                  <option>Python</option>
                  <option>JavaScript</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Daily Study Time: {dailyHours} Hours/Day
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-navy-700 rounded-lg appearance-none cursor-pointer mt-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Areas Needing Most Improvement (Weak Areas)
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Dynamic Programming',
                  'Computer Networks Subnetting',
                  'SQL Joins & Normalization',
                  'STAR Behavioral Articulation',
                  'Speed Quantitative Math',
                  'Graph Algorithms',
                  'System Design Basics',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleItem(weakAreas, setWeakAreas, item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      weakAreas.includes(item)
                        ? 'bg-rose-50 border-rose-400 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : 'border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Resume Audit & Confirmation */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-navy-800">
              <FileText className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Resume Ingestion & Roadmap Synthesis
              </h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Paste Resume Text (Optional - can also upload later in Resume module)
              </label>
              <textarea
                rows={5}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the text from your resume here to run an automated keyword and bullet point analysis..."
                className="w-full p-3 text-xs font-mono bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-navy-800 space-y-2">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                Generated Roadmap Preview
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{roadmapDuration} Days of daily categorized preparation tasks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Targeted for: {targetRoles.join(', ')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Priority syllabus for: {targetCompanies.join(', ')}</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
          {step > 1 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep(step - 1)}
              disabled={loading}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button size="sm" onClick={() => setStep(step + 1)}>
              Next Step
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button size="sm" onClick={handleFinish} isLoading={loading}>
              Generate Preparation Roadmap
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
