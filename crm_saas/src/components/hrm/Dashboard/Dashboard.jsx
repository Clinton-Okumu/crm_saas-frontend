import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link if not already done

const Dashboard = () => {
  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">HR DASHBOARD</h1>

        {/* Action Buttons: Create Task */}
        <div className="flex space-x-4">
          <Link
            to="/okr/tasks/create"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            Departments
          </Link>
          <Link
            to="/okr/tasks/create"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            Employees
          </Link>
          <Link
            to="/okr/tasks/create"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            Payroll
          </Link>
        </div>
      </div>

      {/* Dashboard Cards Section */}
        {/* Dashboard Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Total Tasks Card */}
        <div className="bg-white p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-200">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Total Tasks</h3>
          <p className="text-gray-500 text-lg">45 Pending</p>
        </div>

        {/* Employees Overview Card */}
        <div className="bg-white p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-200">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Employees</h3>
          <p className="text-gray-500 text-lg">150 Active</p>
        </div>

        {/* Payroll Overview Card */}
        <div className="bg-white p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-200">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Payroll</h3>
          <p className="text-gray-500 text-lg">Monthly Overview</p>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Active Projects</h3>
          <p className="text-gray-500">12 Ongoing</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Upcoming Deadlines</h3>
          <p className="text-gray-500">5 Due This Week</p>
        </div>
      </div>

      {/* Activity Feed Section */}
      <div className="mt-12 bg-white p-8 rounded-lg shadow-xl">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Recent Activity</h3>
        <ul className="text-gray-600">
          <li className="mb-2">Task #56 Completed by John</li>
          <li className="mb-2">Employee Sarah Smith was promoted</li>
          <li className="mb-2">Payroll for July has been processed</li>
          <li className="mb-2">New Task #57 Assigned to Kate</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
