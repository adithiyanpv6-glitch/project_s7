import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import { Card, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  FileCheck2,
  Clock,
  Target,
  ArrowRight,
  Award,
  AlertCircle,
  Building2,
} from 'lucide-react';

export const MockTestsList: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchTests();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Full-Length Mock Test Assessments
            </h1>
            <Badge variant="brand" size="sm">5 Preloaded Mocks</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real exam patterns for TCS NQT, Amazon SDE, Campus Aptitude, and Core CS with cutoff benchmarking.
          </p>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {loading ? (
          <div className="col-span-2 py-12 text-center">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          tests.map((t) => (
            <Card key={t.id} hoverable className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="neutral" size="sm">{t.category}</Badge>
                  {t.targetCompany && (
                    <Badge variant="brand" size="sm">
                      <Building2 className="w-3 h-3 mr-1" />
                      {t.targetCompany}
                    </Badge>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.description}
                </p>

                {/* Metadata Pills */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono">
                  <div className="p-2 rounded bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-center">
                    <span className="text-slate-400 block text-[9px]">DURATION</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {t.durationMinutes} Mins
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-center">
                    <span className="text-slate-400 block text-[9px]">QUESTIONS</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {t.totalQuestions} Qs
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-navy-800 text-center">
                    <span className="text-slate-400 block text-[9px]">CUTOFF</span>
                    <span className="font-bold text-emerald-600">
                      {t.cutoffPercentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions & User History */}
              <div className="pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  {t.userAttemptsCount > 0 ? (
                    <span className="text-brand-600 dark:text-brand-400 font-semibold">
                      Best: {t.bestScore} / {t.totalQuestions} ({t.userAttemptsCount} attempts)
                    </span>
                  ) : (
                    <span>Not attempted yet</span>
                  )}
                </div>

                <Link to={`/mocktests/${t.id}/live`}>
                  <Button size="sm">
                    Attempt Assessment
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
