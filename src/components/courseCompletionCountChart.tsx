import React from "react";
import { useAppSelector } from "@/redux/hooks";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Use dynamic import with types
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CourseCompletion {
  title: string;
  numberOfCourseCompletions: number;
}

interface RootState {
  admin: {
    analytics: {
      courseCompletionsPerCourse: CourseCompletion[];
    };
  };
}

const CourseCompletionCountChart: React.FC = () => {
  const { analytics } = useAppSelector((state) => state.admin);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 400,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        horizontal: true,
        barHeight: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "category",
    },

    colors: ["#60269E"],
  };

  const series: ApexAxisChartSeries = [
    {
      name: "Course Completions",
      data:
        analytics?.courseCompletionsPerCourse.map((item) => ({
          x: item.title,
          y: item.numberOfCourseCompletions,
        })) || [],
    },
  ];

  return (
    <div className="md:w-[42vw]">
      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default CourseCompletionCountChart;
