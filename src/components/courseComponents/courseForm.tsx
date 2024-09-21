import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

interface FormData {
  title: string;
  description: string;
  type: 'Paid' | 'Free';
  image: File | null;
}

const CourseForm: React.FC = (props) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    type: 'Free',
    image: null,
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
        image: e.target.files[0],
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form Data Submitted:', formData);
  };



  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Course Title</label>
          <input type="text" name='title' value={formData.title}  onChange={handleChange} required/>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input type="text" name='description' value={formData.description} onChange={handleChange} required/>
        </div>

        <div>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value='Free'>Free</option>
            <option value="">Paid</option>
          </select>
          <IoIosArrowDown />
        </div>

        <div>
          <label htmlFor="thumbnail">Thumbnail</label>
          <input type="file" accept='image/*' onChange={handleFileChange} />
        </div>
        
      </form>
    </>
  )
}

export default CourseForm;