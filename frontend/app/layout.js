"use client";
import "./globals.css";
import Header from "./components/Header";
import AppProvider from "@/GlobalContext/AppProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
