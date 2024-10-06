import { useAppSelector } from "@/redux/hooks";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define the shape of your analytics data
interface AnalyticsData {
  month: string;
  userCount: number;
}

const AnalyticsBarChart: React.FC = () => {
  const { analytics } = useAppSelector((state) => state.admin);
  console.log(analytics);

  const usersPerMonth: AnalyticsData[] = analytics?.usersPerMonth || [];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    colors: ["#60269E"],
    plotOptions: {
      bar: {
        // borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: usersPerMonth.map((item) => item.month),
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
      },
    },
    title: {
      // text: "Users Per Month",
      floating: true,
      offsetY: 330,
      align: "center",
      style: {
        color: "#60269E",
      },
    },
  };

  const series: ApexAxisChartSeries = [
    {
      name: "User Count",
      data: usersPerMonth.map((item) => item.userCount),
    },
  ];

  if (usersPerMonth.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="md:w-[39vw]">
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height={400}
      />
    </div>
  );
};

export default AnalyticsBarChart;
