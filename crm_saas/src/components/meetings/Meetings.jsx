import React from "react";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react"; // Importing the Edit icon from Lucide

const Meetings = () => {
  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Meetings</h1>

        {/* Action Buttons: Create Contact */}
        <div className="flex space-x-4">
          <Link
            to="/contacts/create"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            <Edit className="mr-2 w-4 h-4" /> {/* Adjusted icon size */}
            Create Meeting
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Meetings;
