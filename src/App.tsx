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
  // Force disable transitions on every render
  React.useEffect(() => {
    const disableTransitions = () => {
      // Disable all elements
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        (element as HTMLElement).style.setProperty('transition', 'none', 'important');
        (element as HTMLElement).style.setProperty('animation', 'none', 'important');
        (element as HTMLElement).style.setProperty('transform', 'none', 'important');
        (element as HTMLElement).style.setProperty('transition-property', 'none', 'important');
        (element as HTMLElement).style.setProperty('transition-duration', '0s', 'important');
        (element as HTMLElement).style.setProperty('transition-timing-function', 'none', 'important');
        (element as HTMLElement).style.setProperty('transition-delay', '0s', 'important');
      });
      
      // Disable document and body
      document.documentElement.style.setProperty('transition', 'none', 'important');
      document.body.style.setProperty('transition', 'none', 'important');
      document.documentElement.style.setProperty('animation', 'none', 'important');
      document.body.style.setProperty('animation', 'none', 'important');
      document.documentElement.style.setProperty('transform', 'none', 'important');
      document.body.style.setProperty('transform', 'none', 'important');
      
      // Inject CSS
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          transition: none !important;
          animation: none !important;
          transform: none !important;
          transition-property: none !important;
          transition-duration: 0s !important;
          transition-timing-function: none !important;
          transition-delay: 0s !important;
        }
      `;
      document.head.appendChild(style);
    };
    
    disableTransitions();
    
    // Also disable on every route change
    const observer = new MutationObserver(disableTransitions);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);
  
  // Debug: Log when App component renders
  console.log('App component rendered');
  
  // Also disable transitions on every render
  React.useEffect(() => {
    const disableAllTransitions = () => {
      // Disable all elements
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        (element as HTMLElement).style.setProperty('transition', 'none', 'important');
        (element as HTMLElement).style.setProperty('animation', 'none', 'important');
        (element as HTMLElement).style.setProperty('transform', 'none', 'important');
        (element as HTMLElement).style.setProperty('transition-property', 'none', 'important');
        (element as HTMLElement).style.setProperty('transition-duration', '0s', 'important');
        (element as HTMLElement).style.setProperty('transition-timing-function', 'none', 'important');
        (element as HTMLElement).style.setProperty('transition-delay', '0s', 'important');
      });
      
      // Disable document and body
      document.documentElement.style.setProperty('transition', 'none', 'important');
      document.body.style.setProperty('transition', 'none', 'important');
      document.documentElement.style.setProperty('animation', 'none', 'important');
      document.body.style.setProperty('animation', 'none', 'important');
      document.documentElement.style.setProperty('transform', 'none', 'important');
      document.body.style.setProperty('transform', 'none', 'important');
      
      // Inject CSS
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          transition: none !important;
          animation: none !important;
          transform: none !important;
          transition-property: none !important;
          transition-duration: 0s !important;
          transition-timing-function: none !important;
          transition-delay: 0s !important;
        }
      `;
      document.head.appendChild(style);
    };
    
    // Run on every render
    disableAllTransitions();
    
    // Also run periodically
    const interval = setInterval(disableAllTransitions, 100);
    
    // Also run on every animation frame
    const animationFrame = () => {
      disableAllTransitions();
      requestAnimationFrame(animationFrame);
    };
    requestAnimationFrame(animationFrame);
    
    return () => {
      clearInterval(interval);
    };
  });

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
        <Route path="/admin/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;