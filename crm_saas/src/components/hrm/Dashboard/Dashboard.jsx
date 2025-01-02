import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link if not already done
import { Briefcase, Users, DollarSign } from "lucide-react"; // Example icons

const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">HR Dashboard</h1>
        <div className="flex space-x-6">
          <Link
            to="/hr/departments"
            className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors duration-300"
          >
            <Briefcase className="mr-2 text-xl" />
            Departments
          </Link>
          <Link
            to="/hr/employees"
            className="flex items-center bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition-colors duration-300"
          >
            <Users className="mr-2 text-xl" />
            Employees
          </Link>
          <Link
            to="/hr/payroll"
            className="flex items-center bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-yellow-600 transition-colors duration-300"
          >
            <DollarSign className="mr-2 text-xl" />
            Payroll
          </Link>
        </div>
      </div>

      {/* Dashboard Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* Total Tasks Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            Total Tasks
          </h3>
          <p className="text-3xl font-bold text-blue-600">45 Pending</p>
        </div>

        {/* Employees Overview Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            Employees
          </h3>
          <p className="text-3xl font-bold text-green-600">15 Active</p>
        </div>

        {/* Payroll Overview Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Payroll</h3>
          <p className="text-3xl font-bold text-yellow-600">Monthly Overview</p>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Active Projects
          </h3>
          <p className="text-xl text-gray-500">12 Ongoing</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Upcoming Deadlines
          </h3>
          <p className="text-xl text-gray-500">5 Due This Week</p>
        </div>
      </div>

      {/* Activity Feed Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Activity
        </h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex justify-between">
            <span className="text-gray-600">Task #56 Completed by John</span>
            <span className="text-sm text-gray-400">2 hours ago</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">
              Employee Sarah Smith was promoted
            </span>
            <span className="text-sm text-gray-400">1 day ago</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">
              Payroll for July has been processed
            </span>
            <span className="text-sm text-gray-400">3 days ago</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">New Task #57 Assigned to Kate</span>
            <span className="text-sm text-gray-400">5 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
