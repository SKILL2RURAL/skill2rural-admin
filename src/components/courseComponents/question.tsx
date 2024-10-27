import React from "react";
import { applicationMenu } from "@/assets/icons";
import Image from "next/image";

interface QuestionData {
  id: number;
  question: string;
  point: number;
  options: string[];
  answer: number;
}

interface QuestionProps {
  question: QuestionData; // Expecting a QuestionData object
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-2">
          <Image src={applicationMenu} alt="app icon" width={20} />
          <p>
            {/* <span className="mr-3">{props.num}.</span> */}
            {question.question}
          </p>
        </div>

        <p className="w-[141px] h-[39px] rounded-sm border-2 text-center py-1 ml-6 text-[#253B4B] font-[500] text-[16px]">
          {question.point > 1
            ? `${question.point} points`
            : `${question.point} point`}
        </p>
      </div>
      <div className="mt-2 ml-5 space-y-2 text-[#253B4B] text-[16px] font-[500]">
        {question.options.map((option, index) => (
          <label
            htmlFor="question"
            className="flex items-start ml-2"
            key={index}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              className="text-[#7F56D9] mr-2 w-4 h-4 bg-[#F9F5FF] border-[#7F56D9] rounded-lg accent-purple-500"
              value={option}
              checked={index === question.answer}
            />
            <p>{option}</p>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;
