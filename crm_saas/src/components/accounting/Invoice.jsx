import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import {
  fetchInvoices,
  deleteInvoice,
  performInvoiceAction,
} from "../../services/api.js"; // Adjust the import path as needed

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoiceData();
  }, []);

  const handleDelete = async (invoiceId) => {
    try {
      await deleteInvoice(invoiceId);
      setInvoices(invoices.filter((invoice) => invoice.id !== invoiceId));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const handleMarkAsPaid = async (invoiceId) => {
    try {
      const data = await performInvoiceAction(invoiceId, {
        action: "markPaid",
      });
      setInvoices(
        invoices.map((invoice) =>
          invoice.id === invoiceId ? { ...invoice, ...data } : invoice,
        ),
      );
    } catch (error) {
      console.error(`Error marking invoice ${invoiceId} as paid:`, error);
    }
  };

  return (
    <div className="p-6 bg-white-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Invoices</h1>
        {/* Action Button: Create Invoice */}
        <Link
          to="/invoices/create"
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
        >
          Create Invoice
        </Link>
      </div>

      {/* Invoice Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Invoice Number
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Customer
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Status
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Due Date
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Total Amount
            </th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-600">
                No invoices available
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-800">
                  {invoice.invoice_number}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {invoice.customer.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {invoice.status}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {invoice.due_date}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {invoice.total_amount}
                </td>
                <td className="py-3 px-4 flex space-x-2 text-sm">
                  <Link
                    to={`/invoices/edit/${invoice.id}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(invoice.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleMarkAsPaid(invoice.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                  >
                    Mark as Paid
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

export default Invoices;
