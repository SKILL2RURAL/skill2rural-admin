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
import React, { useEffect } from "react";

const UsersTable = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allUsers } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleNavigation = (id: number) => {
    router.push(`/users/${id}`);
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
            {allUsers?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="text-[10px] md:text-[14px] cursor-pointer"
                onClick={() => handleNavigation(row.id)}
              >
                <TableCell scope="row">{row.id}</TableCell>

                {/* <TableCell scope="row">{row.name}</TableCell> */}
                <span className="border-b py-4 flex flex-row gap-2 items-center">
                  <Avatar />
                  <span className="text-[13px] md:text-[14px]">
                    <p>{row.name}</p>
                    <p className="text-[#667085]">@o.mariam</p>
                  </span>
                </span>
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

export default UsersTable;
