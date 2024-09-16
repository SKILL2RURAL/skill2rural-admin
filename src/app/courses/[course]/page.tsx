import React from "react"
import { calendar, multiple_users, book } from "@/assets/icons";
import Image from "next/image";
import VideoPlayer from "@/components/videoPlayer";
import QuestionsList from "@/components/questions/questionList";

const  Course: React.FC = (pros) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image src={book} alt="" width={40} />
          <h1 className="text-[18px] md:text-[24px] font-[600]">Courses</h1>
        </div>
        <div className="text-[12px] md:text-[16px] font-[300] flex gap-2 items-center">
          <Image src={calendar} alt="date" width={40} />
          <p>Saturday, August 10, 2024</p>
        </div>
      </div>
      <div className="flex justify-between items-center my-5">
        <p>
          Courses /{" "}
          <span className="text-[var(--primary-color)] text-[14px] font-[600]">
            Design Thinking
          </span>
        </p>
      </div>
      <VideoPlayer />
      <div>
        <QuestionsList />
      </div>
    </>
  )
}

export default Course