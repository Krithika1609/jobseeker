import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  User, 
  LogOut,
  Home, 
  Brain, 
  Briefcase, 
  Scale, 
  TrendingUp, 
  Users, 
  BookOpen, 
  BarChart3,
  Bell
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  role: 'student' | 'admin';
}

const Layout: React.FC<LayoutProps> = ({ children, role }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/user' || location.pathname === '/admin';
  const [sidebarOpen, setSidebarOpen] = useState(isDashboard);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();

  // Student menu items
  const studentMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/user' },
    { id: 'skill-gap', label: 'Skill Gap Analyzer', icon: Brain, path: '/user/skill-gap' },
    { id: 'tracker', label: 'Application Tracker', icon: Briefcase, path: '/user/tracker' },
    { id: 'job-compare', label: 'Job Comparison Tool', icon: Scale, path: '/user/job-compare' },
    { id: 'peer-compare', label: 'Peer Resume Comparison', icon: Users, path: '/user/peer-compare' },
    { id: 'growth', label: 'Growth Tracker', icon: TrendingUp, path: '/user/growth' },
  ];

  // Admin menu items
  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin' },
    { id: 'users', label: 'User Management', icon: Users, path: '/admin/users' },
    { id: 'roles', label: 'Role Library', icon: BookOpen, path: '/admin/roles' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  ];

  // Select menu items based on role
  const menuItems = role === 'student' ? studentMenuItems : adminMenuItems;

  // Always sync sidebar open state to route
  useEffect(() => {
    setSidebarOpen(isDashboard);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close profile dropdown
      if (!target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
      
      // Close sidebar on mobile when clicking outside
      if (window.innerWidth < 1024 && !target.closest('.sidebar-container') && !target.closest('.menu-button')) {
        setSidebarOpen(false);
      }
    };

    if (profileDropdownOpen || (sidebarOpen && window.innerWidth < 1024)) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen, sidebarOpen]);

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const handleMenuClick = (path: string) => {
    navigate(path);
    // Always close sidebar after navigation
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between relative z-50">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="menu-button p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">Career Companion</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen((v) => !v)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow" style={{ minWidth: '20px', textAlign: 'center' }}>2</span>
            </button>
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 text-gray-900 font-semibold border-b">Notifications</div>
                <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Your application for Frontend Developer was viewed</div>
                <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">New job posted: React Developer</div>
                <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">You have 2 new messages</div>
                <div className="px-4 py-2 text-xs text-gray-500 border-t">View all notifications</div>
              </div>
            )}
          </div>
          <div className="relative profile-dropdown">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Profile menu"
            >
              <User className="h-5 w-5 text-gray-600" />
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => { setProfileDropdownOpen(false); navigate(role === 'admin' ? '/admin/profile' : '/user/profile'); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <div className={`sidebar-container bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40 ${
          sidebarOpen 
            ? 'w-64' // Open state
            : 'w-0'   // Closed state
        } lg:relative lg:z-auto ${
          window.innerWidth < 1024 ? 'fixed inset-y-0 left-0' : ''
        }`}>
          
          <div className={`w-64 h-full overflow-hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
            {/* Mobile header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 lg:hidden">
              <h2 className="text-lg font-semibold text-gray-900">
                {role === 'student' ? 'Student Portal' : 'Admin Portal'}
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Desktop header */}
            <div className="hidden lg:block p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {role === 'student' ? 'Student Portal' : 'Admin Portal'}
              </h2>
            </div>
            
            {/* Navigation Menu */}
            <nav className="px-4 py-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && window.innerWidth < 1024 && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;