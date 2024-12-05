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

//function to fetch hrm records
export const fetchPayrollRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}payroll-records/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payroll records:", error);
    throw error;
  }
};
