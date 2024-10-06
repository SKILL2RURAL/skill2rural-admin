"use client";
import { image_add } from "@/assets/icons";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Avatar } from "@mui/material";

const Profile = () => {
  const { user } = useAppSelector((state) => state.admin);
  const [isFocused, setIsFocused] = useState(false);
  const [data, setData] = useState({
    name: "Emmanuel Adebayo",
    email: "",
  });
  return (
    <div>
      <div className="flex gap-4">
        <div className="relative">
          <div className="h-[] w-[] bg-[var(--primary-color)] rounded-full flex justify-center items-center text-white text-[24px] font-[400]">
            <Avatar
              src={user?.profile_photo}
              sx={{ height: "120px", width: "120px" }}
            />
          </div>
          <div className="h-[38px] w-[38px] bg-[#51A3DA] rounded-full absolute bottom-0 right-0 flex justify-center items-center">
            <FaCheck color="white" />
          </div>
        </div>
        <div className="grid justify-between">
          <p className="text-[16px] font-[600] text-[#878787]">Profile Photo</p>
          <p className="text-[14px] font-[300] w-[70%] text-[#9B9B9B]">
            This image will be displayed on your profile
          </p>
          <button className="flex gap-1 items-center border-[1.5px] border-[var(--primary-color)] rounded-[8px] px-3 w-fit">
            <Image src={image_add} alt="" width={20} />
            <p className="text-[var(--primary-color)] text-[13px] font-[500] font-inter">
              Change Photo
            </p>
          </button>
        </div>
      </div>
      <div className="h-[40px]" />

      <form className="font-neue-haas">
        <div className="grid gap-1 mb-5">
          <label className="text-[#878787] font-[400] text-[16px]">Name</label>
          <input
            type="text"
            placeholder={user?.name}
            value={isFocused ? user?.name : ""}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="md:w-[550px] h-[70px] px-3 rounded-[10px] border-[#D0D5DD] border placeholder:text-[#C3C3C3] outline-none"
          />
        </div>
        <div className="grid gap-1 mb-5">
          <label className="text-[#878787] font-[400] text-[16px]">Email</label>
          <input
            type="email"
            placeholder="oluwanifemi@motobite.com"
            value={user?.email}
            disabled
            className="md:w-[550px] h-[70px] px-3 rounded-[10px] border-[#D0D5DD] border placeholder:text-[#C3C3C3] outline-none"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-[var(--primary-color)] w-full md:w-[550px] h-[70px] text-center rounded-[12px] my-5 cursor-pointer outline-none"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
