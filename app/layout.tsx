import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { FitLogProvider } from "@/lib/context";
import { ToastProvider } from "@/components/ToastProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FitLog — Train With Intent. Log Every Set.",
  description:
    "A dark, premium workout library & tracking companion for strength training, bodyweight routines, and daily performance logging.",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-fit-bg text-fit-text antialiased selection:bg-fit-lime selection:text-black">
        <FitLogProvider>
          <ToastProvider />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}
