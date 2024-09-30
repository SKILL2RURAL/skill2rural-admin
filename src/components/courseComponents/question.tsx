import React from "react";
import { applicationMenu } from "@/assets/icons";
import Image from "next/image";


const Question: React.FC = (props : any) => {

  return (
    <li className="w-[864px] mb-6">
      <div className="flex gap-4 items-center">
        <Image src={applicationMenu} alt="app icon"/>
        <p><span className="mr-3">{props.num}.</span>{props.question}</p>
        <p className="w-[141px] h-[39px] rounded-sm border-2 text-center py-1 ml-6">{props.point}</p>
      </div>
      <div className="mt-2 ml-5">
        <label htmlFor="question" className="block mb-3 ml-2">
          <input type="checkbox" className="text-[#7F56D9] mr-2 w-4 h-4 bg-[#F9F5FF] border-[#7F56D9] rounded-lg focus:ring-[#6e48c0]" value="true" />
          True
        </label>
        <label htmlFor="question" className="block ml-2">
          <input type="checkbox" className="text-[#7F56D9] mr-2 w-4 h-4 bg-[#F9F5FF] border-[#7F56D9] rounded-lg focus:ring-[#6e48c0]" value="false" />
          False
        </label>
      </div>
    </li>
  )
}

export default Question