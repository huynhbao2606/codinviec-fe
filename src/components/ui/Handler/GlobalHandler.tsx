"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, alert } from "@/utils/notification";

export default function GlobalHandler() {
    const router = useRouter();

    useEffect(() => {
        const handleError = (e: any) => {
            const { status, message } = e.detail;

            switch (status) {
                case 0:
                    // Lỗi mạng - Error nghiêm trọng → Alert
                    alert.error("Lỗi mạng", message);
                    break;
                case 400:
                case 409:
                case 422:
                    // Validation errors - Warning nhẹ → Toast
                    toast.warning("Cảnh báo", message);
                    break;
                case 401:
                    // Phiên hết hạn - Đã có logout handler riêng, không cần xử lý ở đây
                    // Hoặc có thể dùng toast để thông báo nhẹ
                    toast.error("Phiên hết hạn", "Vui lòng đăng nhập lại");
                    break;
                case 403:
                    // Không có quyền - Error nghiêm trọng → Alert
                    alert.error("Không có quyền", message);
                    break;
                case 404:
                    // Không tìm thấy - Info → Toast
                    toast.info("Không tìm thấy", message);
                    break;
                case 429:
                    // Quá nhiều request - Error nhẹ → Toast
                    toast.error("Quá nhiều request", message);
                    break;
                case 500:
                    // Lỗi server - Error nghiêm trọng → Alert
                    alert.error("Lỗi server", message);
                    break;
                default:
                    // Lỗi khác - Có thể dùng Toast hoặc Alert tùy mức độ
                    toast.error("Lỗi", message);
            }
        };

        const logout = async (e: Event) => {
            const customEvent = e as CustomEvent<{ message?: string }>;
            const message = customEvent.detail?.message || "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại!";
            // Logout với redirect - Cần xác nhận → Alert
            await alert.warning("Phiên hết hạn", message);
            router.push("/signin");
        };

        window.addEventListener("api-error", handleError);
        window.addEventListener("logout", logout);

        return () => {
            window.removeEventListener("api-error", handleError);
            window.removeEventListener("logout", logout);
        };
    }, []);

    return null;
}
