"use client";

import {
  blue_users,
  calendar,
  green_users,
  message,
  multiple_users,
  orange_users,
} from "@/assets/icons";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import UsersTable from "./usersTable";

interface metric {
  icon: string;
  label: string;
  amount: string;
  reachOut?: string;
}

const User = () => {
  const [activeTab, setActiveTab] = useState("allUsers");
  const metrics: metric[] = [
    { icon: blue_users, label: "Total users", amount: "10.2k" },
    {
      icon: green_users,
      label: "Total users",
      amount: "10.2k",
      reachOut: "1.5k",
    },
    { icon: orange_users, label: "Total users", amount: "10.2k" },
  ];

  return (
    <div className="font-neue-haas">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image src={multiple_users} alt="" width={40} />
          <h1 className="text-[24px] font-[600]">User</h1>
        </div>
        <div className="text-[12px] md:text-[16px] font-[300] flex gap-2 items-center">
          <Image src={calendar} alt="date" width={40} />
          <p>Saturday, August 10, 2024</p>
        </div>
      </div>
      <div className="h-[30px]" />
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {metrics.map((metric: any, index: number) => (
            <div
              key={index}
              className="border rounded-[8px] p-3 border-[#EAECF0] shadow-sm"
            >
              <div className="flex flex-col gap-3">
                <Image src={metric.icon} alt={metric.label} width={50} />
                <div>
                  <p className="text-[#A3AED0] font-[500] text-[13px]">
                    {metric.label}
                  </p>
                  <p className="text-[33px] font-[600]">{metric.amount}</p>
                </div>
              </div>
              <div></div>
            </div>
          ))}
        </div>
        <div className="h-[30px]" />
        <div className="py-3 md:py-0 text-[12px] md:text-[14px] font-[400] text-[#878787] flex justify-around md:justify-start md:gap-10 bg-white md:p-4 md:px-5 rounded-[8px] font-karla">
          <p
            className={`${
              activeTab === "allUsers"
                ? "border-b border-[var(--primary-color)] text-[var(--primary-color)]"
                : ""
            } cursor-pointer pb-2 md:px-10`}
            onClick={() => setActiveTab("allUsers")}
          >
            All Users
          </p>
          <p
            className={`${
              activeTab === "activeUsers"
                ? "border-b border-[var(--primary-color)] text-[var(--primary-color)]"
                : ""
            } cursor-pointer pb-2 md:px-10`}
            onClick={() => setActiveTab("activeUsers")}
          >
            Active Users
          </p>
          <p
            className={`${
              activeTab === "deactivatedUsers"
                ? "border-b border-[var(--primary-color)] text-[var(--primary-color)]"
                : ""
            } cursor-pointer pb-2 md:px-10`}
            onClick={() => setActiveTab("deactivatedUsers")}
          >
            Deactivated Users
          </p>
        </div>
        <div className="h-[30px]" />
        <div className="md:flex space-y-5 md:space-y-0 justify-between items-center">
          <div className="flex gap-3">
            <div className="border border-[#D0D5DD] shadow-sm bg-white flex gap-2 items-center p-2 rounded-[8px] h-full">
              <CiSearch color="#667085" size={20} />
              <input
                type="text"
                placeholder="Search"
                className="w-[50vw] md:w-[300px] bg-transparent placeholder:text-[#667085] outline-none"
              />
            </div>
            <div className="relative">
              <select className="cursor-pointer bg-[#BDD4F114] border border-[#BDD4F199] h-full text-[13px] p-2 w-[70px] outline-none appearance-none">
                <option value="">Filter</option>
              </select>
              <IoIosArrowDown className="absolute right-3 top-[14px]" />
            </div>
          </div>
          <div className="flex gap-3 text-[14px] space-x-3">
            <button className="flex gap-2 items-center bg-[var(--primary-color)] px-4 py-3 rounded-[4px] text-white">
              Message All Users
              <Image src={message} alt="" width={24} />
            </button>
            <button className="flex gap-2 items-center bg-[var(--primary-color)] px-4 py-3 rounded-[4px] text-white">
              Export CSV
              <AiOutlineDownload size={20} />
            </button>
          </div>
        </div>
      </div>
      <div>
        <UsersTable />
      </div>
    </div>
  );
};

export default User;
