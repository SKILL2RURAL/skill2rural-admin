export interface Question {
  courseId: number | string;
  questions: {
    id?: number;
    question: string;
    answer: number; // index of the correct answer
    point: number; // points for the question
    options: string[]; // array of possible answers
    isEdited?: boolean;
  }[];
}

export interface QuizData {
  question: string;
  points: string; // "1 point" or more
  response: boolean; // whether the response is required or not
  optionType: string; // "multipleChoice" or other types
}
