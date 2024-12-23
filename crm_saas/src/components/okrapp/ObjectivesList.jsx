import React, { useState, useEffect } from "react";
import { PieChart, Target, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchObjectives } from "../../services/api"; // Importing the API fetch function

const ObjectiveListSection = () => {
  // State to hold the fetched objectives
  const [objectives, setObjectives] = useState([]);

  // Fetch objectives from the API when the component mounts
  useEffect(() => {
    const loadObjectives = async () => {
      try {
        const data = await fetchObjectives(); // Fetch data from the API
        setObjectives(data); // Update state with the fetched objectives
      } catch (error) {
        console.error("Error fetching objectives:", error);
      }
    };

    loadObjectives(); // Call the function to load the objectives
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        {/* Left side: OKR Dashboard title */}
        <h1 className="text-2xl font-semibold text-gray-800">OKR Objectives</h1>

        {/* Right side: Buttons with Icons */}
        <div className="flex space-x-4">
          <Link to="/okr/dashboard">
            <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
              <PieChart className="mr-2" />
              Overview
            </button>
          </Link>
          <Link to="/okr/tasks">
            <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
              <CheckSquare className="mr-2" />
              Tasks
            </button>
          </Link>
          <Link to="/okr/objectives/create">
            <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600">
              <Target className="mr-2" />
              New Objective
            </button>
          </Link>
        </div>
      </div>

      {/* Objectives List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {objectives.map((objective) => (
          <div
            key={objective.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            {/* Objective Title and Owner */}
            <h2 className="text-xl font-semibold text-gray-800">
              {objective.title}
            </h2>
            <p className="text-gray-600">Owner: {objective.owner}</p>

            {/* Objective Description */}
            <p className="mt-4 text-gray-700">{objective.description}</p>

            {/* Due Date */}
            <p className="mt-2 text-sm text-gray-500">
              Due Date: {objective.due_date}
            </p>

            {/* Key Results Section */}
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800">
                Key Results:
              </h3>
              <ul className="list-disc ml-5 text-gray-700">
                {/* List all key results associated with the objective */}
                {objective.key_results?.map((keyResult, index) => (
                  <li key={index}>{keyResult}</li>
                ))}
              </ul>
            </div>

            {/* Status */}
            <div className="mt-4">
              <p
                className={`text-sm font-medium ${objective.status === "In Progress" ? "text-yellow-500" : "text-green-500"}`}
              >
                Status: {objective.status}
              </p>
            </div>

            {/* View Button */}
            <div className="mt-6">
              <Link to={`/okr/objectives/${objective.id}`}>
                <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                  <CheckSquare className="mr-2" />
                  View Objective
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectiveListSection;
