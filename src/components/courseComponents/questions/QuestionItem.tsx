import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi";
import { CgMenuGridO } from "react-icons/cg";
import { Question } from "@/types/quizTypes";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";

interface Props {
  question: Question["questions"][0];
  index: number;
  setQuestions: React.Dispatch<React.SetStateAction<Question>>;
  questions: Question;
  isEdit: boolean;
  courseId: number | string;
}

const QuestionItem: React.FC<Props> = ({
  question,
  index,
  setQuestions,
  questions,
  isEdit,
  courseId,
}) => {
  const { token } = useAppSelector((state) => state.admin);
  const [isLoading, setIsLoading] = useState(false);

  // Function to delete a single option
  const deleteOption = (optionIndex: number) => {
    const updatedQuestions = [...questions.questions];
    const updatedOptions = [...updatedQuestions[index].options];
    updatedOptions.splice(optionIndex, 1);
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      options: updatedOptions,
    };
    setQuestions({ ...questions, questions: updatedQuestions });
  };

  // Function to delete question
  const deleteQuestion = (index: number) => {
    // Create a new array without the question at the given index
    const updatedQuestions = questions.questions.filter((_, i) => i !== index);

    // Update the state with the new array
    setQuestions((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  // Function to add new option to a question
  const addOption = () => {
    const updatedQuestions = [...questions.questions];
    const updatedOptions = [...updatedQuestions[index].options];
    updatedOptions.push("");
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      options: updatedOptions,
    };
    setQuestions({ ...questions, questions: updatedQuestions });
  };

  // Function to add a new question to a course
  const saveUpdatedQuestion = async () => {
    setIsLoading(true);
    const res = await axios.patch(
      `${baseUrl}/admin/course/update-question/${question.id}`,
      {
        question: question.question,
        answer: question.answer,
        point: question.point,
        options: question.options,
        courseId: courseId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res?.status === 200) {
      // Change isEdited to false in the question state
      const updatedQuestions = questions.questions.map((q) => {
        if (q.id === question.id) {
          return { ...q, isEdited: false };
        }
        return q;
      });
      setQuestions({ ...questions, questions: updatedQuestions });
      toast.success(res?.data?.message || "Question edited successfully");
    } else {
      toast.error("An error occured, try again later");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  // Function to save updated question
  const addQuestionToCourse = async () => {
    setIsLoading(true);
    const res = await axios.post(
      `${baseUrl}/admin/course/create-question`,
      {
        question: question.question,
        answer: question.answer,
        point: question.point,
        options: question.options,
        courseId: courseId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res);

    if (res?.status === 201) {
      // Change isEdited to false in the question state
      const updatedQuestions = questions.questions.map((q) => {
        if (q.id === question.id || question.question === q.question) {
          return { ...q, isEdited: false };
        }
        return q;
      });
      setQuestions({ ...questions, questions: updatedQuestions });
      toast.success(res?.data?.message || "Question added successfully");
    } else {
      toast.error("An error occured, try again later");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative mt-5 space-y-4 p-5 py-2 m-5 bg-[#F9F9F9] rounded-[10px] text-[#253B4B]">
      <div
        className="absolute top-3 right-5 cursor-pointer"
        onClick={() => deleteQuestion(index)}
      >
        <IoIosClose size={25} color="#667085" />
      </div>
      <div>
        <label className="block text-sm font-medium">Question</label>
        <input
          type="text"
          value={question.question}
          onChange={(e) => {
            const updatedQuestions = [...questions.questions];
            updatedQuestions[index] = {
              ...updatedQuestions[index],
              question: e.target.value,
            };
            updatedQuestions[index].isEdited = true;

            setQuestions({ ...questions, questions: updatedQuestions });
          }}
          className="border w-full border-[#C4C4C4] rounded-[10px] h-[45px] px-3 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Points</label>
        <input
          type="number"
          className="border border-[#C4C4C4] rounded-[10px] px-3 h-[45px] w-full"
          value={questions.questions[index].point}
          onChange={(e) => {
            const updatedQuestions = [...questions.questions];
            const newPoint = parseInt(e.target.value, 10) || 1;
            updatedQuestions[index] = {
              ...updatedQuestions[index],
              point: newPoint, // Correct key
            };
            updatedQuestions[index].isEdited = true;

            setQuestions({ ...questions, questions: updatedQuestions });
          }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Options</label>
        {question.options.map((option: string, optionIndex: number) => (
          <div key={optionIndex} className="flex items-center gap-2 mt-3">
            <CgMenuGridO size={40} color="#AFAFAF" />
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const updatedQuestions = [...questions.questions];
                updatedQuestions[index].options[optionIndex] = e.target.value;
                updatedQuestions[index].isEdited = true;
                setQuestions({ ...questions, questions: updatedQuestions });
              }}
              className="border w-full border-[#C4C4C4] rounded-[10px] p-3 outline-none"
            />
            <input
              type="radio"
              checked={questions.questions[index].answer === optionIndex}
              onChange={() => {
                const updatedQuestions = [...questions.questions];
                updatedQuestions[index].answer = optionIndex;
                updatedQuestions[index].isEdited = true;
                setQuestions({ ...questions, questions: updatedQuestions });
              }}
              className="accent-purple-600 w-[30px] h-[15px]"
            />
            <div
              className="border p-1"
              onClick={() => deleteOption(optionIndex)}
            >
              <HiOutlineTrash size={20} color="#667085" />
            </div>
          </div>
        ))}
        <div className="grid gap-2 justify-start items-center">
          <button
            onClick={addOption}
            className="text-[#60269E] py-2 rounded-[8px] mt-4 px-5"
          >
            Add new option
          </button>
          {/* Show button only when isEdit is true */}
          {question.id && question.isEdited && (
            <button
              className={`${
                isLoading ? "opacity-50" : ""
              } text-white bg-[#60269E] rounded-[5px] py-1 mb-3`}
              onClick={saveUpdatedQuestion}
              disabled={isLoading}
            >
              Save Edit
            </button>
          )}
          {!question.id && question.isEdited && (
            <button
              className={`${
                isLoading ? "opacity-50" : ""
              } text-white bg-[#60269E] rounded-[5px] py-1 mb-3`}
              onClick={addQuestionToCourse}
              disabled={isLoading}
            >
              Add Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
