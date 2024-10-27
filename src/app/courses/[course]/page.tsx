"use client";
import React, { useEffect, useState } from "react";
import { calendar, multiple_users, book, courseEdit } from "@/assets/icons";
import Image from "next/image";
import VideoPlayer from "@/components/videoPlayer";
import QuestionsList from "@/components/courseComponents/questionList";
import CourseDetails from "@/components/courseComponents/CourseDetails";
import Reviews from "@/components/courseComponents/review";
import ReusableModal from "@/components/courseComponents/modal";
import EditCourse from "@/components/courseComponents/editCourseForm";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCourseDetails } from "@/redux/adminSlice";
import { getCurrentDateFormatted } from "@/utils/date";
import QuestionsDrawer from "@/components/courseComponents/questionsDrawer";

const Course: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("courseDetails");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const id = params.course;

  const { courseDetails } = useAppSelector((state) => state.admin);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getCourseDetails(id));
    }
  }, [id]);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <>
      <ReusableModal isOpen={isOpen} onClose={handleClose}>
        <EditCourse
          id={1}
          onClose={handleClose}
          openDrawer={handleOpenDrawer}
          editCourse={true}
          existingCourseDetails={courseDetails}
        />
      </ReusableModal>
      <QuestionsDrawer
        isOpen={isDrawerOpen}
        closeDrawer={() => setIsDrawerOpen(false)}
        isEdit={true}
      />
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image src={book} alt="" width={40} />
          <h1 className="text-[18px] md:text-[24px] font-[600]">Courses</h1>
        </div>
        <div className="text-[12px] md:text-[16px] font-[300] flex gap-2 items-center">
          <Image src={calendar} alt="date" width={40} />
          <p>{getCurrentDateFormatted()}</p>
        </div>
      </div>
      <div className="flex justify-between items-center my-5">
        <p>
          Courses /{" "}
          <span className="text-[var(--primary-color)] text-[14px] font-[600]">
            {courseDetails?.title}
          </span>
        </p>
      </div>
      <div className="md:w-[65vw]">
        <VideoPlayer />
        <div
          className={`mt-10 text-[12px] md:text-[14px] font-[400]  border-b text-[#909090] ${
            activeTab === "courseDetails" ? "flex justify-between" : ""
          } gap-4 font-neue-haas`}
        >
          <div className="flex gap-5">
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
          </div>

          {activeTab === "courseDetails" && (
            <button
              className="p-[10px] bg-[var(--primary-color)] text-white flex gap-2 rounded-md mb-2"
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
          {activeTab === "questions" && <QuestionsList courseId={id} />}
          {activeTab === "reviews" && <Reviews />}
        </div>
      </div>
    </>
  );
};

export default Course;
