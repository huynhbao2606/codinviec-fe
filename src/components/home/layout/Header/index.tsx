import PATH from "@/constant/path";
import ListCategory from "@/features/home/category/ListCategory";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-brand-gradient border-b border-primary-700 sticky top-0 z-50">
      <nav className="max-w px-12 mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-6">
          <Link
            href={PATH.HOME}
            className="text-accent font-extrabold text-2xl hover:text-accent-200 transition"
          >
            FindJob
          </Link>

          <ul className="hidden md:flex items-center space-x-6 text-base font-semibold text-accent-100">
            <ListCategory />
          </ul>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-accent-100 font-medium">
          <Link href={PATH.SIGNIN} className="hover:text-accent">
            Đăng nhập
          </Link>
          <Link
            href="/"
            className="bg-accent text-primary-900 px-4 py-2 rounded-lg font-bold hover:opacity-90"
          >
            Đăng ký
          </Link>
        </div>
      </nav>
    </header>
  );
}
