import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuestionItemProps {
  questionNumber: number;
  questionType: string;
  points: number;
  questionText: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function QuestionItem({
  questionNumber,
  questionType,
  points,
  questionText,
  onEdit,
  onDelete,
}: QuestionItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-[hsl(214,32%,91%)] rounded-lg hover:border-[hsl(217,91%,60%)]/30 transition-colors">
      <div className="flex items-start gap-4">
        <span className="text-[hsl(217,91%,60%)] font-semibold">Q{questionNumber}</span>
        <div>
          <p className="text-xs text-[hsl(215,16%,47%)]">
            {questionType} · {points} pts
          </p>
          <p className="text-[hsl(222,47%,11%)] mt-1">{questionText}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={onEdit} className="text-[hsl(215,16%,47%)] bg-white hover:bg-[hsl(210,40%,96%)] hover:text-[hsl(222,47%,11%)]">
          Edit
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete} className="text-[hsl(0,84%,60%)] hover:text-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,60%)]/10">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
