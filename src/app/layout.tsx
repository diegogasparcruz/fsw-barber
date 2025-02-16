import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/core/header";
import { Footer } from "@/components/core/footer";
import AuthProvider from "@/providers/auth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FWS Barber",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          <div className="flex-1">
            {children}
          </div>
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
