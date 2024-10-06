import React from "react";
import { applicationMenu } from "@/assets/icons";
import Image from "next/image";

const Question: React.FC = (props: any) => {
  return (
    <li className="mb-6">
      <div className="flex gap-4 items-start">
        <Image src={applicationMenu} alt="app icon" width={20} />
        <p>
          <span className="mr-3">{props.num}.</span>
          {props.question}
        </p>
        <p className="w-[141px] h-[39px] rounded-sm border-2 text-center py-1 ml-6">
          {props.point}
        </p>
      </div>
      <div className="mt-2 ml-5 space-y-2 text-[#253B4B] text-[16px] font-[500]">
        <label htmlFor="question" className="flex items-center  ml-2">
          <input
            type="checkbox"
            className="text-[#7F56D9] mr-2 w-4 h-4 bg-[#F9F5FF] border-[#7F56D9] rounded-lg focus:ring-[#6e48c0]"
            value="true"
          />
          <p>True</p>
        </label>
        <label htmlFor="question" className="flex items-center ml-2">
          <input
            type="checkbox"
            className="text-[#7F56D9] mr-2 w-4 h-4 bg-[#F9F5FF] border-[#7F56D9] rounded-lg focus:ring-[#6e48c0]"
            value="false"
          />
          False
        </label>
      </div>
    </li>
  );
};

export default Question;
