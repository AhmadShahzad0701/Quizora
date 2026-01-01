import { MCQQuestion as MCQQuestionType } from "@/types/quiz";
import { QuizOption } from "./QuizOption";

interface MCQQuestionProps {
  question: MCQQuestionType;
  selectedAnswer: string;
  onAnswerChange: (answer: string) => void;
}

export const MCQQuestionComponent = ({
  question,
  selectedAnswer,
  onAnswerChange,
}: MCQQuestionProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-[#1a1a1a] font-medium text-lg mb-6">{question.question}</p>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <QuizOption
            key={index}
            option={option}
            isSelected={selectedAnswer === option}
            onSelect={() => onAnswerChange(option)}
          />
        ))}
      </div>
    </div>
  );
};
