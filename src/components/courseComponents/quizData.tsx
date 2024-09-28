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
    <li>
      <div>
        <Image src={applicationMenu} alt='icon'/>
        <p><span>. {id}</span>{question}</p>
      </div>
      <div>
        <p>Response: {response ? "True" : "False"}</p>
        <div>
          <Image src={edit} alt='edit button'/>
          <p onClick={() => onRemove(id)}><Image src={trash_can} alt='delete button' /></p>
        </div>
      </div>
    </li>
  )
}

export default QuizDataComponent;