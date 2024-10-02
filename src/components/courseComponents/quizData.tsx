import Image from 'next/image';
import React from 'react'
import { trash_can, edit, applicationMenu } from '@/assets/icons';

interface QuizData {
  id: number;
  question: string;
  point: string;
  response: boolean;
  onRemove: (id: number) => void;
}

const QuizDataComponent: React.FC<QuizData> = ({id, question, point, response, onRemove}) => {
  return (
    <li className='mb-3'>
      <div className='flex gap-3 mb-3'>
        <Image src={applicationMenu} alt='icon'/>
        <p><span className='mr-2'>{id}.</span>{question}</p>
      </div>
      <div className='flex justify-between gap-4'>
        <p>Response: {response ? "True" : "False"}</p>
        <div className='flex justify-end gap-3'>
          <Image src={edit} alt='edit button' className='cursor-pointer'/>
          <p onClick={() => onRemove(id)} className='cursor-pointer'><Image src={trash_can} alt='delete button' /></p>
        </div>
      </div>
    </li>
  )
}

export default QuizDataComponent;