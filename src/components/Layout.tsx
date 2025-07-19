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
  Bell,
  Settings,
  Search,
  ChevronRight,
  Plus,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';
import JobFilters from './JobFilters';

interface LayoutProps {
  children: React.ReactNode;
  role: 'student' | 'admin';
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, viewMode: propViewMode, onViewModeChange }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start with sidebar collapsed, only expand via hamburger menu
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(propViewMode || 'grid');
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

  // Generate breadcrumbs
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    if (pathSegments.length > 0) {
      breadcrumbs.push({ label: 'Home', path: '/' });
      
      if (pathSegments[0] === 'user' || pathSegments[0] === 'admin') {
        breadcrumbs.push({ 
          label: pathSegments[0] === 'user' ? 'Student Portal' : 'Admin Portal', 
          path: `/${pathSegments[0]}` 
        });
        
        if (pathSegments[1]) {
          const currentItem = menuItems.find(item => item.path === `/${pathSegments[0]}/${pathSegments[1]}`);
          if (currentItem) {
            breadcrumbs.push({ label: currentItem.label, path: currentItem.path });
          }
        }
      }
    }
    
    return breadcrumbs;
  };



  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close profile dropdown
      if (!target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
      
      // Close sidebar on mobile when clicking outside (but not when clicking on sidebar options)
      if (window.innerWidth < 1024 && !target.closest('.sidebar-container') && !target.closest('.menu-button') && !target.closest('button')) {
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



  // Helper to determine if sidebar should be expanded
  const isDashboard = location.pathname === '/user' || location.pathname === '/admin';
  // Keep sidebar expanded on all pages, but allow hamburger menu to toggle
  const expandedSidebar = sidebarOpen; // Allow hamburger menu to control sidebar

  // Navigation handler - only navigate, don't change sidebar state
  const handleMenuClick = (path: string) => {
    console.log('Navigating to:', path); // Debug log
    console.log('Current location:', location.pathname); // Debug current location
    console.log('Target path:', path); // Debug target path
    // Do NOT change sidebar state on navigation - keep current state
    // Sidebar state should only be controlled by hamburger menu
    
    // NUCLEAR OPTION - Disable everything before navigation
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
    
    // Run immediately
    disableAllTransitions();
    
    // Also run after a small delay to catch any late transitions
    setTimeout(disableAllTransitions, 0);
    setTimeout(disableAllTransitions, 10);
    setTimeout(disableAllTransitions, 50);
    
    // Navigate immediately
    navigate(path);
    
    // Debug: Log after navigation
    console.log('Navigation completed to:', path);
    
    // Force disable all transitions after navigation
    requestAnimationFrame(() => {
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        (element as HTMLElement).style.setProperty('transition', 'none', 'important');
        (element as HTMLElement).style.setProperty('animation', 'none', 'important');
        (element as HTMLElement).style.setProperty('transform', 'none', 'important');
      });
    });
    
    // Also run after navigation to catch any post-navigation transitions
    setTimeout(disableAllTransitions, 100);
    setTimeout(disableAllTransitions, 200);
    setTimeout(disableAllTransitions, 500);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    console.log('Hamburger menu clicked! Current sidebar state:', sidebarOpen);
    setSidebarOpen(!sidebarOpen);
    console.log('New sidebar state will be:', !sidebarOpen);
  };

  const handleFilterClick = () => {
    setFilterModalOpen(true);
  };

  const handleApplyFilters = (filters: any) => {
    setAppliedFilters(filters);
    console.log('Applied filters:', filters);
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar - Fixed */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu Button */}
                      <button
              onClick={toggleSidebar}
              className="menu-button p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle sidebar"
            >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          
          {/* Career Companion Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Career Companion</h2>
              <p className="text-sm text-gray-500">{role === 'student' ? 'Student Portal' : 'Admin Portal'}</p>
            </div>
          </div>
          

        </div>
        
        <div className="flex items-center gap-3">



          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen((v) => !v)}
              className="p-2 rounded-lg hover:bg-gray-100 relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow" style={{ minWidth: '20px', textAlign: 'center' }}>2</span>
            </button>
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 text-gray-900 font-semibold border-b border-gray-100">Notifications</div>
                <div className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                  <div className="font-medium">Application Viewed</div>
                  <div className="text-gray-500">Your application for Frontend Developer was viewed</div>
                </div>
                <div className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                  <div className="font-medium">New Job Posted</div>
                  <div className="text-gray-500">React Developer position available</div>
                </div>
                <div className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <div className="font-medium">New Messages</div>
                  <div className="text-gray-500">You have 2 new messages</div>
                </div>
                <div className="px-4 py-2 text-xs text-blue-600 hover:bg-blue-50 cursor-pointer border-t border-gray-100">
                  View all notifications
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative profile-dropdown">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
              aria-label="Profile menu"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">C</span>
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">Chinmayi</div>
                <div className="text-xs text-gray-500">{role === 'student' ? 'Student' : 'Admin'}</div>
              </div>
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900">Chinmayi</div>
                  <div className="text-xs text-gray-500">chinmayi@example.com</div>
                </div>
                <button
                  onClick={() => { setProfileDropdownOpen(false); navigate(role === 'admin' ? '/admin/profile' : '/user/profile'); }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <User className="h-4 w-4 mr-3" />
                  My Profile
                </button>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area - Below Fixed Navbar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`sidebar-container bg-white border-r border-gray-200 z-40 ${
          expandedSidebar 
            ? 'w-80' // Full width when expanded
            : 'w-16'   // Compact width with only icons
        } lg:relative lg:z-auto ${
          window.innerWidth < 1024 ? 'fixed inset-y-0 left-0 top-0' : ''
        }`}>
          <div className={`${expandedSidebar ? 'w-80' : 'w-16'} h-full overflow-hidden`}>
            {/* Navigation Menu */}
            <nav className={`${expandedSidebar ? 'px-4 py-6' : 'px-2 py-6'}`}>
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuClick(item.path)}
                      className={`w-full flex items-center ${expandedSidebar ? 'space-x-3 px-4 py-3' : 'justify-center p-3'} rounded-lg ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      title={expandedSidebar ? undefined : item.label}
                      style={{ 
                        transition: 'none !important', 
                        animation: 'none !important', 
                        transform: 'none !important',
                        transitionProperty: 'none !important',
                        transitionDuration: '0s !important',
                        transitionTimingFunction: 'none !important',
                        transitionDelay: '0s !important'
                      }}
                    >
                      <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className={`font-medium ${expandedSidebar ? 'block' : 'hidden'}`}>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom section */}
              {/* Removed Settings and Logout buttons from sidebar bottom section */}
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
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 1 && (
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
              <nav className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((breadcrumb, index) => (
                  <div key={index} className="flex items-center">
                    {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />}
                    <button
                      onClick={() => navigate(breadcrumb.path)}
                      className={`hover:text-blue-600 ${
                        index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}
                    >
                      {breadcrumb.label}
                    </button>
                  </div>
                ))}
              </nav>
            </div>
          )}

          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Job Filters Modal */}
      <JobFilters
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        viewMode={viewMode}
        onViewModeChange={(mode) => {
          setViewMode(mode);
          onViewModeChange?.(mode);
        }}
      />
    </div>
  );
};

export default Layout;