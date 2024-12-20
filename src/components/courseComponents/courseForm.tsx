import { useAppSelector } from "@/redux/hooks";
import { baseUrl } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { FaPlayCircle } from "react-icons/fa";
import { toast } from "react-toastify";

interface FormData {
  title: string;
  description: string;
  type: "Paid" | "Free";
  video: File | null;
  thumbnail_image: File | null;
}

interface ComponentProps {
  onClose: () => void;
  openSucessModal: () => void;
}

const CourseForm: React.FC<ComponentProps> = ({ onClose, openSucessModal }) => {
  const { token } = useAppSelector((state) => state.admin);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    type: "Free",
    video: null,
    thumbnail_image: null,
  });

  console.log(formData);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];

      // Check if the file size exceeds 5MB
      // const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      // if (file.size > maxSize) {
      //   toast.error("File size exceeds 5MB. Please upload a smaller file.");
      //   return;
      // }

      if (field === "thumbnail_image") {
        setFormData((prevState) => ({
          ...prevState,
          thumbnail_image: file,
        }));
      } else if (field === "video") {
        setFormData((prevState) => ({
          ...prevState,
          video: file,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.thumbnail_image) {
      formDataToSend.append("thumbnail_image", formData.thumbnail_image);
    } else {
      toast.error("Upload thumbnail image");
      setIsLoading(false);
      return;
    }
    if (formData.video) {
      formDataToSend.append("course_video", formData.video);
    } else {
      toast.error("Upload Course Video");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${baseUrl}/admin/course/create-course`,
        formDataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Course created successfully!");
      sessionStorage.setItem("newCourse", res?.data?.data?.id);
      setFormData({
        title: "",
        description: "",
        type: "Free",
        video: null,
        thumbnail_image: null,
      });
      onClose();
      openSucessModal();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-center text-[#253B4B]">
        Add New Course
      </h2>

      <div className="h-[60vh] overflow-auto space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#253B4B] mb-1">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="w-full h-[55px] rounded-lg border border-[#B8B8B8] px-3 outline-none"
            placeholder="Enter course title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#253B4B] mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            className="w-full h-[168px] border border-[#B8B8B8] p-3 rounded-md outline-none"
            placeholder="Enter course description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#253B4B] mb-1">
            Course Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as "Paid" | "Free",
              })
            }
            required
            className="w-full border border-[#B8B8B8] px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-[#60269E] focus:outline-none"
          >
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#253B4B] mb-1">
            Thumbnail
          </label>
          <div
            className="flex items-center border border-[#B8B8B8] px-2 py-3 rounded-lg"
            // onClick={handleThumbnailClick}
          >
            <input
              type="file"
              accept=".jpeg, .jpg, .png"
              onChange={(e) => handleFileChange(e, "thumbnail_image")}
              className="hidden"
              id="thumbnailUpload"
            />
            {!formData.thumbnail_image ? (
              <div className="bg-[#F9F9F9] border border-[#C4C4C4] h-[78px] w-[121px] rounded-[5px] flex justify-center items-center">
                <CiImageOn color="#2390FA" size={30} />
              </div>
            ) : (
              <Image
                src={URL.createObjectURL(formData.thumbnail_image)}
                alt="Uploaded thumbnail"
                width={100}
                height={100}
                className=" h-[78px] w-[121px] rounded-[5px]"
              />
            )}
            <label
              htmlFor="thumbnailUpload"
              className="cursor-pointer text-gray-500 mx-3"
            >
              <div className="text-sm">Click to upload image</div>
              <div className="text-xs text-gray-400">JPG, PNG (max. 5MB)</div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#253B4B] mb-1">
            Course Video
          </label>
          <div
            className="flex items-center border border-[#B8B8B8] px-2 py-3 rounded-lg"
            // onClick={handleVideoClick}
          >
            <input
              type="file"
              accept=".mp4, .mov, .avi"
              onChange={(e) => handleFileChange(e, "video")}
              className="hidden"
              id="videoUpload"
            />
            <div className="bg-[#F9F9F9] border border-[#C4C4C4] h-[78px] w-[121px] rounded-[5px] flex justify-center items-center">
              {formData?.video ? (
                <FaPlayCircle color="#2390FA" size={30} />
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
                {formData?.video
                  ? formData?.video?.name
                  : "MP4, MOV, AVI (max. 5MB)"}
              </div>
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-[#60269E] text-white py-2 rounded-lg shadow-md hover:bg-[#722abf] transition duration-200 ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        Create Course
      </button>
    </form>
  );
};

export default CourseForm;
