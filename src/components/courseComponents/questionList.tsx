import React, { useEffect, useState } from "react";
import Question from "./question";
import { useAppSelector } from "@/redux/hooks";
import { baseUrl } from "@/utils/constants";
import axios from "axios";

interface QuestionProps {
  courseId: string | string[];
}
interface QuestionData {
  id: string;
  question: string;
  options: string[];
  point: number;
  answer: number;
}
const QuestionsList: React.FC<QuestionProps> = ({ courseId }) => {
  const { token } = useAppSelector((state) => state.admin);
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  useEffect(() => {
    const getQuestions = async (id: string) => {
      try {
        const res = await axios.get(`${baseUrl}/questions/question/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(res.data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (typeof courseId === "string" && token) {
      getQuestions(courseId);
    }
  }, [courseId, token]);

  return (
    <form action="" className="mt-6  bg-white p-10 pb-5">
      <div>
        {questions.length > 0 ? (
          questions.map((quest) => (
            <div key={quest.id}>
              <Question question={quest} />
            </div>
          ))
        ) : (
          <div>No Question</div>
        )}
      </div>
      <button className="bg-[#60269E] text-white w-[588px] h-[60px] rounded-xl mt-8">
        Save Changes
      </button>
    </form>
  );
};

export default QuestionsList;
