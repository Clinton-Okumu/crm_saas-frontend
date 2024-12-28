import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { fetchMeetings, deleteMeeting } from "../../services/api.js"; // Import deleteMeeting

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch meetings data
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

  // Handle delete meeting
  const handleDelete = async (meetingId) => {
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      try {
        const success = await deleteMeeting(meetingId); // Use deleteMeeting from api.js
        if (success) {
          // Remove the deleted meeting from the state
          setMeetings((prevMeetings) =>
            prevMeetings.filter((meeting) => meeting.id !== meetingId),
          );
        }
      } catch (error) {
        console.error("Error deleting meeting:", error);
        setError("Failed to delete meeting. Please try again later.");
      }
    }
  };

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
                  <a
                    href={meeting.google_meet_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {meeting.google_meet_link}
                  </a>
                </div>
                <div className="flex space-x-4">
                  <Link
                    to={`/meetings/${meeting.id}/edit`}
                    className="flex items-center text-indigo-500 font-medium hover:text-indigo-700 transition"
                  >
                    Edit
                    <Edit className="ml-1 w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(meeting.id)}
                    className="flex items-center text-red-500 font-medium hover:text-red-700 transition"
                  >
                    Delete
                    <Trash className="ml-1 w-4 h-4" />
                  </button>
                </div>
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
