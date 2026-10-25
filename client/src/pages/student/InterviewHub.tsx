import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Video,
  Play,
  Calendar,
  ExternalLink,
  Award,
  Clock,
  UserCheck,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const InterviewHub: React.FC = () => {
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // System Mock Start Modal
  const [showSystemModal, setShowSystemModal] = useState(false);
  const [systemType, setSystemType] = useState('HR');
  const [systemCompany, setSystemCompany] = useState('Amazon');
  const [systemRole, setSystemRole] = useState('Software Development Engineer');

  // Mentor Booking Modal
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState('');
  const [mentorType, setMentorType] = useState('TECHNICAL');
  const [mentorCompany, setMentorCompany] = useState('Amazon');
  const [mentorDate, setMentorDate] = useState('');

  // Selected feedback modal
  const [selectedInterview, setSelectedInterview] = useState<any | null>(null);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const [resInterviews, resMentors] = await Promise.all([
        api.get<any[]>('/interviews/my'),
        api.get<any[]>('/interviews/mentors'),
      ]);
      setInterviews(resInterviews);
      setMentors(resMentors);
      if (resMentors.length > 0) setSelectedMentorId(resMentors[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleStartSystemInterview = async () => {
    try {
      const res = await api.post<any>('/interviews/system/start', {
        type: systemType,
        company: systemCompany,
        targetRole: systemRole,
      });
      setShowSystemModal(false);
      navigate(`/interviews/${res.interviewId}/live`, { state: { interviewData: res } });
    } catch (err: any) {
      showToast(err.message || 'Failed to start mock interview', 'error');
    }
  };

  const handleBookMentor = async () => {
    if (!mentorDate) {
      showToast('Please select a scheduled date and time', 'warning');
      return;
    }
    try {
      await api.post('/interviews/mentor/schedule', {
        interviewerId: selectedMentorId,
        type: mentorType,
        company: mentorCompany,
        targetRole: systemRole,
        scheduledFor: mentorDate,
      });
      showToast('Interview scheduled successfully with mentor!', 'success');
      setShowMentorModal(false);
      fetchInterviews();
    } catch (err: any) {
      showToast(err.message || 'Booking failed', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Mock Interview Simulator & Mentorship
            </h1>
            <Badge variant="brand" size="sm">STAR Rubric</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Practice interactive technical, behavioral, and company-specific interviews with automated feedback and 1-on-1 mentor sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setShowSystemModal(true)}>
            <Play className="w-3.5 h-3.5 mr-1" />
            Launch AI Mock Interview
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowMentorModal(true)}>
            <Calendar className="w-3.5 h-3.5 mr-1" />
            Book Mentor Interview
          </Button>
        </div>
      </div>

      {/* Two Pillars: System Mock vs Mentor-Led */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4 border-brand-200 dark:border-brand-950 bg-brand-50/20 dark:bg-brand-950/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Interactive System Mock Simulator
              </h3>
              <p className="text-[11px] text-slate-500">Instant AI Evaluation & Rubric Feedback</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Answer structured Technical, HR, and Managerial questions. Our NLP analysis assesses communication clarity, technical depth, and STAR behavioral impact.
          </p>
          <Button size="sm" className="w-full" onClick={() => setShowSystemModal(true)}>
            Start System Mock Interview
          </Button>
        </Card>

        <Card className="p-6 space-y-4 border-teal-200 dark:border-teal-950 bg-teal-50/20 dark:bg-teal-950/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                1-on-1 Mentor Mock Interviews
              </h3>
              <p className="text-[11px] text-slate-500">Live Video Sessions with Industry Engineers</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Schedule direct video interviews with alumni and senior engineers from Amazon, Microsoft, TCS, and Zoho for authentic live pressure testing.
          </p>
          <Button size="sm" variant="secondary" className="w-full" onClick={() => setShowMentorModal(true)}>
            Schedule with Mentor
          </Button>
        </Card>
      </div>

      {/* Interview History & Records */}
      <Card className="space-y-4">
        <CardHeader>
          <CardTitle>Interview History & Evaluation Reports</CardTitle>
          <Badge variant="neutral" size="sm">Past & Upcoming</Badge>
        </CardHeader>

        {loading ? (
          <div className="py-8 text-center">
            <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : interviews.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">
            No interviews scheduled or completed yet. Launch a system mock above to begin!
          </p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-navy-800">
            {interviews.map((iv) => (
              <div key={iv.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={iv.status === 'COMPLETED' ? 'success' : 'warning'} size="sm">
                      {iv.status}
                    </Badge>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {iv.type} Mock Interview - {iv.company || 'General'}
                    </span>
                    <span className="text-[11px] text-slate-400">({iv.targetRole})</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span>
                      {iv.scheduledFor
                        ? `Scheduled: ${new Date(iv.scheduledFor).toLocaleDateString()}`
                        : `Conducted: ${new Date(iv.createdAt).toLocaleDateString()}`}
                    </span>
                    {iv.interviewer && (
                      <span>Mentor: <strong>{iv.interviewer.name}</strong></span>
                    )}
                    {iv.overallRating != null && (
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        Rating: {iv.overallRating} / 10
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {iv.meetingLink && iv.status !== 'COMPLETED' && (
                    <a href={iv.meetingLink} target="_blank" rel="noreferrer">
                      <Button size="sm">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        Join Call
                      </Button>
                    </a>
                  )}

                  {iv.status === 'COMPLETED' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedInterview(iv)}
                    >
                      View Report & Rubric
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* System Mock Modal */}
      <Modal
        isOpen={showSystemModal}
        onClose={() => setShowSystemModal(false)}
        title="Configure Interactive System Mock Interview"
        description="Select interview type, company culture focus, and target role."
      >
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Interview Track
            </label>
            <select
              value={systemType}
              onChange={(e) => setSystemType(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
            >
              <option value="HR">HR & Behavioral (STAR Technique)</option>
              <option value="TECHNICAL">Technical & Core Systems</option>
              <option value="MANAGERIAL">Managerial & Prioritization</option>
              <option value="COMPANY_SPECIFIC">Company Culture Specific</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Company
            </label>
            <select
              value={systemCompany}
              onChange={(e) => setSystemCompany(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
            >
              <option>Amazon</option>
              <option>Microsoft</option>
              <option>TCS</option>
              <option>Infosys</option>
              <option>Freshworks</option>
              <option>Zoho</option>
              <option>Accenture</option>
              <option>Deloitte</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Role
            </label>
            <input
              type="text"
              value={systemRole}
              onChange={(e) => setSystemRole(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowSystemModal(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleStartSystemInterview}>
              Begin Mock Interview
            </Button>
          </div>
        </div>
      </Modal>

      {/* Book Mentor Modal */}
      <Modal
        isOpen={showMentorModal}
        onClose={() => setShowMentorModal(false)}
        title="Schedule 1-on-1 Mock Interview with Mentor"
        description="Connect directly with experienced technical mentors."
      >
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Mentor
            </label>
            <select
              value={selectedMentorId}
              onChange={(e) => setSelectedMentorId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
            >
              {mentors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Interview Track
            </label>
            <select
              value={mentorType}
              onChange={(e) => setMentorType(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
            >
              <option value="TECHNICAL">Technical & DSA Live Coding</option>
              <option value="HR">HR & Behavioral STAR Evaluation</option>
              <option value="SYSTEM_DESIGN">System Architecture & Design</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Company
            </label>
            <select
              value={mentorCompany}
              onChange={(e) => setMentorCompany(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
            >
              <option>Amazon</option>
              <option>Microsoft</option>
              <option>TCS</option>
              <option>Infosys</option>
              <option>Zoho</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Date & Time Slot
            </label>
            <input
              type="datetime-local"
              value={mentorDate}
              onChange={(e) => setMentorDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowMentorModal(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleBookMentor}>
              Confirm Interview Slot
            </Button>
          </div>
        </div>
      </Modal>

      {/* Feedback Report Modal */}
      {selectedInterview && (
        <Modal
          isOpen={!!selectedInterview}
          onClose={() => setSelectedInterview(null)}
          title={`Evaluation Report: ${selectedInterview.type} Mock`}
          description={`Conducted for ${selectedInterview.company} (${selectedInterview.targetRole})`}
          maxWidth="lg"
        >
          <div className="space-y-4 pt-2 text-xs">
            {/* Overall Rating Banner */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Overall Rating</span>
                <div className="text-2xl font-black text-brand-600 dark:text-brand-400">
                  {selectedInterview.overallRating} / 10
                </div>
              </div>
              <Badge variant="brand" size="md">
                {selectedInterview.overallRating >= 8.0 ? 'Exceeds Bar' : 'Meets Bar'}
              </Badge>
            </div>

            {/* Rubrics breakdown */}
            {selectedInterview.ratings && (
              <div className="space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Rubric Assessment:
                </span>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  {Object.entries(JSON.parse(selectedInterview.ratings)).map(([k, v]: any) => (
                    <div
                      key={k}
                      className="p-2.5 rounded bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 flex justify-between"
                    >
                      <span className="capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                      <strong className="text-brand-600">{v} / 10</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback text */}
            {selectedInterview.feedback && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Detailed Qualitative Feedback:
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {selectedInterview.feedback}
                </p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={() => setSelectedInterview(null)}>
                Close Report
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
