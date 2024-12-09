import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react"; // Assuming you're using lucide-react for icons

const PayrollList = () => {
  const [salaries, setSalaries] = useState([]);

  // Fetch salary data from the API (replace with your actual API endpoint)
  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await fetch("/api/salaries/"); // Update with your backend endpoint
        const data = await response.json();
        setSalaries(data); // Assuming the response is an array of salaries
      } catch (error) {
        console.error("Error fetching salary data:", error);
      }
    };

    fetchSalaries();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/salaries/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSalaries(salaries.filter((salary) => salary.id !== id));
      } else {
        alert("Failed to delete the salary record");
      }
    } catch (error) {
      console.error("Error deleting salary record:", error);
    }
  };

  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Employee Payroll</h1>

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

      {/* Table Section */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Employee</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Basic Salary</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Bonus</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Effective Date</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {salaries.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-600">
                No payroll records available
              </td>
            </tr>
          ) : (
            salaries.map((salary) => (
              <tr key={salary.id} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-800">{salary.employee.first_name} {salary.employee.last_name}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{salary.basic_salary}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{salary.bonus || "N/A"}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{salary.effective_date}</td>
                <td className="py-3 px-4 flex space-x-2 text-sm">
                  {/* Edit Button */}
                  <Link
                    to={`/payroll/edit/${salary.id}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(salary.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollList;

