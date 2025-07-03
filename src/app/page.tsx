"use client";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { token } = useAppSelector((state) => state.admin);

  return router.push("/login");
}
