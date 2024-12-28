// api.js

import axios from "axios";

// Base URL for your API
const API_URL = "http://127.0.0.1:8000/api/";

// Helper function to get tokens from localStorage
const getToken = (type) => localStorage.getItem(type);

// Function to refresh the access token
export const refreshAccessToken = async () => {
  const refreshToken = getToken("refresh");
  if (!refreshToken) {
    throw new Error("Authentication required");
  }

  try {
    const response = await axios.post(`${API_URL}token/refresh/`, {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    localStorage.setItem("access", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    throw new Error("Session expired. Please log in again.");
  }
};

// Function to make API requests
export const apiRequest = async (method, url, data = null, headers = {}) => {
  const token = getToken("access");
  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const config = {
    method,
    url: `${API_URL}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      const newAccessToken = await refreshAccessToken();
      return apiRequest(method, url, data, headers); // Retry with new token
    } else {
      throw new Error(error.response?.data?.detail || "API request failed");
    }
  }
};

// Add the login function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/login/`, {
      email,
      password,
    });

    // Store tokens based on remember me
    const storage = response.data.rememberMe ? localStorage : sessionStorage;
    storage.setItem("access_token", response.data.access);
    storage.setItem("refresh_token", response.data.refresh);

    // Store user info
    const userInfo = {
      email: response.data.email,
      role: response.data.role,
      primary_module: response.data.primary_module,
      accessible_modules: response.data.accessible_modules,
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Set default authorization header
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${response.data.access}`;

    return response.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.detail ||
        "Login failed. Please check your credentials.",
    );
  }
};
export const logoutUser = async (refreshToken) => {
  const response = await axios.post("http://127.0.0.1:8000/api/auth/logout/", {
    refresh: refreshToken,
  });
  return response;
};

//function to fetch objevtives
export const fetchObjectives = async () => {
  try {
    const response = await axios.get(`${API_URL}okr/objectives/`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching objectives:", error);
    throw error;
  }
};

//create objective
export const createObjective = async (objectiveData) => {
  try {
    const response = await axios.post(
      `${API_URL}okr/objectives/`,
      objectiveData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data; // Return the response from the API
  } catch (error) {
    console.error("Error creating objective:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

//function to fetch tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}okr/tasks/`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

//function to create task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}okr/tasks/`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

//function to delete task
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}okr/tasks/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

//function to fetch hrm employee records
export const fetchEmployeeRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}hrm/employees/`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching payroll records", error);
    throw error;
  }
};

//fucntion to fetch department records
export const fetchDepartmentRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}hrm/departments/`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching department records:", error);
    throw error;
  }
};

//function to fetch hrm payroll records
export const fetchPayrollRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}payroll-records/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payroll records:", error);
    throw error;
  }
};

//function to fetch accounting records
export const fetchAccountingRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching accounting records:", error);
    throw error;
  }
};

//fution to fetch accounting reports
export const fetchAccountingReports = async () => {
  try {
    const response = await axios.get(`${API_URL}accounting-reports/`);
    return response.data;
  } catch (error) {
    console.error("Error fecthing accounting reports", error);
    throw error;
  }
};

// Fetch all invoices
export const fetchInvoices = async () => {
  try {
    const response = await axios.get(`${API_URL}invoices/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

// Fetch a specific invoice by ID
export const fetchInvoiceById = async (invoiceId) => {
  try {
    const response = await axios.get(`${API_URL}invoices/${invoiceId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching invoice ${invoiceId}:`, error);
    throw error;
  }
};

// Create a new invoice
export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${API_URL}invoices/`, invoiceData);
    return response.data;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
};

// Update an existing invoice
export const updateInvoice = async (invoiceId, invoiceData) => {
  try {
    const response = await axios.patch(
      `${API_URL}invoices/${invoiceId}/`,
      invoiceData,
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating invoice ${invoiceId}:`, error);
    throw error;
  }
};

// Delete an invoice
export const deleteInvoice = async (invoiceId) => {
  try {
    await axios.delete(`${API_URL}invoices/${invoiceId}/`);
  } catch (error) {
    console.error(`Error deleting invoice ${invoiceId}:`, error);
    throw error;
  }
};

// Perform an action on an invoice
export const performInvoiceAction = async (invoiceId, actionData) => {
  try {
    const response = await axios.post(
      `${API_URL}invoices/${invoiceId}/actions/`,
      actionData,
    );
    return response.data;
  } catch (error) {
    console.error(`Error performing action on invoice ${invoiceId}:`, error);
    throw error;
  }
};

//function to fetch interaction
export const fetchInteractionRecords = async (id) => {
  try {
    const response = await axios.get(`${API_URL}crm/interactions/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching interaction records:", error);
    throw error;
  }
};

//fetch customer records
export const fetchCustomerRecords = async (id) => {
  try {
    const response = await axios.get(`${API_URL}crm/customers/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer records:", error);
    throw error;
  }
};

//fetch contact records
export const fetchContactRecords = async (id) => {
  try {
    const response = await axios.get(`${API_URL}crm/contacts/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact records:", error);
    throw error;
  }
};

//fetch transaction records
export const fetchSalesTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}accounting/transactions/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales transactions:", error);
    throw error;
  }
};

//delete transaction
export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}accounting/transactions/${id}/`);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

//fetch expense transaction
export const fetchExpensesTransaction = async () => {
  try {
    const response = await axios.get(`${API_URL}accounting/transactions/`, {
      params: { transaction_type: "expense" }, // Assuming this is the filter field
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses transactions:", error);
    throw error;
  }
};

//delete expense
export const deleteExpense = async (id) => {
  try {
    await axios.delete(`${API_URL}accounting/transactions/${id}/`); // Assuming expenses are transactions
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};

//fetch meeting records
export const fetchMeetings = async () => {
  try {
    const response = await axios.get(`${API_URL}meeting_mgmt/meetings/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching meeting records:", error);
    throw error;
  }
};

// Fetch a single meeting by ID
export const fetchMeetingById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}meeting_mgmt/meetings/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching meeting:", error);
    throw error;
  }
};

// Create a new meeting
export const createMeeting = async (meetingData) => {
  try {
    const response = await axios.post(`${API_URL}meetings/`, meetingData);
    return response.data;
  } catch (error) {
    console.error("Error creating meeting:", error);
    throw error;
  }
};

// Update a meeting (PUT)
export const updateMeeting = async (id, meetingData) => {
  try {
    const response = await axios.put(`${API_URL}meetings/${id}/`, meetingData);
    return response.data;
  } catch (error) {
    console.error("Error updating meeting:", error);
    throw error;
  }
};

// Update a meeting (PATCH)
export const updateMeetingPartial = async (id, meetingData) => {
  try {
    const response = await axios.patch(
      `${API_URL}meetings/${id}/`,
      meetingData,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating meeting:", error);
    throw error;
  }
};

// Delete a meeting
export const deleteMeeting = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}meeting_mgmt/meetings/${id}/`,
    );
    return response.status === 204;
  } catch (error) {
    console.error("Error deleting meeting:", error);
    throw error;
  }
};
