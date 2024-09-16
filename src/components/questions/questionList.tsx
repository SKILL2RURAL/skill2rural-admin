import React from 'react';
import Question from './question';

function createQuestion(num: number, question: string, answer: string, points: string) {
  return {num, question, answer, points};
}

const questions = [
  createQuestion(1, 'Hello if i miss assignment deadline or fail an assignment, i fail this course.', 'True', '1 point')
]

const QuestionsList: React.FC = (props) => {

  return (
    <ul>
      {questions.map(question => <Question key={question.num}/>)}
    </ul>
  )
}

export default QuestionsList;