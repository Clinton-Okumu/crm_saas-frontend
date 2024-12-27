import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import { fetchMeetings } from "../../services/api.js";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const data = await fetchMeetings();
        console.log("Fetched data:", data);
        if (data && data.results) {
          setMeetings(data.results);
        } else {
          setError("Invalid data format received from the server.");
        }
      } catch (error) {
        console.error("Failed to load meetings:", error);
        setError("Failed to load meetings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadMeetings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading meetings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex justify-between items-center bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {meeting.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(meeting.meeting_time).toLocaleDateString()}{" "}
                    - Time:{" "}
                    {new Date(meeting.meeting_time).toLocaleTimeString()}
                  </p>
                </div>
                <Link
                  to={`/meetings/${meeting.id}/edit`}
                  className="flex items-center text-indigo-500 font-medium hover:text-indigo-700 transition"
                >
                  Edit
                  <Edit className="ml-1 w-4 h-4" />
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No meetings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meetings;
