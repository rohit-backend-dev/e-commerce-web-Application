// src/api/api.js
import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Attach JWT token to all requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // access token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Optional: attach refresh token if needed
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle responses/errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // For example, handle 401 errors globally
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Maybe token expired.");
      // You can trigger refresh token logic here
    }
    return Promise.reject(error);
  }
);

export default API;
