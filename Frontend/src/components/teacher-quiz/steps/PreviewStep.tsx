import { Book, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuizData {
  title: string;
  description: string;
  subject: string;
  timeMinutes: number;
  points: number;
  difficulty: string;
}

interface Question {
  id: number;
  type: string;
  points: number;
  text: string;
  answer?: string;
}

interface PreviewStepProps {
  quiz: QuizData;
  questions: Question[];
}

export function PreviewStep({ quiz, questions }: PreviewStepProps) {
  const difficultyColor = {
    easy: "bg-[hsl(142,76%,36%)] text-[hsl(0,0%,100%)]", // From --quiz-green and --primary-foreground
    medium: "bg-[hsl(47,100%,50%)] text-[hsl(0,0%,100%)]", // Representing yellow for medium
    hard: "bg-[hsl(0,84%,60%)] text-[hsl(0,0%,100%)]", // From --destructive and --destructive-foreground
  }[quiz.difficulty.toLowerCase()] || "bg-[hsl(142,76%,36%)] text-[hsl(0,0%,100%)]";

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-[hsl(222,47%,11%)]">Preview Quiz</h2>
        <p className="text-sm text-[hsl(215,16%,47%)] mt-1">Review your Quiz before publishing</p>
      </div>

      <div className="bg-[hsl(210,40%,96%)]/50 rounded-xl p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-[hsl(222,47%,11%)]">{quiz.title || "Untitled Quiz"}</h3>
          <p className="text-[hsl(215,16%,47%)]">{quiz.description || "No description"}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-[hsl(215,16%,47%)]">
            <Book className="h-4 w-4" />
            <span>{quiz.subject || "General"}</span>
          </div>
          <div className="flex items-center gap-2 text-[hsl(215,16%,47%)]">
            <Clock className="h-4 w-4" />
            <span>{quiz.timeMinutes} Minutes</span>
          </div>
          <div className="flex items-center gap-2 text-[hsl(215,16%,47%)]">
            <Star className="h-4 w-4" />
            <span>{quiz.points} points</span>
          </div>
          <Badge className={difficultyColor}>
            {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[hsl(222,47%,11%)]">Question ({questions.length})</h3>
        
        {questions.map((question, index) => (
          <div key={question.id} className="bg-[hsl(210,40%,96%)]/30 rounded-xl p-4 space-y-2">
            <div className="flex items-start gap-4">
              <span className="text-[hsl(217,91%,60%)] font-semibold bg-[hsl(217,91%,60%)]/10 px-2 py-1 rounded">
                Q{index + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium text-[hsl(222,47%,11%)]">{question.text}</p>
                <p className="text-xs text-[hsl(215,16%,47%)] mt-1">
                  {question.type} · {question.points} pts
                </p>
                {question.answer && (
                  <Badge className="mt-2 bg-[hsl(217,91%,60%)]">{question.answer}</Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
