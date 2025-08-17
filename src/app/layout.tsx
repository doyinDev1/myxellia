import type { Metadata } from "next";
import { euclidCircularB } from "./styles";
import "./globals.css";

export const metadata: Metadata = {
  title: "Myxellia",
  description: "Myxellia Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${euclidCircularB.variable}`}>
        {children}
      </body>
    </html>
  );
}
