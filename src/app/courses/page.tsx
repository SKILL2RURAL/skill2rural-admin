import { book, calendar } from "@/assets/icons";
import Layout from "@/components/layout/layout";
import Image from "next/image";
import React from "react";
import MetricItem from "../analytics/metricItem";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import Table from "../users/table";
import BarChart from "@/components/courseBarChart";
import SuccessFailureDonut from "@/components/successAndFailure";
import CourseTable from "./courseTable";
import ActionButton from "@/components/courseComponents/actionButton";

interface Metric {
  title: string;
  icon: any;
  amount: string;
}

const Courses = () => {
  const metrics: Metric[] = [
    { title: "Total Courses", icon: book, amount: "16" },
    { title: "Active Courses", icon: book, amount: "14" },
    { title: "Archived Courses", icon: book, amount: "2" },
  ];
  return (
    <div>
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
      <div className="h-[30px]" />
      <div className="grid md:grid-cols-3 gap-3">
        {metrics.map((metric, index) => (
          <MetricItem metric={metric} key={index} />
        ))}
      </div>
      <div className="h-[30px]" />
        <div>
          <div className="md:flex gap-5">
            <div className="border p-5 rounded-[8px] md:w-fit shadow-md md:w-2/3  w-full">
            <div className="w-full">
              <div>
                <h1 className="text-[14px] font-[500] text-[#A3AED0]">
                  TOTAL CERTIFICATE ISSUED
                </h1>
                <div className="flex justify-between ">
                  <p className="text-[34px] font-[700] text-[#2B3674] mt-2">3,000</p>
                  <div className="relative">
                    <select className="cursor-pointer text-[13px] p-2 w-[70px] outline-none appearance-none">
                      <option value="">Year</option>
                    </select>
                    <IoIosArrowDown className="absolute right-3 top-[12px]" />
                  </div>
                </div>
              </div>
            </div>
            <div>
            <BarChart />
            </div>
          </div>
          <SuccessFailureDonut /> 
        </div>
      </div>
      
      <div className="my-5">
        <div className="md:flex space-y-5 md:space-y-0 justify-between items-center">
          <div className="flex gap-3 justify-between">
            <div className="border border-[#D0D5DD] shadow-sm bg-white flex gap-2 items-center p-2 rounded-[8px] h-full">
              <CiSearch color="#667085" size={20} />
              <input
                type="text"
                placeholder="Search"
                className="md:w-[300px] bg-transparent placeholder:text-[#667085] outline-none"
              />
            </div>
            <div className="relative">
              <select className="cursor-pointer bg-[#BDD4F114] border border-[#BDD4F199] h-full text-[13px] p-2 w-[70px] outline-none appearance-none">
                <option value="">Filter</option>
              </select>
              <IoIosArrowDown className="absolute right-3 top-[14px]" />
            </div>
          </div>
          <ActionButton />
        </div>
        <div>
          {/* <Table /> */}
          <CourseTable />
        </div>
      </div>
    </div>
  );
};

export default Courses;
