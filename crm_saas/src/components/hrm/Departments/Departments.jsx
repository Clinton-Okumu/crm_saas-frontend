import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react"; // Assuming you're using lucide-react for icons

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  // Fetch departments from the API (replace with your actual API endpoint)
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments/"); // Update with your backend endpoint
        const data = await response.json();
        setDepartments(data); // Assuming the response is an array of departments
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/departments/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        setDepartments(departments.filter((department) => department.id !== id));
      } else {
        alert("Failed to delete the department");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Departments</h1>

        {/* Action Buttons: Create Task */}
        <div className="flex space-x-4">
          <Link to="/okr/tasks/create" className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600">
            Create Department
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Department Name</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Description</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Manager</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Status</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-600">
                No departments available
              </td>
            </tr>
          ) : (
            departments.map((department) => (
              <tr key={department.id} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-800">{department.name}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{department.description}</td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {department.manager ? department.manager.name : "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {department.is_active ? "Active" : "Inactive"}
                </td>
                <td className="py-3 px-4 flex space-x-2 text-sm">
                  {/* Edit Button */}
                  <Link
                    to={`/departments/edit/${department.id}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(department.id)}
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

export default Departments;

