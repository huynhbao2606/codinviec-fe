import Sidebar from "@/components/admin/Sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-grow p-8 bg-gray-100">{children}</main>
    </div>
  );
}
