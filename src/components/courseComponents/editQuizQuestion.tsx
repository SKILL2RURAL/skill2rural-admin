import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { baseUrl } from "@/utils/constants";
import QuestionItem from "./questions/QuestionItem";
import QuizHeader from "./questions/QuizHeader";
import QuizFooter from "./questions/QuizFooter";
import { Question, QuizData } from "@/types/quizTypes";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

interface Props {
  closeDrawer: () => void;
  isEdit: boolean;
  existingCourseId: number | string;
}

const EditQuizQuestion: React.FC<Props> = ({
  closeDrawer,
  isEdit,
  existingCourseId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(true);
  const { token } = useAppSelector((state) => state.admin); // Get Token from redux state
  const params = useParams();
  const id = params.course; // Get course Id from params
  const questionsContainerRef = useRef<HTMLDivElement | null>(null);
  const courseId = localStorage.getItem("courseId"); // Get Course Id if it exists in local storage

  const [questions, setQuestions] = useState<Question>({
    courseId: "",
    questions: [{ question: "", answer: 0, point: 1, options: [""] }],
  });

  console.log(questions);

  // Function to add courseId to questions state
  useEffect(() => {
    if (typeof id === "string") {
      setQuestions((prev) => ({ ...prev, courseId: parseInt(id) }));
    } else if (courseId) {
      setQuestions((prev) => ({ ...prev, courseId: parseInt(courseId) }));
    }
  }, [id, courseId]);

  // Function to fetch quiz questions using id
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      const res = await axios.get(
        `${baseUrl}/admin/course/${id || existingCourseId}/questions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        if (res.data.data.length > 0) {
          const fetchedQuestions = res.data.data.map((q: any) => ({
            id: q.id,
            question: q.question,
            answer: q.answer,
            point: q.point,
            options: q.options,
          }));

          setQuestions((prev) => ({
            ...prev,
            questions: fetchedQuestions,
          }));
        }
        setIsFetchingQuestions(false);
      }
    };

    if (id || existingCourseId) {
      fetchQuizQuestions();
    } else {
      setIsFetchingQuestions(false);
    }
  }, []);

  // Function to add a new question
  const addQuestion = () => {
    const newQuestion = { question: "", answer: 0, point: 1, options: [""] };
    const updatedQuestions = [...questions.questions, newQuestion];
    setQuestions({ ...questions, questions: updatedQuestions });

    setTimeout(() => {
      if (questionsContainerRef.current) {
        questionsContainerRef.current.scrollTo({
          top: questionsContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Function to submit all questions
  const handleSubmit = async () => {
    const isValid = questions.questions.every((q) => {
      return q.question.trim() !== "" && q.options.length > 1;
    });

    if (!isValid) {
      toast.error(
        "Each question must have a valid question text and at least two options."
      );
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${baseUrl}/admin/course/create-questions`,
        {
          courseId: questions.courseId,
          questions: questions.questions.map((q) => ({
            question: q.question,
            answer: q.answer,
            point: q.point,
            options: q.options,
          })),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(res);

      if (res.status === 201) {
        console.log(res);
        toast.success(res.data.message || "Questions submitted successfully");
        closeDrawer();
      } else {
        toast.error(res.data.message || "Failed to submit questions");
      }
    } catch (error) {
      console.error("Error submitting questions:", error);
      toast.error(
        "An error occurred while submitting the quiz. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetchingQuestions) {
    return (
      <div className="flex flex-col justify-center items-center fixed right-0 top-0 h-screen w-[45vw] bg-white shadow-lg z-50">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between fixed right-0 top-0 h-screen w-[45vw] bg-white shadow-lg z-50">
      <QuizHeader
        closeDrawer={closeDrawer}
        addQuestion={addQuestion}
        isEdit={isEdit}
      />

      <div className="h-[80vh] overflow-auto" ref={questionsContainerRef}>
        {questions.questions.length > 0 ? (
          questions.questions.map((question, index) => (
            <QuestionItem
              key={index}
              question={question}
              index={index}
              setQuestions={setQuestions}
              questions={questions}
              isEdit={isEdit}
              courseId={
                questions.courseId ? questions.courseId : existingCourseId
              }
            />
          ))
        ) : (
          <p className="p-5">No quiz question </p>
        )}
      </div>
      <QuizFooter
        closeDrawer={closeDrawer}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isEdit={true}
      />
    </div>
  );
};

export default EditQuizQuestion;
