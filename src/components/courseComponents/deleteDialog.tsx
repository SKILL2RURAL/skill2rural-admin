import { delete_icon } from "@/assets/icons";
import Image from "next/image";
import React from "react";

interface Props {
  handleDeleteCourse: () => void;
  isLoading: boolean;
  handleCloseDialog: () => void;
}

const DeleteDialog: React.FC<Props> = ({
  handleDeleteCourse,
  isLoading,
  handleCloseDialog,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src={delete_icon} alt="" width={200} height={200} />
      <h1 className="text-[32px] font-[600]">Delete Course?</h1>
      <p className="text-[#909090] text-[16px] font-[600]">
        Are you sure you want to delete course
      </p>
      <div className="w-full grid gap-5 my-7">
        <button
          className={`text-white bg-[#FF3B30] rounded-[10px] h-[60px] ${
            isLoading ? "opacity-50" : ""
          }`}
          onClick={handleDeleteCourse}
        >
          Yes, delete
        </button>
        <button
          className="text-[#60269E] border border-[#60269E] rounded-[10px] h-[60px]"
          onClick={handleCloseDialog}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteDialog;
