import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, TrendingUp, Calendar } from "lucide-react";
import { QuizSummary } from "@/types/quizzes";

interface QuizResultCardProps {
  quiz: QuizSummary;
}

const QuizResultCard = ({ quiz }: QuizResultCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success/10 text-success border-0">
            Completed
          </Badge>
        );
      case "active":
        return (
          <Badge className="bg-primary/10 text-primary border-0">
            Active
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-warning/10 text-warning border-0">
            Scheduled
          </Badge>
        );
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <Link href={`/results/${quiz.id}`} className="block">
      <Card className="group cursor-pointer border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex items-center gap-6">
          
          {/* Icon */}
          <div className="rounded-xl bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>

          {/* Quiz Info */}
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary">
              {quiz.title}
            </h3>
            <p className="truncate text-sm text-muted-foreground">
              {quiz.subject}
            </p>
          </div>

          {/* Desktop Stats */}
          <div className="hidden items-center gap-8 md:grid md:grid-cols-3">
            
            {/* Date */}
            <div className="min-w-[100px] text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span className="text-xs">Date</span>
              </div>
              <p className="text-sm font-medium text-foreground">
                {quiz.createdAt}
              </p>
            </div>

            {/* Students */}
            <div className="min-w-[80px] text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                <Users className="h-3 w-3" />
                <span className="text-xs">Students</span>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {quiz.totalStudents}
              </p>
            </div>

            {/* Average Score */}
            <div className="min-w-[80px] text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs">Average</span>
              </div>
              <p
                className={`text-lg font-semibold ${
                  quiz.status === "completed"
                    ? getScoreColor(quiz.averageScore)
                    : "text-muted-foreground"
                }`}
              >
                {quiz.status === "completed"
                  ? `${quiz.averageScore}%`
                  : "—"}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex min-w-[100px] justify-end">
            {getStatusBadge(quiz.status)}
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-4 md:hidden">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="text-sm font-medium">{quiz.createdAt}</p>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">Students</p>
            <p className="text-sm font-semibold">{quiz.totalStudents}</p>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">Average</p>
            <p
              className={`text-sm font-semibold ${
                quiz.status === "completed"
                  ? getScoreColor(quiz.averageScore)
                  : "text-muted-foreground"
              }`}
            >
              {quiz.status === "completed"
                ? `${quiz.averageScore}%`
                : "—"}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default QuizResultCard;
