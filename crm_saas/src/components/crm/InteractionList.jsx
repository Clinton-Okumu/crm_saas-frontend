import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { fetchInteractionRecords } from "../../services/api.js"; // Reusable API fetch function

const Interactions = () => {
  const [interactions, setInteractions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch interactions on component mount
  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const response = await fetchInteractionRecords(); // Fetch interactions from the API
        // Extract the `results` array from the paginated response
        if (response && Array.isArray(response.results)) {
          setInteractions(response.results); // Update the state with fetched interactions
        } else {
          console.error(
            "Expected an array of interactions, but got:",
            response,
          );
          setError(new Error("Invalid data format received from the server."));
        }
      } catch (error) {
        console.error("Error fetching interactions:", error);
        setError(error);
      } finally {
        setIsLoading(false); // Set loading to false after the request completes
      }
    };

    fetchInteractions();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/crm/interactions/${id}/`, {
        method: "DELETE", // DELETE request to remove the interaction
      });
      if (response.ok) {
        // Remove the deleted interaction from the list in state
        setInteractions(
          interactions.filter((interaction) => interaction.id !== id),
        );
      } else {
        alert("Failed to delete the interaction");
      }
    } catch (error) {
      console.error("Error deleting interaction:", error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 bg-white-50">
        <p className="text-gray-600">Loading interactions...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 bg-white-50">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Interactions</h1>

        {/* Action Buttons: Create Interaction */}
        <div className="flex space-x-4">
          <Link
            to="/interactions/create"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
          >
            <Edit className="mr-2" />
            Create Interaction
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Interaction Type
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Customer
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Contact
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Notes
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Date
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {interactions.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-600">
                No interactions available
              </td>
            </tr>
          ) : (
            interactions.map((interaction) => (
              <tr key={interaction.id} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-800">
                  {interaction.type}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {interaction.customer_name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {interaction.contact_name || "N/A"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {interaction.notes}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {new Date(interaction.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 flex space-x-2 text-sm">
                  {/* Edit Button */}
                  <Link
                    to={`/interactions/edit/${interaction.id}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(interaction.id)} // Call handleDelete on click
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

export default Interactions;
