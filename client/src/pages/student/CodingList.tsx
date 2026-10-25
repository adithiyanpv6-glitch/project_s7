import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Code2,
  CheckCircle2,
  Circle,
  Search,
  Filter,
  ArrowRight,
  Flame,
  Terminal,
} from 'lucide-react';

export const CodingList: React.FC = () => {
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('ALL');
  const [difficulty, setDifficulty] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (category !== 'ALL') params.append('category', category);
        if (difficulty !== 'ALL') params.append('difficulty', difficulty);
        if (search) params.append('search', search);

        const data = await api.get<any[]>(`/coding/problems?${params.toString()}`);
        setProblems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, [category, difficulty, search]);

  const solvedCount = problems.filter((p) => p.isSolved).length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              DSA & Coding Preparation Workspace
            </h1>
            <Badge variant="brand" size="sm">
              <Terminal className="w-3.5 h-3.5" />
              Sandboxed Execution
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Practice core DSA patterns asked by top campus recruiters: Two Pointers, Sliding Window, Stacks, Trees, DP
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-center">
            <span className="text-[10px] text-slate-400 block font-semibold">SOLVED</span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
              {solvedCount} / {problems.length}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problems by name or topic..."
            className="w-full bg-transparent border-none text-xs text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Categories</option>
            <option value="Arrays & Hashing">Arrays & Hashing</option>
            <option value="Two Pointers">Two Pointers</option>
            <option value="Sliding Window">Sliding Window</option>
            <option value="Stacks">Stacks</option>
            <option value="Linked Lists">Linked Lists</option>
            <option value="Trees">Trees</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
            <option value="Binary Search">Binary Search</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-2.5">
        {loading ? (
          <div className="py-12 text-center">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : problems.length === 0 ? (
          <Card className="p-8 text-center text-xs text-slate-500">
            No problems match your filter.
          </Card>
        ) : (
          problems.map((p, idx) => (
            <Link key={p.id} to={`/coding/${p.slug}`} className="block">
              <Card
                hoverable
                className="p-4 flex items-center justify-between transition-all hover:border-brand-500"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-slate-400 font-mono text-xs w-6">{idx + 1}.</span>
                  {p.isSolved ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : p.isAttempted ? (
                    <Circle className="w-4 h-4 text-amber-500 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                  )}

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                      <span>{p.category}</span>
                      <span>•</span>
                      <span>Tags: {p.companyTags?.slice(0, 3).join(', ') || 'General'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      p.difficulty === 'EASY'
                        ? 'success'
                        : p.difficulty === 'MEDIUM'
                        ? 'warning'
                        : 'error'
                    }
                    size="sm"
                  >
                    {p.difficulty}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
