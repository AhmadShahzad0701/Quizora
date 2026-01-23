import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";
export interface GeneratedQuestion {
  type: string;
  question: string;
  marks: number;
  options?: string[];
  correct_answer?: string;
}

export interface GeneratedQuiz {
  title: string;
  subject: string;
  difficulty: string;
  total_questions: number;
  total_marks: number;
  questions: GeneratedQuestion[];
}

export interface GenerateQuizPayload {
  title: string;
  subject: string;
  difficulty: string;
  timeLimit: number;
  totalQuestions: number;
  totalMarks: number;
  quizType: string;
  distribution: Record<string, number>;
  contentText: string;
}

export async function generateQuiz(
  payload: GenerateQuizPayload,
): Promise<GeneratedQuiz> {
  const requestBody = {
    meta: {
      title: payload.title,
      subject: payload.subject,
      difficulty: payload.difficulty,
      time_limit: payload.timeLimit,
      total_questions: payload.totalQuestions,
      total_marks: payload.totalMarks,
      quiz_type: payload.quizType,
    },
    distribution: payload.distribution,
    content: {
      text: payload.contentText,
      files: [],
    },
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/quiz/generate`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data as GeneratedQuiz;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Generate Quiz API Error:", error.message);
    } else {
      console.error("Generate Quiz API Error:", error);
    }
    throw error;
  }
}
