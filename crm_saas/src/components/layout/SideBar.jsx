import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
  Users,
  Briefcase,
  CreditCard,
  PieChart,
  LogOut,
} from 'lucide-react';
import axios from 'axios';

// Handle user logout
const handleLogout = async () => {
  try {
    const refreshToken =
      localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');

    // Call backend to logout
    await axios.post('http://127.0.0.1:8000/api/auth/logout/', {
      refresh: refreshToken,
    });

    // Clear storage and redirect
    localStorage.clear();
    sessionStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  }
};

// Constant Nav Items (always visible to all users)
const constantNavItems = [
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
  {
    icon: <CreditCard className="w-5 h-5" />,
    label: 'Project App', // Projects are visible to all
    children: [
      { label: 'Project Dashboard', path: '/projects/dashboard' },
      { label: 'Project List', path: '/projects/list' },
      { label: 'Project Documents', path: '/projects/documents' },
    ],
  },
];

// Dynamic Nav Items (filtered by user modules and roles, excluding Projects App)
const dynamicNavItems = [
  {
    icon: <Users className="w-5 h-5" />,
    label: 'Manager App',
    module: 'manager',
    path: '/manager',
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: 'HR App',
    module: 'hrm',
    children: [
      { label: 'HR Dashboard', path: '/hr/dashboard' },
      { label: 'HR Policies', path: '/hr/policies' },
      { label: 'Employee Records', path: '/hr/employees' },
      { label: 'Payroll Records', path: '/hr/payroll' },
    ],
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    label: 'Sales CRM App',
    module: 'sales_crm',
    children: [
      { label: 'Sales Settings', path: '/sales/settings' },
      { label: 'Campaigns', path: '/sales/campaigns' },
      { label: 'Sales Dashboard', path: '/sales/dashboard' },
    ],
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    label: 'Accounting App',
    module: 'accounting',
    children: [
      { label: 'Accounting Dashboard', path: '/accounting/dashboard' },
      { label: 'Reports', path: '/accounting/reports' },
    ],
  },
];

// Sidebar Item Component
const SidebarItem = ({ item, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  if (!item.children) {
    const isActive = location.pathname === item.path;
    return (
      <Link to={item.path}>
        <div
          className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer ${
            isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
          }`}
        >
          {item.icon}
          {!isCollapsed && <span className="flex-1">{item.label}</span>}
        </div>
      </Link>
    );
  }

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer ${
          item.children.some((child) => child.path === location.pathname)
            ? 'bg-blue-600'
            : 'hover:bg-gray-800'
        }`}
      >
        {item.icon}
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.label}</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            />
          </>
        )}
      </div>
      {!isCollapsed && isOpen && (
        <div className="ml-4">
          {item.children.map((child, index) => (
            <Link key={index} to={child.path}>
              <div
                className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer ${
                  location.pathname === child.path ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                <span
                  className={`text-sm ${
                    location.pathname === child.path ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  {child.label}
                </span>
              </div>
            </Link>
          ))}
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
    module: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  isCollapsed: PropTypes.bool.isRequired,
};

// SideBar Component
const SideBar = ({ isCollapsed, setIsCollapsed }) => {
  const user = JSON.parse(localStorage.getItem('userInfo')) || {};

  // Filter dynamic items based on `accessible_modules`, excluding Projects App
  const filteredDynamicNavItems =
    user.role === 'superadmin'
      ? dynamicNavItems // Superadmin sees all
      : dynamicNavItems.filter((item) => user.accessible_modules?.includes(item.module));

  // Combine constant and filtered dynamic items
  const finalNavItems = [...constantNavItems, ...filteredDynamicNavItems];

  return (
    <aside
      className={`bg-gray-900 text-white ${isCollapsed ? 'w-20' : 'w-64'} min-h-screen`}
    >
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-orange-500 flex items-center justify-center">
            <span className="text-xl">🦁</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <h3 className="font-medium">{user.email || 'Guest'}</h3>
              <p className="text-sm text-gray-400">{user.role || 'No Role'}</p>
            </div>
          )}
        </div>
      </div>

      <nav className="p-4">
        {finalNavItems.map((item, index) => (
          <SidebarItem key={index} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full p-4 text-gray-400 hover:text-white flex justify-center items-center space-x-2"
      >
        <ChevronLeft
          className={`transform ${isCollapsed ? 'rotate-180' : ''} transition-transform`}
        />
        {!isCollapsed ? <span>Collapse</span> : <span>Expand</span>}
      </button>

      <div
        onClick={handleLogout}
        className="mt-auto p-4 text-red-500 cursor-pointer hover:bg-red-700 hover:text-white"
      >
        <LogOut className="w-5 h-5 inline-block mr-2" />
        {!isCollapsed && <span>Logout</span>}
      </div>
    </aside>
  );
};

SideBar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
};

export default SideBar;

