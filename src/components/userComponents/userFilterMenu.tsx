import { getAllUsers } from "@/redux/adminSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Menu } from "@mui/material";
import { useState } from "react";

const UserFilterMenu = ({
  isOpen,
  onClose,
  anchorEl,
}: {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("STUDENT");

  const handleApply = (e: any) => {
    e.stopPropagation();
    onClose();
    dispatch(getAllUsers({ type: userType }));
  };
  return (
    <Menu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      MenuListProps={{
        "aria-labelledby": `usersFilter`,
      }}
    >
      <div className="p-3 px-2 w-[300px]">
        <h1>Filter by</h1>
        <div>
          <div>
            <label className="text-[14px] font-[400]">User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full outline-none border rounded-[4px] border-[#E8E8E8] p-2 mt-1 mb-5"
            >
              <option value="STUDENT" defaultValue="STUDENT">
                STUDENT
              </option>
              <option value="EDUCATOR">EDUCATOR</option>
            </select>
          </div>
        </div>
        <div className="grid gap-2">
          <button
            disabled={isLoading}
            className={`${
              isLoading ? "opacity-50" : ""
            } py-2 text-white bg-[#60269E] rounded-[4px]`}
            onClick={(e) => handleApply(e)}
          >
            Apply
          </button>
          <button
            className={`py-2 text-[#60269E] border border-[#60269E] rounded-[4px] ${
              isLoading ? "opacity-50" : ""
            }`}
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

export default UserFilterMenu;
