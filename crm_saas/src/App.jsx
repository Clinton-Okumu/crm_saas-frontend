import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Login from "./pages/auth/Login";
import Home from "./pages/dashboard/Home";
import CalendarPage from "./pages/calendar/Calendar";
import DocumentPage from "./pages/documents/Documents";
import EmployeeRecordPage from "./pages/hrm/EmployeeRecordPage";
import EmployeePayrollPage from "./pages/hrm/EmployeePayrollPage";
import DashboardOKRPage from "./pages/okrapp/Dashboard";
import ObejectivesList from "./pages/okrapp/ObjectivesList";
import TaskList from "./pages/okrapp/TaskList";
import DashboardPage from "./pages/hrm/DashboardPage";
import DepartmentsPage from "./pages/hrm/DepartmentsPage";
import AccountingDashboardPage from "./pages/accounting/AccountingDasboardPage";
import SalesPage from "./pages/accounting/SalesPage";
import InvoicePage from "./pages/accounting/InvoicePage";
import ExpensesPage from "./pages/accounting/ExpensesPage";
import AccountingListPage from "./pages/accounting/AccountingListPage";
import CrmDashboardPage from "./pages/crm/CrmDashboardPage";
import CustomerListPage from "./pages/crm/CustomerListPage";
import ContactListPage from "./pages/crm/ContactListPage";
import InteractionListPage from "./pages/crm/InteractionListPage";

const ProtectedRoute = ({ children }) => {
  const accessToken =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <DocumentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/departments"
          element={
            <ProtectedRoute>
              <DepartmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/employees"
          element={
            <ProtectedRoute>
              <EmployeeRecordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/payroll"
          element={
            <ProtectedRoute>
              <EmployeePayrollPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/okr/dashboard"
          element={
            <ProtectedRoute>
              <DashboardOKRPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/okr/objectives"
          element={
            <ProtectedRoute>
              <ObejectivesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/okr/tasks"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounting/dashboard"
          element={
            <ProtectedRoute>
              <AccountingDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounting/accountinglist"
          element={
            <ProtectedRoute>
              <AccountingListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounting/invoice"
          element={
            <ProtectedRoute>
              <InvoicePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounting/expenses"
          element={
            <ProtectedRoute>
              <ExpensesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounting/sales"
          element={
            <ProtectedRoute>
              <SalesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crm/dashboard"
          element={
            <ProtectedRoute>
              <CrmDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crm/customers"
          element={
            <ProtectedRoute>
              <CustomerListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crm/contacts"
          element={
            <ProtectedRoute>
              <ContactListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crm/interactions"
          element={
            <ProtectedRoute>
              <InteractionListPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
