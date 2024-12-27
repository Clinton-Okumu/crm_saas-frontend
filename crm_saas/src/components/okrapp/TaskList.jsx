import React, { useState, useEffect } from "react";
import { Edit, Trash } from "lucide-react"; // Import icons for Edit and Delete
import { Link } from "react-router-dom";
import { fetchTasks } from "../../services/api"; // Assuming fetchTasks API fetch function is available

const TaskListSection = () => {
  // State to hold fetched tasks
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks(); // Fetch data from API
        setTasks(data); // Set tasks to state
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    loadTasks();
  }, []);

  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">OKR Tasks</h1>

        {/* Action Buttons: Create Task */}
        <div className="flex space-x-4">
          <Link
            to="/okr/tasks/create"
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            Create Task
          </Link>
        </div>
      </div>

      {/* Table to Display Tasks */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Title
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Description
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Due Date
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Completed
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-600">
                No tasks available
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-800">
                  {task.title}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {task.description}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {task.due_date}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {task.completed ? "Yes" : "No"}
                </td>
                <td className="py-3 px-4 flex space-x-2 text-sm">
                  <Link
                    to={`/okr/tasks/edit/${task.id}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(task.id)}
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

  // Function to handle task deletion
  const handleDelete = (taskId) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this task?")) {
      // Call the delete function from API (to be implemented in your services/api.js)
      // Example: deleteTask(taskId);
      console.log(`Task with ID ${taskId} deleted.`);
      // After deleting, you can reload tasks or remove it from the state.
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };
};

export default TaskListSection;
