import { learning, teacher } from "@/assets/icons";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import React from "react";

const EducatorInformation = () => {
  const { singleUser } = useAppSelector((state) => state.admin);
  return (
    <div>
      <h1 className="text-[18px] font-[600] my-3">Educator Information</h1>
      <div className="shadow-md flex justify-around items-center">
        <Image src={teacher} alt="" />
        <div className="flex gap-10 ">
          <div className="space-y-3">
            <p className="text-[16px] font-[400]">Organization:</p>
            <p className="text-[16px] font-[400]">Role:</p>
            <p className="text-[16px] font-[400]">
              No of Students you want to reach:
            </p>
            <p className="text-[16px] font-[400]">
              Work with marginalised organisation:
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[16px] font-[600]">
              {singleUser?.user?.organisation || ""}
            </p>
            <p className="text-[16px] font-[600]">
              {singleUser?.user?.role || "Educator"}
            </p>
            <p className="text-[16px] font-[600]">
              {singleUser?.user?.no_of_students_to_reach || 0}
            </p>
            <p className="text-[16px] font-[600]">
              {singleUser?.user?.work_with_maginalized_populations
                ? "Yes"
                : "No"}
            </p>
          </div>
        </div>
        <Image src={learning} alt="" />
      </div>
    </div>
  );
};

export default EducatorInformation;
