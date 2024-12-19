import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { fetchExpensesTransaction, deleteExpense } from "../../services/api"; // Adjust these API calls to your actual functions

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const loadExpenses = async () => {
      try {
        const data = await fetchExpensesTransaction();
        if (data) {
          setExpenses(data);
          setError(""); // Clear any previous errors
        } else {
          throw new Error("No data received");
        }
      } catch (error) {
        console.error("Error fetching expense transactions:", error);
        setError("Failed to fetch expenses");
      } finally {
        setIsLoading(false);
      }
    };

    loadExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;
    setIsLoading(true);
    try {
      const response = await deleteExpense(id);
      if (response.ok) {
        setExpenses(expenses.filter((expense) => expense.id !== id));
      } else {
        console.error("Failed to delete expense");
        setError("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      setError("Error during expense deletion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Expenses</h1>
        <div className="flex space-x-4">
          <Link
            to="/expenses/create"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            Create Expense
          </Link>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Reference
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Description
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Amount
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Status
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {expense.reference_number}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {expense.description}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {expense.total_amount.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {expense.status}
                </td>
                <td className="px-4 py-2 flex space-x-2 text-sm">
                  <Link
                    to={`/expenses/edit/${expense.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-600">
                No expenses available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
