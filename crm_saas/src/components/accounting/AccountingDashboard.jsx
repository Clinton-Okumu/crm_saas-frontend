import React from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components of Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const AccountingDashboard = () => {
  // Sample data for the total revenue bar chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"], // months
    datasets: [
      {
        label: "Total Revenue ($)",
        data: [12000, 15000, 13000, 17000, 16000, 18000], // total revenue per month
        backgroundColor: "rgba(75, 192, 192, 0.5)", // light green color
        borderColor: "rgba(75, 192, 192, 1)", // dark green color for border
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Revenue per Month",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-white/50 h-screen overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Accounting Dashboard
        </h1>

        {/* Action Buttons: Create Payroll */}
        <div className="flex space-x-4">
          <Link
            to="/clients"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
          >
            Clients
          </Link>
          <Link
            to="/accounts"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
          >
            Accounts
          </Link>
          <Link
            to="/expenses"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
          >
            Expenses
          </Link>
          <Link
            to="/sales"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
          >
            Sales
          </Link>
        </div>
      </div>

      {/* Metric Boxes */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="flex flex-col justify-center items-center p-6 bg-white border-4 border-blue-300 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">Total clients</h3>
          <p className="text-4xl font-bold text-blue-500">120</p>
        </div>
        <div className="flex flex-col justify-center items-center p-6 bg-white border-4 border-blue-300 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">Accounts</h3>
          <p className="text-4xl font-bold text-red-500">8</p>
        </div>
        <div className="flex flex-col justify-center items-center p-6 bg-white border-4 border-blue-300 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">
            Total Expenses
          </h3>
          <p className="text-4xl font-bold text-green-500">45</p>
        </div>
        <div className="flex flex-col justify-center items-center p-6 bg-white border-4 border-blue-300 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">Profit/Loss</h3>
          <p className="text-4xl font-bold text-yellow-500">90%</p>
        </div>
      </section>

      {/* Total Revenue Bar Chart */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Total Revenue
        </h2>
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-full"
          style={{ height: "50vh", width: "100%" }}
        >
          {/* Set height to 50% of the viewport height */}
          <Bar data={data} options={options} height={null} width={null} />
        </div>
      </section>
    </div>
  );
};

export default AccountingDashboard;
