import React, { useEffect, useState } from "react";
import { cancel } from "@/assets/icons";
import Image from "next/image";
import QuizDataComponent from "./quizData";
import QuestionsDrawer from "./questionsDrawer";

interface Question {
  id: number;
  question: string;
  points: string;
  response: boolean;
}

interface QuizData {
  question: string;
  points: string;
  response: boolean;
  optionType: string;
}

interface Props {
  closeDrawer: () => void;
}

const EditQuizQuestion: React.FC<Props> = ({ closeDrawer }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formData, setFormData] = useState<QuizData>({
    question: "",
    points: "1 point",
    response: true,
    optionType: "boolean",
  });

  const courseId = localStorage.getItem("newCourse");
  console.log("courseId", courseId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? checked : value,
    }));
  };

  const addQuestion = () => {
    if (formData.question.trim() === "") return;
    setQuestions([...questions, { id: questions.length + 1, ...formData }]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const getOptionBasedOnType = () => {
    if (formData.optionType === "boolean") {
      return (
        <div className="mt-1 grid">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="response"
              value="true"
              // checked={formData.response === true}
              className="accent-purple-600"
              onChange={() =>
                setFormData((prevData) => ({ ...prevData, response: true }))
              }
            />
            <span className="ml-2">True</span>
          </label>
          <label>
            <input
              type="radio"
              name="response"
              value="false"
              className="accent-purple-600"
              // checked={formData.response === false}
              onChange={(prev) => ({ ...prev, response: false })}
            />
            <span className="ml-2">False</span>
          </label>
        </div>
      );
    } else {
      return <div>HEllo</div>;
    }
  };

  return (
    <div className="flex flex-col justify-between fixed right-0 top-0 h-screen w-[45vw] bg-white shadow-lg z-50">
      <div>
        <div className="relative flex justify-between items-center border-b p-5 w-full">
          <div className="w-full">
            <h2 className="text-[20px] font-[500] text-[#262424]">
              Quiz Questions
            </h2>
            <div className="flex justify-between items-center w-full">
              <p className="text-[#A09D9D] text-[14px] font-[400]">
                Create quiz questions for this course
              </p>
              <p className="text-[#60269E] text-[16px] font-[600]">
                Add New Question
              </p>
            </div>
          </div>
          <div
            onClick={closeDrawer}
            className="absolute top-2 right-5 cursor-pointer"
          >
            <Image src={cancel} alt="close button" height={30} width={30} />
          </div>
        </div>
        <div
          className="mt-5 space-y-4 p-5 m-5 bg-[#F9F9F9] rounded-[10px] text-[#253B4B]"
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   addQuestion();
          // }}
        >
          <div>
            <label className="block text-sm font-medium">Question</label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="border w-full border-[#C4C4C4] rounded-[10px] h-[45px] px-3 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Points</label>
            <select className="w-full border border-[#C4C4C4] rounded-[10px] h-[45px] px-3 outline-none">
              <option value="1">1 point</option>
            </select>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <p className="block text-[16px] font-[400]">Response</p>
              <select
                className="text-[16px] font-[500] border border-[#C4C4C4] p-2 text-[#253B4B] outline-none"
                value={formData.optionType}
                onChange={(e) =>
                  setFormData({ ...formData, optionType: e.target.value })
                }
              >
                <option value="multipleChoice">Multiple Choice</option>
                <option value="boolean">Boolean</option>
              </select>
            </div>

            {getOptionBasedOnType()}
          </div>
          <button
            type="submit"
            className="bg-[#60269E] text-white py-2 rounded-[8px] text-[16px] font-[500] mt-4 px-5"
          >
            Add Question
          </button>
        </div>
        {/* <div className="px-5">
          <h3 className="text-lg font-medium">Questions</h3>
          <ul className="mt-3 space-y-3">
            {questions.map((ques) => (
              <QuizDataComponent
                key={ques.id}
                id={ques.id}
                question={ques.question}
                point={ques.points}
                response={ques.response}
                onRemove={removeQuestion}
              />
            ))}
          </ul>
        </div> */}
      </div>

      <div className="flex justify-end p-5 gap-2 border-t">
        <button className="bg-white text-[#60269E] border border-[#60269E] py-2 px-4 rounded w-full">
          Cancel
        </button>
        <button className="bg-[#60269E] text-white py-2 px-4 rounded w-full">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditQuizQuestion;
