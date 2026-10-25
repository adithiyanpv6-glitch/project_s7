import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  FileCheck2,
  Plus,
  ArrowLeft,
  Building2,
  Clock,
  Target,
} from 'lucide-react';

export const TestManager: React.FC = () => {
  const { showToast } = useNotifications();

  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // New Test State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [passingMarks, setPassingMarks] = useState(20);
  const [negativeMarking, setNegativeMarking] = useState(0.25);
  const [category, setCategory] = useState('Full-Length Mock');
  const [targetCompany, setTargetCompany] = useState('TCS');
  const [cutoffPercentage, setCutoffPercentage] = useState(70.0);
  const [availableQuestions, setAvailableQuestions] = useState<any[]>([]);
  const [selectedQIds, setSelectedQIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const data = await api.get<any[]>('/mocktests');
      setTests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleOpenCreate = async () => {
    setShowModal(true);
    try {
      const qRes = await api.get<{ questions: any[] }>('/practice/questions?limit=50');
      setAvailableQuestions(qRes.questions || []);
      // Pre-select first 15 questions
      setSelectedQIds((qRes.questions || []).slice(0, 15).map((q) => q.id));
    } catch (e) {
      // silent
    }
  };

  const handleCreateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQIds.length === 0) {
      showToast('Please select at least one question for the test.', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/admin/mocktests', {
        title,
        description,
        durationMinutes: Number(durationMinutes),
        passingMarks: Number(passingMarks),
        negativeMarking: Number(negativeMarking),
        category,
        targetCompany,
        cutoffPercentage: Number(cutoffPercentage),
        questionIds: selectedQIds,
      });

      showToast('Mock test published successfully!', 'success');
      setShowModal(false);
      fetchTests();
    } catch (err: any) {
      showToast(err.message || 'Creation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleQuestionSelection = (id: string) => {
    if (selectedQIds.includes(id)) {
      setSelectedQIds(selectedQIds.filter((q) => q !== id));
    } else {
      setSelectedQIds([...selectedQIds, id]);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin" className="text-slate-400 hover:text-slate-600">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Mock Test Assessment Management
            </h1>
            <Badge variant="brand" size="sm">{tests.length} Assessments</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish standardized assessments with negative marking parameters and company-specific cutoffs.
          </p>
        </div>

        <Button size="sm" onClick={handleOpenCreate}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          Create New Mock Test
        </Button>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 py-8 text-center text-slate-400">Loading assessments...</div>
        ) : (
          tests.map((t) => (
            <Card key={t.id} className="p-5 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant="neutral" size="sm">{t.category}</Badge>
                  {t.targetCompany && (
                    <Badge variant="brand" size="sm">
                      <Building2 className="w-3 h-3 mr-1" />
                      {t.targetCompany}
                    </Badge>
                  )}
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{t.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs font-mono">
                <span>{t.durationMinutes} Mins | {t.totalQuestions} Qs</span>
                <span className="font-bold text-emerald-600">Cutoff: {t.cutoffPercentage}%</span>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Configure & Publish Mock Assessment"
        description="Select duration, cutoffs, and curate questions from the bank."
        maxWidth="xl"
      >
        <form onSubmit={handleCreateTest} className="space-y-4 pt-2 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Test Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. National Qualifier Comprehensive Mock #2"
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Simulating TCS Foundation and Advanced rounds"
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Duration (Mins)
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Company
              </label>
              <select
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option>TCS</option>
                <option>Amazon</option>
                <option>Microsoft</option>
                <option>Infosys</option>
                <option>Cognizant</option>
                <option>Accenture</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Cutoff (% Score)
              </label>
              <input
                type="number"
                value={cutoffPercentage}
                onChange={(e) => setCutoffPercentage(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Question selection */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Select Questions ({selectedQIds.length} Selected)
              </label>
              <span className="text-[10px] text-slate-400">Click to toggle</span>
            </div>
            <div className="max-h-48 overflow-y-auto border border-slate-200 dark:border-navy-800 rounded-lg p-2 space-y-1">
              {availableQuestions.map((q) => {
                const isSelected = selectedQIds.includes(q.id);
                return (
                  <div
                    key={q.id}
                    onClick={() => toggleQuestionSelection(q.id)}
                    className={`p-2 rounded text-xs cursor-pointer flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-brand-50 text-brand-900 dark:bg-brand-950/60 dark:text-brand-200 font-semibold'
                        : 'hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="truncate max-w-md">{q.title} ({q.category})</span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="rounded text-brand-600"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit" isLoading={submitting}>
              Publish Assessment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
