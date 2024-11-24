"use client";
import { book, calendar } from "@/assets/icons";
import BarChart from "@/components/courseBarChart";
import ActionButton from "@/components/courseComponents/actionButton";
import SuccessFailureDonut from "@/components/successAndFailure";
import { getAllCourses, getCoursesStats, setUser } from "@/redux/adminSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCurrentDateFormatted } from "@/utils/date";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import MetricItem from "../../components/analytics/metricItem";
import CourseTable from "../../components/courseComponents/courseTable";
import CourseFilterMenu from "@/components/courseComponents/courseFilterMenu";

interface Metric {
  title: string;
  icon: any;
  amount: number | undefined;
}

const Courses = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const { coursesStats } = useAppSelector((state) => state.admin);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const handleSearch = async () => {
      const res = await dispatch(getAllCourses({ search }));
      if (res?.payload?.data?.currentPage) {
        setPage(res?.payload?.data?.currentPage);
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

  useEffect(() => {
    dispatch(getCoursesStats());
  }, []);

  const metrics: Metric[] = [
    { title: "Total Courses", icon: book, amount: coursesStats?.totalCourses },
    {
      title: "Active Courses",
      icon: book,
      amount: coursesStats?.totalActiveCourses,
    },
    {
      title: "Archived Courses",
      icon: book,
      amount: coursesStats?.totalArchivedCourses,
    },
  ];
  // const { user } = useAppSelector((state) => state.admin);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image src={book} alt="" width={40} />
          <h1 className="text-[18px] md:text-[24px] font-[600]">Courses</h1>
        </div>
        <div className="text-[12px] md:text-[16px] font-[300] flex gap-2 items-center">
          <Image src={calendar} alt="date" width={40} />
          <p>{getCurrentDateFormatted()}</p>
        </div>
      </div>
      <div className="h-[30px]" />
      <div className="grid md:grid-cols-3 gap-3">
        {metrics.map((metric, index) => (
          <MetricItem metric={metric} key={index} />
        ))}
      </div>
      <div className="h-[30px]" />
      <div>
        <div className="md:flex gap-5">
          <div className="border p-5 rounded-[8px] md:w-fit shadow-md md:w-2/3  w-full">
            <div className="w-full">
              <div>
                <h1 className="text-[14px] font-[500] text-[#A3AED0]">
                  TOTAL CERTIFICATE ISSUED
                </h1>
                <div className="flex justify-between ">
                  <p className="text-[34px] font-[700] text-[#2B3674] mt-2">
                    {coursesStats?.totalCertificates}
                  </p>
                  <div className="relative">
                    <select className="cursor-pointer text-[13px] p-2 w-[70px] outline-none appearance-none">
                      <option value="">Year</option>
                    </select>
                    <IoIosArrowDown className="absolute right-3 top-[12px]" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <BarChart />
            </div>
          </div>
          <SuccessFailureDonut />
        </div>
      </div>

      <div className="my-5">
        <div className="md:flex space-y-5 md:space-y-0 justify-between items-center">
          <div className="flex gap-3 justify-between">
            <div className="border border-[#D0D5DD] shadow-sm bg-white flex gap-2 items-center p-2 rounded-[8px] h-full">
              <CiSearch color="#667085" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="md:w-[300px] bg-transparent placeholder:text-[#667085] outline-none"
              />
            </div>
            <button
              id="coursesFilter"
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
              <CourseFilterMenu
                isOpen={isMenuOpen}
                onClose={() => {
                  setIsMenuOpen(false);
                  setAnchorEl(null);
                }}
                anchorEl={anchorEl}
              />
            </button>
          </div>
          <ActionButton />
        </div>
        <div>
          <CourseTable
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
