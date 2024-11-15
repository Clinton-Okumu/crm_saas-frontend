import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Bell, Calendar, Users, FileText, Briefcase, 
  CreditCard, PieChart, LogOut, ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Define the shape of menu items
const MenuItemShape = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  badge: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired
  }))
};

// SidebarItem Component
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
  item: PropTypes.shape(MenuItemShape).isRequired,
  isCollapsed: PropTypes.bool.isRequired
};

SidebarItem.defaultProps = {
  isCollapsed: false
};

// Quick Access Item Component
const QuickAccessItem = ({ icon, title, description }) => (
  <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex items-center space-x-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

QuickAccessItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

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
        { label: 'Proect Documents' },
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

  const quickAccessItems = [
    {
      icon: "📄",
      title: "AI Document Generation",
      description: "Use Skhokho notes app to generate professional AI documents"
    },
    {
      icon: "👤",
      title: "Complete your HR File",
      description: "Complete your personal information and upload HR documents"
    },
    {
      icon: "📅",
      title: "Submit your timesheet",
      description: "Create timesheets booking hours to assigned tasks"
    },
    {
      icon: "💰",
      title: "View your payslips",
      description: "View and search for payslips already created on the system"
    },
    {
      icon: "📋",
      title: "Create an invoice",
      description: "Use accounting app to add client profiles and create, email invoices"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {showWelcome && (
        <div className="bg-green-100 p-4 flex justify-between items-center">
          <span className="text-green-800">
            Welcome! Thank you for trying out Skhokho Business Software. You currently have 5 days, 18 hours left in your trial.
          </span>
          <button 
            onClick={() => setShowWelcome(false)}
            className="text-green-800 hover:text-green-900"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex">
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

        <main className="flex-1">
          <header className="bg-white border-b px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold flex items-center">
                Personal Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <Bell className="w-5 h-5 text-gray-500" />
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </header>

          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">APP QUICK ACCESS LIST</h2>
              <div className="space-y-2">
                {quickAccessItems.map((item, index) => (
                  <QuickAccessItem 
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;