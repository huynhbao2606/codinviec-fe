"use client";

import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

// Tự động thêm token vào header
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


// Retry request với token mới
const retryWithNewToken = async (originalRequest: any, newToken: string) => {
    // Lưu token mới
    if (typeof window !== "undefined") {
        localStorage.setItem("access_token", newToken);
    }

    // Đánh dấu đã retry
    originalRequest.__isRetryRequest = true;

    // Set token mới vào request
    if (!originalRequest.headers) {
        originalRequest.headers = {};
    }
    originalRequest.headers.Authorization = `Bearer ${newToken}`;

    // Retry request
    return api(originalRequest);
};

// ==================== RESPONSE INTERCEPTOR ====================
api.interceptors.response.use(
    // Success: Lưu token mới nếu có
    (res) => {
        const newToken = res.headers["x-new-access-token"];
        if (newToken && typeof window !== "undefined") {
            localStorage.setItem("access_token", newToken);
        }
        return res;
    },
    // Error: Xử lý 401 và retry
    async (error: AxiosError) => {
        const status = error.response?.status;
        const originalRequest: any = error.config;

        // Chỉ xử lý 401 và chưa retry
        if (status !== 401 || !originalRequest || originalRequest.__isRetryRequest) {
            // Nếu là 401 và không retry được → logout
            if (status === 401 && typeof window !== "undefined") {
                localStorage.removeItem("access_token");
                const errorMessage = (error.response?.data as any)?.message || "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại!";
                window.dispatchEvent(new CustomEvent("logout", { detail: { message: errorMessage } }));
            }
            return Promise.reject(error);
        }

        // Tìm token mới
        // 1 error response header
        const newTokenFromHeader = error.response?.headers["x-new-access-token"];

        // 2 localStorage
        const currentToken = originalRequest.headers?.Authorization?.replace("Bearer ", "") || null;
        const latestToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
        const newTokenFromStorage = latestToken && latestToken !== currentToken ? latestToken : null;

        // Retry với token mới
        const newToken = newTokenFromHeader || newTokenFromStorage;
        if (newToken) {
            return retryWithNewToken(originalRequest, newToken);
        }

        // Không có token mới → logout
        if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            const errorMessage = (error.response?.data as any)?.message || "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại!";
            window.dispatchEvent(new CustomEvent("logout", { detail: { message: errorMessage } }));
        }

        return Promise.reject(error);
    }
);

export default api;
