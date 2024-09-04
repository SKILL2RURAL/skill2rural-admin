import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-sf-pro font-[400]">{children}</body>
    </html>
  );
}
