import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";

export const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cedra Explorer",
  description: "Block Explorer built on Cedra Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.className} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
