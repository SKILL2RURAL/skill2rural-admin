import { book, calendar } from "@/assets/icons";
import Layout from "@/components/layout/layout";
import Image from "next/image";
import React from "react";
import MetricItem from "../analytics/metricItem";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import Table from "../users/table";

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
    <Layout>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image src={book} alt="" width={40} />
            <h1 className="text-[24px] font-[600]">Courses</h1>
          </div>
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
        <div className="my-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="border border-[#D0D5DD] shadow-sm bg-white flex gap-2 items-center p-2 rounded-[8px] h-full">
                <CiSearch color="#667085" size={20} />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[300px] bg-transparent placeholder:text-[#667085] outline-none"
                />
              </div>
              <div className="relative">
                <select className="cursor-pointer bg-[#BDD4F114] border border-[#BDD4F199] h-full text-[13px] p-2 w-[70px] outline-none appearance-none">
                  <option value="">Filter</option>
                </select>
                <IoIosArrowDown className="absolute right-3 top-[14px]" />
              </div>
            </div>
            <div className="text-[14px] space-x-3">
              <button className="bg-[var(--primary-color)] px-4 py-3 rounded-[4px] text-white">
                Message All Users
              </button>
              <button className="bg-[var(--primary-color)] px-4 py-3 rounded-[4px] text-white">
                Export CSV
              </button>
            </div>
          </div>
          <div>
            <Table />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
