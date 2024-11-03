import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Ankh",
  description:
    "Ankh: Boost your productivity with our all-in-one app. Seamlessly manage tasks, take notes, and track time in a sleek, intuitive interface. Streamline your workflow today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-manrope">
      <body>
        <ThemeProvider defaultTheme="alexandriaArchive">
          <NextUIProvider>{children}</NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
