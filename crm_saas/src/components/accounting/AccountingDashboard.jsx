import React from 'react';
import { Link } from 'react-router-dom';

const AccountingDashboard = () => {
  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Accounting Dashboard</h1>

        {/* Action Buttons: Create Payroll */}
        <div className="flex space-x-4">
          <Link
            to="/payroll/create"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            Create Payroll
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountingDashboard;
