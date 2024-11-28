import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Login from "./pages/auth/Login";
import Home from "./pages/dashboard/Home";
import CalendarPage from "./pages/calendar/Calendar";
import DocumentPage from "./pages/documents/Documents";
import DashboardPage from "./pages/hrm/Dashboard";
import EmployeeRecordsPage from "./pages/hrm/Employees";
import PayrollRecordsPage from "./pages/hrm/Payroll";

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
          path="/hr/employees"
          element={
            <ProtectedRoute>
              <EmployeeRecordsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/payroll"
          element={
            <ProtectedRoute>
              <PayrollRecordsPage />
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
