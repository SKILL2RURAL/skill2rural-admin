"use client";
import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { dataset } from "@/utils/analyticsDataset";

const chartSetting = {
  //   yAxis: [
  //     {
  //       label: "rainfall (mm)",
  //     },
  //   ],
  width: 600,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 0)",
    },
  },
};

const AnalyticsBarChart = () => {
  return (
    <div>
      <BarChart
        dataset={dataset}
        borderRadius={8}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[
          { dataKey: "newYork", color: "#60269E", label: "New York" },
          { dataKey: "seoul", color: "#51A3DA", label: "Seoul" },
        ]}
        {...chartSetting}
      />
    </div>
  );
};

export default AnalyticsBarChart;
