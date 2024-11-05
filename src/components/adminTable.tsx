import { useAppSelector } from "@/redux/hooks";
import { baseUrl } from "@/utils/constants";
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React from "react";

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (totalPage: number) => void;
}

const AdminTable: React.FC<Props> = ({
  page,
  setPage,
  totalPages,
  setTotalPages,
}) => {
  const { adminList, token } = useAppSelector((state) => state.admin);
  const handleNext = async () => {
    const response = await axios.get(
      `${baseUrl}/admin/admins?page=${page + 1}&pageSize=10`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response?.status === 200) {
      const { currentPage, totalPages } = response.data.data;
      setPage(currentPage);
      setTotalPages(totalPages);
    }
  };

  const handlePrev = async () => {
    const response = await axios.get(
      `${baseUrl}/admin/admins?page=${page - 1}&pageSize=10`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response?.status === 200) {
      const { currentPage, totalPages } = response.data.data;
      setPage(currentPage);
      setTotalPages(totalPages);
    }
  };

  // console.log(adminList);
  return (
    <div className="mt-3 md:mt-7">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-[#F9FAFB] border border-[#EAECF0]">
              <TableCell>User ID</TableCell>
              <TableCell>User Details</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Date Joined</TableCell>

              <TableCell>Account Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminList &&
              adminList.length > 0 &&
              adminList?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="text-[10px] md:text-[14px] cursor-pointer"
                >
                  <TableCell scope="row">{row.id}</TableCell>
                  <TableCell>
                    <div className="py-[2rem] md:py-4 flex flex-row gap-2 items-center">
                      <Avatar src={row?.profile_photo || ""} />
                      <div className="text-[13px] md:text-[14px]">
                        <p>{row.name}</p>
                        <p className="text-[#667085]">{row.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Sept, 10, 2024</TableCell>

                  <TableCell>
                    <p
                      className={`${
                        row.status === "ACTIVE"
                          ? "text-[#027A48] bg-[#ECFDF3]"
                          : "text-[#E71D36] bg-[#FEF6F7]"
                      } text-[12px] px-3  bg-[#ECFDF3] w-fit p-2 rounded-[16px]`}
                    >
                      {row.status}
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

export default AdminTable;
