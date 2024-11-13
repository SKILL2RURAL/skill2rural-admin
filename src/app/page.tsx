"use client";
import { setUser } from "@/redux/adminSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const storedToken = localStorage.getItem("token");

  const { token } = useAppSelector((state) => state.admin);
  if (storedToken) {
    return router.push("/analytics");
  } else {
    return router.push("/login");
  }
}
