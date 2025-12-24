import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { satoshi } from "@/components/fonts";
import Footer from "@/components/Footer";

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
      <body className={`${satoshi.className} antialiased`}>
        <Header />
        <main className="h-[calc(100vh-116px)] overflow-hidden">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
