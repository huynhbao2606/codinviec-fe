"use client";
import { UiButton } from "@/components/ui/base/UiButton";
import ContainerPage from "@/components/ui/container/page";
import { PATHS } from "@/constants/paths";
import { ILogin } from "@/types/auth/Login";
import { Form, FormProps, Input, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { login } from "@/store/slice/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store";
import { AxiosError } from "axios";
import { alert, toast } from "@/utils/notification";

type FieldType = {
  email?: string;
  password?: string;
};

const SigninPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state: RootState) => state.auth);
  const [submitting, setSubmitting] = useState(false);

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
      const errorMessages: Record<string, string> = {
        access_denied: "Bạn đã từ chối quyền truy cập. Vui lòng thử lại.",
        invalid_request: "Yêu cầu không hợp lệ. Vui lòng thử lại.",
        unauthorized_client: "Ứng dụng không được phép truy cập. Vui lòng liên hệ quản trị viên.",
        disabled_client: "Ứng dụng OAuth đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên để kích hoạt lại.",
        unsupported_response_type: "Loại phản hồi không được hỗ trợ. Vui lòng thử lại.",
        invalid_scope: "Phạm vi truy cập không hợp lệ. Vui lòng thử lại.",
        server_error: "Lỗi máy chủ. Vui lòng thử lại sau.",
        temporarily_unavailable: "Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.",
        no_email: "Không tìm thấy email từ tài khoản Google. Vui lòng thử lại.",
        no_token: "Không thể tạo token. Vui lòng thử lại.",
        logged_in: "Tài khoản này đã được đăng nhập ở nơi khác!",
        email_err: "Lỗi xử lý email. Vui lòng thử lại.",
        token_err: "Lỗi xử lý token. Vui lòng thử lại.",
      };
      const errorMessage = errorMessages[error] || "Đăng nhập thất bại. Vui lòng thử lại.";

      alert.error("Đăng nhập thất bại", errorMessage);

      // Xóa error parameter từ URL
      router.replace(PATHS.SIGNIN);
    }
  }, [searchParams, router]);

  const handleGoogleLogin = () => {
    // Redirect đến backend OAuth2 endpoint
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      alert.error("Lỗi cấu hình", "Không tìm thấy cấu hình API. Vui lòng liên hệ quản trị viên.");
      return;
    }
    window.location.href = `${apiBaseUrl}/auth/login-google`;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const loginData: ILogin = {
      email: values.email!,
      password: values.password!,
    };

    setSubmitting(true);
    try {
      // Dispatch login action - Service được gọi trong slice
      // checkAuth được gọi tự động trong login 
      await dispatch(login(loginData)).unwrap();

      toast.success("Đăng nhập thành công!", "Chào mừng bạn đến với CodinViec");
      router.push(PATHS.HOME);
    } catch (error: unknown) {
      // Error từ slice là AxiosError
      let errorMessage = "Đăng nhập thất bại. Vui lòng thử lại.";
      if (error instanceof AxiosError) {
        errorMessage = (error.response?.data as any)?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      toast.error("Đăng nhập thất bại", errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => { };

  // Hiển thị loading khi đang check auth
  if (loading) {
    return (
      <ContainerPage className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
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
              Chào mừng đến với CodinViec
            </h1>
            <UiButton
              variantCustom="outlineGoogle"
              className="!mb-[20px] !w-full"
              onClick={handleGoogleLogin}
              disabled={submitting}
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
                <Input size="large" placeholder="codinviec@gmail.com" />
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
                <UiButton className="w-full" htmlType="submit" loading={submitting} disabled={submitting}>
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
