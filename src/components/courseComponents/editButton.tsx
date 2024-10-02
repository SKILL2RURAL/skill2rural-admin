import React, { useState } from 'react'
import { trash_can, edit, more } from "@/assets/icons";
import Image from "next/image";
import ReusableModal from './modal';
import EditCourse from './editCourseForm';
import EditQuizQuestion from './editQuizQuestion';


const EditButton: React.FC = () => {
 const [isOpen, setIsOpen] = useState<boolean>(false)

 const [editCourse, setEditCourse] = useState<boolean>(false)

 const openEdit = () => {
    setEditCourse(prev => !prev);
 }

 const closeEdit = () => {
  setEditCourse(prev => !prev);
 }

 const handleClick = () => {
  setIsOpen(true)
 }

 const handleClose = () => {
  setIsOpen(false)
 }

 

//  className="fixed right-0 top-0 h-screen w-[400px] bg-white shadow-lg p-5"

  return (
    <>
      <div className="flex gap-3 items-center relative">
        <p onClick={handleClick}><Image src={edit} alt="edit button"/></p>
        <p><Image src={trash_can} alt="delete button" /></p>
        <p><Image src={more} alt="more button"/></p>
        {!editCourse && <ReusableModal isOpen={isOpen} onClose={handleClose}><EditCourse openEdit={openEdit}/></ReusableModal>}
        {editCourse && <ReusableModal isOpen={isOpen} editCourse={editCourse}><EditQuizQuestion onClose={closeEdit}/></ReusableModal>}
      </div>
    </>
)}

export default EditButton;