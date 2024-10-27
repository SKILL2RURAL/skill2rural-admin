import React, { useState } from "react";
import { trash_can, edit, more, delete_icon } from "@/assets/icons";
import Image from "next/image";
import ReusableModal from "./modal";
import EditCourse from "./editCourseForm";
import { LiaEdit } from "react-icons/lia";
import QuestionsDrawer from "./questionsDrawer";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import DeleteDialog from "./deleteDialog";
import { getAllCourses } from "@/redux/adminSlice";

interface EditButtonProps {
  id: number;
  courseDetails: any;
  index: number;
}

const EditButton: React.FC<EditButtonProps> = ({
  id,
  courseDetails,
  index,
}) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.admin);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteCourse = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(
        `${baseUrl}/admin/course/delete/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        toast.success(res.data.messsage || "Course deleted successfully");
        handleCloseDialog();
        dispatch(getAllCourses());
      } else {
        toast.error(
          res.data.message || "An error occured while deleting course"
        );
      }
    } catch (error: any) {
      toast.error(error.response.data.message || "an error occured");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-3 items-center w-[3rem]">
      <button
        id={`button-${index}`}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
          setIsMenuOpen(true);
        }}
      >
        <Image src={more} alt="more button" />
      </button>
      <Menu
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": `button-${index}`,
        }}
        className=""
      >
        <p
          className="p-3 py-2 border-b text-[14px] font-[400] cursor-pointer"
          onClick={() => {
            setIsMenuOpen(false);
            handleClick();
          }}
        >
          Edit course
        </p>
        <p
          className="p-3 py-2 border-b text-[14px] font-[400] cursor-pointer"
          onClick={() => {
            setIsDrawerOpen(true);
            setIsMenuOpen(false);
            // window.location.href = `/co`;
          }}
        >
          Edit quiz questions
        </p>
        <p
          className="p-3 py-2 cursor-pointer text-[14px] font-[400]"
          onClick={handleOpenDialog}
        >
          Delete course
        </p>
      </Menu>

      {/* Confirmation Dialog for Delete */}

      <ReusableModal isOpen={isDialogOpen} onClose={handleCloseDialog}>
        <DeleteDialog
          handleDeleteCourse={handleDeleteCourse}
          isLoading={isLoading}
          handleCloseDialog={handleCloseDialog}
        />
      </ReusableModal>

      <ReusableModal isOpen={isOpen} onClose={handleClose}>
        <EditCourse
          id={id}
          editCourse={true}
          existingCourseDetails={courseDetails}
          onClose={() => handleClose()}
          openDrawer={() => setIsDrawerOpen(true)}
        />
      </ReusableModal>
      <QuestionsDrawer
        isOpen={isDrawerOpen}
        isEdit={true}
        existingCourseId={id}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default EditButton;
