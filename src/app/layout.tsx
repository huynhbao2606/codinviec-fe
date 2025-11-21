import ReduxProvider from "@/app/providers/ReduxProvider";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import React from "react";
import "./globals.css";
import { ConfigProvider, DatePicker } from "antd";
import GlobalHandler from "@/components/ui/Handler/GlobalHandler";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <GlobalHandler />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </ConfigProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
