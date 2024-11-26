import React from 'react';
import { 
  Users, 
  Building2, 
  DollarSign, 
  Clock, 
  FileText, 
  Calendar,
  Star
} from 'lucide-react';
import StatCard from './StatCard';
import ModuleCard from './ModuleCard';
import RecentActivityItem from './RecentActivityItem';
import EventItem from './EventItem';
import QuickActionButton from './QuickActionButton';

const Dashboard = () => {
  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
  };

  // Sample data
  const departmentData = [
    { label: 'Engineering', value: '45 employees' },
    { label: 'Marketing', value: '32 employees' },
    { label: 'Sales', value: '28 employees' },
    { label: 'HR', value: '12 employees' }
  ];

  const attendanceData = [
    { label: 'Present Today', value: '225' },
    { label: 'On Leave', value: '12' },
    { label: 'Remote', value: '8' },
    { label: 'Sick Leave', value: '5' }
  ];

  const recentActivities = [
    {
      icon: Users,
      title: "New employee onboarding",
      time: "2 hours ago",
      status: "Completed"
    },
    {
      icon: FileText,
      title: "Leave request from John Doe",
      time: "3 hours ago",
      status: "Pending"
    },
    {
      icon: DollarSign,
      title: "Monthly payroll processed",
      time: "5 hours ago",
      status: "Completed"
    }
  ];

  const upcomingEvents = [
    {
      icon: Calendar,
      title: "Team Meeting",
      time: "Tomorrow, 10:00 AM",
      bgColor: "blue"
    },
    {
      icon: Star,
      title: "Performance Review",
      time: "Dec 2, 2:00 PM",
      bgColor: "purple"
    }
  ];

  const quickActions = [
    {
      label: "Add New Employee",
      action: "add_employee"
    },
    {
      label: "Process Payroll",
      action: "process_payroll"
    },
    {
      label: "Review Leave Requests",
      action: "review_leaves"
    },
    {
      label: "Generate Reports",
      action: "generate_reports"
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">HR Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          icon={Users} 
          title="Total Employees" 
          value="245" 
          change="+12"
        />
        <StatCard 
          icon={Building2} 
          title="Departments" 
          value="8"
        />
        <StatCard 
          icon={DollarSign} 
          title="Payroll" 
          value="$156,250"
          change="+8.2%"
        />
        <StatCard 
          icon={Clock} 
          title="Attendance" 
          value="92%" 
          change="+3%"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Department Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ModuleCard 
              title="Department Overview"
              icon={Building2}
              items={departmentData}
            />
            <ModuleCard 
              title="Attendance Overview"
              icon={Clock}
              items={attendanceData}
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">Recent Activity</h3>
            </div>
            <div className="p-4 space-y-3">
              {recentActivities.map((activity, index) => (
                <RecentActivityItem 
                  key={index}
                  icon={activity.icon}
                  title={activity.title}
                  time={activity.time}
                  status={activity.status}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">Upcoming Events</h3>
            </div>
            <div className="p-4 space-y-4">
              {upcomingEvents.map((event, index) => (
                <EventItem 
                  key={index}
                  icon={event.icon}
                  title={event.title}
                  time={event.time}
                  bgColor={event.bgColor}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">Quick Actions</h3>
            </div>
            <div className="p-4 space-y-2">
              {quickActions.map((action, index) => (
                <QuickActionButton 
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                >
                  {action.label}
                </QuickActionButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;