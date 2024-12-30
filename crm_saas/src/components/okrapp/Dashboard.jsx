import React from "react";
import { PieChart, Target, CheckSquare } from "lucide-react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const DashboardSection = () => {
  // Sample data for the Line Chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"], // X-axis labels
    datasets: [
      {
        label: "Objectives Progress",
        data: [65, 59, 80, 81, 56, 55], // Y-axis data points
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    maintainAspectRatio: false, // This is important for controlling the chart size
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-white-50">
      {" "}
      {/* Removed min-h-screen and flex flex-col */}
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        {/* Left side: OKR Dashboard title */}
        <h1 className="text-2xl font-semibold text-gray-800">OKR Dashboard</h1>

        {/* Right side: Buttons with Icons */}
        <div className="flex space-x-4">
          <Link to="/okr/dashboard">
            <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
              <PieChart className="mr-2 w-5 h-5" />
              OKR
            </button>
          </Link>
          <Link to="/okr/objectives">
            <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
              <Target className="mr-2 w-5 h-5" />
              Objectives
            </button>
          </Link>
          <Link to="/okr/tasks">
            <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
              <CheckSquare className="mr-2 w-5 h-5" />
              Tasks
            </button>
          </Link>
        </div>
      </div>
      {/* Metric Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="flex flex-col justify-center items-center p-6 bg-white border-4 border-blue-500 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">Objectives</h3>
          <p className="text-4xl font-bold text-blue-500">120</p>
        </div>
        <div className="flex flex-col justify-center items-center p-6 bg-white border-4 border-red-500 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">
            Overdue Objectives
          </h3>
          <p className="text-4xl font-bold text-red-500">8</p>
        </div>
        <div className="flex flex-col justify-center items-center p-6 bg-white border-4 border-green-500 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">Key Results</h3>
          <p className="text-4xl font-bold text-green-500">45</p>
        </div>
        <div className="flex flex-col justify-center items-center p-6 bg-white border-4 border-yellow-500 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">Quality</h3>
          <p className="text-4xl font-bold text-yellow-500">90%</p>
        </div>
      </div>
      {/* Line Chart */}
      <div className="w-full h-64 md:h-96">
        {" "}
        {/* Adjusting height for the chart */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardSection;

