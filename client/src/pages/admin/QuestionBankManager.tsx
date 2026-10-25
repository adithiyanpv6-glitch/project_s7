import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { useNotifications } from '../../context/NotificationContext';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Database,
  Plus,
  Trash2,
  Edit2,
  Search,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export const QuestionBankManager: React.FC = () => {
  const { showToast } = useNotifications();

  const [questions, setQuestions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('ALL');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Create / Edit Modal
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [qCategory, setQCategory] = useState('QUANTITATIVE');
  const [subCategory, setSubCategory] = useState('Arithmetic');
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctOpt, setCorrectOpt] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [companyTags, setCompanyTags] = useState('TCS, Infosys');
  const [submitting, setSubmitting] = useState(false);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: '20',
        category,
        search,
      });
      const data = await api.get<any>(`/practice/questions?${params.toString()}`);
      setQuestions(data.questions || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      showToast(err.message || 'Failed to load questions', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [category, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchQuestions();
  };

  const resetForm = () => {
    setTitle('');
    setPrompt('');
    setQCategory('QUANTITATIVE');
    setSubCategory('General');
    setDifficulty('MEDIUM');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setCorrectOpt(0);
    setExplanation('');
    setCompanyTags('');
    setIsEditing(false);
    setEditingId(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (q: any) => {
    setIsEditing(true);
    setEditingId(q.id);
    setTitle(q.title);
    setPrompt(q.prompt);
    setQCategory(q.category);
    setSubCategory(q.subCategory);
    setDifficulty(q.difficulty);
    setOpt0(q.options[0] || '');
    setOpt1(q.options[1] || '');
    setOpt2(q.options[2] || '');
    setOpt3(q.options[3] || '');
    setCorrectOpt(q.correctOpt ?? 0);
    setExplanation(q.explanation || '');
    setCompanyTags((q.companyTags || []).join(', '));
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await api.delete(`/admin/questions/${id}`);
      showToast('Question deleted successfully', 'success');
      fetchQuestions();
    } catch (err: any) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const options = [opt0, opt1, opt2, opt3].filter(Boolean);
      const tags = companyTags.split(',').map((t) => t.trim()).filter(Boolean);

      const payload = {
        title,
        prompt,
        category: qCategory,
        subCategory,
        difficulty,
        options,
        correctOpt: Number(correctOpt),
        explanation,
        companyTags: tags,
      };

      if (isEditing && editingId) {
        await api.put(`/admin/questions/${editingId}`, payload);
        showToast('Question updated successfully!', 'success');
      } else {
        await api.post('/admin/questions', payload);
        showToast('New question published to question bank!', 'success');
      }

      setShowModal(false);
      resetForm();
      fetchQuestions();
    } catch (err: any) {
      showToast(err.message || 'Operation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/admin" className="text-slate-400 hover:text-slate-600">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Institutional Question Bank Management
            </h1>
            <Badge variant="brand" size="sm">{total} Questions</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish, edit, and curate questions for practice sets and campus mock assessments.
          </p>
        </div>

        <Button size="sm" onClick={handleOpenCreate}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          Add Question to Bank
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions by title or text..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </form>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300 font-medium"
        >
          <option value="ALL">All Categories</option>
          <option value="QUANTITATIVE">Quantitative</option>
          <option value="LOGICAL">Logical</option>
          <option value="VERBAL">Verbal</option>
          <option value="PROGRAMMING">Programming</option>
          <option value="DSA">DSA</option>
          <option value="CORE_CS">Core CS</option>
          <option value="TECHNICAL_INTERVIEW">Technical Interview</option>
          <option value="HR_INTERVIEW">HR Interview</option>
          <option value="COMPANY_SPECIFIC">Company Specific</option>
        </select>
      </div>

      {/* Questions Data Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 dark:bg-navy-950 text-slate-500 font-semibold border-b border-slate-200 dark:border-navy-800">
              <tr>
                <th className="py-3 px-4">Title & Concept</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Target Tags</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">Loading questions...</td>
                </tr>
              ) : questions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">No questions found.</td>
                </tr>
              ) : (
                questions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-navy-800/40 transition-colors">
                    <td className="py-3 px-4 max-w-sm">
                      <div className="font-bold text-slate-900 dark:text-white truncate">{q.title}</div>
                      <div className="text-[11px] text-slate-400 truncate">{q.prompt}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="neutral" size="sm">{q.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          q.difficulty === 'EASY'
                            ? 'success'
                            : q.difficulty === 'MEDIUM'
                            ? 'warning'
                            : 'error'
                        }
                        size="sm"
                      >
                        {q.difficulty}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-slate-500 font-mono">
                      {(q.companyTags || []).slice(0, 2).join(', ') || 'General'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(q)}
                          className="p-1 text-slate-500 hover:text-brand-600 rounded"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(q.id)}
                          className="p-1 text-slate-500 hover:text-rose-600 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Question Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isEditing ? 'Edit Question in Bank' : 'Add New Placement Question'}
        description="Provide prompt, options, correct option index, and solution rationale."
        maxWidth="xl"
      >
        <form onSubmit={handleSaveQuestion} className="space-y-4 pt-2 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Question Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Profit and Loss Margin Calculation"
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Question Prompt
            </label>
            <textarea
              rows={3}
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter the full question text, parameters, and constraints..."
              className="w-full p-2.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={qCategory}
                onChange={(e) => setQCategory(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="QUANTITATIVE">Quantitative</option>
                <option value="LOGICAL">Logical</option>
                <option value="VERBAL">Verbal</option>
                <option value="PROGRAMMING">Programming</option>
                <option value="DSA">DSA</option>
                <option value="CORE_CS">Core CS</option>
                <option value="HR_INTERVIEW">HR Interview</option>
                <option value="COMPANY_SPECIFIC">Company Specific</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Sub-Category
              </label>
              <input
                type="text"
                required
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="e.g. Profit & Loss"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Multiple Choice Options
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={opt0}
                onChange={(e) => setOpt0(e.target.value)}
                placeholder="Option A"
                className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              />
              <input
                type="text"
                required
                value={opt1}
                onChange={(e) => setOpt1(e.target.value)}
                placeholder="Option B"
                className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              />
              <input
                type="text"
                required
                value={opt2}
                onChange={(e) => setOpt2(e.target.value)}
                placeholder="Option C"
                className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              />
              <input
                type="text"
                required
                value={opt3}
                onChange={(e) => setOpt3(e.target.value)}
                placeholder="Option D"
                className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Correct Option
              </label>
              <select
                value={correctOpt}
                onChange={(e) => setCorrectOpt(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value={0}>Option A (Index 0)</option>
                <option value={1}>Option B (Index 1)</option>
                <option value={2}>Option C (Index 2)</option>
                <option value={3}>Option D (Index 3)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Company Tags (comma separated)
              </label>
              <input
                type="text"
                value={companyTags}
                onChange={(e) => setCompanyTags(e.target.value)}
                placeholder="TCS, Infosys, Amazon"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Detailed Explanation / Mathematical Derivation
            </label>
            <textarea
              rows={3}
              required
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explain the step-by-step formula or algorithm..."
              className="w-full p-2.5 text-xs bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-lg text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit" isLoading={submitting}>
              {isEditing ? 'Save Changes' : 'Create Question'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
