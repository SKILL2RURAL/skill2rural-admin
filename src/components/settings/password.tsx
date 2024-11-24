import { lock } from "@/assets/icons";
import { changePassword } from "@/redux/adminSlice";
import { useAppDispatch } from "@/redux/hooks";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Password = () => {
  const dispatch = useAppDispatch();
  const [passwordObj, setPasswordObj] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfrimPasswordVisible, setIsConfrimPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (passwordObj.newPassword !== passwordObj.confirmPassword) {
        toast.error("Password does not match");
        return;
      }
      if (
        !passwordObj.newPassword ||
        !passwordObj.oldPassword ||
        !passwordObj.confirmPassword
      ) {
        toast.error("Fill the form to change your password ");
        return;
      }
      const response = await dispatch(changePassword(passwordObj));
      console.log(response);
      if (response.type === "changePassword/fulfilled") {
        toast.success("Password changed successfully");
        setPasswordObj({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Invalid old password");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="flex md:w-[550px] items-center px-3 border-[#D0D5DD] border rounded-[10px] bg-white">
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={passwordObj.oldPassword}
              onChange={(e) =>
                setPasswordObj({ ...passwordObj, oldPassword: e.target.value })
              }
              placeholder="Enter current password"
              className="w-full h-[70px] placeholder:text-[#C3C3C3] outline-none"
            />
            <Image
              src={lock}
              alt="see password"
              width={20}
              className="cursor-pointer"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </div>
        </div>
        <div className="grid gap-1 mb-5">
          <label className="font-[300] text-[14px]">New password</label>
          <div className="flex md:w-[550px] items-center px-3 border-[#D0D5DD] border rounded-[10px] bg-white">
            <input
              type={isNewPasswordVisible ? "text" : "password"}
              value={passwordObj.newPassword}
              onChange={(e) =>
                setPasswordObj({ ...passwordObj, newPassword: e.target.value })
              }
              placeholder="Enter new password"
              className="w-full h-[70px] placeholder:text-[#C3C3C3] outline-none"
            />
            <Image
              src={lock}
              alt="see password"
              width={20}
              className="cursor-pointer"
              onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
            />
          </div>
          <p className="text-[13px] text-[#667085]  font-[200]">
            Your new password must be longer than 8 characters
          </p>
        </div>
        <div className="grid gap-1 mb-5">
          <label className="font-[300] text-[14px]">Confirm password</label>
          <div className="flex md:w-[550px] items-center px-3 border-[#D0D5DD] border rounded-[10px] bg-white">
            <input
              type={isConfrimPasswordVisible ? "text" : "password"}
              value={passwordObj.confirmPassword}
              onChange={(e) =>
                setPasswordObj({
                  ...passwordObj,
                  confirmPassword: e.target.value,
                })
              }
              placeholder="Enter new password"
              className="w-full h-[70px] placeholder:text-[#C3C3C3] outline-none"
            />
            <Image
              src={lock}
              alt="see password"
              width={20}
              onClick={() =>
                setIsConfrimPasswordVisible(!isConfrimPasswordVisible)
              }
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="md:w-[550px] flex gap-3 items-center">
          <button className="h-[70px] border border-[#D0D5DD] rounded-[12px] px-5 md:px-10 bg-white text-black font-[600] shadow-md">
            Cancel
          </button>
          <button
            onClick={(e) => handleSubmit(e)}
            disabled={isLoading}
            className={`text-white bg-[var(--primary-color)] w-full h-[70px] text-center rounded-[12px] my-5 cursor-pointer outline-none ${
              isLoading ? "opacity-50" : ""
            }`}
          >
            Update password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
