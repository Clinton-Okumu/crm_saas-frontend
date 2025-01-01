import React from "react";
import { Link } from "react-router-dom";
import { Home, Briefcase, Users, FilePlus } from "lucide-react";

const CrmDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">CRM Dashboard</h1>
        <div className="flex space-x-4">
          <Link
            to="/add-contact"
            className="flex items-center bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600"
          >
            <FilePlus className="mr-2 text-xl" />
            Add New Contact
          </Link>
          <Link
            to="/crm/contacts"
            className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600"
          >
            <Briefcase className="mr-2 text-xl" />
            Contacts list
          </Link>
          <Link
            to="/crm/interactions"
            className="flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-600"
          >
            <Users className="mr-2 text-xl" />
            Interactions
          </Link>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Contacts
          </h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">
            Active Interactions
          </h3>
          <p className="text-3xl font-bold text-green-600">15</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Pending Tasks</h3>
          <p className="text-3xl font-bold text-red-600">5</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Activities
        </h3>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span className="text-gray-600">Follow-up with John Doe</span>
            <span className="text-sm text-gray-400">2 hours ago</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">
              New interaction with Acme Corp
            </span>
            <span className="text-sm text-gray-400">1 day ago</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Completed task for ABC Ltd.</span>
            <span className="text-sm text-gray-400">3 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CrmDashboard;
