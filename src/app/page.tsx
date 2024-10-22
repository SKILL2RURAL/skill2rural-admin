"use client";
import { setUser } from "@/redux/adminSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user } = useAppSelector((state) => state.admin);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!user && storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    } else if (!storedUser) {
      router.push(`/login`);
    }
  }, [user]);

  return router.push("/login");
}
