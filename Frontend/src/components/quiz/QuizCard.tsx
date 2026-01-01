import { Question } from "../../types/quiz";
import { QuestionHeader } from "./QuestionHeader";
import { MCQQuestionComponent } from "./MCQQuestion";
import { TrueFalseQuestionComponent } from "./TrueFalseQuestion";
import { FillBlankQuestionComponent } from "./FillBlankQuestion";
import { ShortAnswerQuestionComponent } from "./ShortAnswerQuestion";
import { LongAnswerQuestionComponent } from "./LongAnswerQuestion";
import { CodingQuestionComponent } from "./CodingQuestion";
import { Button } from "@/components/ui/button";

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  answer: string;
  isFlagged: boolean;
  onAnswerChange: (answer: string) => void;
  onFlag: () => void;
  onReport: () => void;
  onSubmit: () => void;
  showSubmitOnly?: boolean;
}

export const QuizCard = ({
  question,
  currentIndex,
  totalQuestions,
  answer,
  isFlagged,
  onAnswerChange,
  onFlag,
  onReport,
  onSubmit,
  showSubmitOnly = false,
}: QuizCardProps) => {
  const renderQuestion = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <MCQQuestionComponent
            question={question}
            selectedAnswer={answer}
            onAnswerChange={onAnswerChange}
          />
        );
      case 'true-false':
        return (
          <TrueFalseQuestionComponent
            question={question}
            selectedAnswer={answer}
            onAnswerChange={onAnswerChange}
          />
        );
      case 'fill-blank':
        return (
          <FillBlankQuestionComponent
            question={question}
            selectedAnswer={answer}
            onAnswerChange={onAnswerChange}
          />
        );
      case 'short-answer':
        return (
          <ShortAnswerQuestionComponent
            question={question}
            answer={answer}
            onAnswerChange={onAnswerChange}
          />
        );
      case 'long-answer':
        return (
          <LongAnswerQuestionComponent
            question={question}
            answer={answer}
            onAnswerChange={onAnswerChange}
          />
        );
      case 'coding':
        return (
          <CodingQuestionComponent
            question={question}
            code={answer || question.starterCode || ''}
            onCodeChange={onAnswerChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#f8f9fa] rounded-2xl shadow-lg p-8 mx-auto max-w-[80%]">
      <QuestionHeader
        currentQuestion={currentIndex + 1}
        totalQuestions={totalQuestions}
        points={question.points}
        isFlagged={isFlagged}
        onFlag={onFlag}
        onReport={onReport}
      />

      <div className="mb-8">
        {renderQuestion()}
      </div>

      <div className="flex justify-center">
        {showSubmitOnly ? (
          <Button
            onClick={onSubmit}
            className="bg-gradient-primary text-[#fff] px-32 py-3 rounded-md font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            className="bg-gradient-primary text-[#fff] px-32 py-3 rounded-md font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
