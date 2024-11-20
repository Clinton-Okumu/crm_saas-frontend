import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, Calendar, Users, FileText, Briefcase, 
  CreditCard, PieChart, LogOut, ChevronLeft,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';

// Define handleLogout function
const handleLogout = async () => {
  try {
    // Get refresh token
    const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
    
    // Call logout API
    await axios.post('http://127.0.0.1:8000/api/auth/logout/', {
      refresh: refreshToken
    });

    // Clean up storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    
    // Remove Authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    // Redirect to login
    window.location.href = '/login';
    
  } catch (error) {
    console.error('Logout failed:', error);
    // Still clear everything and redirect even if API call fails
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  }
};


const navItems = [
  { icon: <FileText className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
  { icon: <Calendar className="w-5 h-5" />, label: 'Calendar', path: '/calendar' },
  { icon: <Users className="w-5 h-5" />, label: 'Meetings', path: '/meetings' },
  { icon: <FileText className="w-5 h-5" />, label: 'Documents', badge: 'AI', path: '/documents' },
  { icon: <Briefcase className="w-5 h-5" />, label: 'Personal App', path: '/personal' },
  {
    icon: <PieChart className="w-5 h-5" />,
    label: 'OKR App',
    badge: 'NEW',
    children: [
      { label: 'OKR Dashboard', path: '/okr/dashboard' },
      { label: 'Objectives List', path: '/okr/objectives' },
      { label: 'OKR Tasks', path: '/okr/tasks' },
    ],
  },      
  { icon: <Users className="w-5 h-5" />, label: 'Manager App', path: '/manager' },
  { icon: <Users className="w-5 h-5" />,
    label: 'HR App',
    children: [
      { label: 'HR Settings', path: '/hr/settings' },
      { label: 'HR Policies', path: '/hr/policies' },
      { label: 'Employee Records', path: '/hr/employees' },
      { label: 'Payroll Records', path: '/hr/payroll' }
    ]
  },
  { 
    icon: <Briefcase className="w-5 h-5" />, 
    label: 'Sales CRM App',
    children: [
      { label: 'Sales Settings', path: '/sales/settings' },
      { label: 'Campaigns', path: '/sales/campaigns' },
      { label: 'Sales Dashboard', path: '/sales/dashboard' },
      { label: 'Sales Funnel', path: '/sales/funnel' },
      { label: 'Contact List', path: '/sales/contacts' },
      { label: 'Mailing Lists', path: '/sales/mailing' },
      { label: 'Hustle List', path: '/sales/hustle' },
    ]
  },
  { icon: <CreditCard className="w-5 h-5" />,
    label: 'Project App',
    children: [
      { label: 'Project Dashboard', path: '/projects/dashboard' },
      { label: 'Project Calendar', path: '/projects/calendar' },
      { label: 'Client List', path: '/projects/clients' },
      { label: 'Project List', path: '/projects/list' },
      { label: 'Project Meetings', path: '/projects/meetings' },
      { label: 'Project Documents', path: '/projects/documents' },
      { label: 'Project Notes', path: '/projects/notes' },
    ] 
  },
  { icon: <CreditCard className="w-5 h-5" />,
    label: 'Accounting App',
    children: [
      { label: 'Accounting Dashboard', path: '/accounting/dashboard' },
      { label: 'Accounting Settings', path: '/accounting/settings' },
      { label: 'Accounting List', path: '/accounting/list' },
      { label: 'Sales', path: '/accounting/sales' },
      { label: 'Expenses', path: '/accounting/expenses' },
      { label: 'Reports', path: '/accounting/reports' },
    ]
  },
  { icon: <LogOut className="w-5 h-5" />, label: 'Log Out', path: '/logout' }
];

const SidebarItem = ({ item, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  if (!item.children) {
    const isActive = location.pathname === item.path;
    return (
      <Link to={item.path}>
        <div className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer
          ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
          {item.icon}
          {!isCollapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-1 text-xs bg-blue-500 rounded">{item.badge}</span>
              )}
            </>
          )}
        </div>
      </Link>
    );
  }

  if (!item.children) {
    return (
      <div 
        onClick={handleLogout}
        className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer hover:bg-gray-800`}
      >
        {item.icon}
        {!isCollapsed && (
          <span className="flex-1">{item.label}</span>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={() => !isCollapsed && setIsOpen(!isOpen)}
        className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer
          ${item.children.some(child => child.path === location.pathname) ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
      >
        {item.icon}
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="px-2 py-1 text-xs bg-blue-500 rounded">{item.badge}</span>
            )}
            <ChevronRight 
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            />
          </>
        )}
      </div>
      
      {!isCollapsed && isOpen && (
        <div className="ml-4 pl-4 border-l border-gray-700">
          {item.children.map((child, index) => {
            const isChildActive = location.pathname === child.path;
            return (
              <Link
                key={index}
                to={child.path}
              >
                <div className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer
                  ${isChildActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                >
                  {child.icon}
                  <span className={`text-sm ${isChildActive ? 'text-white' : 'text-gray-300'}`}>
                    {child.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

SidebarItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    path: PropTypes.string,
    badge: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.element,
      label: PropTypes.string.isRequired,
      path: PropTypes.string
    }))
  }).isRequired,
  isCollapsed: PropTypes.bool.isRequired
};

const SideBar = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <aside className={`bg-gray-900 text-white ${isCollapsed ? 'w-20' : 'w-64'} min-h-screen transition-all duration-300`}>
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-orange-500 flex items-center justify-center">
            <span className="text-xl">🦁</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <h3 className="font-medium">ryan nwodo</h3>
              <p className="text-sm text-gray-400">software</p>
            </div>
          )}
        </div>
      </div>

      <nav className="p-4">
        {navItems.map((item, index) => (
          <SidebarItem 
            key={index} 
            item={item} 
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full p-4 text-gray-400 hover:text-white flex justify-center items-center space-x-2"
      >
        <ChevronLeft className={`transform ${isCollapsed ? 'rotate-180' : ''} transition-transform`} />
        {!isCollapsed ? <span>Collapse</span> : <span>Expand</span>}
      </button>
    </aside>
  );
};

SideBar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired
};

export default SideBar;