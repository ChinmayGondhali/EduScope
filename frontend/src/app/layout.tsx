import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CompareProvider } from "@/context/CompareContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduScope | College Discovery Platform",
  description: "Find your perfect college with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <CompareProvider>
            {children}
          </CompareProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
