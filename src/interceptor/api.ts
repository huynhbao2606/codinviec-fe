"use client";

import axios, { AxiosError } from "axios";
import { cookieHelper } from "@/utils/cookieHelper";
import { authService } from "@/services/auth/authService";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

let isRefresh = false;

interface QueueItem {
    resolve: (token: string | null) => void;
    reject: (error: AxiosError) => void;
}

let failedQueue: QueueItem[] = [];

// Xử lý queue khi refresh xong
const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use(
    (config) => {
        const token = cookieHelper.get("access_token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as any

        if (!originalRequest) {
            return Promise.reject(error)
        }

        // Bỏ qua refresh logic cho logout endpoint
        const isLogoutRequest = originalRequest.url?.includes("/auth/logout");

        //Nếu bị lỗi 401 và chưa retry (và không phải logout request)
        if (error.response?.status === 401 && !originalRequest._retry && !isLogoutRequest) {
            if (isRefresh) {
                //néu đang refresh, thì chờ
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((error) => {
                        return Promise.reject(error);
                    })
            }

            originalRequest._retry = true;
            isRefresh = true;

            try {
                //Goi refresh token
                const newToken = await authService.refresh();

                if (!newToken || !newToken.accessToken) {
                    throw new Error("Không thể lấy token mới");
                }

                //Luu access token vao cookie
                cookieHelper.set("access_token", newToken.accessToken);

                //Cap nhat header
                originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;

                processQueue(null, newToken.accessToken);
                isRefresh = false;

                return api(originalRequest);
            } catch (error) {
                isRefresh = false;
                processQueue(error as AxiosError, null);

                const logoutEvent = new CustomEvent("logout", {
                    detail: {
                        message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!"
                    }
                });
                window.dispatchEvent(logoutEvent);

                return Promise.reject(error);
            }
        }

        // Dispatch api-error event cho các lỗi khác
        // GlobalHandler sẽ xử lý hiển thị thông báo phù hợp
        const status = error.response?.status || (error.code === "ECONNABORTED" ? 0 : undefined);
        if (status !== undefined && typeof window !== "undefined") {
            const errorMessage = (error.response?.data as any)?.message || error.message;
            const apiErrorEvent = new CustomEvent("api-error", {
                detail: {
                    status,
                    message: errorMessage,
                }
            });
            window.dispatchEvent(apiErrorEvent);
        }

        return Promise.reject(error);
    }
)

export default api;
