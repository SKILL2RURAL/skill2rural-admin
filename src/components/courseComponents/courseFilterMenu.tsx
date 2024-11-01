import { getAllCourses } from "@/redux/adminSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Menu } from "@mui/material";
import React, { useState } from "react";

const CourseFilterMenu = ({
  isOpen,
  onClose,
  anchorEl,
}: {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    type: "Free",
    status: "ACTIVE",
  });
  // console.log(data);

  const handleApply = (e: any) => {
    e.stopPropagation();
    dispatch(getAllCourses({ type: data.type, status: data.status }));
    onClose();
  };
  return (
    <Menu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      MenuListProps={{
        "aria-labelledby": `coursesFilter`,
      }}
    >
      <div className="p-3 px-2 w-[300px]">
        <h1>Filter by</h1>
        <div>
          <div>
            <label className="text-[14px] font-[400]">Course Type</label>
            <select
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value })}
              className="w-full outline-none border border-[#E8E8E8] rounded-[4px] p-3"
            >
              <option value="FREE">Free</option>
              <option value="PAID">Paid</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="text-[14px] font-[400]">Status</label>
            <select
              value={data.status}
              onChange={(e) => setData({ ...data, status: e.target.value })}
              className="w-full outline-none border border-[#E8E8E8] rounded-[4px] p-3"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
        <div className="grid gap-2">
          <button
            className="py-2 text-white bg-[#60269E] rounded-[4px]"
            onClick={(e) => handleApply(e)}
          >
            Apply
          </button>
          <button
            className="py-2 text-[#60269E] border border-[#60269E] rounded-[4px]"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Menu>
  );
};

export default CourseFilterMenu;
