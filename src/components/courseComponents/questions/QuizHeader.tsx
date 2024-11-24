import React from "react";
import Image from "next/image";
import { cancel } from "@/assets/icons";
import { IoCloseSharp } from "react-icons/io5";

interface Props {
  closeDrawer: () => void;
  addQuestion: () => void;
  isEdit: boolean;
}

const QuizHeader: React.FC<Props> = ({ closeDrawer, addQuestion, isEdit }) => (
  <div className="relative flex justify-between items-center border-b p-5">
    <div className="w-full">
      <h2 className="text-[20px] font-[500]">Quiz Questions</h2>
      <div className="flex justify-between items-center w-full">
        <p className="text-[#A09D9D] text-[14px]">
          {isEdit ? "Edit" : "Create"} quiz questions for this course
        </p>
        <p
          className="text-[#60269E] text-[16px] font-[600] cursor-pointer"
          onClick={addQuestion}
        >
          Add New Question
        </p>
      </div>
    </div>
    <div
      className="absolute top-5 right-5 cursor-pointer"
      onClick={closeDrawer}
    >
      <IoCloseSharp size={20} />
      {/* <Image src={cancel} alt="close button" height={30} width={30} /> */}
    </div>
  </div>
);

export default QuizHeader;
