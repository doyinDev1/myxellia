import type { Metadata } from "next";
import { euclidCircularB } from "@/styles";
import { Navbar } from "@/components";
import { Container } from "@mui/material";
import "./globals.css";

export const metadata: Metadata = {
  title: "Myxellia",
  description: "Myxellia Admin Dashboard",
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
        <Container maxWidth="xl">
          {children}
        </Container>
      </body>
    </html>
  );
};