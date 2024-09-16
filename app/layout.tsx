import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "auto",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Ankh",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={`${manrope.className}`}>
        <body>{children}</body>
      </html>
  );
}
