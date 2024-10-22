import React, { useState } from "react";
import { trash_can, edit, more } from "@/assets/icons";
import Image from "next/image";
import ReusableModal from "./modal";
import EditCourse from "./editCourseForm";
import { LiaEdit } from "react-icons/lia";
import QuestionsDrawer from "./questionsDrawer";

interface EditButtonProps {
  id: number;
  courseDetails: any;
}

const EditButton: React.FC<EditButtonProps> = ({ id, courseDetails }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex gap-3 items-center w-[7rem]">
      <p onClick={handleClick}>
        <LiaEdit color="#667085" size={20} />
      </p>
      <p>
        <Image src={trash_can} alt="delete button" />
      </p>
      <p>
        <Image src={more} alt="more button" />
      </p>
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
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default EditButton;
