"use client";
import Layout from "@/components/layout/layout";
import React from "react";
import MetricItem from "./metricItem";
import { book, calendar, certificate, multiple_users } from "@/assets/icons";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import Table from "../users/table";
import AnalyticsBarChart from "@/components/analyticsBarChart";
import CourseCompletionCountChart from "@/components/courseCompletionCountChart";
import CourseCompletionRateChart from "@/components/courseCompletionRateChart";

interface Metric {
  title: string;
  icon: any;
  amount: string;
}

const Analytics = () => {
  const metrics: Metric[] = [
    { title: "Total Users", icon: multiple_users, amount: "10.2k" },
    { title: "Total Courses", icon: book, amount: "16" },
    { title: "Certificate Issued ", icon: certificate, amount: "300" },
  ];
  return (
    <Layout>
      <div>
        <div className="flex justify-between font-neue-haas">
          <h1 className="text-[24px] font-[600] flex gap-2 items-center">
            Welcome Back,
            <span>{`John Doe`}</span>
            <Avatar />
          </h1>
          <div className="text-[16px] font-[300] flex gap-2 items-center">
            <Image src={calendar} alt="date" width={40} />
            <p>Saturday, August 10, 2024</p>
          </div>
        </div>
        <div className="h-[30px]" />
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((metric, index) => (
            <MetricItem metric={metric} key={index} />
          ))}
        </div>
        <div className="h-[30px]" />
        <div>
          <div className="flex gap-5">
            <div className="border border p-5 rounded-[8px] w-fit shadow-md w-2/3">
              <div>
                <div>
                  <h1 className="text-[14px] font-[500] text-[#A3AED0]">
                    USERS ACQUISITION
                  </h1>
                  <p className="text-[34px] font-[700] text-[#2B3674]">3,000</p>
                </div>
                <div></div>
              </div>
              <AnalyticsBarChart />
            </div>
            <div className="border border p-5 rounded-[8px] w-fit shadow-md w-2/4">
              <div>
                <h1 className="text-[16px] font-[600]">Drop off rate</h1>
                <p className="text-[14px] font-[400] text-[#909090]">
                  This section provides an analysis or insights into drop off
                  rate based on user types.
                </p>
              </div>
              <div className="flex items-end justify-center mt-[40px]">
                <div className="flex justify-center items-center text-white text-[37px] font-[700] h-[183px] w-[183px] bg-[#60269E] rounded-full -mr-[40px]">
                  70%
                </div>
                <div className="border-4 border-white flex justify-center items-center text-white text-[27px] font-[700] h-[130px] w-[130px] bg-[#51A3DA] rounded-full">
                  30%
                </div>
              </div>
              <div className="mt-[30px] flex justify-center items-center gap-10">
                <div className="flex items-center justify-center gap-2 ">
                  <div className="bg-[#60269E] h-[13px] w-[13px] rounded-full" />
                  <p className="text-[#A09D9D] text-[14px]">Students</p>
                </div>
                <div className="flex items-center justify-center gap-2 ">
                  <div className="bg-[#51A3DA] h-[13px] w-[13px] rounded-full" />
                  <p className="text-[#A09D9D] text-[14px]">Educator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[30px]" />

        <div className="flex gap-5">
          <div className="w-1/2 border border py-5 rounded-[8px] w-fit shadow-md">
            <div className="flex gap-2 items-start border-b pb-5 mb-3 px-5">
              <Image src={book} alt="" />
              <div>
                <p>Course Completion Count </p>
                <p className="text-[#909090] text-[13px] font-[200]">
                  This is based on the total number of users that have completed
                  each courses
                </p>
              </div>
            </div>
            <CourseCompletionCountChart />
          </div>
          <div className="w-1/2 border border py-5 rounded-[8px] w-fit shadow-md">
            <div className="flex items-start gap-2 border-b pb-5 mb-3 px-5">
              <Image src={book} alt="" />
              <div>
                <p>Course Completion Rate </p>
                <p className="text-[#909090] text-[13px] font-[200]">
                  This is based on the percentage of user-type that have
                  completed each courses
                </p>
              </div>
            </div>
            <div>
              <CourseCompletionRateChart />
              <div className="mt-3 flex justify-center items-center gap-5">
                <p className="flex items-center gap-1">
                  <span className="h-[20px] w-[20px] bg-[#2390FA] rounded-full" />
                  Students
                </p>
                <p className="flex items-center gap-1">
                  <span className="h-[20px] w-[20px] bg-[#60269E] rounded-full" />
                  Educators
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
