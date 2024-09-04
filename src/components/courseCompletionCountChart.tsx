"use client";
import { courseCompletionDataset } from "@/utils/courseCompletionDataset";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  //   yAxis: [
  //     {
  //       label: "rainfall (mm)",
  //     },
  //   ],
  width: 500,
  height: 300,
};

const CourseCompletionCountChart = () => {
  return (
    <div>
      <BarChart
        dataset={courseCompletionDataset}
        borderRadius={8}
        yAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={[{ dataKey: "seoul", color: "#60269E" }]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
};

export default CourseCompletionCountChart;
