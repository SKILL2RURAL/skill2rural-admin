import React, { useState } from 'react';
import { coverImage } from '@/assets/icons';
import Image from 'next/image';
import EditQuizQuestion from './editQuizQuestion';


interface CourseDetails {
  title: string;
  description: string;
  type: 'Paid' | 'Free';
  coverImage: File | null;
}

const EditCourse: React.FC<{openEdit: () => void}> = ({openEdit}) => {
  const [course, setCourse] = useState<CourseDetails>({
    title: '',
    description: '',
    type: 'Free',
    coverImage: null,
  })


  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
    const {name, value} = e.target
    setCourse((prev) => ({
      ...prev,
      [name] : value
    }))
  }

  const handleImageChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      setCourse((prev) => ({
        ...prev,
        coverImage: e.target.value ? e.target.file[0] : null 
      }))
    }
  }

  return (
    <>
      <form className="space-y-4">
          <h2 id="modal-title" className="text-xl font-bold mb-2 text-center">
            Edit Course
          </h2>
          <div>
            <label className="block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">Course title</label>
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
            <label className="block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">Description</label>
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              className="w-full h-[168px] border border-[#B8B8B8] px-[10px] py-4 rounded-md shadow-sm"
              placeholder="Enter course description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">Course type</label>
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
            <label className="block text-sm font-medium font-neue-haas text-[#253B4B] mb-2">Thumbnail</label>
            <div className="flex gap-2 items-center border border-[#B8B8B8] px-[10px] py-3 text-center rounded-lg">
              <input
                type="file"
                name="thumbnail"
                onChange={handleImageChange}
                className="hidden"
              />
              {!course.coverImage && <Image src={coverImage} alt='pic frame' />}
              <label htmlFor="thumbnailUpload" className="cursor-pointer">
                <div className="text-sm text-gray-500 text-left">Add image</div>
                <div className="text-sm text-gray-500 text-left">Click to upload image</div>
                <div className="text-xs text-gray-400 text-left">SVG, PNG, JPG or GIF (max. 800x400px)</div>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-white border border-[#60269E] mt-4 mb-4 text-[#60269E] py-2 rounded-lg shadow-md hover:bg-[#722abf] hover:text-white"
            onClick={openEdit}
          >
            Edit Quiz Questions
          </button>
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

export default EditCourse;