"use client";
import React, { useState } from "react";
import CourseForm from "./courseForm";
import ReusableModal from "./modal";
import { IoIosAdd } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import CourseSucess from "./courseSucess";
import QuestionsDrawer from "./questionsDrawer";

const ActionButton: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="text-[14px] space-x-3 flex">
      <button className="bg-[var(--primary-color)] px-4 py-3 rounded-[4px] text-white flex gap-2 items-center">
        Export CSV
        <div>
          <LuDownload color="white" size={18} />
        </div>
      </button>
      <button
        className="bg-[var(--primary-color)] px-4 py-3 rounded-[4px] text-white flex gap-2 items-center"
        onClick={handleOpen}
      >
        Add New Course
        <div className="border border-white rounded-[5px]">
          <IoIosAdd color="white" size={18} />
        </div>
      </button>
      {/* <Editcourse open={open} handleClose={handleClose} /> */}
      <ReusableModal isOpen={open} onClose={handleClose}>
        <CourseForm
          onClose={handleClose}
          openSucessModal={() => setIsSuccess(true)}
        />
      </ReusableModal>
      <ReusableModal isOpen={isSuccess} onClose={() => setIsSuccess(false)}>
        <CourseSucess
          closeModal={() => setIsSuccess(false)}
          openDrawer={() => setIsDrawerOpen(true)}
        />
      </ReusableModal>
      <QuestionsDrawer
        isOpen={isDrawerOpen}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
      {/* <Modal isOpen={open} onClose={handleClose}/> */}
    </div>
  );
};

export default ActionButton;
