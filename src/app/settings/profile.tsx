"use client";

import { image_add } from "@/assets/icons";
import { setUser } from "@/redux/adminSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { baseUrl } from "@/utils/constants";
import { Avatar } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  profile_photo: File | string;
}

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.admin);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [data, setData] = useState<FormData>({
    name: user?.name || "",
    profile_photo: user?.profile_photo || "",
  });

  console.log(data);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.profile_photo instanceof File) {
      formData.append("profile_photo", data.profile_photo); // Append the file
    }
    try {
      const response = await axios.patch(`${baseUrl}/admin`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      toast.success("Profile updated successfully");
      const updatedUser = await axios.get(`${baseUrl}/admin/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUser(updatedUser.data));
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An Error occured, try again later");
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData({ ...data, profile_photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-[600px] p-4">
      <div className="flex gap-6">
        <div className="relative">
          <Avatar
            src={
              selectedFile ||
              (data.profile_photo instanceof File &&
                URL.createObjectURL(data.profile_photo)) ||
              ""
            }
            sx={{ height: "120px", width: "120px" }}
          />

          <div className="absolute bottom-0 right-0 h-[38px] w-[38px] bg-[#51A3DA] rounded-full flex justify-center items-center">
            <FaCheck color="white" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange} // Handle file selection
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[16px] font-semibold text-[#878787]">
              Profile Photo
            </p>
            <p className="text-[14px] font-light text-[#9B9B9B]">
              This image will be displayed on your profile
            </p>
          </div>

          <button
            className="flex gap-2 items-center border-[1.5px] border-[var(--primary-color)] rounded-lg px-4 py-2 text-sm text-[var(--primary-color)] font-medium w-fit"
            onClick={handleButtonClick}
          >
            <Image src={image_add} alt="Change" width={20} />
            Change Photo
          </button>
        </div>
      </div>

      <form className="mt-8" onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-6">
          <label className="block text-[#878787] font-medium text-[16px] mb-2">
            Name
          </label>
          <input
            type="text"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full h-[70px] px-4 border border-[#D0D5DD] rounded-lg text-[14px] outline-none placeholder-[#C3C3C3]"
            placeholder={user?.name || "Enter your name"}
          />
        </div>

        {/* Email Input (Disabled) */}
        <div className="mb-6">
          <label className="block text-[#878787] font-medium text-[16px] mb-2">
            Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full h-[70px] px-4 border border-[#D0D5DD] rounded-lg text-[14px] outline-none bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full h-[70px] bg-[var(--primary-color)] text-white rounded-lg font-medium text-[16px] hover:bg-opacity-90 transition-colors duration-200 ${
            isLoading ? "opacity-50" : ""
          }`}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
