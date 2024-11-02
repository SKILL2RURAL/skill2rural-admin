import { thumbnail } from "@/assets/icons";
import Image from "next/image";
import React, { useState } from "react";

interface FormDataObj {
  title: string;
  message: string;
  image: File | string;
}

const MessageAllUsersModal = ({ closeModal }: { closeModal: () => void }) => {
  const [formData, setFormData] = useState<FormDataObj>({
    title: "",
    message: "",
    image: "",
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // Correct property is 'files'
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: files[0] || null, // Use 'files[0]' instead of 'file[0]'
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    closeModal();
  };
  return (
    <div>
      <h1 className="text-[24px] font-[600] text-center">Send Message</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="outline-none w-full border border-[#C4C4C4] rounded-[10px] py-4 px-3"
          />
        </div>
        <div className="space-y-1">
          <label>Message</label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="outline-none w-full border border-[#C4C4C4] rounded-[10px] py-4 px-3 h-[150px]"
          />
        </div>
        <div className="space-y-1">
          <label>Image</label>
          <div className="flex gap-2 items-center border border-[#B8B8B8] px-[10px] py-3 text-center rounded-lg">
            <input
              id="thumbnailUpload"
              type="file"
              name="thumbnail"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="border border-[#C4C4C4] bg-[#F9F9F9] rounded-[3px] h-[78px] w-[121px] flex justify-center items-center">
              <Image
                src={
                  typeof formData.image === "string"
                    ? thumbnail
                    : URL.createObjectURL(formData.image)
                }
                alt="Uploaded thumbnail"
                width={80}
                height={80}
                className={`${
                  typeof formData.image === "string"
                    ? "h-[25px] w-[25px]"
                    : "h-[78px] w-[121px]"
                }  rounded-[5px]`}
              />
            </div>

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
        <div className="h-[1rem]" />
        <button className="text-white bg-[#60269E] rounded-[10px] w-full py-3 mt-10">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default MessageAllUsersModal;
