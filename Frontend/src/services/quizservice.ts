// src/services/quiz.service.ts
// This Services Folder and file is for API calls From Backend and Frontend 
// So the UI components will not filled with API calls directly and the Calls will be made from here 
// and Clean Code Practices will be followed

// src/services/quizService.ts
// src/services/quizService.ts

// Type Definitions
export interface QuizMetadata {
  title: string;
  subject: string;
  difficulty: string;
}

export interface QuizConfig {
  total_questions: number;
  question_types: {
    mcq?: number;
    true_false?: number;
    short?: number;
    long?: number;
  };
}

export interface GenerateQuizPayload {
  metadata: QuizMetadata;
  config: QuizConfig;
}

export interface QuizQuestion {
  type: string;
  question: string;
  options?: string[];
  answer?: string;
}

export interface GenerateQuizResponse {
  quiz: {
    title: string;
    questions: QuizQuestion[];
  };
}

// API Logic Starts Here
const API_BASE_URL = "http://127.0.0.1:8000";

export async function generateQuiz(
  payload: GenerateQuizPayload
): Promise<GenerateQuizResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/quiz/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to generate quiz");
    }

    return await response.json();
  } catch (error) {
    console.error("Quiz generation error:", error);
    throw error;
  }
}
