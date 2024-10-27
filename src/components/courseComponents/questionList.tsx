import React, { useEffect, useState } from "react";
import Question from "./question";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { baseUrl } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import { question_icon } from "@/assets/icons";
import { Skeleton } from "@mui/material";
import { setCourseQuestions } from "@/redux/adminSlice";

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
  const dispatch = useAppDispatch();
  const { token, courseQuestions } = useAppSelector((state) => state.admin);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  console.log(courseQuestions);

  useEffect(() => {
    const getQuestions = async (id: string) => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${baseUrl}/admin/course/${id}/questions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setCourseQuestions(res.data.data));
        setQuestions(res.data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof courseId === "string" && token && !courseQuestions) {
      getQuestions(courseId);
    }
  }, []);

  return (
    <form action="" className="mt-6  bg-white p-10 pb-5">
      <div>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="90%" height={40} />
            <Skeleton variant="text" width="70%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={100} />
          </div>
        ) : Array.isArray(courseQuestions) && courseQuestions?.length > 0 ? (
          courseQuestions?.map((quest) => (
            <div key={quest.id}>
              <Question question={quest} />
            </div>
          ))
        ) : (
          <div className="w-full h-[5rem] flex flex-col justify-center items-center my-20 gap-5">
            <div className="flex flex-col items-center justify-center">
              <Image src={question_icon} alt="" width={140} height={140} />
              <div className="text-[24px] font-[600]">No quiz questions</div>
            </div>
            <button className="text-[16px] font-[600] text-white bg-[#60269E] rounded-[10px] px-[10rem] py-3">
              Add Quiz Questions
            </button>
          </div>
        )}
      </div>
      {Array.isArray(courseQuestions) && courseQuestions?.length > 0 && (
        <button className="bg-[#60269E] text-white w-[588px] h-[60px] rounded-xl mt-8">
          Save Changes
        </button>
      )}
    </form>
  );
};

export default QuestionsList;
