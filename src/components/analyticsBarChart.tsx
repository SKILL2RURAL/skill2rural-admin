// "use client";
// import React from "react";
// import { BarChart } from "@mui/x-charts/BarChart";
// import { axisClasses } from "@mui/x-charts/ChartsAxis";
// import { dataset } from "@/utils/analyticsDataset";

// const chartSetting = {
//   //   yAxis: [
//   //     {
//   //       label: "rainfall (mm)",
//   //     },
//   //   ],
//   width: 600,
//   height: 300,
//   sx: {
//     [`.${axisClasses.left} .${axisClasses.label}`]: {
//       transform: "translate(-10px, 0)",
//     },
//   },
// };

// const AnalyticsBarChart = () => {
//   return (
//     <div>
//       <BarChart
//         dataset={dataset}
//         borderRadius={8}
//         xAxis={[{ scaleType: "band", dataKey: "month" }]}
//         series={[
//           { dataKey: "newYork", color: "#60269E", label: "New York" },
//           { dataKey: "seoul", color: "#51A3DA", label: "Seoul" },
//         ]}
//         {...chartSetting}
//       />
//     </div>
//   );
// };

// export default AnalyticsBarChart;

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
  {
    name: "January",
    Sales: 4000,
    Expenses: 2400,
  },
  {
    name: "February",
    Sales: 3000,
    Expenses: 1398,
  },
  {
    name: "March",
    Sales: 2000,
    Expenses: 9800,
  },
  {
    name: "April",
    Sales: 2780,
    Expenses: 3908,
  },
  {
    name: "May",
    Sales: 1890,
    Expenses: 4800,
  },
  {
    name: "June",
    Sales: 2390,
    Expenses: 3800,
  },
  {
    name: "July",
    Sales: 3490,
    Expenses: 4300,
  },
];

const AnalyticsBarChart = () => {
  return (
    <div className="md:w-[39vw]">
      <ResponsiveContainer width="100%" height={400} minWidth={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap="10%"
          barGap={2}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Sales" fill="#60269E" radius={[10, 10, 0, 0]} />
          <Bar dataKey="Expenses" fill="#51A3DA" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsBarChart;
