import { TrueFalseQuestion as TrueFalseQuestionType } from "@/types/quiz";
import { QuizOption } from "./QuizOption";

interface TrueFalseQuestionProps {
  question: TrueFalseQuestionType;
  selectedAnswer: string;
  onAnswerChange: (answer: string) => void;
}

export const TrueFalseQuestionComponent = ({
  question,
  selectedAnswer,
  onAnswerChange,
}: TrueFalseQuestionProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-[#1a1a1a] font-medium text-lg mb-6">{question.question}</p>
      <div className="space-y-3">
        <QuizOption
          option="True"
          isSelected={selectedAnswer === "True"}
          onSelect={() => onAnswerChange("True")}
        />
        <QuizOption
          option="False"
          isSelected={selectedAnswer === "False"}
          onSelect={() => onAnswerChange("False")}
        />
      </div>
    </div>
  );
};
