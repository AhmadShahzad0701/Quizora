import { LongAnswerQuestion as LongAnswerQuestionType } from "@/types/quiz";
import { Textarea } from "../ui/textarea";

interface LongAnswerQuestionProps {
  question: LongAnswerQuestionType;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

export const LongAnswerQuestionComponent = ({
  question,
  answer,
  onAnswerChange,
}: LongAnswerQuestionProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-[#1a1a1a] font-medium text-lg mb-6">{question.question}</p>
      <Textarea
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder={question.placeholder || "Write a detailed answer here..."}
        className="min-h-[280px] bg-[#f0f4f8] border-[#d1d5db] rounded-2xl p-4 resize-none"
      />
    </div>
  );
};
