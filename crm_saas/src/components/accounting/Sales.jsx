import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { fetchSalesTransactions, deleteTransaction } from "../../services/api";

const Sales = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const loadTransactions = async () => {
      try {
        const data = await fetchSalesTransactions();
        if (data) {
          // Ensure data is not undefined or null
          setTransactions(data);
          setError(""); // Clear any previous errors
        } else {
          throw new Error("No data received");
        }
      } catch (error) {
        console.error("Error fetching sales transactions:", error);
        setError("Failed to fetch sales transactions");
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;
    setIsLoading(true);
    try {
      const response = await deleteTransaction(id);
      if (response.ok) {
        setTransactions(
          transactions.filter((transaction) => transaction.id !== id),
        );
      } else {
        console.error("Failed to delete transaction");
        setError("Failed to delete transaction");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setError("Error during transaction deletion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Sales</h1>
        <div className="flex space-x-4">
          <Link
            to="/sales/create"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            Create Sale
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
              Total
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
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {transaction.reference_number}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {transaction.description}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {transaction.total_amount.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {transaction.status}
                </td>
                <td className="px-4 py-2 flex space-x-2 text-sm">
                  <Link
                    to={`/sales/edit/${transaction.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(transaction.id)}
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
                No salses transactions available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
