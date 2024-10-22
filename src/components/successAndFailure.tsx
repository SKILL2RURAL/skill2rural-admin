"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "@/redux/hooks";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

ChartJS.register(ArcElement, Tooltip, Legend);

export const SuccessFailureDonut: React.FC = () => {
  const { coursesStats } = useAppSelector((state) => state.admin);

  return (
    <div className="border p-5 rounded-[8px] w-fit shadow-md md:w-2/4">
      <h4 className="text-[14px] font-[500px] text-[#A3AED0] leading-6">
        Quiz Questions Success & Failure Rate
      </h4>
      <div className="">
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-[50%] bg-[#008000]"></div>
          <h3 className="text-sm">Success Quiz Response</h3>
          <p className="text-sm text-[#008000] font-bold">
            {coursesStats?.quizSuccessRate}%
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-[50%] bg-[#E71D36]"></div>
          <h3 className="text-sm">Failure Quiz Response</h3>
          <p className="text-sm text-[#E71D36] font-bold">
            {coursesStats?.failedQuizesRate}%
          </p>
        </div>
      </div>
      <div className="relative flex items-center justify-center mt-5">
        <div className="absolute text-[#A3AED0] text-[13px] font-[500] text-center">
          <p className="text-[32px] font-[700] text-[#2B3674]">
            {coursesStats?.totalQuizes || 0}
          </p>
          <p>Total Quiz Attempt</p>
        </div>
        <div
          style={{ width: 180, height: 180 }}
          className="absolute h-full w-full"
        >
          <CircularProgressbar
            value={coursesStats?.failedQuizesRate || 0}
            styles={buildStyles({
              pathColor: "#E71D36",
              trailColor: "#ddd",
              pathTransitionDuration: 0.5,
            })}
          />
        </div>
        <div style={{ width: 230, height: 230 }}>
          <CircularProgressbar
            value={coursesStats?.quizSuccessRate || 0}
            styles={buildStyles({
              pathColor: "#008000",
              trailColor: "#ddd",
              pathTransitionDuration: 0.5,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessFailureDonut;
