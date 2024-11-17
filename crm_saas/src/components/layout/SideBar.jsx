import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Bell, Calendar, Users, FileText, Briefcase, 
  CreditCard, PieChart, LogOut, ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { icon: <FileText className="w-5 h-5" />, label: 'Dashboard', active: true },
  { icon: <Calendar className="w-5 h-5" />, label: 'Calendar' },
  { icon: <Users className="w-5 h-5" />, label: 'Meetings' },
  { icon: <FileText className="w-5 h-5" />, label: 'Documents', badge: 'AI' },
  { icon: <Briefcase className="w-5 h-5" />, label: 'Personal App' },
  {
    icon: <PieChart className="w-5 h-5" />,
    label: 'OKR App',
    badge: 'NEW',
    children: [
      { label: 'OKR Dashboard' },
      { label: 'Objectives List' },
      { label: 'OKR Tasks' },
    ],
  },      
  { icon: <Users className="w-5 h-5" />, label: 'Manager App' },
  { icon: <Users className="w-5 h-5" />,
    label: 'HR App',
    children: [
      { label: 'HR Settings' },
      { label: 'HR Polocies' },
      { label: 'Employee Redords' },
      { label: 'Payroll Records' }
    ]
  },
  { 
    icon: <Briefcase className="w-5 h-5" />, 
    label: 'Sales CRM App',
    children: [
      { label: 'Sales Settings' },
      { label: 'Campaigns' },
      { label: 'Sales Dashboard' },
      { label: 'Sales Funnel' },
      { label: 'Contact List' },
      { label: 'Mailing Lists' },
      { label: 'Hustle List' },
    ]
  },
  { icon: <CreditCard className="w-5 h-5" />,
    label: 'Project App',
    children: [
      { label: 'Project Dashboard' },
      { label: 'Project Calendar' },
      { label: 'Client List' },
      { label: 'Project List' },
      { label: 'Project Meetings' },
      { label: 'Project Documents' },
      { label: 'Project Notes' },
    ] 
  },
  { icon: <CreditCard className="w-5 h-5" />,
    label: 'Accounting App',
    children: [
      { label: 'Accounting Dashboard' },
      { label: 'Accounting Settings' },
      { label: 'Accounting List' },
      { label: 'Sales' },
      { label: 'Expenses' },
      { label: 'Reports' },
    ]
  },
  { icon: <LogOut className="w-5 h-5" />, label: 'Log Out' }
];

const SidebarItem = ({ item, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <div className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer
        ${item.active ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
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
    );
  }

  return (
    <div>
      <div
        onClick={() => !isCollapsed && setIsOpen(!isOpen)}
        className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer
          ${item.active ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
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
          {item.children.map((child, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer hover:bg-gray-800"
            >
              {child.icon}
              <span className="text-sm text-gray-300">{child.label}</span>
            </div>
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
    badge: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.element,
      label: PropTypes.string.isRequired
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