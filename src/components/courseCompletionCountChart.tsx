import { useAppSelector } from "@/redux/hooks";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const CourseCompletionCountChart = () => {
  const { analytics } = useAppSelector((state) => state.admin);

  return (
    <div className="md:w-[42vw]">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={analytics?.courseCompletionsPerCourse}
          margin={{
            top: 20,
            right: 30,
            left: 100,
            bottom: 20,
          }}
          barGap={2}
          barCategoryGap="10%"
        >
          <XAxis type="number" />
          <YAxis dataKey="title" type="category" width={40} />
          <Bar
            dataKey="numberOfCourseCompletions"
            fill="#60269E"
            barSize={25}
            radius={10}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CourseCompletionCountChart;
