import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { AppShell } from './components/layout/AppShell';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Pages
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { OnboardingWizard } from './pages/onboarding/OnboardingWizard';

// Student Pages
import { Dashboard } from './pages/student/Dashboard';
import { Diagnostic } from './pages/student/Diagnostic';
import { Roadmap } from './pages/student/Roadmap';
import { Practice } from './pages/student/Practice';
import { CodingList } from './pages/student/CodingList';
import { CodingWorkspace } from './pages/student/CodingWorkspace';
import { MockTestsList } from './pages/student/MockTestsList';
import { MockTestLive } from './pages/student/MockTestLive';
import { MockTestResult } from './pages/student/MockTestResult';
import { InterviewHub } from './pages/student/InterviewHub';
import { MockInterviewLive } from './pages/student/MockInterviewLive';
import { ResumeAnalyzer } from './pages/student/ResumeAnalyzer';
import { CompanyPrep } from './pages/student/CompanyPrep';
import { ProfileSettings } from './pages/student/ProfileSettings';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { StudentManager } from './pages/admin/StudentManager';
import { QuestionBankManager } from './pages/admin/QuestionBankManager';
import { TestManager } from './pages/admin/TestManager';
import { ReportsExport } from './pages/admin/ReportsExport';

// Mentor Pages
import { MentorDashboard } from './pages/mentor/MentorDashboard';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('placementprep_theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('placementprep_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('placementprep_theme', 'light');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Authenticated Full-Screen / Dedicated Flows */}
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding" element={<OnboardingWizard />} />
              <Route path="/mocktests/:id/live" element={<MockTestLive />} />
              <Route path="/interviews/:interviewId/live" element={<MockInterviewLive />} />
            </Route>

            {/* Authenticated Core Platform with AppShell (Navbar + Sidebar + Footer) */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppShell darkMode={darkMode} setDarkMode={setDarkMode} />}>
                {/* Student Endpoints */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/diagnostic" element={<Diagnostic />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/practice" element={<Practice />} />
                <Route path="/coding" element={<CodingList />} />
                <Route path="/coding/:slug" element={<CodingWorkspace />} />
                <Route path="/mocktests" element={<MockTestsList />} />
                <Route path="/mocktests/attempts/:attemptId/result" element={<MockTestResult />} />
                <Route path="/interviews" element={<InterviewHub />} />
                <Route path="/resume" element={<ResumeAnalyzer />} />
                <Route path="/companies" element={<CompanyPrep />} />
                <Route path="/profile" element={<ProfileSettings />} />

                {/* Admin Only Endpoints */}
                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/students" element={<StudentManager />} />
                  <Route path="/admin/questions" element={<QuestionBankManager />} />
                  <Route path="/admin/tests" element={<TestManager />} />
                  <Route path="/admin/reports" element={<ReportsExport />} />
                </Route>

                {/* Mentor Endpoints */}
                <Route element={<ProtectedRoute allowedRoles={['INTERVIEWER', 'ADMIN']} />}>
                  <Route path="/mentor" element={<MentorDashboard />} />
                </Route>
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
