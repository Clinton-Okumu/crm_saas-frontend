import { Link } from "react-router-dom";
import { Edit } from "lucide-react"; // Importing the Edit icon from Lucide

const Meetings = () => {
  return (
    <div className="p-6 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Meetings</h1>

        {/* Action Button: Create Meeting */}
        <div>
          <Link
            to="/meetings/create"
            className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Edit className="mr-2 w-5 h-5" />
            Create Meeting
          </Link>
        </div>
      </div>

      {/* Meetings List Section */}
      <div className="bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Upcoming Meetings
        </h2>

        {/* Meetings List */}
        <div className="space-y-6">
          {/* Meeting Card */}
          <div className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Team Standup
              </h3>
              <p className="text-sm text-gray-600">
                Date: Jan 15, 2025 - Time: 10:00 AM
              </p>
            </div>
            <Link
              to="/meetings/1/edit"
              className="flex items-center text-indigo-500 font-medium hover:text-indigo-700 transition"
            >
              Edit
              <Edit className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {/* Another Meeting Card */}
          <div className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Project Kickoff
              </h3>
              <p className="text-sm text-gray-600">
                Date: Jan 20, 2025 - Time: 3:00 PM
              </p>
            </div>
            <Link
              to="/meetings/2/edit"
              className="flex items-center text-indigo-500 font-medium hover:text-indigo-700 transition"
            >
              Edit
              <Edit className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetings;
