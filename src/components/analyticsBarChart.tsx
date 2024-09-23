import { useAppSelector } from "@/redux/hooks";
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

const AnalyticsBarChart = () => {
  const { analytics } = useAppSelector((state) => state.admin);

  return (
    <div className="md:w-[39vw]">
      <ResponsiveContainer width="100%" height={400} minWidth={300}>
        <BarChart
          width={500}
          height={300}
          data={analytics?.usersPerMonth}
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
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="userCount" fill="#60269E" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsBarChart;
