import React, { useState } from 'react';


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
          <h2 id="modal-title" className="text-xl font-bold">
            Add New Course
          </h2>
          <div>
            <label className="block text-sm font-medium">Course title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter course title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm"
              placeholder="Enter course description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Course type</label>
            <select
              name="courseType"
              value={formData.type}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Thumbnail</label>
            <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg">
              <input
                type="file"
                name="thumbnail"
                onChange={handleFileChange}
                className="hidden"
                id="thumbnailUpload"
              />
              <label htmlFor="thumbnailUpload" className="cursor-pointer">
                <div className="text-sm text-gray-500 text-left">Add image</div>
                <div className="text-sm text-gray-500 text-left">Click to upload image</div>
                <div className="text-xs text-gray-400 text-left">SVG, PNG, JPG or GIF (max. 800x400px)</div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Course video</label>
            <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg">
              <input
                type="file"
                name="video"
                onChange={handleFileChange}
                className="hidden"
                id="videoUpload"
              />
              <label htmlFor="videoUpload" className="cursor-pointer">
                <div className="text-sm text-gray-500 text-left">Add Video</div>
                <div className="text-sm text-gray-500 text-left">Click to upload video</div>
                <div className="text-xs text-gray-400 text-left">SVG, PNG, JPG or GIF (max. 800x400px)</div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-700"
          >
            Add Quiz Questions
          </button>
        </form>
    </>
  )
}

export default CourseForm;


{/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Course Title</label>
          <input className='w-[428px] h-[55px] rounded-lg border px-2 py-4' type="text" name='title' value={formData.title}  onChange={handleChange} required/>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input className='w-[428px] h-28 rounded-lg border px-2 py-4' type="text" name='description' value={formData.description} onChange={handleChange} required/>
        </div>

        <div>
          <select className='w-[428px] h-[55px] rounded-lg border px-2 py-4' name="type" value={formData.type} onChange={handleChange} required>
            <option value='Free'>Free</option>
            <option value="">Paid</option>
          </select>
        </div>

        <div>
          <label htmlFor="thumbnail">Thumbnail</label>
          <input className='w-[428px] h-28 rounded-lg border px-2 py-4' type="file" accept='image/*' onChange={handleFileChange} />
        </div>
        
      </form> */}