import { ChevronRight } from "lucide-react";

interface AIEvaluationCardProps {
  summaryPoints: string[];
}

const AIEvaluationCard = ({ summaryPoints }: AIEvaluationCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">AI Evaluation Summary</h3>

      <div className="space-y-4">
        {summaryPoints.map((point, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <ChevronRight className="h-4 w-4 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIEvaluationCard;
