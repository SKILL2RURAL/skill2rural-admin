import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { message, purple_message } from "@/assets/icons";
import { useAppSelector } from "@/redux/hooks";

const CoursesCompletedTable = () => {
  const { userCourses } = useAppSelector((state) => state.admin);

  function formatDate(isoDate: string) {
    // Create a new Date object from the input ISO string
    const date = new Date(isoDate);

    // Define an array of month names
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Get the month, day, and year from the date
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the date as Month, day, year
    return `${month}, ${day}, ${year}`;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="bg-[#F9FAFB]">
          <TableRow>
            <TableCell className="text-[12px] text-[#667085]">S/N</TableCell>
            <TableCell align="left" className="text-[12px] text-[#667085]">
              Courses
            </TableCell>
            <TableCell align="left" className="text-[12px] text-[#667085]">
              Enrolled date
            </TableCell>
            {/* <TableCell align="left" className="text-[12px] text-[#667085]">
              Completion date
            </TableCell> */}
            <TableCell align="left" className="text-[12px] text-[#667085]">
              Quiz attempt
            </TableCell>
            <TableCell align="left" className="text-[12px] text-[#667085]">
              Quiz Final Score
            </TableCell>
            {/* <TableCell align="left" className="text-[12px] text-[#667085]">
              Status
            </TableCell> */}
            <TableCell
              align="left"
              className="text-[12px] text-[#667085]"
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userCourses &&
            userCourses.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="left">{row?.courseTitle}</TableCell>
                <TableCell align="left">
                  {formatDate(row.enrolledDate)}
                </TableCell>
                {/* <TableCell align="left">{row.completedDate}</TableCell> */}
                <TableCell align="left">{row.quizzesAttempted}</TableCell>
                <TableCell align="left" className="">
                  {row.highestQuizGrade || 0}
                </TableCell>
                {/* <TableCell align="left">
                  <p
                    className={`${
                      row.status === "Completed"
                        ? "bg-[#ECFDF3] text-[#027A48]"
                        : "text-[#FF9500] bg-[#FFFBF5]"
                    }  w-fit px-4 py-1 rounded-[16px] text-[12px] font-[500]`}
                  >
                    {row.status}
                  </p>
                </TableCell> */}
                <TableCell className="flex flex-col md:flex-row items-center border-b h-full gap-3 py-[30px]  md:py-[24px]">
                  <p className="text-[#60269E] text-[12px] text-center md:text-right md:text-[14px] font-[500] cursor-pointer">
                    View Certificate
                  </p>
                  <Image
                    src={purple_message}
                    alt="message"
                    width={20}
                    className="cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoursesCompletedTable;
