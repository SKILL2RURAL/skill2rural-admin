"use client";

import React, { useState } from "react";
import african_college_student from "../../../public/images/african-college-student.svg";
import logo from "../../../public/images/skill2rural1.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  return (
    <div
      style={{
        backgroundImage: `url(${african_college_student.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <Image src={logo} alt="Skill 2 Rural" width={230} />
      <div className="h-[30px]" />
      <div className="border border-white rounded-[20px] p-10 px-[50px] w-[40vw] flex flex-col justify-between glass-effect">
        <h1 className="text-center text-[32px] font-[600]">Login</h1>
        <form className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-[600]">Email Address</label>
            <input
              type="email"
              className="bg-transparent placeholder:text-white placeholder:text-[14px] text-white text-[14px] font-[500] w-full border border-white rounded-[100px] px-4 py-2 h-[60px] outline-none"
              placeholder="Enter email address"
              color="white"
              value={data.email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-[600]">Password</label>
            <div className="border border-white rounded-[100px] flex">
              <input
                type="password"
                className="bg-transparent placeholder:text-white placeholder:text-[14px] text-white text-[14px] font-[500] w-full px-4 py-2 h-[60px] outline-none"
                placeholder="Enter password"
                color="white"
                value={data.password}
              />
            </div>
          </div>
        </form>
        <div className="my-5 flex justify-between items-center">
          <p className="font-[600] text-[16px] text-[#FFFFFFB2] flex gap-1 items-center">
            <input
              type="checkbox"
              className="outline-none cursor-pointer custom-checkbox"
            />
            <span>Remember Me</span>
          </p>
          <p className="font-[500] text-[16px]">Forget Password?</p>
        </div>
        <button
          className="bg-primary w-full rounded-[100px] py-5"
          onClick={() => router.push("/analytics")}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
