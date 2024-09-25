"use client"
import React, { useState } from 'react'
import Modal from './modal'
import ReusableModal from './editCourseModal'
import CourseForm from './courseForm'


const ActionButton: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className="text-[14px] space-x-3">
      <button className="bg-[var(--primary-color)] px-4 py-3 rounded-[4px] text-white">
        Export CSV
      </button>
      <button className="bg-[var(--primary-color)] px-4 py-3 rounded-[4px] text-white" onClick={handleOpen}>
        Add New Course
      </button>
      {/* <Editcourse open={open} handleClose={handleClose} /> */}
      <ReusableModal isOpen={open} onClose={handleClose}>
        <CourseForm />
      </ReusableModal>
      {/* <Modal isOpen={open} onClose={handleClose}/> */}
    </div>
  )
}

export default ActionButton