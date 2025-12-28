import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { satoshi } from "@/components/fonts";
import Footer from "@/components/Footer";
import { ReactQueryClientProvider } from "@/provider/QueryProvider";
import { Suspense } from "react";

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
      <body className={`${satoshi.className} antialiased`} style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000", }} >
        <Suspense>
          <ReactQueryClientProvider>
            <Header />
            {/* <main className="h-[calc(100vh-116px)] overflow-y-auto"> */}
            <main className="">
              {children}
            </main>
            <Footer />
          </ReactQueryClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
