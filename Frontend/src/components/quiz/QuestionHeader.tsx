import { AlertTriangle, Flag } from "lucide-react";

interface QuestionHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  points: number;
  isFlagged: boolean;
  onFlag: () => void;
  onReport: () => void;
}

export const QuestionHeader = ({
  currentQuestion,
  totalQuestions,
  points,
  isFlagged,
  onFlag,
  onReport,
}: QuestionHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-6">
      <h2 className="text-2xl font-bold text-[#1a1a1a]">
        Question {currentQuestion} / {totalQuestions}
      </h2>
      <div className="flex items-center gap-6">
        <button
          onClick={onReport}
          className="flex flex-col items-center gap-1 text-black hover:opacity-80 transition-opacity"
          title="Report Question"
        >
          <AlertTriangle className="w-6 h-6" />
        </button>
        <button
          onClick={onFlag}
          className={`flex flex-col items-center gap-1 transition-opacity ${
            isFlagged ? 'text-[#ef4444]' : 'text-[#ef4444] hover:opacity-80'
          }`}
          title="Flag Question"
        >
          <Flag className={`w-6 h-6 ${isFlagged ? 'fill-current' : ''}`} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-sm text-[#6e6e6e] font-medium">Points</span>
          <span className="font-semibold text-[#1a1a1a]">{points} Marks</span>
        </div>
      </div>
    </div>
  );
};
