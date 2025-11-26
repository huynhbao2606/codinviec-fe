import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} CodinViec. All rights reserved.
        </p>
        <div className="flex space-x-4 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-blue-600">Chính sách</Link>
          <Link href="/terms" className="hover:text-blue-600">Điều khoản</Link>
        </div>
      </div>
    </footer>
  );
}
