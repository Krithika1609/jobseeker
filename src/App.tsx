import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/user/UserDashboard';
import SkillGapAnalyzer from './pages/user/SkillGapAnalyzer';
import ApplicationTracker from './pages/user/ApplicationTracker';
import JobComparison from './pages/user/JobComparison';
import PersonalGrowth from './pages/user/PersonalGrowth';
import PeerComparison from './pages/user/PeerComparison';
import Profile from './pages/user/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import RoleLibrary from './pages/admin/RoleLibrary';
import Analytics from './pages/admin/Analytics';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/skill-gap" element={<SkillGapAnalyzer />} />
        <Route path="/user/tracker" element={<ApplicationTracker />} />
        <Route path="/user/job-compare" element={<JobComparison />} />
        <Route path="/user/growth" element={<PersonalGrowth />} />
        <Route path="/user/peer-compare" element={<PeerComparison />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/roles" element={<RoleLibrary />} />
        <Route path="/admin/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
}

export default App;