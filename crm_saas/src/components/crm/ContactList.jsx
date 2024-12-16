import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { fetchContactRecords } from "../../services/api.js"; // You can reuse this for API fetch

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  // Fetch contacts on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await fetchContactRecords(); // Calling the function to fetch contacts
        setContacts(data); // Update the state with fetched contacts
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/crm/contacts/${id}/`, {
        method: "DELETE", // DELETE request to remove the contact
      });
      if (response.ok) {
        // Remove the deleted contact from the list in state
        setContacts(contacts.filter((contact) => contact.id !== id));
      } else {
        alert("Failed to delete the contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Contacts</h1>

        {/* Action Buttons: Create Contact */}
        <div className="flex space-x-4">
          <Link
            to="/contacts/create"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            <Edit className="mr-2" />
            Create Contact
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
              Customer
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-600">
                No contacts available
              </td>
            </tr>
          ) : (
            contacts.map((contact) => (
              <tr key={contact.id} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-800">
                  {contact.first_name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {contact.last_name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {contact.email}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {contact.phone}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {contact.customer ? contact.customer.name : "N/A"}
                </td>
                <td className="py-3 px-4 flex space-x-2 text-sm">
                  {/* Edit Button */}
                  <Link
                    to={`/contacts/edit/${contact.id}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(contact.id)} // Call handleDelete on click
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

export default Contacts;
