import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { fetchAccountingRecords } from "../../services/api.js"; // Ensure this path matches your API service location

const AccountingList = () => {
  const [accounts, setAccounts] = useState([]);

  // Fetch accounts on component mount
  useEffect(() => {
    const getAccounts = async () => {
      try {
        const data = await fetchAccountingRecords();
        setAccounts(data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    getAccounts();
  }, []);

  // Handle delete action with confirmation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account?"))
      return;
    try {
      await fetch(`/api/accounts/${id}/`, { method: "DELETE" });
      setAccounts(accounts.filter((account) => account.id !== id));
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete the account");
    }
  };

  return (
    <div className="p-6 bg-white-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Accounts</h1>
        <div className="flex space-x-4">
          <Link
            to="/accounts/create"
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
          >
            Create Account
          </Link>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="border-b bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Account Name
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Account Code
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Account Type
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Balance
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {accounts.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-600">
                No accounts available
              </td>
            </tr>
          ) : (
            accounts.map((account) => (
              <tr key={account.id} className="border-b">
                <td className="py-2 px-4 text-sm text-gray-700">
                  {account.name}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {account.account_code}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {account.account_type}
                </td>
                <td className="py-2 px-4 text-sm text-gray-700">
                  {account.current_balance}
                </td>
                <td className="py-2 px-4 flex space-x-2 text-sm">
                  <Link
                    to={`/accounts/edit/${account.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit />
                  </Link>
                  <button
                    onClick={() => handleDelete(account.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountingList;
