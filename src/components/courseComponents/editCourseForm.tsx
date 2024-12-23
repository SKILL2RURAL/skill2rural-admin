import React, { useEffect, useState } from "react";
import { coverImage } from "@/assets/icons";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import QuestionsDrawer from "./questionsDrawer";
import { FaPlayCircle } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import { toast } from "react-toastify";
import {
  getAllCourses,
  getCourseDetails,
  setEditedCourseDetails,
} from "@/redux/adminSlice";

interface CourseDetails {
  title: string;
  description: string;
  type: "Paid" | "Free";
  thumbnail_image: string | "";
  video: string | "";
}

interface EditProps {
  id: number | string;
  onClose: () => void;
  openDrawer: () => void;
  editCourse: boolean;
  existingCourseDetails?: any;
}

const EditCourse: React.FC<EditProps> = ({
  id,
  onClose,
  openDrawer,
  editCourse = false,
  existingCourseDetails = {},
}) => {
  const dispatch = useAppDispatch();
  const { courseDetails, token } = useAppSelector((state) => state.admin);
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState<CourseDetails>({
    title: "",
    description: "",
    type: "Free",
    thumbnail_image: "",
    video: "",
  });

  useEffect(() => {
    setCourse({
      title: courseDetails?.title || "",
      description: courseDetails?.description || "",
      type: "Paid",
      thumbnail_image: courseDetails?.thumbnail_image || "",
      video: "",
    });
  }, []);

  useEffect(() => {
    if (editCourse) {
      setCourse({
        ...course,
        title: existingCourseDetails?.title,
        description: existingCourseDetails?.description,
        type: "Paid",
        thumbnail_image: existingCourseDetails?.thumbnail_image,
        video: existingCourseDetails?.video_url || "",
      });
    }
  }, [editCourse]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // Correct property is 'files'
    if (files && files.length > 0) {
      setCourse((prev) => ({
        ...prev,
        coverImage: files[0] || null, // Use 'files[0]' instead of 'file[0]'
      }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`${baseUrl}/admin/course/${id}`, course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.data?.data) {
        toast.success(
          res.data.message ||
            "Changes saved successfully. The course has been updated."
        );
        onClose();
        dispatch(getAllCourses({}));
        dispatch(getCourseDetails(JSON.stringify(id)));
      } else {
        toast.error(res?.data?.message || "Failed to save changes.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {/* <form className="space-y-4"> */}
      <h2 id="modal-title" className="text-xl font-bold mb-2 text-center">
        Edit Course
      </h2>
      <div className="overflow-auto h-[70vh]">
        <div>
          <label className="block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">
            Course title
          </label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            className="w-full h-[55px] rounded-lg border border-[#B8B8B8] px-[10px] py-4 shadow-sm"
            placeholder="Enter course title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            className="w-full h-[168px] border border-[#B8B8B8] px-[10px] py-4 rounded-md shadow-sm"
            placeholder="Enter course description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">
            Course type
          </label>
          <select
            name="type"
            value={course.type}
            onChange={handleChange}
            className="w-full border border-[#B8B8B8] px-[10px] py-4 rounded-md shadow-sm"
          >
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div>
          <label className="mt-3 block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">
            Thumbnail
          </label>
          <div className="flex gap-2 items-center border border-[#B8B8B8] px-[10px] py-3 text-center rounded-lg">
            <input
              type="file"
              name="thumbnail"
              onChange={handleImageChange}
              className="hidden"
            />
            {course.thumbnail_image ? (
              <Image
                src={course?.thumbnail_image || ""}
                alt="Uploaded thumbnail"
                width={100}
                height={100}
                className=" h-[78px] w-[121px] rounded-[5px]"
              />
            ) : (
              <Image
                src={course?.thumbnail_image || ""}
                alt=""
                width={100}
                height={100}
              />
            )}
            <label htmlFor="thumbnailUpload" className="cursor-pointer">
              <div className="text-sm text-gray-500 text-left">Add image</div>
              <div className="text-sm text-gray-500 text-left">
                Click to upload image
              </div>
              <div className="text-xs text-gray-400 text-left">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#253B4B] mb-1">
            Course Video
          </label>
          <div className="flex items-center border border-[#B8B8B8] px-2 py-3 rounded-lg">
            <input
              type="file"
              accept=".mp4, .mov, .avi"
              className="hidden"
              id="videoUpload"
            />
            <div
              className="border border-[#C4C4C4] h-[78px] w-[121px] rounded-[5px] flex justify-center items-center bg-cover bg-center"
              style={{
                backgroundImage: `url(${course?.thumbnail_image})`,
              }}
            >
              {course?.video ? (
                <FaPlayCircle color="white" size={30} />
              ) : (
                <CiImageOn color="#2390FA" size={30} />
              )}
            </div>
            <label
              htmlFor="videoUpload"
              className="cursor-pointer text-gray-500 mx-3"
            >
              <div className="text-sm">Click to upload video</div>
              <div className="text-xs text-gray-400">
                {course?.video ? course?.video : "MP4, MOV, AVI (max. 5MB)"}
              </div>
            </label>
          </div>
        </div>
      </div>
      <button
        className="w-full bg-white border border-[#60269E] mt-4  text-[#60269E] py-2 rounded-lg shadow-md hover:bg-[#722abf] hover:text-white"
        onClick={async () => {
          if (existingCourseDetails !== course) {
            dispatch(setEditedCourseDetails(course));
            sessionStorage.setItem("courseId", JSON.stringify(id));
          }
          onClose();
          openDrawer();
        }}
      >
        Edit Quiz Questions
      </button>
      <button
        disabled={isLoading}
        onClick={handleSaveChanges}
        className={`w-full bg-[#60269E] mt-4 text-white py-2 rounded-lg shadow-md hover:bg-[#722abf] ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        Save Changes
      </button>
      {/* </form> */}
    </div>
  );
};

export default EditCourse;
