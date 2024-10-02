import React, {useState} from 'react'
import { cancel } from '@/assets/icons';
import Image from 'next/image';
import QuizDataComponent from './quizData';

interface Question {
  id: number;
  question: string;
  points: string;
  response: boolean;
}

interface QuizData {
  question : string;
  points: string;
  response: boolean;
}

const EditQuizQuestion: React.FC<{onClose: () => void}> = ({onClose}) => {
  const [formData, setFormData] = useState<QuizData>({
    question: "",
    points: "1 point",
    response: true,
  })

  const [questions, setQuestions] = useState<Question[]>([])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value, type, checked} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'radio' ? checked : value,
    }))
  }

  
  const addQuestion = () => {
    if (formData.question.trim() === '')  return;
    setQuestions([
      ...questions,
      {id: questions.length + 1, ...formData}
    ])
  }

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-[578px] bg-white shadow-lg font-neue-haas overflow-y-auto">
      <div className="flex justify-between items-center border-b border-[#A3AED0]">
        <div className='p-5'>
          <h2 className="text-lg font-semibold mb-2">Quiz Questions</h2>
          <p className='text-[14px] text-[#C4C4C4]'>Create quiz questions for this course</p>
        </div>
        <div onClick={onClose}><Image src={cancel} alt='close button'/></div>
      </div>
      <form 
        className="mt-5 space-y-4 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          addQuestion();
        }} 
      >
        <div>
          <label className='block text-sm font-medium'>Question</label>
          <input className='w-full h-[55px] rounded-lg border border-[#B8B8B8] px-[10px] py-4 shadow-sm' type="text" name="question" value={formData.question} onChange={handleChange} required/>
        </div>
        <div>
          <label className='block text-sm font-medium'>Points</label>
          <input className='w-full h-[55px] rounded-lg border border-[#B8B8B8] px-[10px] py-4 shadow-sm' type="text" name="points" value={formData.points} onChange={handleChange} required/>
        </div>
        <div>
          <label className="block text-sm font-medium">Response</label>
          <div className="mt-1 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="response"
                value="true"
                checked={formData.response === true}
                onChange={() =>
                  setFormData((prevData) => ({ ...prevData, response: true }))
                }
              />
              <span className="ml-2">True</span>
            </label>

            <label>
              <input
                type="radio"
                name='response'
                value="false"
                checked={formData.response === false}
                onChange={() => 
                  setFormData((prev) => ({...prev, response: false}))
                }
              />
              <span className='ml-2'>False</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-[153px] h-[48px] bg-[#60269E] text-white py-2 rounded mt-4">Add Question</button>
      </form>
      <div className="mt-8 p-5">
        <h3 className="text-lg font-medium">Questions</h3>
        <ul className="mt-3 space-y-3">
          {questions.map((ques) => <QuizDataComponent key={ques.id} id={ques.id} question={ques.question} point={ques.points} response={ques.response} onRemove={removeQuestion} />)}
        </ul>
      </div>
      <div className="mt-6 flex justify-end items-center gap-4 p-4 h-[78px] border-t border-[#A3AED0]">
        <button 
        className="bg-white text-[#60269E] border border-[#60269E] py-2 px-4 rounded w-[185px] h-[56px]"
        onClick={onClose}
        >
          Go Back
        </button>
        <button className="bg-[#60269E] text-white py-2 px-4 rounded w-[185px] h-[56px]">
          Save
        </button>
      </div>
    </div>
  )
}

export default EditQuizQuestion;
