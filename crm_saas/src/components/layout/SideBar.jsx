import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  FileText,
  Calendar,
  Users,
  Briefcase,
  CreditCard,
  PieChart,
  Sliders,
  Layers,
  LogOut,
  User,
} from "lucide-react";
import axios from "axios";
import { logoutUser } from "../../services/api.js";

const handleLogout = async () => {
  try {
    const refreshToken =
      localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');

    await logoutUser(refreshToken);

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
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: "Calendar",
    path: "/calendar",
  },
  { icon: <Users className="w-5 h-5" />, label: "Meetings", path: "/meetings" },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Documents",
    badge: "AI",
    path: "/documents",
  },
  {
    icon: <PieChart className="w-5 h-5" />,
    label: "OKR App",
    module: "okr",
    children: [
      { label: "OKR Dashboard", path: "/okr/dashboard" },
      { label: "Objectives List", path: "/okr/objectives" },
      { label: "OKR Tasks", path: "/okr/tasks" },
    ],
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    label: "Personal App",
    children: [
      { label: "My Tasks", path: "" },
      { label: "My HR File", path: "" },
      { label: "My Leave Records", path: "" },
      { label: "My Timesheets", path: "" },
      { label: "My Payslips", path: "" },
      { label: "My Performance Reviews", path: "" },
      { label: "My Expenses", path: "" },
      { label: "My Private Notes", path: "" },
      { label: "View Policies", path: "" },
    ],
  },
];

// Role-based Nav Items
const roleBasedNavItems = {
  super_admin: [
    {
      icon: <Users className="w-5 h-5" />,
      label: "HR App",
      module: "hrm",
      children: [
        { label: "HR Dashboard", path: "/hr/dashboard" },
        { label: "Company Departments", path: "/hr/departments" },
        { label: "Employee Records", path: "/hr/employees" },
        { label: "Payroll Records", path: "/hr/payroll" },
      ],
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Accounting App",
      module: "accounting",
      children: [
        { label: "Accounting Dashboard", path: "/accounting/dashboard" },
        { label: "Reports", path: "/accounting/reports" },
        { label: "Accounting List", path: "" },
        { label: "Sales", path: "" },
        { label: "Expenses", path: "" },
      ],
    },
    {
      icon: <Layers className="w-5 h-5" />,
      label: "Project App",
      path: "",
      children: [
        { label: "Project Dashboard", path: "/project/dashboard" },
        { label: "Project Tasks", path: "/project/tasks" },
        { label: "Client List", path: "" },
        { label: "Project List", path: "" },
        { label: "Project Meetings", path: "" },
        { label: "Project Documnets", path: "" },
      ],
    },
    {
      icon: <User className="w-5 h-5" />,
      label: "Manager App",
      path: "",
      children: [
        { label: "Manager Dashboard", path: "/manager/dashboard" },
        { label: "Team Member", path: "/manager/tasks" },
        { label: "Team Tasks", path: "" },
        { label: "HR Files", path: "" },
        { label: "Team Timesheets", path: "" },
        { label: "Leave Records", path: "" },
        { lable: "Team Expenses", path: "" },
      ],
    },
    {
      icon: <Sliders className="w-5 h-5" />,
      label: "CRM App",
      path: "",
      children: [
        { label: "Sales Settings", path: "" },
        { label: "Campaigns", path: "" },
        { label: "Sales Dashboard", path: "" },
        { label: "Sales Funnel", path: "" },
        { label: "Contact List", path: "" },
        { label: "Mailing list", path: "" },
        { label: "Hustle List", path: "" },
      ],
    },
  ],
  hr_admin: [
    {
      icon: <Users className="w-5 h-5" />,
      label: "HR App",
      module: "hrm",
      children: [
        { label: "HR Dashboard", path: "/hr/dashboard" },
        { label: "Company Departments", path: "/hr/departments" },
        { label: "Employee Records", path: "/hr/employees" },
        { label: "Payroll Records", path: "/hr/payroll" },
      ],
    },
  ],
  hr_manager: [
    {
      icon: <Users className="w-5 h-5" />,
      label: "HR App",
      module: "hrm",
      children: [
        { label: "HR Dashboard", path: "/hr/dashboard" },
        { label: "HR Policies", path: "/hr/policies" },
        { label: "Employee Records", path: "/hr/employees" },
        { label: "Payroll Records", path: "/hr/payroll" },
      ],
    },
  ],
  hr_staff: [
    {
      icon: <Users className="w-5 h-5" />,
      label: "HR App",
      module: "hrm",
      children: [
        { label: "HR Dashboard", path: "/hr/dashboard" },
        { label: "HR Policies", path: "/hr/policies" },
        { label: "Employee Records", path: "/hr/employees" },
        { label: "Payroll Records", path: "/hr/payroll" },
      ],
    },
  ],
  accounting_admin: [
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Accounting App",
      module: "accounting",
      children: [
        { label: "Accounting Dashboard", path: "/accounting/dashboard" },
        { label: "Reports", path: "/accounting/reports" },
        { label: "Accounting List", path: "" },
        { label: "Sales", path: "" },
        { label: "Expenses", path: "" },
      ],
    },
  ],
  accountant: [
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Accounting App",
      module: "accounting",
      children: [
        { label: "Accounting Dashboard", path: "/accounting/dashboard" },
        { label: "Reports", path: "/accounting/reports" },
        { label: "Accounting List", path: "" },
        { label: "Sales", path: "" },
        { label: "Expenses", path: "" },
      ],
    },
  ],
  project_admin: [
    {
      icon: <Layers className="w-5 h-5" />,
      label: "Project App",
      path: "",
      children: [
        { label: "Project Dashboard", path: "/project/dashboard" },
        { label: "Project Tasks", path: "/project/tasks" },
        { label: "Client List", path: "" },
        { label: "Project List", path: "" },
        { label: "Project Meetings", path: "" },
        { label: "Project Documnets", path: "" },
      ],
    },
  ],
  project_manager: [
    {
      icon: <Layers className="w-5 h-5" />,
      label: "Project App",
      path: "",
      children: [
        { label: "Project Dashboard", path: "/project/dashboard" },
        { label: "Project Tasks", path: "/project/tasks" },
        { label: "Client List", path: "" },
        { label: "Project List", path: "" },
        { label: "Project Meetings", path: "" },
        { label: "Project Documnets", path: "" },
      ],
    },
  ],
  project_member: [
    {
      icon: <Layers className="w-5 h-5" />,
      label: "Project App",
      path: "",
      children: [
        { label: "Project Dashboard", path: "/project/dashboard" },
        { label: "Project Tasks", path: "/project/tasks" },
        { label: "Client List", path: "" },
        { label: "Project List", path: "" },
        { label: "Project Meetings", path: "" },
        { label: "Project Documnets", path: "" },
      ],
    },
  ],
  crm_admin: [
    {
      icon: <Sliders className="w-5 h-5" />,
      label: "CRM App",
      path: "",
      children: [
        { label: "Sales Settings", path: "" },
        { label: "Campaigns", path: "" },
        { label: "Sales Dashboard", path: "" },
        { label: "Sales Funnel", path: "" },
        { label: "Contact List", path: "" },
        { label: "Mailing list", path: "" },
        { label: "Hustle List", path: "" },
      ],
    },
  ],
  crm_manager: [
    {
      icon: <Sliders className="w-5 h-5" />,
      label: "CRM App",
      path: "",
      children: [
        { label: "Sales Settings", path: "" },
        { label: "Campaigns", path: "" },
        { label: "Sales Dashboard", path: "" },
        { label: "Sales Funnel", path: "" },
        { label: "Contact List", path: "" },
        { label: "Mailing list", path: "" },
        { label: "Hustle List", path: "" },
      ],
    },
  ],
  sales_rep: [
    {
      icon: <Sliders className="w-5 h-5" />,
      label: "CRM App",
      path: "",
      children: [
        { label: "Sales Settings", path: "" },
        { label: "Campaigns", path: "" },
        { label: "Sales Dashboard", path: "" },
        { label: "Sales Funnel", path: "" },
        { label: "Contact List", path: "" },
        { label: "Mailing list", path: "" },
        { label: "Hustle List", path: "" },
      ],
    },
  ],
};

