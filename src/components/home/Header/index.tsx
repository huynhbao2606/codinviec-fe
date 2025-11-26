"use client";

import Link from "next/link";
import Image from "next/image";
import { PATHS } from "@/constants/paths";
import ListCategory from "@/components/home/Category/ListCategory";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store";
import { useLogout } from "@/hooks/auth/useLogout";
import { IUser } from "@/types/auth/User";

const getUserDisplayName = (user: IUser | null): string => {
  if (!user) return "User";
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user.firstName) return user.firstName;
  if (user.email) return user.email.split("@")[0];
  return "User";
};

export default function Header() {
  const { isAuthenticated, user, loading } = useAppSelector((state: RootState) => state.auth);
  const { handleLogout } = useLogout();

  const displayName = getUserDisplayName(user);

  return (
    <header className="bg-brand-gradient border-b border-primary-700 sticky top-0 z-50">
      <nav className="max-w px-12 mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-6">
          <Link
            href={PATHS.HOME}
            className="text-accent font-extrabold text-2xl hover:text-accent-200 transition"
          >
            CodinViec
          </Link>

          <ul className="hidden md:flex items-center space-x-6 text-base font-semibold text-accent-100">
            <ListCategory />
          </ul>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-accent-100 font-medium">
          {!loading && isAuthenticated && user ? (
            // User đã đăng nhập - Hiển thị avatar và dropdown với hover
            <div className="relative group">
              <button className="flex items-center space-x-3 hover:opacity-90 transition cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-accent-200 flex items-center justify-center overflow-hidden border-2 border-accent-300">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={displayName}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-accent-700 font-bold text-lg">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-accent-100 font-medium">{displayName}</span>
                <svg
                  className="w-4 h-4 text-accent-100 transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu - Hiển thị khi hover */}
              <div className="absolute right-0 mt-2 w-48 bg-primary-900 rounded-lg shadow-lg border border-primary-700 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 border-b border-primary-700">
                  <p className="text-sm font-semibold text-accent-100">{displayName}</p>
                  <p className="text-xs text-accent-300 truncate">{user.email}</p>
                </div>
                <Link
                  href={PATHS.PROFILE}
                  className="block px-4 py-2 text-sm text-accent-100 hover:bg-primary-800 transition"
                >
                  Hồ sơ của tôi
                </Link>
                <div className="border-t border-primary-700 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-primary-800 transition"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            // User chưa đăng nhập - Hiển thị nút đăng nhập/đăng ký
            <>
              <Link href={PATHS.SIGNIN} className="hover:text-accent transition">
                Đăng nhập
              </Link>
              <Link
                href={PATHS.SIGNUP}
                className="bg-accent text-primary-900 px-4 py-2 rounded-lg font-bold hover:opacity-90 transition"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
