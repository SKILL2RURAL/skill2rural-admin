import React from "react";

interface Props {
  closeDrawer: () => void;
  handleSubmit: () => void;
  isLoading: boolean;
  isEdit: boolean;
}

const QuizFooter: React.FC<Props> = ({
  closeDrawer,
  handleSubmit,
  isLoading,
  isEdit,
}) => (
  <div className="flex justify-end border-t p-5 space-x-4">
    <button
      onClick={closeDrawer}
      className="border border-[#60269E] text-[#60269E] px-[5rem] py-2 rounded-[8px]"
    >
      Cancel
    </button>
    {isEdit ? (
      <button
        onClick={closeDrawer}
        className={`bg-[#60269E] px-[5rem] py-2 rounded-[8px] text-white ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        Back to course
      </button>
    ) : (
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`bg-[#60269E] px-[5rem] py-2 rounded-[8px] text-white ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        Save
      </button>
    )}
  </div>
);

export default QuizFooter;
