import { bell } from "@/assets/icons";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React from "react";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div
      className="max-w-[80vw] bg-white w-full flex justify-between items-center px-10 py-6 fixed"
      style={{ zIndex: 50 }}
    >
      <div className="shadow-md flex items-center gap-2 border border-[#F0F2F5] rounded-[8px] px-5">
        <CiSearch width="20px" color="#667085" />
        <input
          type="text"
          placeholder="Search"
          className="w-[600px] h-[56px] outline-none"
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="relative">
          <div className="absolute top-0 right-[-5px] h-[15px] w-[15px] rounded-full text-[10px] bg-[#F56630] text-white flex justify-center items-center">
            4
          </div>
          <Image src={bell} alt="notification" width={20} />
        </div>
        <Avatar sx={{ width: 40, height: 40 }} />
      </div>
    </div>
  );
};

export default Navbar;
