"use client";
import { useEffect } from "react";
import { book, calendar, certificate, multiple_users } from "@/assets/icons";
import AnalyticsBarChart from "@/components/analyticsBarChart";
import CourseCompletionCountChart from "@/components/courseCompletionCountChart";
import CourseCompletionRateChart from "@/components/courseCompletionRateChart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCurrentDateFormatted } from "@/utils/date";
import { Avatar } from "@mui/material";
import Image from "next/image";
import MetricItem from "../../components/analytics/metricItem";
import { dashboardAnalytics } from "@/redux/adminSlice";

interface Metric {
  title: string;
  icon: any;
  amount: number;
}

type UserPerMonth = {
  month: string;
  userCount: number;
};

const Analytics = () => {
  const dispatch = useAppDispatch();
  const { user, analytics } = useAppSelector((state) => state.admin);
  const metrics: Metric[] = [
    {
      title: "Total Users",
      icon: multiple_users,
      amount: analytics?.totalUsers ?? 0,
    },
    {
      title: "Total Courses",
      icon: book,
      amount: analytics?.totalCourses ?? 0,
    },
    {
      title: "Certificate Issued ",
      icon: certificate,
      amount: analytics?.totalCertificates ?? 0,
    },
  ];

  useEffect(() => {
    dispatch(dashboardAnalytics());
  }, []);

  function getTotalUserCount(usersPerMonth: UserPerMonth[]): number {
    return usersPerMonth?.reduce(
      (total, current) => total + current.userCount,
      0
    );
  }

  return (
    <div>
      <div className="md:flex justify-between font-neue-haas">
        <h1 className="text-[18px] md:text-[24px] font-[600] flex gap-2 items-center">
          Welcome Back,
          <span>{user?.name}</span>
          <Avatar src={user?.profile_photo} />
        </h1>
        <div className="text-[13px] md:text-[16px] font-[300] flex gap-2 items-center">
          <Image src={calendar} alt="date" width={40} />
          <p>{getCurrentDateFormatted()}</p>
        </div>
      </div>
      <div className="h-[30px]" />
      <div className="grid md:grid-cols-3 gap-3">
        {metrics.map((data, index) => (
          <MetricItem metric={data} key={index} />
        ))}
      </div>
      <div className="h-[30px]" />
      <div>
        <div className="md:flex gap-5">
          <div className="border border p-5 rounded-[8px] md:w-fit shadow-md md:w-2/3  w-full">
            <div className="w-full">
              <div>
                <h1 className="text-[14px] font-[500] text-[#A3AED0]">
                  USERS ACQUISITION
                </h1>
                <p className="text-[34px] font-[700] text-[#2B3674]">
                  {getTotalUserCount(analytics?.usersPerMonth as any)}
                </p>
              </div>
              <div></div>
            </div>
            <AnalyticsBarChart />
          </div>
          <div className="border border p-5 rounded-[8px] w-fit shadow-md md:w-2/4">
            <div>
              <h1 className="text-[16px] font-[600]">Drop off rate</h1>
              <p className="text-[14px] font-[400] text-[#909090]">
                This section provides an analysis or insights into drop off rate
                based on user types.
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

      <div className="md:flex gap-5">
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
        <div className="md:w-1/2 border border py-5 rounded-[8px] w-fit shadow-md">
          <div className="flex items-start gap-2 border-b pb-5 mb-3 px-5">
            <Image src={book} alt="" />
            <div>
              <p>Course Completion Rate </p>
              <p className="text-[#909090] text-[13px] font-[200]">
                This is based on the percentage of user-type that have completed
                each courses
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
  );
};

export default Analytics;
