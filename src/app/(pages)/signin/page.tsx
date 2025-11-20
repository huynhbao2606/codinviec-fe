"use client";
import { UiButton } from "@/components/ui/base/UiButton";
import ContainerPage from "@/components/ui/container/page";
import { PATHS } from "@/constants/paths";
import { LoginRequest } from "@/types/auth/LoginRequest";
import { Form, FormProps, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { login } from "@/store/slice/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store";
import { getGoogleErrorMessage } from "@/utils/errorHandler";
import { useAuthSync } from "@/hooks/auth/useAuthSync";
import {Loading} from "@/components/ui/Loading/Loading";

type FieldType = {
  email?: string;
  password?: string;
};

const SigninPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state: RootState) => state.auth);

  // Sync auth state
  useAuthSync();

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(PATHS.HOME);
    }
  }, [isAuthenticated, loading, router]);

  // Xử lý error từ OAuth2 redirect
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      // Map error code thành error message
      const errorMessage = getGoogleErrorMessage(error);

      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại",
        text: errorMessage,
        confirmButtonColor: "#6b46c1",
      });

      // Xóa error parameter từ URL
      router.replace(PATHS.SIGNIN);
    }
  }, [searchParams, router]);

  const handleGoogleLogin = () => {
    // Redirect đến backend OAuth2 endpoint
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      Swal.fire({
        icon: "error",
        title: "Lỗi cấu hình",
        text: "Không tìm thấy cấu hình API. Vui lòng liên hệ quản trị viên.",
        confirmButtonColor: "#6b46c1",
      });
      return;
    }
    window.location.href = `${apiBaseUrl}/auth/login-google`;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const loginRequest: LoginRequest = {
      email: values.email!,
      password: values.password!,
    };

    try {
      // Dispatch login action - Service được gọi trong slice
      // checkAuth được gọi tự động trong login thunk
      await dispatch(login(loginRequest)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công!",
        text: "Chào mừng bạn đến với FindJob",
        confirmButtonColor: "#6b46c1",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        router.push(PATHS.HOME);
      });
    } catch (error: unknown) {
      // Error message từ slice (đã được xử lý và trả về string)
      const errorMessage = typeof error === "string" ? error : "Đăng nhập thất bại. Vui lòng thử lại.";
      await Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại",
        text: errorMessage,
        confirmButtonColor: "#6b46c1",
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  // Hiển thị loading khi đang check auth
  if (loading) {
    return (
      <ContainerPage className="flex justify-center items-center min-h-screen">
        <Loading size="lg" variant="primary" />
      </ContainerPage>
    );
  }

  // Không render form nếu đã đăng nhập (sẽ redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <ContainerPage className="flex justify-center items-center">
        <div className="flex gap-[20px] w-full">
          <div className="signin_left basis-1/2 flex-shrink-0 max-md:basis-full">
            <h1 className="mb-[20px] text-[28px] text-accent-300 font-semibold max-md:text-center">
              Chào mừng đến với FindJob
            </h1>
            <UiButton
              variantCustom="outlineGoogle"
              className="!mb-[20px] !w-full"
              onClick={handleGoogleLogin}
            >
              <Image
                src="/google-icon.svg"
                alt="google icon"
                width={20}
                height={20}
              />
              Sign In with Google
            </UiButton>
            {/* line */}
            <div className="line bg-text-default w-full relative h-[1px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-50 flex justify-center items-center px-[5px]">
                or
              </div>
            </div>
            <Form
              className="!mt-[15px]"
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Email của bạn"
                name="email"
                hasFeedback
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
                style={{ marginBottom: "10px" }}
              >
                <Input size="large" placeholder="findjob@gmail.com" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Mật khẩu "
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" }
                ]}
                style={{ marginBottom: "10px" }}
              >
                <Input.Password
                  className="w-full"
                  size="large"
                  placeholder="******"
                />
              </Form.Item>

              <Form.Item label={null} style={{ marginTop: "20px" }}>
                <UiButton className="w-full" htmlType="submit">
                  Đăng nhập với email
                </UiButton>

                <p className="mt-[10px] text-[14px] ">
                  bạn không có tài khoản?{" "}
                  <Link href={PATHS.SIGNUP} className="text-text-link">
                    {" "}
                    Đăng ký ngay!
                  </Link>
                </p>
              </Form.Item>
            </Form>
          </div>
          <div className="signin_right basis-1/2 flex justify-center items-center max-md:!hidden">
            <Image
              src="/login-image.svg"
              alt="login image"
              width={100}
              height={200}
              className="w-[70%] h-auto max-lg:w-full"
            />
          </div>
        </div>
      </ContainerPage>
    </>
  );
};
export default SigninPage;
