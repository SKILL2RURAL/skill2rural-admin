import { CiSearch } from "react-icons/ci";
import { RxPerson } from "react-icons/rx";
import Table from "../users/table";
import { MdOutlineFileDownload } from "react-icons/md";
import UsersTable from "../users/usersTable";
import ReusableModal from "@/components/courseComponents/modal";
import InviteUser from "@/components/invite-user";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";

const Team = () => {
  const { allUsers } = useAppSelector((state) => state.admin);

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="my-5">
      <div className="md:flex space-y-5 justify-between items-center">
        <div className="flex gap-3">
          <div className="border border-[#D0D5DD] shadow-sm bg-white flex gap-2 items-center p-2 rounded-[8px] h-full">
            <CiSearch color="#667085" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="w-[300px] bg-transparent placeholder:text-[#667085] outline-none"
            />
          </div>
        </div>
        <div className="text-[14px] space-x-3 flex ">
          <div className="bg-[var(--primary-color)] px-4 py-3 rounded-[8px] text-white flex gap-1 items-center">
            <MdOutlineFileDownload size={20} />
            Message All Users
          </div>
          <div
            className="bg-[var(--primary-color)] px-4 py-3 rounded-[8px] text-white flex gap-1 items-center cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <RxPerson size={20} cursor="pointer" />
            Invite Members
          </div>
        </div>
      </div>
      <div className="mt-5">Team Members - {allUsers?.users?.length || 0}</div>

      {/* <div> */}
      <UsersTable />
      {/* </div> */}
      <ReusableModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InviteUser onClose={() => setIsModalOpen(false)} />
      </ReusableModal>
    </div>
  );
};

export default Team;
