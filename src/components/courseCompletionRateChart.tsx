import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const CourseCompletionRateChart = () => {
  return (
    <div>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, color: "#2390FA" },
              { id: 1, value: 15, color: "#60269E" },
            ],
            innerRadius: 63,
            cx: 300,
          },
        ]}
        width={1000}
        height={200}
      />
    </div>
  );
};

export default CourseCompletionRateChart;
