import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useAppSelector } from "@/redux/hooks";

const CourseCompletionRateChart = () => {
  const { analytics } = useAppSelector((state) => state.admin);
  const studentCompletionRate = parseFloat(
    analytics?.courseCompletionsPerUserType?.studentCompletionRate.replace(
      "%",
      ""
    ) ?? "0"
  );
  const educatorCompletionRate = parseFloat(
    analytics?.courseCompletionsPerUserType?.educatorCompletionRate.replace(
      "%",
      ""
    ) ?? "0"
  );
  return (
    <div>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: studentCompletionRate, color: "#2390FA" },
              { id: 1, value: educatorCompletionRate, color: "#60269E" },
            ],
            innerRadius: 63,
            cx: 200,
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
};

export default CourseCompletionRateChart;
