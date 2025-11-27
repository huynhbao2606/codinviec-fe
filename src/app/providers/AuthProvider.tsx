"use client";

import { useEffect, ReactNode, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/hooks";
import { checkAuth, setLoading } from "@/store/slice/auth/authSlice";
import { alert, toast } from "@/utils/notification";
import { PATHS } from "@/constants/paths";
import { cookieHelper } from "@/utils/cookieHelper";
import { getGoogleErrorMessages } from "@/utils/errorGoogle";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const hasProcessedToken = useRef(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      const errorMessage = getGoogleErrorMessages(error);

      alert.error("Đăng nhập thất bại", errorMessage);

      router.replace(PATHS.SIGNIN);
      return;
    }

    const token = searchParams.get("token");

    if (token && !hasProcessedToken.current) {
      hasProcessedToken.current = true;

      try {
        // Decode token từ URL (đã được encode ở backend)
        const decodedToken = decodeURIComponent(token);

        // Validate token format (basic check)
        if (!decodedToken || decodedToken.trim().length === 0) {
          throw new Error("Token không hợp lệ");
        }

        // Lưu access token vào cookie
        cookieHelper.set("access_token", decodedToken);

        // Hiển thị thông báo thành công
        toast.success(
          "Đăng nhập thành công!",
          "Chào mừng bạn đến với CodinViec"
        );

        // Xóa token từ URL
        const newUrl = window.location.pathname;
        router.replace(newUrl);
      } catch (error: unknown) {
        const errorMessage =
          typeof error === "string"
            ? error
            : error instanceof Error
            ? error.message
            : "Token không hợp lệ. Vui lòng thử lại.";

        alert.error("Đăng nhập thất bại", errorMessage);

        // Xóa token từ URL
        const newUrl = window.location.pathname;
        router.replace(newUrl);
      }
    }
  }, [searchParams, router]);

  useEffect(() => {
    const syncAuth = async () => {
      try {
        const token = cookieHelper.get("access_token");

        if (token) {
          await dispatch(checkAuth()).unwrap();
        } else {
          dispatch(setLoading(false));
        }
      } catch (error: unknown) {
        dispatch(setLoading(false));
      }
    };

    syncAuth();
  }, [dispatch]);

  return <>{children}</>;
}
