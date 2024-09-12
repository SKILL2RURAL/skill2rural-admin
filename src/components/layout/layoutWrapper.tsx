"use client"; // Enable client-side functionality

import { usePathname } from "next/navigation";
import Layout from "@/components/layout/layout";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname.includes("login");

  return <>{isLoginPage ? children : <Layout>{children}</Layout>}</>;
}
