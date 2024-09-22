"use client";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Paper,
  
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { trash_can, edit, more } from "@/assets/icons";

function createData(
  name: string,
  course: string,
  courseType: string,
  publishby: string,
  publishDate: number,
  courseCompletion: string,
  status: string,
) {
  return { name, course, courseType, publishby, publishDate, courseCompletion, status};
}

const rows = [
  createData("#001", 'Design Thinking', 'Free', 'Admin', 2024, '100 users', 'Active'),
  createData("#001", 'Servant Leadership', 'Free', 'Admin', 2024, '100 users', 'Active'),
  createData("#001", 'Vision Boarding', 'Paid', 'Admin', 2024, '100 users', 'Active'),
  createData("#001", 'Sustainable Development Goal', 'Free', 'Admin', 2024, '100 users', 'Active'),
  createData("#001", 'Money Management', 'Paid', 'Admin', 2024, '100 users', 'Active'),
];

const CourseTable = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/courses/${1}`);
  };
  return (
    <div className="mt-3 md:mt-7">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-[#F9FAFB] border border-[#EAECF0]">
              <TableCell>Course ID</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Course Type</TableCell>
              <TableCell>Publishby</TableCell>
              <TableCell>Publish Date</TableCell>
              <TableCell>Course Completion</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="text-[10px] md:text-[14px] cursor-pointer"
                onClick={() => handleNavigation()}
              >
                <TableCell scope="row">{row.name}</TableCell>
                <TableCell>{row.course}</TableCell>
                <TableCell>{row.courseType}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <p className="h-8 w-8 rounded-[50%] bg-[#B9DABB] text-[#102E21] text-sm text-center py-2">AD</p>
                    <div className="flex flex-col">
                      <p>{row.publishby}</p>
                      <span className="text-[#667085]">@admin</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {row.publishDate}
                </TableCell>
                <TableCell>{row.courseCompletion}</TableCell>
                <TableCell>
                  <p className="text-[#027A48] bg-[#ECFDF3] w-fit p-2 rounded-[16px]">
                    Active
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="text-[14px] flex justify-between items-center p-3 border rounded-b-[8px] bg-white">
        <div>Page 1 of 10</div>
        <div className="flex gap-2">
          <button className="shadow-md rounded-[8px] border border-[#D0D5DD] p-4 py-2">
            Previous
          </button>
          <button className="border border-[#D0D5DD] shadow-md rounded-[8px] p-4 py-2">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
