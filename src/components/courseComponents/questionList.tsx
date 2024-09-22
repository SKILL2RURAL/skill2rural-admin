import React from 'react';
import Question from './question';

function createQuestion(num: number, question: string, answer: string, point: string) {
  return {num, question, answer, point};
}

const questions = [
  createQuestion(1, 'Hello if i miss assignment deadline or fail an assignment, i fail this course.', 'True', '1 point'),
  createQuestion(2, 'Hello if i miss assignment deadline or fail an assignment, i fail this course.', 'True', '1 point'),
  createQuestion(3, 'Hello if i miss assignment deadline or fail an assignment, i fail this course.', 'True', '1 point'),
  createQuestion(4, 'Hello if i miss assignment deadline or fail an assignment, i fail this course.', 'True', '1 point'),
  createQuestion(5, 'Hello if i miss assignment deadline or fail an assignment, i fail this course.', 'True', '1 point'),
  createQuestion(6, 'Hello if i miss assignment deadline or fail an assignment, i fail this course.', 'True', '1 point')
]

const QuestionsList: React.FC = (props) => {

  return (
      <form action="" className='mt-6 w-[80%] h-[1029px] bg-white p-10'>
        <ul>
          {questions.map((quest) => <Question key={quest.num} {...quest}/>)}
        </ul>
        <button className='bg-[#60269E] text-white w-[588px] h-[60px] rounded-xl mt-8'>Save Changes</button>
      </form>
  )
}

export default QuestionsList;