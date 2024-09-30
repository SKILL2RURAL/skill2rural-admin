import React, { useState } from 'react'
import { trash_can, edit, more } from "@/assets/icons";
import Image from "next/image";
import ReusableModal from './modal';
import EditCourse from './editCourseForm';

const EditButton: React.FC = () => {
 const [isOpen, setIsOpen] = useState<boolean>(false)

 const handleClick = () => {
  setIsOpen(true)
 }

 const handleClose = () => {
  setIsOpen(false)
 }

  return (
    <div className="flex gap-3 items-center">
      <p onClick={handleClick}><Image src={edit} alt="edit button"/></p>
      <p><Image src={trash_can} alt="delete button" /></p>
      <p><Image src={more} alt="more button"/></p>
      <ReusableModal isOpen={isOpen} onClose={handleClose}>
        <EditCourse />
      </ReusableModal>
    </div>
)}

export default EditButton;