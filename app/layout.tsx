import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";

const iranSans = localFont({
  src: [
    {
      path: "../public/fonts/IRANSansX-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSansX-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSansX-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSansX-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "تور گیلان — بوم‌گردی و طبیعت‌گردی بهشت شمال",
  description:
    "کشف بکرترین مقاصد و تورهای استان گیلان: ییلاقات ماسال و دیلمان، جنگل‌های هیرکانی، ماسوله، تالاب انزلی و شکم‌گردی در شهر خلاق خوراک رشت.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${iranSans.className} ${iranSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 selection:bg-emerald-500 selection:text-white font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
