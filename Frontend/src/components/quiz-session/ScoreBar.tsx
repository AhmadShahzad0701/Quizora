import { cn } from "@/lib/utils";

interface ScoreBarProps {
  score: number;
  maxScore?: number;
  className?: string;
}

const ScoreBar = ({ score, maxScore = 100, className }: ScoreBarProps) => {
  const percentage = Math.min((score / maxScore) * 100, 100);
  
  // Color gradient based on score - higher scores are more green, lower are more blue
  const getBarColor = () => {
    if (percentage >= 70) return "bg-gradient-to-r from-primary via-emerald-500 to-emerald-400";
    if (percentage >= 50) return "bg-gradient-to-r from-primary via-cyan-500 to-cyan-400";
    if (percentage >= 30) return "bg-gradient-to-r from-primary to-sky-400";
    return "bg-gradient-to-r from-primary to-blue-400";
  };
  
  return (
    <div className={cn("flex items-center gap-3 w-full", className)}>
      <div className="flex-1 h-4 bg-scorebar-track rounded-full overflow-hidden shadow-inner">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out shadow-md",
            getBarColor()
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-bold text-foreground min-w-[3.5rem] text-right">
        {score}/{maxScore}
      </span>
    </div>
  );
};

export default ScoreBar;
