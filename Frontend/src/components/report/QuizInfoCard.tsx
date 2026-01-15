import { BookOpen, Clock, CirclePlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuizInfoCardProps {
  title: string;
  topic: string;
  category: string;
  duration: string;
  points: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

const QuizInfoCard = ({
  title,
  topic,
  category,
  duration,
  points,
  difficulty,
}: QuizInfoCardProps) => {
  const difficultyColors = {
    Easy: "bg-success text-success-foreground",
    Medium: "bg-orange-500 text-white",
    Hard: "bg-destructive text-destructive-foreground",
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground mt-1">{topic}</p>

      <div className="flex items-center gap-6 mt-4 flex-wrap">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-sm">{category}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm">{duration}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CirclePlus className="h-4 w-4 text-primary" />
          <span className="text-sm">{points} points</span>
        </div>
        <Badge className={`${difficultyColors[difficulty]} font-medium px-4`}>
          {difficulty}
        </Badge>
      </div>
    </div>
  );
};

export default QuizInfoCard;
