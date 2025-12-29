import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { satoshi } from "@/components/fonts";
import Footer from "@/components/Footer";
import { ReactQueryClientProvider } from "@/provider/QueryProvider";
import { Suspense } from "react";
import { AppProvider } from "@/context/AppProvider";
import { Providers } from "@/provider/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Cedra Explorer | Real-Time Blockchain Explorer for Cedra Network",
    template: "%s | Cedra Explorer",
  },
  description:
    "Cedra Explorer is a fast and reliable blockchain explorer for the Cedra Network. Explore blocks, transactions, accounts, validators, smart contracts, and on-chain activity in real time.",

  keywords: [
    "Cedra Explorer",
    "Cedra Network",
    "Cedra Blockchain",
    "blockchain explorer",
    "crypto explorer",
    "Cedra transactions",
    "Cedra blocks",
    "smart contracts",
    "validators",
    "on-chain data",
    "Web3 explorer",
  ],

  applicationName: "Cedra Explorer",
  authors: [{ name: "Cedra Network" }],
  creator: "Cedra Network",
  publisher: "Cedra Network",

  openGraph: {
    title: "Cedra Explorer | Real-Time Blockchain Explorer",
    description:
      "Explore the Cedra Network in real time. View blocks, transactions, accounts, validators, and smart contracts.",
    url: "https://explorer.cedra.xyz",
    siteName: "Cedra Explorer",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Cedra Explorer | Blockchain Explorer",
    description:
      "Track blocks, transactions, accounts, and smart contracts on the Cedra Network in real time.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={`${satoshi.className} antialiased`} style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000", }} > */}
      <body className={`${satoshi.className} antialiased`} >
        <Suspense>
          <ReactQueryClientProvider>
            <Providers>
              <AppProvider>
                <Header />
                <main>
                  {children}
                </main>
                <Footer />
              </AppProvider>
            </Providers>
          </ReactQueryClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
