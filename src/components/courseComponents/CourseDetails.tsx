import Image from 'next/image';
import React from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { thumbnail } from '@/assets/icons';

const CourseDetails: React.FC = (props) => {

  return (
    <div className='w-[80%] h-[882px] bg-white p-10 mt-6 font-neue-haas'>
      <div className='flex gap-12 mb-10'>
        <p className='text-[#253B4B] w-500 text-lg'>Course title</p>
        <p className='w-[410px] h-[55px] border border-[#C4C4C4] rounded-lg py-4 pl-3'>Design Thinking</p>
      </div>
      <div className='flex gap-12 mb-10'>
        <p className='text-[#253B4B] w-500 text-lg'>Description</p>
        <p className='w-[410px] h-[143px] border border-[#C4C4C4] rounded-lg px-2 py-4'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque culpa et nesciunt, voluptatum impedit id natus reiciendis neque fuga quos quod illo, aperiam, animi veniam quibusdam odio eligendi commodi? Aliquam.</p>
      </div>
      <div className='flex gap-10 mb-10'>
          <p className='text-[#253B4B] w-500 text-lg'>Course type</p>
          <p className='w-[410px] h-[55px] border border-[#C4C4C4] rounded-lg px-4 py-4'>Free</p>
      </div>
      <div className='flex gap-12'>
        <p className='text-[#253B4B] w-500 text-lg'>Thumbnail</p>
        <p className='w-[110px] h-[95px] border border-[#C4C4C4] rounded-md relative'><Image src={thumbnail} alt='thumbnail' className='absolute top-7 left-10'/></p>
      </div>
    </div>
  )
}

export default CourseDetails