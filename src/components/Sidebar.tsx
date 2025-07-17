import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Brain, 
  Briefcase, 
  Scale, 
  TrendingUp, 
  Users, 
  BookOpen, 
  BarChart3 
} from 'lucide-react';

interface SidebarProps {
  role: 'user' | 'admin';
  closeSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, closeSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // User menu items
  const userMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/user' },
    { id: 'skill-gap', label: 'Skill Gap Analyzer', icon: Brain, path: '/user/skill-gap' },
    { id: 'tracker', label: 'Application Tracker', icon: Briefcase, path: '/user/tracker' },
    { id: 'job-compare', label: 'Job Comparison Tool', icon: Scale, path: '/user/job-compare' },
    { id: 'peer-compare', label: 'Peer Resume Comparison', icon: Users, path: '/user/peer-compare' },
    { id: 'growth', label: 'Personal Growth Tracker', icon: TrendingUp, path: '/user/growth' },
  ];

  // Admin menu items
  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin' },
    { id: 'users', label: 'User Management', icon: Users, path: '/admin/users' },
    { id: 'roles', label: 'Role Library', icon: BookOpen, path: '/admin/roles' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  ];

  // Select menu items based on role
  const menuItems = role === 'user' ? userMenuItems : adminMenuItems;

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (closeSidebar) {
      closeSidebar();
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {role === 'user' ? 'Student Portal' : 'Admin Portal'}
        </h2>
      </div>
      
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
  );
};

export default Sidebar;