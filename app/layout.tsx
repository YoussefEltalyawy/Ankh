import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";


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
    <html lang="en" className="font-manrope" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="alexandriaArchive">
        <NextUIProvider>
          {children}
        </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
