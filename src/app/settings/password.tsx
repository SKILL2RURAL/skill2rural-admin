import { lock } from "@/assets/icons";
import Image from "next/image";
import React from "react";

const Password = () => {
  return (
    <div className="font-neue-haas">
      <div className="border-b pb-5">
        <h1 className="text-[18px] font-[500]">Password info</h1>
        <p className="text-[#909090] text-[14px] font-[300]">
          Update your photo and personal details here.
        </p>
      </div>

      <div className="h-[30px]" />

      <form className="font-neue-haas">
        <div className="grid gap-1 mb-5">
          <label className="font-[300] text-[14px]">Current password</label>
          <div className="flex w-[550px] items-center px-3 border-[#D0D5DD] border rounded-[10px] bg-white">
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full h-[70px] placeholder:text-[#C3C3C3] outline-none"
            />
            <Image
              src={lock}
              alt="see password"
              width={20}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="grid gap-1 mb-5">
          <label className="font-[300] text-[14px]">New password</label>
          <div className="flex w-[550px] items-center px-3 border-[#D0D5DD] border rounded-[10px] bg-white">
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full h-[70px] placeholder:text-[#C3C3C3] outline-none"
            />
            <Image
              src={lock}
              alt="see password"
              width={20}
              className="cursor-pointer"
            />
          </div>
          <p className="text-[13px] text-[#667085]  font-[200]">
            Your new password must be longer than 8 characters
          </p>
        </div>
        <div className="grid gap-1 mb-5">
          <label className="font-[300] text-[14px]">Confirm password</label>
          <div className="flex w-[550px] items-center px-3 border-[#D0D5DD] border rounded-[10px] bg-white">
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full h-[70px] placeholder:text-[#C3C3C3] outline-none"
            />
            <Image
              src={lock}
              alt="see password"
              width={20}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="w-[550px] flex gap-3 items-center">
          <button className="h-[70px] border border-[#D0D5DD] rounded-[12px] px-10 bg-white text-black font-[600] shadow-md">
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-[var(--primary-color)] w-full h-[70px] text-center rounded-[12px] my-5 cursor-pointer outline-none"
          >
            Update password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
