// components/dashboard/DashboardContent.jsx
import React from 'react';
import QuickAccessItem from './QuickItemsAccess.jsx';

const DashboardContent = () => {
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
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-6">APP QUICK ACCESS LIST</h2>
        <div className="space-y-4">
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
  );
};

export default DashboardContent;