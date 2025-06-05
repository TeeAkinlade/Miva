import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Student Information Management System",
  description: "A system to manage student information",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
