import type { JSX, ReactNode } from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat Bookmarks",
  description: "A ChatGPT-style interface with bookmark functionality",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element => {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="h-full bg-[#212121] font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
