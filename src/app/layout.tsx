import type { Metadata } from "next";
import "./globals.css";
import { euclidCircularB } from "@/styles";
import { Navbar } from "@/components";

export const metadata: Metadata = {
  title: "Myxellia",
  description: "My Myxellia Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${euclidCircularB.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
};