import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import AuthGuard from "@/components/layout/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview-Test",
  description: "NJ's Interview-Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen overflow-hidden bg-image`}
      >
        <Header />
        <div className="flex h-[calc(100%-50px)]">
          <Sidebar />
          <AuthGuard>
            <main className="w-[calc(100%-150px)] h-full">{children}</main>
          </AuthGuard>
          <Toaster position={"top-center"} richColors />
        </div>
      </body>
    </html>
  );
}
