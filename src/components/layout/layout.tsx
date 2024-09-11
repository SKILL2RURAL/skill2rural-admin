import React, { ReactNode } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[100vw] md:w-[80vw] md:ml-[20vw]">
        <Navbar />
        <main className=" bg-[#F9F9F9] w-full min-h-[100vh] h-full pt-5 p-5 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
