import React, {useState} from 'react'

interface QuizData {
  question: string;
  point: string;
  response: "True" | "False";
}

const EditQuizQuestion: React.FC = () => {
  const [questionData, setQuestionData] = useState<QuizData>({
    question: "",
    point: "",
    response: "True"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLFormElement>) => {
    const {name, value} = e.target;
    setQuestionData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div>
      <form >
        <div>
          <label htmlFor="question">Question</label>
          <input type="text" name="question" value={questionData.question} />
        </div>
        <div>
          <label htmlFor="point">Points</label>
          <input type="text" name="point" value={questionData.point} />
        </div>
        <div>
          <label className="block mb-2">Response</label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                value="true"
                name='response'
                checked={questionData.response === 'True' ? true : false}
              />
              True
            </label>

            <label>
              <input
                type="radio"
                value="false"
                name='response'
                checked={questionData.response === 'False' ? true : false}
              />
              False
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditQuizQuestion;
