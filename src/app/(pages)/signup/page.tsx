"use client";
import { UiButton } from "@/components/ui/base/UiButton";
import ContainerPage from "@/components/ui/container/page";
import { PATHS } from "@/constants/paths";
import { RegisterRequest } from "@/types/auth/RegisterRequest";
import { Checkbox, Form, FormProps, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { register } from "@/store/slice/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store";
import { useAuthSync } from "@/hooks/auth/useAuthSync";
import { useEffect } from "react";
import {Loading} from "@/components/ui/Loading/Loading";

type FieldType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  policy?: boolean;
};

const SignupPage = () => {
  const router = useRouter();
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
    const registerRequest: RegisterRequest = {
      email: values.email!,
      password: values.password!,
    };

    try {
      // Dispatch register action - Service được gọi trong slice
      await dispatch(register(registerRequest)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Đăng ký thành công!",
        text: "Vui lòng đăng nhập để tiếp tục",
        confirmButtonColor: "#6b46c1",
      }).then(() => {
        router.push(PATHS.SIGNIN);
      });
    } catch (error: unknown) {
      // Error message từ slice (đã được xử lý và trả về string)
      const errorMessage = typeof error === "string" ? error : "Đăng ký thất bại. Vui lòng thử lại.";
      await Swal.fire({
        icon: "error",
        title: "Đăng ký thất bại",
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
    <ContainerPage className="flex justify-center items-center">
      <div className="w-[50%] max-lg:w-[65%] max-md:w-full">
        <h1 className="mb-[20px] text-[28px] text-accent-300 font-semibold max-md:text-center">
          Đăng ký tài khoản
        </h1>
        <UiButton
          variantCustom="outlineGoogle"
          className="mb-[20px] w-full text-[16px]"
          onClick={handleGoogleLogin}
        >
          <Image
            src="/google-icon.svg"
            alt="google icon"
            width={20}
            height={20}
            className="me-2"
          />
          Sign In with Google
        </UiButton>
        {/* line */}
        <div className="line bg-gray-900 w-full relative h-[1px]">
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
          {/* Email */}
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

          {/* Password */}
          <Form.Item<FieldType>
            label="Mât khẩu"
            name="password"
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]).{12,}$/,
                message:
                  "Mật khẩu phải có ít nhất 12 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!",
              },
            ]}
            style={{ marginBottom: "10px" }}
          >
            <Input.Password
              className="w-full"
              size="large"
              placeholder="******"
            />
          </Form.Item>

          {/* Password Confirm*/}
          <Form.Item<FieldType>
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu xác nhận không khớp!");
                },
              }),
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]).{12,}$/,
                message:
                  "Mật khẩu phải có ít nhất 12 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!",
              },
            ]}
            style={{ marginBottom: "10px" }}
          >
            <Input.Password
              className="w-full"
              size="large"
              placeholder="******"
            />
          </Form.Item>
          <p className="mt-[10px] text-[12px] ">
            Ít nhất 12 ký tự <br />
            Ít nhất 1 ký tự (! @ # $ ...) <br />
            Ít nhất 1 số <br />
            Ít nhất 1 chữ cái in HOA <br />
            Ít nhất 1 chữ cái in thường
          </p>
          {/* policy */}
          <Form.Item<FieldType>
            name="policy"
            valuePropName="checked" // bắt buộc để lấy value boolean từ Checkbox
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                      "Bạn phải đồng ý điều khoản trước khi tiếp tục!"
                    ),
              },
            ]}
          >
            <Checkbox>Tôi đồng ý với điều khoản</Checkbox>
          </Form.Item>

          <Form.Item label={null} style={{ marginTop: "20px" }}>
            <UiButton className="w-full" htmlType="submit">
              Đăng ký với email
            </UiButton>

            <p className="mt-[10px] text-[14px]">
              Bạn đã có tài khoản?{" "}
              <Link href={PATHS.SIGNIN} className="text-blue-600 hover:text-blue-700">
                Đăng nhập ngay!
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </ContainerPage>
  );
};
export default SignupPage;
