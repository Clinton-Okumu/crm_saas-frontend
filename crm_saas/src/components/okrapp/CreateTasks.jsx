import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [okr, setOkr] = useState("");
  const [okrs, setOkrs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOKRs = async () => {
      const response = await fetch("/api/okrs/");
      const data = await response.json();
      setOkrs(data);
    };
    fetchOKRs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      due_date: dueDate,
      completed,
      okr,
    };

    try {
      const response = await fetch("/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        navigate("/tasks");
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create Task</h1>
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
            Due Date
          </label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">OKR</label>
          <select
            value={okr}
            onChange={(e) => setOkr(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select OKR</option>
            {okrs.map((okr) => (
              <option key={okr.id} value={okr.id}>
                {okr.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Completed
          </label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mt-1 block"
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskPage;
