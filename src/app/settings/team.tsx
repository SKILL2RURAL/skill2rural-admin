import { CiSearch } from "react-icons/ci";
import { RxPerson } from "react-icons/rx";
import Table from "../users/table";
import { MdOutlineFileDownload } from "react-icons/md";
import UsersTable from "../users/usersTable";
import ReusableModal from "@/components/courseComponents/modal";
import InviteUser from "@/components/invite-user";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import AdminTable from "@/components/adminTable";
import { setAdminList } from "@/redux/adminSlice";

const Team = () => {
  const dispatch = useAppDispatch();
  const { allUsers, token, adminList } = useAppSelector((state) => state.admin);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getAdminList = async () => {
      const response = await axios.get(
        `${baseUrl}/admin/admins?page=${page}&pageSize=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log(response);
        const { admins, currentPage, totalPages } = response.data.data;
        dispatch(setAdminList(admins));
        if (currentPage) {
          setPage(currentPage);
        } else {
          setPage(1);
        }
        if (totalPages) {
          setTotalPages(totalPages);
        }
      }
    };
    getAdminList();
  }, []);

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
            Export CSV
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
      <div className="mt-5">Team Members - {adminList?.length}</div>

      {/* <div> */}
      <AdminTable
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
      />
      {/* </div> */}
      <ReusableModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InviteUser onClose={() => setIsModalOpen(false)} />
      </ReusableModal>
    </div>
  );
};

export default Team;
