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
import React from "react";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("#001", 159, 6.0, 24, 4.0),
  createData("#002", 237, 9.0, 37, 4.3),
  createData("#003", 262, 16.0, 24, 6.0),
  createData("#004", 305, 3.7, 67, 4.3),
  createData("#005", 356, 16.0, 49, 3.9),
];

const BasicTable = () => {
  return (
    <div className="mt-7">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-[#F9FAFB] border border-[#EAECF0]">
              <TableCell>User ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Joined Data</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Account Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="text-[14px]"
              >
                <TableCell scope="row">{row.name}</TableCell>
                <div className="border-b py-4 flex flex-row gap-2 items-center">
                  <Avatar />
                  <div className="text-[14px]">
                    <p>John Doe</p>
                    <p className="text-[#667085]">@o.mariam</p>
                  </div>
                </div>
                <TableCell>Sept, 10, 2023</TableCell>
                <TableCell>johndoe@gmail.com</TableCell>
                <TableCell className="text-[var(--primary-color)]">
                  Student
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

export default BasicTable;
