"use client";

import { UiButton } from "@/components/ui/base/UiButton";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { checkAuth } from "@/store/slice/auth/authSlice";
import Swal from "sweetalert2";
import { PATHS } from "@/constants/paths";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [hasProcessedToken, setHasProcessedToken] = useState(false);

  // Xử lý OAuth2 token từ query params (chỉ xử lý một lần)
  useEffect(() => {
    const token = searchParams.get("token");
    
    if (token && !hasProcessedToken) {
      setHasProcessedToken(true);
      
      const processToken = async () => {
        try {
          // Decode token từ URL (đã được encode ở backend)
          const decodedToken = decodeURIComponent(token);
          
          // Validate token format (basic check)
          if (!decodedToken || decodedToken.trim().length === 0) {
            throw new Error("Token không hợp lệ");
          }

          // Lưu access token vào localStorage
          localStorage.setItem("access_token", decodedToken);

          // Trigger storage event để sync auth state across components
          window.dispatchEvent(new Event("storage"));

          // Check auth để lấy user info và update Redux state
          await dispatch(checkAuth()).unwrap();
          
          // Token hợp lệ, đăng nhập thành công
          await Swal.fire({
            icon: "success",
            title: "Đăng nhập thành công!",
            text: "Chào mừng bạn đến với FindJob",
            confirmButtonColor: "#6b46c1",
            timer: 2000,
            showConfirmButton: false,
          });

          // Xóa token từ URL (redirect về root)
          router.replace("/");
        } catch (error: unknown) {
          // Token không hợp lệ hoặc có lỗi khi verify
          console.error("Error verifying token:", error);
          localStorage.removeItem("access_token");
          
          const errorMessage = typeof error === "string" 
            ? error 
            : error instanceof Error 
            ? error.message 
            : "Token không hợp lệ. Vui lòng thử lại.";
          
          await Swal.fire({
            icon: "error",
            title: "Đăng nhập thất bại",
            text: errorMessage,
            confirmButtonColor: "#6b46c1",
          });
          
          // Xóa token từ URL và redirect về signin
          router.replace(PATHS.SIGNIN);
        }
      };

      processToken();
    }
  }, [searchParams, router, dispatch, hasProcessedToken]);

  return (
    <section className="text-center py-20">
      <h1 className="text-4xl font-bold text-blue-600">Trang Chủ</h1>
      <div className="space-y-4 p-8 bg-background min-h-screen">
        <div className="min-h-screen p-8 space-y-6">
          <h1 className="text-2xl font-bold text-primary">FindJob UI Demo</h1>

          <UiButton variantCustom={"primary"}>Button</UiButton>
          <UiButton variantCustom={"accent"}>Button</UiButton>
        </div>
      </div>
    </section>
  );
}
