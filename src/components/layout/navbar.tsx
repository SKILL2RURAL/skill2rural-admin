import { bell } from "@/assets/icons";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import { CiSearch } from "react-icons/ci";
import MobileDrawer from "../mobileDrawer";
import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.admin);

  return (
    <div
      className="md:max-w-[85vw] bg-white md:w-full flex justify-between items-center px-2 md:px-10 py-6 sticky top-0"
      style={{ zIndex: 50 }}
    >
      <div className="flex gap-1 items-center flex">
        <MobileDrawer />
        <div className="shadow-md flex items-center gap-2 border border-[#F0F2F5] rounded-[8px] px-5">
          <CiSearch width="20px" color="#667085" />
          <input
            type="text"
            placeholder="Search"
            className="w-[40vw] md:w-[600px] h-[56px] outline-none"
          />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative">
          <div className="absolute top-0 right-[-5px] h-[15px] w-[15px] rounded-full text-[10px] bg-[#F56630] text-white flex justify-center items-center">
            4
          </div>
          <Image src={bell} alt="notification" width={20} />
        </div>
        <Avatar src={user?.profile_photo} sx={{ width: 40, height: 40 }} />
      </div>
    </div>
  );
};

export default Navbar;
