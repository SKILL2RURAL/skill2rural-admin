import React, { ReactNode, useEffect, useCallback } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToken, setUser } from "@/redux/adminSlice";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { baseUrl } from "@/utils/constants";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { user, token } = useAppSelector((state) => state.admin);

  // Function to fetch user data
  const fetchUser = useCallback(async (): Promise<void> => {
    try {
      const res = await axios.get(`${baseUrl}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUser(res.data.data));
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }, [dispatch, router, token]);

  // Function to handle token retrieval
  const retrieveToken = useCallback((): void => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!token && storedToken) {
      retrieveToken();
    } else if (token && !user) {
      fetchUser();
    } else if (!token && !user && !storedToken) {
      router.push("/login");
    }
  }, [token, user, retrieveToken, fetchUser, router]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full md:w-[80vw] md:ml-[20vw]">
        <Navbar />
        <main className="bg-[#F9F9F9] w-full min-h-screen pt-5 p-5 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
