/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Shell } from './components/layout/Shell.tsx';
import { AdminDashboard } from './components/dashboard/AdminDashboard.tsx';
import { AIQuestionGenerator } from './components/ai/AIQuestionGenerator.tsx';
import { AttendanceManager } from './components/attendance/AttendanceManager.tsx';
import { Login } from './components/auth/Login.tsx';

// Placeholder Components
const Academics = () => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200">
    <h2 className="text-2xl font-bold mb-4">Academics Management</h2>
    <p className="text-slate-500">Manage Classes, Sections, Syllabus, and academic timetables here.</p>
  </div>
);

const Students = () => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200">
    <h2 className="text-2xl font-bold mb-4">Student Management</h2>
    <p className="text-slate-500">Student enrollment, lists, ID cards, and categories.</p>
  </div>
);

const Exams = () => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200">
    <h2 className="text-2xl font-bold mb-4">Examinations</h2>
    <p className="text-slate-500">Add exams, configure date sheets, and generate result cards.</p>
  </div>
);

const Finance = () => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200">
    <h2 className="text-2xl font-bold mb-4">ERP Financials & Fees</h2>
    <p className="text-slate-500">Fee chalan generation, payment history, and financial ledgers.</p>
  </div>
);

const Library = () => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200">
    <h2 className="text-2xl font-bold mb-4">Library System</h2>
    <p className="text-slate-500">Manage book categories, authors, and student/staff book requests.</p>
  </div>
);

const Settings = () => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200">
    <h2 className="text-2xl font-bold mb-4">System Settings</h2>
    <p className="text-slate-500">Configure school details, SMS API, and user roles.</p>
  </div>
);

export default function App() {
  const [userRole, setUserRole] = useState<string | null>(null);

  if (!userRole) {
    return <Login onLogin={setUserRole} />;
  }

  return (
    <BrowserRouter>
      <Shell role={userRole}>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/students" element={<Students />} />
          <Route path="/attendance" element={<AttendanceManager />} />
          <Route path="/ai-tools" element={<AIQuestionGenerator />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/library" element={<Library />} />
          <Route path="/communication" element={<Students />} /> {/* Placeholder */}
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}