// Existing SidebarItem component (keep as is from previous implementation)
const SidebarItem = ({ icon, label, path, children, badge }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = location.pathname === path;
  const isParentActive =
    children && children.some((child) => location.pathname === child.path);

  return (
    <div>
      {/* Regular Link Item without children */}
      {!children ? (
        <Link to={path}>
          <div
            className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer transition duration-200 ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`}
          >
            {icon}
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                {badge}
              </span>
            )}
          </div>
        </Link>
      ) : (
        <>
          {/* Dropdown Header */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer transition duration-200 ${
              isParentActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`}
          >
            {icon}
            <span className="flex-1">{label}</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
            />
          </div>
          {/* Dropdown Items */}
          {isOpen && (
            <div className="ml-4 border-l border-gray-700 pl-4">
              {children.map((child, index) => (
                <Link key={index} to={child.path}>
                  <div
                    className={`flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer transition duration-200 ${
                      location.pathname === child.path
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-800 text-gray-300"
                    }`}
                  >
                    <span>{child.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
  badge: PropTypes.string,
};

// Updated SideBar Component
const SideBar = () => {
  const user = JSON.parse(localStorage.getItem("userInfo")) || {};
  const userRole = user.role || "user"; // Default to 'user' if no role

  // Combine constant items with role-based items
  const navItems = [
    ...constantNavItems,
    ...(roleBasedNavItems[userRole] || []),
  ];

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-orange-500 flex items-center justify-center">
            <span className="text-xl">🦁</span>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{user.email || "Guest"}</h3>
            <p className="text-sm text-gray-400">{user.role || "No Role"}</p>
          </div>
        </div>
      </div>

      <nav className="p-4 flex-grow">
        {navItems.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer text-gray-300 hover:bg-gray-800"
        >
          <LogOut className="w-5 h-5" />
          <span className="flex-1">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;

