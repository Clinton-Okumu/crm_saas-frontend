import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link if not already done

const EmployeeRecord = () => {
  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Employee Record</h1>

        {/* Action Buttons: Create Task */}
        <div className="flex space-x-4">
          <Link to="/okr/tasks/create" className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600">
            Create Task
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRecord;

