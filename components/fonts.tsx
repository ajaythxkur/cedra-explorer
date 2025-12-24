import localFont from "next/font/local";

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