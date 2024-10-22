"use client";
import React from "react";
import logo from "../../../public/images/logo.svg";
import Image from "next/image";
import {
  active_analytics,
  active_courses,
  active_settings,
  active_user,
  analytics,
  courses,
  settings,
  user_icon,
} from "@/assets/icons";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToken, setUser } from "@/redux/adminSlice";

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, token } = useAppSelector((state) => state.admin);

  const links = [
    { name: "analytics", activeIcon: active_analytics, icon: analytics },
    { name: "users", activeIcon: active_user, icon: user_icon },
    { name: "courses", activeIcon: active_courses, icon: courses },
    { name: "settings", activeIcon: active_settings, icon: settings },
  ];

  const handleLogout = async () => {
    localStorage.clear();
    dispatch(setUser(null));
    dispatch(setToken(null));
    await router.push("/login");
  };

  return (
    <div className="hidden md:flex py-10 w-[20vw] px-5 flex flex-col justify-between h-[100vh] fixed bg-white">
      <div>
        <Image src={logo} alt="skill 2 rural" width={180} />
        <div className="h-[70px]" />
        <div className="space-y-[4px] text-[#253B4B] text-[16px]">
          {links.map((link, index) => (
            <div
              key={index}
              className={`${
                pathname.includes(link.name)
                  ? "bg-primary text-white rounded-[6px]"
                  : ""
              } p-6 py-4 pl-3 flex gap-4 items-center cursor-pointer`}
              onClick={() => router.push(`/${link.name}`)}
            >
              <Image
                src={pathname.includes(link.name) ? link.activeIcon : link.icon}
                alt={link.name}
                width={30}
              />
              <p className="capitalize">{link.name}</p>
            </div>
          ))}
        </div>
      </div>

      {user && (
        <div className="text-[14px] flex gap-2 flex-wrap items-center max-w-[20vw]">
          <div className="flex flex-wrap gap-3 items-center">
            <Avatar src={user.profile_photo} />
            <div>
              <p className="font-[600]">{user.name}</p>
              <p className="text-[#171717] truncate w-[80%]">{user.email}</p>
            </div>
          </div>

          <FiLogOut
            size={25}
            color="#98A2B3"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
            aria-label="Logout"
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
