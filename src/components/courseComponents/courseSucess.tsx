import { growth } from "@/assets/icons";
import Image from "next/image";
import React from "react";

interface ComponentProps {
  closeModal: () => void;
  openDrawer: () => void;
}

const CourseSucess: React.FC<ComponentProps> = ({ closeModal, openDrawer }) => {
  const handleAddQuizQuestions = () => {
    closeModal();
    openDrawer();
  };
  return (
    <div className="text-center space-y-5">
      <div className="flex justify-center items-center">
        <Image src={growth} alt="" height={180} width={180} />
      </div>
      <div>
        <p className="text-[32px] font-[600]">Congratulations</p>
        <p className="text-[#909090] text-[16px] font-[600]">
          You have successfully added a new course
        </p>
      </div>
      <div className="space-y-5">
        <button
          className="bg-[#60269E] h-[60px] w-full text-white rounded-[10px]"
          onClick={handleAddQuizQuestions}
        >
          Add Quiz Questions
        </button>
        <button
          className="border border-[#60269E] text-[#60269E] h-[60px] w-full rounded-[10px]"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CourseSucess;
