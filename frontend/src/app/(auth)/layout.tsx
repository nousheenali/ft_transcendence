import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Background from "@/components/Background/Background";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spin Masters",
  description: "Transcendence project",
};

/*
 * TODO: # On width of 780px:
 *           1- Fix the Background component
 * */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
