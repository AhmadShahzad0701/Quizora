export type QuestionType = 
  | 'mcq' 
  | 'true-false' 
  | 'fill-blank' 
  | 'short-answer' 
  | 'long-answer' 
  | 'coding';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  points: number;
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  options: string[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill-blank';
  options: string[];
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short-answer';
  placeholder?: string;
}

export interface LongAnswerQuestion extends BaseQuestion {
  type: 'long-answer';
  placeholder?: string;
}

export interface CodingQuestion extends BaseQuestion {
  type: 'coding';
  problemStatement: string;
  language: string;
  description: string;
  testCases: {
    input: string;
    output: string;
  }[];
  returns: string;
  starterCode?: string;
}

export type Question = 
  | MCQQuestion 
  | TrueFalseQuestion 
  | FillBlankQuestion 
  | ShortAnswerQuestion 
  | LongAnswerQuestion 
  | CodingQuestion;

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, string>;
  flaggedQuestions: Set<string>;
}
