import { ShortAnswerQuestion as ShortAnswerQuestionType } from "@/types/quiz";
import { Textarea } from "@/components/ui/textarea";

interface ShortAnswerQuestionProps {
  question: ShortAnswerQuestionType;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

export const ShortAnswerQuestionComponent = ({
  question,
  answer,
  onAnswerChange,
}: ShortAnswerQuestionProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-[#1a1a1a] font-medium text-lg mb-6">{question.question}</p>
      <Textarea
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder={question.placeholder || "Type your answer here..."}
        className="min-h-[180px] bg-[#f0f4f8] border-[#d1d5db] rounded-2xl p-4 resize-none "
      />
    </div>
  );
};
