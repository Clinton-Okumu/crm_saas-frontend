import React from 'react';
import PropTypes from 'prop-types';

const QuickAccessItem = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-7">
      <div className="flex items-start gap-6">  {/* Removed mb-2 since we have p-7 padding */}
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{title}</h3>  {/* Added mb-1 for slight spacing between title and description */}
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

QuickAccessItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

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
        <h2 className="text-lg font-semibold mb-6">APP QUICK ACCESS LIST</h2>  {/* Increased mb-4 to mb-6 for more space before cards */}
        <div className="space-y-4">  {/* Increased space-y-2 to space-y-4 for more breathing room between cards */}
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
