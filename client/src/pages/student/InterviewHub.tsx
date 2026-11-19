import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { Modal } from '../../components/common/Modal';
import {
  Video,
  Play,
  Calendar,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Sparkles,
} from 'lucide-react';

export const InterviewHub: React.FC = () => {
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // System Mock Start Modal
  const [showSystemModal, setShowSystemModal] = useState(false);
  const [systemType, setSystemType] = useState('TECHNICAL');
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
      showToast('Interview scheduled successfully!', 'success');
      setShowMentorModal(false);
      fetchInterviews();
    } catch (err: any) {
      showToast(err.message || 'Booking failed', 'error');
    }
  };

  return (
    <div
      className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6 select-none bg-[#090a0f] text-zinc-100 min-h-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* 1. Header: Clean & Minimal */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
          Mock Interviews
        </h1>
      </div>

      {/* 2. Top Action Cards: AI Mock vs 1-on-1 Mentor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: AI Mock Simulator */}
        <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-4 hover:border-zinc-700/80 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Interactive Simulation</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Instant Feedback
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              AI Mock Interview
            </h2>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Real-time interactive session evaluating communication clarity and technical depth.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowSystemModal(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-medium tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Launch AI Session
          </button>
        </div>

        {/* Card 2: Mentor Session */}
        <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-4 hover:border-zinc-700/80 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">1-on-1 Mentorship</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/60">
              Live Mentors
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              Book Mentor Interview
            </h2>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Schedule live video interview sessions with faculty mentors and alumni engineers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowMentorModal(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-850 hover:bg-zinc-800 border border-zinc-700/80 text-white text-xs font-medium tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            Schedule with Mentor
          </button>
        </div>
      </div>

      {/* 3. Session History & Evaluation Records */}
      <div className="p-6 rounded-2xl bg-[#111217] border border-zinc-800/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-white">
            Interview Records
          </h2>
          <span className="text-xs text-zinc-500 font-normal">
            {interviews.length} sessions logged
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="w-6 h-6 border-2 border-zinc-500 border-t-white rounded-full animate-spin mx-auto" />
          </div>
        ) : interviews.length === 0 ? (
          <div className="py-10 text-center space-y-2 border border-dashed border-zinc-800/80 rounded-xl p-6">
            <p className="text-xs text-zinc-400 font-light">
              No interview sessions recorded yet. Launch an AI interview above to get started.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/60">
            {interviews.map((iv) => (
              <div
                key={iv.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        iv.status === 'COMPLETED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}
                    >
                      {iv.status}
                    </span>
                    <span className="font-medium text-white">
                      {iv.type} Mock • {iv.company || 'General'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-zinc-500 text-[11px] font-light">
                    <span>
                      {iv.scheduledFor
                        ? `Date: ${new Date(iv.scheduledFor).toLocaleDateString()}`
                        : `Date: ${new Date(iv.createdAt).toLocaleDateString()}`}
                    </span>
                    {iv.interviewer && (
                      <span>Mentor: {iv.interviewer.name}</span>
                    )}
                    {iv.overallRating != null && (
                      <span className="text-emerald-400 font-medium">
                        Rating: {iv.overallRating} / 10
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {iv.meetingLink && iv.status !== 'COMPLETED' && (
                    <a
                      href={iv.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Join Call
                    </a>
                  )}

                  {iv.status === 'COMPLETED' && (
                    <button
                      type="button"
                      onClick={() => setSelectedInterview(iv)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 text-xs font-normal transition-colors cursor-pointer"
                    >
                      View Report
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: AI Session Configuration */}
      <Modal
        isOpen={showSystemModal}
        onClose={() => setShowSystemModal(false)}
        title="Configure AI Mock Interview"
      >
        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 font-medium">Domain Category</label>
            <select
              value={systemType}
              onChange={(e) => setSystemType(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-zinc-600"
            >
              <option value="TECHNICAL">Technical & DSA</option>
              <option value="HR">HR & Behavioral</option>
              <option value="MANAGERIAL">Managerial & System Design</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 font-medium">Target Company</label>
            <input
              type="text"
              value={systemCompany}
              onChange={(e) => setSystemCompany(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-zinc-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 font-medium">Target Role</label>
            <input
              type="text"
              value={systemRole}
              onChange={(e) => setSystemRole(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-zinc-600"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowSystemModal(false)}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleStartSystemInterview}
              className="px-5 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-medium cursor-pointer"
            >
              Start Session
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal: Book Mentor Session */}
      <Modal
        isOpen={showMentorModal}
        onClose={() => setShowMentorModal(false)}
        title="Schedule Mentor Interview"
      >
        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 font-medium">Select Mentor</label>
            <select
              value={selectedMentorId}
              onChange={(e) => setSelectedMentorId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-zinc-600"
            >
              {mentors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.email})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 font-medium">Scheduled Date & Time</label>
            <input
              type="datetime-local"
              value={mentorDate}
              onChange={(e) => setMentorDate(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-zinc-600"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowMentorModal(false)}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleBookMentor}
              className="px-5 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-medium cursor-pointer"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal: View Report */}
      {selectedInterview && (
        <Modal
          isOpen={!!selectedInterview}
          onClose={() => setSelectedInterview(null)}
          title="Interview Evaluation Report"
        >
          <div className="space-y-4 pt-1">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-medium">Overall Score</span>
                <span className="text-sm font-semibold text-emerald-400">
                  {selectedInterview.overallRating != null ? `${selectedInterview.overallRating} / 10` : 'Evaluated'}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                {selectedInterview.feedbackNotes || 'Performance met target expectations. Recommended to practice dynamic programming and STAR behavioral structures.'}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedInterview(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InterviewHub;
