import ReduxProvider from "@/app/providers/ReduxProvider";
import Footer from "@/components/home/layout/Footer";
import Header from "@/components/home/layout/Header";
import React from "react";
import "./globals.css";
import { ConfigProvider, DatePicker } from "antd";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen">
        <ReduxProvider>
          <ConfigProvider
            theme={{
              token: {
                fontFamily:
                  'Lexend, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              },
            }}
          >
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <DatePicker />
          </ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
