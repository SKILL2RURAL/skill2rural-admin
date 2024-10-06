"use client"; // Enable client-side functionality

import { usePathname } from "next/navigation";
import Layout from "@/components/layout/layout";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname.includes("login");

  return (
    <>
      <Provider store={store}>
        {isLoginPage ? (
          children
        ) : (
          <>
            <Layout>{children}</Layout>
          </>
        )}
      </Provider>
    </>
  );
}
