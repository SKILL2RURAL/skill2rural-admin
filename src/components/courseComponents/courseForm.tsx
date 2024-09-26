import React, { useState } from 'react';
import { picFrame } from '@/assets/icons';
import Image from 'next/image';


interface FormData {
  title: string;
  description: string;
  type: 'Paid' | 'Free';
  image: File | null;
  video: File | null;
}

const CourseForm: React.FC = (props) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    type: 'Free',
    image: null,
    video: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.value ?  e.target.files[0] : null,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form Data Submitted:', formData);
  };



  return (
    <>
      <form className="space-y-4">
          <h2 id="modal-title" className="text-xl font-bold mb-2 text-center">
            Add New Course
          </h2>
          <div>
            <label className="block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">Course title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full h-[55px] rounded-lg border border-[#B8B8B8] px-[10px] py-4 shadow-sm"
              placeholder="Enter course title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full h-[168px] border border-[#B8B8B8] px-[10px] py-4 rounded-md shadow-sm"
              placeholder="Enter course description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">Course type</label>
            <select
              name="courseType"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-[#B8B8B8] px-[10px] py-4 rounded-md shadow-sm"
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">Thumbnail</label>
            <div className="flex gap-2 items-center border border-[#B8B8B8] px-[10px] py-3 text-center rounded-lg">
              <input
                type="file"
                name="thumbnail"
                onChange={handleFileChange}
                className="hidden"
                id="thumbnailUpload"
              />
              {!formData.image && <Image src={picFrame} alt='pic frame' />}
              <label htmlFor="thumbnailUpload" className="cursor-pointer">
                <div className="text-sm text-gray-500 text-left">Add image</div>
                <div className="text-sm text-gray-500 text-left">Click to upload image</div>
                <div className="text-xs text-gray-400 text-left">SVG, PNG, JPG or GIF (max. 800x400px)</div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">Course video</label>
            <div className="flex gap-2 items-center border border-[#B8B8B8] px-[10px] py-3 text-center rounded-lg">
              <input
                type="file"
                name="video"
                onChange={handleFileChange}
                className="hidden"
                id="videoUpload"
              />
              {!formData.video && <Image src={picFrame} alt='pic frame' />}
              <label htmlFor="videoUpload" className="cursor-pointer">
                <div className="text-sm text-gray-500 text-left">Add Video</div>
                <div className="text-sm text-gray-500 text-left">Click to upload video</div>
                <div className="text-xs text-gray-400 text-left">SVG, PNG, JPG or GIF (max. 800x400px)</div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#60269E] mt-4 text-white py-2 rounded-lg shadow-md hover:bg-[#722abf]"
          >
            Add Quiz Questions
          </button>
        </form>
    </>
  )
}

export default CourseForm;

