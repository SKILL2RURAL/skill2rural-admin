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

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (totalPage: number) => void;
}

const CourseTable: React.FC<Props> = ({
  page,
  setPage,
  totalPages,
  setTotalPages,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allCourses } = useAppSelector((state) => state.admin);

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
    const getCourses = async () => {
      const res = await dispatch(getAllCourses({ search: "" }));
      if (res?.payload?.data?.totalPages) {
        setTotalPages(res.payload.data.totalPages);
      } else {
        setTotalPages(1);
      }
    };
    getCourses();
  }, []);

  const handleNext = async () => {
    const res = await dispatch(getAllCourses({ search: "", page: page + 1 }));
    if (res?.payload?.data?.totalPages) {
      setPage(res.payload.data.currentPage);
      setTotalPages(res.payload.data.totalPages);
    }
  };

  const handlePrev = async () => {
    const res = await dispatch(getAllCourses({ search: "", page: page - 1 }));
    if (res?.payload?.data?.totalPages) {
      setPage(res.payload.data.currentPage);
      setTotalPages(res.payload.data.totalPages);
    }
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
              <TableCell>Publish by</TableCell>
              <TableCell>Publish Date</TableCell>
              <TableCell>Course Completion</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCourses &&
              allCourses?.courses?.length > 0 &&
              allCourses?.courses?.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="text-[10px] md:text-[14px] cursor-pointer"
                >
                  <TableCell
                    scope="row"
                    onClick={() => handleNavigation(row.id)}
                  >
                    {row.id}
                  </TableCell>
                  <TableCell onClick={() => handleNavigation(row.id)}>
                    {row.title}
                  </TableCell>
                  <TableCell onClick={() => handleNavigation(row.id)}>
                    {row.type || ""}
                  </TableCell>
                  <TableCell onClick={() => handleNavigation(row.id)}>
                    <div className="flex gap-2 items-center">
                      <Avatar />
                      <div className="flex flex-col">
                        <p>Admin</p>
                        <span className="text-[#667085]">@admin</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell onClick={() => handleNavigation(row.id)}>
                    {formatDate(row.createdAt)}
                  </TableCell>
                  <TableCell>100 users</TableCell>
                  <TableCell>
                    <p
                      className={` w-fit p-2 rounded-[16px] ${
                        row.status === "ACTIVE"
                          ? "text-[#027A48] bg-[#ECFDF3]"
                          : "text-red-500 bg-red-100"
                      }`}
                    >
                      {row?.status}
                    </p>
                  </TableCell>
                  <TableCell width={50}>
                    <EditButton id={row.id} courseDetails={row} index={index} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="text-[14px] flex justify-between items-center p-3 border rounded-b-[8px] bg-white">
        <div>
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            className={`shadow-md rounded-[8px] border border-[#D0D5DD] p-4 py-2 ${
              page <= 1 ? "opacity-50" : ""
            }`}
            onClick={() => {
              if (page > 1) {
                handlePrev();
              }
            }}
          >
            Previous
          </button>
          <button
            disabled={totalPages <= 1 || totalPages === page}
            className={`border border-[#D0D5DD] shadow-md rounded-[8px] p-4 py-2 ${
              totalPages <= 1 || totalPages === page ? "opacity-50" : ""
            }`}
            onClick={() => {
              if (totalPages > 1 && totalPages !== page) {
                handleNext();
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
