"use client";
import { calendar, copy, message, multiple_users } from "@/assets/icons";
import Image from "next/image";
import React, { useEffect } from "react";
import CoursesCompletedTable from "./coursesCompletedTable";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getSingleUserDetails,
  getUser,
  getUserCourses,
} from "@/redux/adminSlice";
import { getCurrentDateFormatted } from "@/utils/date";
import CircularProgressBar from "@/components/ui/circularProgressBar";
import EducatorInformation from "@/components/userComponents/educatorInformation";

const User = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { singleUser, userCourses } = useAppSelector((state) => state.admin);
  const id = params.user;
  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getUser(id));
      dispatch(getUserCourses(id));
    }
  }, [id]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image src={multiple_users} alt="" width={40} />
          <h1 className="text-[18px] md:text-[24px] font-[600]">User</h1>
        </div>
        <div className="text-[12px] md:text-[16px] font-[300] flex gap-2 items-center">
          <Image src={calendar} alt="date" width={40} />
          <p>{getCurrentDateFormatted()}</p>
        </div>
      </div>
      <div className="flex justify-between items-center my-5">
        <p onClick={() => router.back()} className="cursor-pointer">
          User /{" "}
          <span className="text-[var(--primary-color)] text-[14px] font-[600]">
            {singleUser?.user?.name}
          </span>
        </p>
        <button className="flex gap-2 text-[12px] md:text-[16px] items-center bg-[var(--primary-color)] px-4 py-3 rounded-[4px] text-white">
          Message All Users
          <Image src={message} alt="" width={24} />
        </button>
      </div>
      <div className="bg-white p-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <p className="text-[18px] font-[600]">User Information</p>

            <div className="shadow-md p-5 h-full">
              <div className="flex justify-between items-center">
                <div>
                  <div>
                    <p className="text-[16px] font-[600]">
                      {singleUser?.user?.name}
                    </p>
                    <p className="text-[#909090] text-[14px] font-[500]">
                      Joined 10th March, 2023
                    </p>
                  </div>
                </div>
                <button className="text-white bg-[#027A48] w-fit px-7 py-2 rounded-[4px]">
                  Active
                </button>
              </div>
              <div className="mt-6 space-y-5">
                <div className="md:flex justify-between">
                  <p className="text-[16px]">User ID :</p>
                  <div className="flex justify-between items-center md:gap-[30px]">
                    <p className="text-[13px] md:text-[16px] font-[600]">
                      {singleUser?.user?.id}
                    </p>
                  </div>
                </div>
                <div className="md:flex justify-between">
                  <p className="text-[16px]">Account type : </p>
                  <div className="flex justify-between items-center gap-[30px]">
                    <p className="text-[13px] md:text-[16px] font-[600]">
                      {singleUser?.user?.type}
                    </p>
                  </div>
                </div>
                <div className="md:flex justify-between">
                  <p className="text-[16px]">Email Address :</p>
                  <div className="flex justify-between items-center gap-[30px]">
                    <p className="text-[13px] md:text-[16px] font-[600] w-[50vw] truncate  md:w-full">
                      {singleUser?.user?.email}
                    </p>
                  </div>
                </div>
                <div className="md:flex justify-between">
                  <p className="text-[16px]">Created Date :</p>
                  <div className="flex justify-between items-center gap-[30px]">
                    <p className="text-[13px] md:text-[16px] font-[600]">
                      August 10, 2023
                    </p>
                  </div>
                </div>
                <div className="md:flex justify-between">
                  <p className="text-[16px]">Last Logion Date :</p>
                  <div className="flex justify-between items-center gap-[30px]">
                    <p className="text-[13px] md:text-[16px] font-[600]">
                      10: 00AM, August 20, 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[18px] font-[600]"> Course Activities</p>

            <div className="shadow-md p-5 h-full">
              <div className="flex gap-10 my-3">
                <p className="text-[16px] font-[400]">Certificate earned:</p>
                <p className="text-[16px] font-[600]">
                  {singleUser?.totalCertificates}
                </p>
              </div>
              <div className="flex gap-10 my-3">
                <p className="text-[16px] font-[400]">Quiz Success rate:</p>
                <p className="text-[16px] font-[600]">
                  {singleUser?.quizSuccessRate || 0}%
                </p>
              </div>
              <div className="flex justify-center items-center gap-5">
                <div className="flex flex-col items-center">
                  <p className="text-[16px] font-[200]">Courses Completion</p>
                  <p className="text-[42px] font-[700]">
                    {singleUser &&
                      `${singleUser?.totalCourseCompletedbyUser}/
                    ${singleUser?.totalCoursesTakenByUser}`}
                  </p>
                </div>
                <CircularProgressBar
                  percentage={singleUser?.percentageCompleted || 0}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[40px]" />
        {singleUser?.user?.type !== "STUDENT" && <EducatorInformation />}

        <div className="h-[40px]" />

        <div>
          <div>
            <h1 className=" text-[16px] md:text-[20px] font-[600] mb-5">
              Courses Completed
            </h1>
          </div>
          <CoursesCompletedTable />
        </div>
      </div>
    </div>
  );
};

export default User;
