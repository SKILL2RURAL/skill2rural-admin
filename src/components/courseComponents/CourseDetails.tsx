import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import React from "react";

const CourseDetails: React.FC = (props) => {
  const { courseDetails } = useAppSelector((state) => state.admin);

  return (
    <div className="bg-white p-10 mt-6 font-neue-haas">
      <div className="flex mb-10">
        <p className="text-[#253B4B] w-[10rem]">Course title</p>
        <input
          type="type"
          value={courseDetails?.title}
          className="w-full border border-[#C4C4C4] rounded-[10px] pl-2 py-4 outline-none"
          disabled
        />
      </div>
      <div className="flex mb-10">
        <p className="text-[#253B4B] w-[10rem]">Description</p>

        <textarea
          value={courseDetails?.description}
          className="border border-[#C4C4C4] w-full p-4 min-h-[200px] rounded-[10px]"
          disabled
        />
      </div>
      <div className="flex mb-10">
        <p className="text-[#253B4B] w-[10rem]">Course type</p>
        <select
          className="outline-none w-full border border-[#C4C4C4] rounded-[10px] py-4 pl-2"
          disabled
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>
      <div className="flex gap-12">
        <p className="text-[#253B4B] w-500 text-lg">Thumbnail</p>
        <p className="w-[110px] h-[95px] border border-[#C4C4C4] rounded-md relative">
          <Image
            src={courseDetails?.thumbnail_image || ""}
            alt="thumbnail"
            className="h-full w-full"
            width={20}
            height={20}
          />
        </p>
      </div>
    </div>
  );
};

export default CourseDetails;
