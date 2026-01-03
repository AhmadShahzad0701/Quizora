import { Book, CheckCircle2, Clock, Share2, Star, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface QuizData {
  title: string;
  description: string;
  subject: string;
  timeMinutes: number;
  points: number;
  difficulty: string;
}

interface PublishStepProps {
  quiz: QuizData;
  questionCount: number;
  isPublic: boolean;
  onTogglePublic: (value: boolean) => void;
  onShare: () => void;
}

export function PublishStep({
  quiz,
  questionCount,
  isPublic,
  onTogglePublic,
  onShare,
}: PublishStepProps) {
  const difficultyColor = {
    easy: "bg-[hsl(142,76%,36%)] text-[hsl(0,0%,100%)]", // From --quiz-green and --primary-foreground
    medium: "bg-[hsl(47,100%,50%)] text-[hsl(0,0%,100%)]", // Representing yellow for medium
    hard: "bg-[hsl(0,84%,60%)] text-[hsl(0,0%,100%)]", // From --destructive and --destructive-foreground
  }[quiz.difficulty.toLowerCase()] || "bg-[hsl(142,76%,36%)] text-[hsl(0,0%,100%)]";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-[hsl(215,16%,47%)]">Make Quiz Public</span>
          <Switch checked={isPublic} onCheckedChange={onTogglePublic} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Copy className="h-5 w-5 text-[hsl(217,91%,60%)]" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onShare}>
            <Share2 className="h-5 w-5 text-[hsl(217,91%,60%)]" />
          </Button>
        </div>
      </div>

      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(142,76%,36%)]/20 mb-4">
          <CheckCircle2 className="h-10 w-10 text-[hsl(142,76%,36%)]" />
        </div>
        <h2 className="text-2xl font-bold text-[hsl(222,47%,11%)]">Ready to Publish!</h2>
        <p className="text-[hsl(215,16%,47%)] mt-1">
          Your quiz is complete and ready to be shared with students
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[hsl(210,40%,96%)]/50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-[hsl(217,91%,60%)]">{questionCount}</p>
          <p className="text-sm text-[hsl(215,16%,47%)]">Questions</p>
        </div>
        <div className="bg-[hsl(210,40%,96%)]/50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-[hsl(217,91%,60%)]">{quiz.points}</p>
          <p className="text-sm text-[hsl(215,16%,47%)]">Total Points</p>
        </div>
        <div className="bg-[hsl(210,40%,96%)]/50 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-[hsl(217,91%,60%)]">{quiz.timeMinutes}</p>
          <p className="text-sm text-[hsl(215,16%,47%)]">Minutes</p>
        </div>
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

      <div className="bg-[hsl(210,40%,96%)]/30 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-[hsl(222,47%,11%)]">What happens next?</h3>
        <div className="space-y-3">
          {[
            { title: "Quiz will be saved", desc: "Your quiz will be available in your dashboard" },
            { title: "Share with students", desc: "Generate a code or link to share with your class" },
            { title: "Monitor Responses", desc: "Track student submissions and view analytics in real time" },
            { title: "Schedule or start instantly", desc: "You can start a live session or schedule for later" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[hsl(217,91%,60%)] mt-0.5" />
              <div>
                <p className="font-medium text-[hsl(222,47%,11%)]">{item.title}</p>
                <p className="text-sm text-[hsl(215,16%,47%)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
