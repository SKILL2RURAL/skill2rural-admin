"use client";
import React, { useState } from "react";
import { calendar, multiple_users, book, courseEdit } from "@/assets/icons";
import Image from "next/image";
import VideoPlayer from "@/components/videoPlayer";
import QuestionsList from "@/components/courseComponents/questionList";
import CourseDetails from "@/components/courseComponents/CourseDetails";
import Reviews from "@/components/courseComponents/review";
import ReusableModal from "@/components/courseComponents/modal";
import EditCourse from "@/components/courseComponents/editCourseForm";

const Course: React.FC = () => {
  const [activeTab, setActiveTab] = useState("courseDetails");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ReusableModal isOpen={isOpen} onClose={handleClose}>
        <EditCourse />
      </ReusableModal>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image src={book} alt="" width={40} />
          <h1 className="text-[18px] md:text-[24px] font-[600]">Courses</h1>
        </div>
        <div className="text-[12px] md:text-[16px] font-[300] flex gap-2 items-center">
          <Image src={calendar} alt="date" width={40} />
          <p>Saturday, August 10, 2024</p>
        </div>
      </div>
      <div className="flex justify-between items-center my-5">
        <p>
          Courses /{" "}
          <span className="text-[var(--primary-color)] text-[14px] font-[600]">
            Design Thinking
          </span>
        </p>
      </div>
      <VideoPlayer />
      <div className="mt-10 text-[12px] md:text-[14px] font-[400] md:w-[80%] border-b text-[#909090] flex justify-start gap-4 font-neue-haas">
        <p
          onClick={() => setActiveTab("courseDetails")}
          className={`${
            activeTab === "courseDetails"
              ? "text-[var(--primary-color)] font-[600px] border-b-2 border-[var(--primary-color)] "
              : ""
          } cursor-pointer pb-2`}
        >
          Course Details
        </p>
        <p
          onClick={() => setActiveTab("questions")}
          className={`${
            activeTab === "questions"
              ? "text-[var(--primary-color)] font[600px] border-b-2 border-[var(--primary-color)] "
              : ""
          } cursor-pointer pb-2`}
        >
          Questions
        </p>
        <p
          onClick={() => setActiveTab("reviews")}
          className={`${
            activeTab === "reviews"
              ? "text-[var(--primary-color)] font-[600px] border-b-2 border-[var(--primary-color)] "
              : ""
          } cursor-pointer pb-2`}
        >
          Reviews
        </p>
        {activeTab === "courseDetails" && (
          <button
            className="w-[126px] h-[40px] p-[10px] bg-[var(--primary-color)] text-white flex gap-2 rounded-md mb-2 items-end ml-[400px]"
            onClick={handleClick}
          >
            Edit Course{" "}
            <span>
              <Image src={courseEdit} alt="edit button" />
            </span>
          </button>
        )}
      </div>
      <div>
        {activeTab === "courseDetails" && <CourseDetails />}
        {activeTab === "questions" && <QuestionsList />}
        {activeTab === "reviews" && <Reviews />}
      </div>
    </>
  );
};

export default Course;
