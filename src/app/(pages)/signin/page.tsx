import { UiButton } from "@/components/ui/base/UiButton";
import ContainerPage from "@/components/ui/container/page";
import PATH from "@/constant/path";
import Image from "next/image";
import Link from "next/link";

const signinPage = () => {
  return (
    <ContainerPage className="flex justify-center items-center">
      <div className="flex gap-[20px] w-full">
        <div className="signin_left basis-1/2 flex-shrink-0 max-md:basis-full">
          <h1 className="mb-[20px] text-[28px] text-[var(--color-accent-300)] font-semibold max-md:text-center">
            Chào mừng đến với FindJob
          </h1>
          <UiButton
            variant="outlineGoogle"
            className="mb-[20px] w-full text-[16px]"
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
          <div className="line bg-[var(--text-default)] w-full relative h-[1px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-primary-50)] flex justify-center items-center px-[5px]">
              or
            </div>
          </div>
          <form className="mt-[20px]">
            <div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="findjob@gmail.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="•••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              <UiButton className="w-full">Đăng nhập với email</UiButton>
              <p className="mt-[10px] text-[14px]">
                bạn không có tài khoản?{" "}
                <Link href={PATH.SIGNUP} className="text-[var(--text-link)]">
                  {" "}
                  Đăng ký ngay!
                </Link>
              </p>
            </div>
          </form>
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
  );
};
export default signinPage;
