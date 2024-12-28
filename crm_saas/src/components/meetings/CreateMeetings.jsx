import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateMeetingPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [googleMeetLink, setGoogleMeetLink] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users/");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMeeting = {
      title,
      description,
      meeting_time: meetingTime,
      organizer,
      attendees,
      google_meet_link: googleMeetLink,
    };

    try {
      const response = await fetch("/api/meetings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeeting),
      });

      if (response.ok) {
        navigate("/meetings");
      } else {
        console.error("Failed to create meeting");
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Create Meeting
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows="3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meeting Time
          </label>
          <input
            type="datetime-local"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Organizer
          </label>
          <select
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select Organizer</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attendees
          </label>
          <select
            multiple
            value={attendees}
            onChange={(e) =>
              setAttendees(
                Array.from(e.target.selectedOptions, (option) => option.value),
              )
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Google Meet Link
          </label>
          <input
            type="url"
            value={googleMeetLink}
            onChange={(e) => setGoogleMeetLink(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Create Meeting
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMeetingPage;
