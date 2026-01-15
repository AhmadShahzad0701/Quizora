import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/types/quizzes";
import { Clock, Award } from "lucide-react";

interface StudentResultRowProps {
  student: Student;
  rank: number;
}

const StudentResultRow = ({ student, rank }: StudentResultRowProps) => {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBg = (percentage: number) => {
    if (percentage >= 80) return "bg-success/10";
    if (percentage >= 60) return "bg-warning/10";
    return "bg-destructive/10";
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-warning text-warning-foreground";
    if (rank === 2) return "bg-muted text-muted-foreground";
    if (rank === 3) return "bg-warning/60 text-foreground";
    return "bg-muted text-muted-foreground";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group">
      {/* Rank */}
      <div className="flex-shrink-0 w-10">
        {rank <= 3 ? (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(rank)}`}>
            <Award className="w-4 h-4" />
          </div>
        ) : (
          <span className="text-muted-foreground font-medium text-sm">#{rank}</span>
        )}
      </div>

      {/* Avatar & Name */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar className="h-10 w-10 border-2 border-border">
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
            {getInitials(student.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-medium text-foreground truncate">{student.name}</p>
          <p className="text-xs text-muted-foreground truncate">{student.id}</p>
        </div>
      </div>

      {/* Time Spent */}
      <div className="hidden sm:flex items-center gap-1 text-muted-foreground min-w-[80px]">
        <Clock className="w-3.5 h-3.5" />
        <span className="text-sm">{student.timeSpent}</span>
      </div>

      {/* Submitted At */}
      <div className="hidden md:block text-sm text-muted-foreground min-w-[120px]">
        {student.submittedAt}
      </div>

      {/* Score */}
      <div className={`${getScoreBg(student.percentage)} px-4 py-2 rounded-lg min-w-[80px] text-center`}>
        <span className={`font-bold ${getScoreColor(student.percentage)}`}>
          {student.percentage}%
        </span>
      </div>

      {/* Status */}
      <Badge
        className={`min-w-[90px] justify-center ${
          student.status === "completed"
            ? "bg-success/10 text-success border-0"
            : student.status === "pending"
            ? "bg-warning/10 text-warning border-0"
            : "bg-primary/10 text-primary border-0"
        }`}
      >
        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
      </Badge>
    </div>
  );
};

export default StudentResultRow;
