"use client";
import EditButton from "@/components/courseComponents/editButton";
import { getAllCourses } from "@/redux/adminSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Paper,
  Avatar,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CourseTable = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allCourses } = useAppSelector((state) => state.admin);

  console.log(allCourses);

  const handleNavigation = (id: number) => {
    router.push(`/courses/${id}`);
  };

  function formatDate(isoDate: string) {
    const date = new Date(isoDate);
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
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}, ${day}, ${year}`;
  }
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  return (
    <div className="mt-3 md:mt-7">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-[#F9FAFB] border border-[#EAECF0]">
              <TableCell>Course ID</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Course Type</TableCell>
              <TableCell>Publish by</TableCell>
              <TableCell>Publish Date</TableCell>
              <TableCell>Course Completion</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCourses &&
              allCourses.length > 0 &&
              allCourses?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="text-[10px] md:text-[14px] cursor-pointer"
                  onClick={() => handleNavigation(row.id)}
                >
                  <TableCell scope="row">{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <Avatar />
                      <div className="flex flex-col">
                        <p>Admin</p>
                        <span className="text-[#667085]">@admin</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                  <TableCell>100 users</TableCell>
                  <TableCell>
                    <p className="text-[#027A48] bg-[#ECFDF3] w-fit p-2 rounded-[16px]">
                      Active
                    </p>
                  </TableCell>
                  <TableCell>
                    <EditButton />
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
