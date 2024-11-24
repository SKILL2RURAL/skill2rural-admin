"use client";
import { getAllUsers } from "@/redux/adminSlice";
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
import React, { useEffect, useState } from "react";

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (totalPage: number) => void;
}

const UsersTable: React.FC<Props> = ({
  page,
  setPage,
  totalPages,
  setTotalPages,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allUsers } = useAppSelector((state) => state.admin);
  const userCount = allUsers?.users?.length ?? 0;

  useEffect(() => {
    const getUsers = async () => {
      const res = await dispatch(getAllUsers({ search: "", page: page }));
      if (res?.payload?.data?.totalPages) {
        setTotalPages(res.payload.data.totalPages);
      } else {
        setTotalPages(1);
      }
    };
    getUsers();
  }, []);

  const handleNavigation = (id: number) => {
    router.push(`/users/${id}`);
  };

  const handleNext = async () => {
    const res = await dispatch(getAllUsers({ search: "", page: page + 1 }));
    if (res?.payload?.data?.totalPages) {
      setPage(res.payload.data.currentPage);
      setTotalPages(res.payload.data.totalPages);
    }
  };

  const handlePrev = async () => {
    const res = await dispatch(getAllUsers({ search: "", page: page - 1 }));
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
              <TableCell>User ID</TableCell>

              {/* <TableCell>User ID</TableCell> */}
              <TableCell>User</TableCell>
              <TableCell>Joined Data</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Account Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userCount > 0 &&
              allUsers?.users?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="text-[10px] md:text-[14px] cursor-pointer"
                  onClick={() => handleNavigation(row.id)}
                >
                  <TableCell scope="row">{row.id}</TableCell>

                  {/* <TableCell scope="row">{row.name}</TableCell> */}

                  <TableCell>
                    <div className="py-[2rem] md:py-4 flex flex-row gap-2 items-center">
                      <Avatar />
                      <div className="text-[13px] md:text-[14px]">
                        <p>{row.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>Sept, 10, 2023</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell className="text-[var(--primary-color)]">
                    {row.type}
                  </TableCell>
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

export default UsersTable;
