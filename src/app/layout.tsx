import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/layout/layoutWrapper";
import { store } from "../redux/store";

export const metadata: Metadata = {
  title: "Skill 2 rural",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sf-pro font-[400]">
        <LayoutWrapper>
        {children}
      </LayoutWrapper>
      </body>
    </html>
  );
}
