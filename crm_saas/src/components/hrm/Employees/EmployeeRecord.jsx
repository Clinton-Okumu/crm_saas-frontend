import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react"; // Assuming you're using lucide-react for icons
import { fetchEmployeeRecords } from "../../../services/api";

const EmployeeRecord = () => {
  const [employees, setEmployees] = useState([]);

  // Fetch employee data from the API (replace with your actual API endpoint)
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await fetchEmployeeRecords();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        ` http://127.0.0.1:8000/api/hrm/employees/${id}/`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        setEmployees(employees.filter((employee) => employee.id !== id));
      } else {
        alert("Failed to delete the employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Employee Record
        </h1>

        {/* Action Buttons: Create Task */}
        <div className="flex space-x-4">
          <Link
            to="/okr/tasks/create"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            Add Employee
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              First Name
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Last Name
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Phone
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Department
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Position
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Hire Date
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Status
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="9" className="py-4 text-center text-gray-600">
                No employees available
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id || employee.email} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-800">
                  {employee.first_name || "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {employee.last_name || "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {employee.email || "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {employee.phone || "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {employee.department?.name || "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {employee.position?.name || "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {employee.hire_date || "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {employee.is_active ? "Active" : "Inactive"}
                </td>
                <td className="py-3 px-4 flex space-x-2 text-sm">
                  {/* Edit Button */}
                  <Link
                    to={`/employees/edit/${employee.id}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(employee.id)}
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

export default EmployeeRecord;
