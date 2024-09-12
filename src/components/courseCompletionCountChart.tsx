// "use client";
// import { courseCompletionDataset } from "@/utils/courseCompletionDataset";
// import { BarChart } from "@mui/x-charts/BarChart";

// const chartSetting = {
//   //   yAxis: [
//   //     {
//   //       label: "rainfall (mm)",
//   //     },
//   //   ],
//   width: 500,
//   height: 300,
// };

// const CourseCompletionCountChart = () => {
//   return (
//     <div>
//       <BarChart
//         dataset={courseCompletionDataset}
//         borderRadius={8}
//         yAxis={[{ scaleType: "band", dataKey: "month" }]}
//         series={[{ dataKey: "seoul", color: "#60269E" }]}
//         layout="horizontal"
//         {...chartSetting}
//       />
//     </div>
//   );
// };

// export default CourseCompletionCountChart;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Design Thinking", users: 505 },
  { name: "Servant Leadership", users: 100 },
  { name: "Sustainable Development", users: 100 },
  { name: "Story Telling", users: 50 },
  { name: "Vision Boarding", users: 140 },
];

const CourseCompletionCountChart = () => {
  return (
    <div className="md:w-[42vw]">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 100,
            bottom: 20,
          }}
          barGap={2}
          barCategoryGap="10%"
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis type="number" domain={[0, 1000]} />
          <YAxis dataKey="name" type="category" width={40} />
          {/* <Legend /> */}
          <Bar dataKey="users" fill="#60269E" barSize={25} radius={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CourseCompletionCountChart;
