import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronRight,
  FileText,
  Calendar,
  Users,
  Briefcase,
  CreditCard,
  PieChart,
  LogOut,
} from 'lucide-react';
import { logoutUser } from '../../services/api.js'; // Importing the API function

// Handle user logout
const handleLogout = async () => {
  try {
    const refreshToken =
      localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');

    // Call the logout function from api.js
    await logoutUser(refreshToken);

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
  {
    icon: <PieChart className="w-5 h-5" />,
    label: 'OKR App',
    module: 'okr',
    children: [
      { label: 'OKR Dashboard', path: '/okr/dashboard' },
      { label: 'Objectives List', path: '/okr/objectives' },
      { label: 'OKR Tasks', path: '/okr/tasks' },
    ],
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    label: 'Personal App',
    children: [
      { label: 'My Tasks', path: '' },
      { label: 'My HR File', path: '' },
      { label: 'My Leave Records', path: '' },
      { label: 'My Timesheets', path: '' },
      { label: 'My Payslips', path: '' },
      { label: 'My Performance Reviews', path: '' },
      { label: 'My Expenses', path: '' },
      { label: 'My Private Notes', path: '' },
      { label: 'View Policies', path: '' },
    ],
  },
];

// Dynamic Nav Items (filtered by user modules and roles)
const dynamicNavItems = [
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
const SidebarItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  if (!item.children) {
    const isActive = location.pathname === item.path;
    return (
      <Link to={item.path}>
        <div
          className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer transition duration-200 ${
            isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'
          }`}
        >
          {item.icon}
          <span className="flex-1">{item.label}</span>
        </div>
      </Link>
    );
  }

  const isParentActive = item.children.some((child) => location.pathname === child.path);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer transition duration-200 ${
          isParentActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'
        }`}
      >
        {item.icon}
        <span className="flex-1">{item.label}</span>
        <ChevronRight
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
        />
      </div>
      {isOpen && (
        <div className="ml-4 border-l border-gray-700 pl-4">
          {item.children.map((child, index) => (
            <Link key={index} to={child.path}>
              <div
                className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer transition duration-200 ${
                  location.pathname === child.path
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <span>{child.label}</span>
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
};

// SideBar Component
const SideBar = () => {
  const user = JSON.parse(localStorage.getItem('userInfo')) || {};

  // Filter dynamic items based on accessible_modules
  const filteredDynamicNavItems =
    user.role === 'superadmin'
      ? dynamicNavItems // Superadmin sees all
      : dynamicNavItems.filter((item) => user.accessible_modules?.includes(item.module));

  // Combine constant and filtered dynamic items
  const finalNavItems = [...constantNavItems, ...filteredDynamicNavItems];

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-orange-500 flex items-center justify-center">
            <span className="text-xl">🦁</span>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{user.email || 'Guest'}</h3>
            <p className="text-sm text-gray-400">{user.role || 'No Role'}</p>
          </div>
        </div>
      </div>

      <nav className="p-4 flex-grow">
        {finalNavItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </nav>

      <div
        onClick={handleLogout}
        className="mt-auto p-4 text-red-500 cursor-pointer hover:bg-red-700 hover:text-white"
      >
        <LogOut className="w-5 h-5 inline-block mr-2" />
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default SideBar;
