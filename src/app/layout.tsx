import "./globals.css";
import FlowbiteInit from "@/app/providers/FlowbiteInit";
import ReduxProvider from "@/app/providers/ReduxProvider";
import React from "react";
import Header from "@/components/home/layout/Header";
import Footer from "@/components/home/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen">
        <ReduxProvider>
          <Header />
          <main className="flex-grow flex">{children}</main>
          <Footer />
          <FlowbiteInit />
        </ReduxProvider>
      </body>
    </html>
  );
}
