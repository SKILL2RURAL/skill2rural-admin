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
  return (
    <Menu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      MenuListProps={{
        "aria-labelledby": `coursesFilter`,
      }}
      //   sx={{ width: "300px", maxWidth: "300px" }}
    >
      <div className="p-3 px-2 w-[300px]">
        <h1>Filter by</h1>
        <div>
          <div>
            <label className="text-[14px] font-[400]">Course Type</label>
            <select className="w-full outline-none">
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div>
            <label className="text-[14px] font-[400]">Status</label>
            <select className="w-full outline-none">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
        <div className="grid gap-2">
          <button className="py-2 text-white bg-[#60269E] rounded-[4px]">
            Apply
          </button>
          <button className="py-2 text-[#60269E] border border-[#60269E] rounded-[4px]">
            Cancel
          </button>
        </div>
      </div>
    </Menu>
  );
};

export default CourseFilterMenu;
