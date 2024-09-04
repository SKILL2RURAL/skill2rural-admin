import React from "react";
import Link from "next/link";
import Layout from "@/components/layout/layout";

const Custom404 = () => {
  return (
    <Layout>
      <div className="h-[100vh] flex flex-col justify-center items-center text-[20px]">
        <h1 className="text-red-500">404</h1>
        <p>Page not found</p>
      </div>
    </Layout>
  );
};

export default Custom404;
