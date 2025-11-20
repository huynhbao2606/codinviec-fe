"use client";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request interceptor: Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle token refresh and errors
api.interceptors.response.use(
  (res) => {
    // Check if backend returned a new access token (from auto refresh in filter)
    // Backend filter automatically refreshes and returns new token in header
    const newAccessToken = res.headers["x-new-access-token"] || res.headers["X-New-Access-Token"];
    if (newAccessToken && typeof window !== "undefined") {
      localStorage.setItem("access_token", newAccessToken);
      // Trigger storage event to sync auth state
      window.dispatchEvent(new Event("storage"));
    }
    return res;
  },
  async (error: AxiosError) => {
    if (!error.response) {
      // Network error - return error to be handled by caller
      return Promise.reject(new Error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng."));
    }

    const { status } = error.response;

    // Handle 401 - Backend filter couldn't refresh (refresh token expired or not found)
    // Note: If backend filter refreshes successfully, request continues and returns 200 (not 401)
    // Frontend will receive X-New-Access-Token in successful response (200)
    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      // Redirect to signin page
      window.location.href = "/signin";
    }

    // Return error to be handled by caller (component, slice, etc.)
    return Promise.reject(error);
  }
);

export default api;
