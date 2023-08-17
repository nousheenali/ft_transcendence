import "../globals.css";
import type { Metadata } from "next";
import React from "react";
import { Header } from "@/components/Header/Header";
import Background from "@/components/Background/Background";


export const metadata: Metadata = {
  title: "Spin Masters",
  description: "Transcendence project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-y-scroll flex justify-center">
				<Background />
        <Header />
        {children}
      </body>
    </html>
  );
}
