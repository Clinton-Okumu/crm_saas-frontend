import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { fetchCustomerRecords } from "../../services/api.js"; // API fetch function

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await fetchCustomerRecords(); // Fetch customers data from the API
        setCustomers(data); // Update the state with fetched customers
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/crm/customers/${id}/`, {
        method: "DELETE", // DELETE request to remove the customer
      });
      if (response.ok) {
        // Remove the deleted customer from the state list
        setCustomers(customers.filter((customer) => customer.id !== id));
      } else {
        alert("Failed to delete the customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>

        {/* Action Buttons: Create Customer */}
        <div className="flex space-x-4">
          <Link
            to="/customers/create"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            <Edit className="mr-2" />
            Create Customer
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Customer Name
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Phone
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
          {customers.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-600">
                No customers available
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer.id} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-800">
                  {customer.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {customer.email}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {customer.phone}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {customer.status === "active" ? "Active" : "Inactive"}
                </td>
                <td className="py-3 px-4 flex space-x-2 text-sm">
                  {/* Edit Button */}
                  <Link
                    to={`/customers/edit/${customer.id}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(customer.id)} // Call handleDelete on click
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

export default Customers;
