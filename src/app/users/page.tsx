"use client";

import {
  blue_users,
  calendar,
  green_users,
  message,
  multiple_users,
  orange_users,
} from "@/assets/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import UsersTable from "../../components/userComponents/usersTable";
import { getCurrentDateFormatted } from "@/utils/date";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAllUsers, getUserStats, setAllUser } from "@/redux/adminSlice";
import axios from "axios";
import UserFilterMenu from "@/components/userComponents/userFilterMenu";
import ReusableModal from "@/components/courseComponents/modal";
import MessageAllUsersModal from "@/components/MessageAllUsersModal";

interface metric {
  icon: string;
  label: string;
  amount: number;
  reachOut?: number | string;
  percentage?: number;
}

const User = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [isMessageAllUsersModalOpen, setIsMessageAllUsersModalOpen] =
    useState(false);
  const { userStats, allUsers, token } = useAppSelector((state) => state.admin);
  const [activeTab, setActiveTab] = useState("allUsers");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    dispatch(getUserStats());
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      const res = await dispatch(getAllUsers({ search }));
      if (res?.payload?.data?.currentPage) {
        setPage(res.payload.data.currentPage);
      } else {
        setPage(1);
      }
      if (res?.payload?.data?.totalPages) {
        setTotalPages(res.payload.data.totalPages);
      } else {
        setTotalPages(1);
      }
    };
    handleSearch();
  }, [search]);

  function formatNumber(num: number): string | number {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
    }
    return num;
  }

  const metrics: metric[] = [
    {
      icon: blue_users,
      label: "Total users",
      percentage: userStats?.totalUsers?.percentageIncreaseInTotalUsers || 0,
      amount: userStats?.totalUsers?.value || 0,
    },
    {
      icon: green_users,
      label: "Educators",
      percentage:
        userStats?.totalEducators?.percentageIncreaseInTotalEducators || 0,
      amount: userStats?.totalEducators?.value || 0,
      reachOut: formatNumber(userStats?.totalEducators?.totalReached || 0),
    },
    {
      icon: orange_users,
      label: "Students",
      percentage:
        userStats?.totalStudents?.percentageIncreaseInTotalStudents || 0,
      amount: userStats?.totalStudents?.value || 0,
    },
  ];

  return (
    <div className="font-neue-haas">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image src={multiple_users} alt="" width={40} />
          <h1 className="text-[24px] font-[600]">User</h1>
        </div>
        <div className="text-[12px] md:text-[16px] font-[300] flex gap-2 items-center">
          <Image src={calendar} alt="date" width={40} />
          <p>{getCurrentDateFormatted()}</p>
        </div>
      </div>
      <div className="h-[30px]" />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {metrics.map((metric: any, index: number) => (
            <div
              key={index}
              className="flex justify-between border rounded-[8px] p-3 border-[#EAECF0] shadow-sm"
            >
              <div className="flex flex-col gap-3">
                <Image src={metric.icon} alt={metric.label} width={50} />
                <div>
                  <p className="text-[#A3AED0] font-[500] text-[13px]">
                    {metric.label}
                  </p>
                  <p className="text-[33px] font-[600]">{metric.amount}</p>
                </div>
              </div>
              <div className="flex flex-col justify-end space-y-1 items-end">
                {metric?.reachOut && (
                  <div className="space-x-1">
                    <span className="text-[#101828] text-[16px] font-[600]">
                      {metric.reachOut}
                    </span>
                    <span className="text-[#A3AED0] text-[11px] font-[400]">
                      Total reach out
                    </span>
                  </div>
                )}

                <div className="space-x-1">
                  <span className="text-[#027A48] text-[16px] font-[500]">
                    {metric.percentage}%
                  </span>
                  <span className="text-[#A3AED0] text-[11px] font-[400]">
                    vs last month
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-[30px]" />
        <div className="py-3 md:py-3 text-[12px] md:text-[14px] font-[400] text-[#878787] flex justify-around md:justify-start md:gap-10 bg-white md:p-4 md:px-5 rounded-[8px] font-karla">
          <p
            className={`${
              activeTab === "allUsers"
                ? "border-b border-[var(--primary-color)] text-[var(--primary-color)]"
                : ""
            } cursor-pointer pb-2 md:px-10`}
            onClick={() => {
              setActiveTab("allUsers");
              dispatch(getAllUsers({ status: "" }));
            }}
          >
            All Users
          </p>
          <p
            className={`${
              activeTab === "activeUsers"
                ? "border-b border-[var(--primary-color)] text-[var(--primary-color)]"
                : ""
            } cursor-pointer pb-2 md:px-10`}
            onClick={() => {
              setActiveTab("activeUsers");
              dispatch(getAllUsers({ status: "ACTIVE" }));
            }}
          >
            Active Users
          </p>
          <p
            className={`${
              activeTab === "deactivatedUsers"
                ? "border-b border-[var(--primary-color)] text-[var(--primary-color)]"
                : ""
            } cursor-pointer pb-2 md:px-10`}
            onClick={() => {
              setActiveTab("deactivatedUsers");
              dispatch(getAllUsers({ status: "DEACTIVATED" }));
            }}
          >
            Deactivated Users
          </p>
        </div>
        <div className="h-[30px]" />
        <div className="md:flex space-y-5 md:space-y-0 justify-between items-center">
          <div className="flex gap-3">
            <div className="border border-[#D0D5DD] shadow-sm bg-white flex gap-2 items-center p-2 rounded-[8px] h-full">
              <CiSearch color="#667085" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-[50vw] md:w-[300px] bg-transparent placeholder:text-[#667085] outline-none"
              />
            </div>
            <button
              id="usersFilter"
              className="relative"
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setIsMenuOpen(true);
              }}
            >
              <div className="cursor-pointer bg-[#BDD4F114] border border-[#BDD4F199] h-full text-[13px] p-2 pr-8 w-[70px] outline-none appearance-none">
                <p>Filter</p>
              </div>
              <IoIosArrowDown className="absolute right-3 top-[12px]" />
              <UserFilterMenu
                isOpen={isMenuOpen}
                onClose={() => {
                  setIsMenuOpen(false);
                  setAnchorEl(null);
                }}
                anchorEl={anchorEl}
              />
            </button>
          </div>
          <div className="flex gap-3 text-[14px] space-x-3">
            <button
              className="flex gap-2 items-center bg-[var(--primary-color)] px-4 py-3 rounded-[4px] text-white"
              onClick={() => setIsMessageAllUsersModalOpen(true)}
            >
              Message All Users
              <Image src={message} alt="" width={24} />
            </button>
            <button className="flex gap-2 items-center bg-[var(--primary-color)] px-4 py-3 rounded-[4px] text-white">
              Export CSV
              <AiOutlineDownload size={20} />
            </button>
          </div>
        </div>
      </div>
      <div>
        <UsersTable
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
        <ReusableModal
          isOpen={isMessageAllUsersModalOpen}
          onClose={() => setIsMessageAllUsersModalOpen(false)}
        >
          <MessageAllUsersModal
            closeModal={() => setIsMessageAllUsersModalOpen(false)}
            isSingleMessage={false}
          />
        </ReusableModal>
      </div>
    </div>
  );
};

export default User;
