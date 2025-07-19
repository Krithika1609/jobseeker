import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, MoreVertical, User, LogOut, Settings } from 'lucide-react';

interface NavbarProps {
  userType?: 'student' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ userType = 'student' }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.navbar-dropdown')) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);
  const handleLogout = () => {
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <GraduationCap className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-semibold text-gray-900">Career Companion</span>
      </div>
      
      <div className="relative navbar-dropdown">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <MoreVertical className="h-5 w-5 text-gray-600" />
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <button 
              onClick={() => setDropdownOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </button>
            <button 
              onClick={() => setDropdownOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
            <hr className="my-1" />
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
    </nav>
  );
};

export default Navbar;