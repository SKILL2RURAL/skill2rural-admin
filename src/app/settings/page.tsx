"use client";

import { calendar, gear } from "@/assets/icons";
import Image from "next/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import components with ssr disabled
const Profile = dynamic(() => import("../../components/settings/profile"), {
  ssr: false,
});
const Password = dynamic(() => import("../../components/settings/password"), {
  ssr: false,
});
const Team = dynamic(() => import("../../components/settings/team"), {
  ssr: false,
});

// Move date formatting to client-side
const getCurrentDateFormatted = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const getTab = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "password":
        return <Password />;
      case "team":
        return <Team />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center font-neue-haas">
        <div className="flex gap-2 items-center">
          <Image src={gear} alt="date" width={40} />
          <p className="font-[600] text-[18px] md:text-[24px]">Settings</p>
        </div>
        <div className="text-[12px] md:text-[16px] font-[300] flex gap-2 items-center">
          <Image src={calendar} alt="date" width={40} />
          <p>{getCurrentDateFormatted()}</p>
        </div>
      </div>
      <div className="h-[30px]" />
      <div className="flex gap-4 font-neue-haas text-[#909090] text-[14px] font-[400] border-b">
        <p
          className={`pb-3 px-2 ${
            activeTab === "profile"
              ? "text-[var(--primary-color)] border-[var(--primary-color)] border-b-[2px]"
              : ""
          }  cursor-pointer`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </p>
        <p
          className={`pb-3 px-2 ${
            activeTab === "password"
              ? "text-[var(--primary-color)] border-[var(--primary-color)] border-b-[2px]"
              : ""
          }  cursor-pointer`}
          onClick={() => setActiveTab("password")}
        >
          Password
        </p>
        <p
          className={`pb-3 px-2 ${
            activeTab === "team"
              ? "text-[var(--primary-color)] border-[var(--primary-color)] border-b-[2px]"
              : ""
          }  cursor-pointer`}
          onClick={() => setActiveTab("team")}
        >
          Team
        </p>
      </div>
      <div className="h-[40px]" />
      <div>{getTab()}</div>
    </>
  );
};

export default Settings;
