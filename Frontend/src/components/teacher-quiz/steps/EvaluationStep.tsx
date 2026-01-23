import {
  Brain,
  SpellCheck,
  AlignLeft,
  Scale,
  AlertTriangle,
  Gift,
  Plus,
  Minus,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

const DEFAULT_EVALUATION: EvaluationCriteria = {
  conceptual: 6,
  languageClarity: 3,
  spelling: 1,
  answerLength: 3,
  strictMarking: 0,
  handlingIncorrect: 2,
  effortBonus: 2,
};

interface EvaluationCriteria {
  conceptual: number;
  languageClarity: number;
  spelling: number;
  answerLength: number;
  strictMarking: number;
  handlingIncorrect: number;
  effortBonus: number;
}

interface MarkingStyleStepProps {
  data: EvaluationCriteria;
  onChange: (data: EvaluationCriteria) => void;
}

export function MarkingStyleStep({ data, onChange }: MarkingStyleStepProps) {
  const total = Object.values(data).reduce((s, v) => s + v, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER */}
      <div className="flex items-center justify-between">
  <div>
    <h2 className="text-2xl font-bold">AI Evaluation Blueprint</h2>
    <p className="text-sm text-muted-foreground mt-1 max-w-xl">
      Configure how the AI evaluates answers — exactly like a human examiner.
    </p>

    <Button
      variant="outline"
      size="sm"
      className="mt-3"
      onClick={() => onChange(DEFAULT_EVALUATION)}
    >
      Use Default (Fast Evaluation)
    </Button>
  </div>

  <div className="bg-card border rounded-xl px-6 py-4 text-center">
    <div className="text-xs text-muted-foreground">Total Score Weight</div>
    <div className="text-3xl font-bold text-primary">{total}</div>
  </div>
</div>
      
      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        <EvalCard
          icon={Brain}
          title="Conceptual Understanding"
          desc="Logic, reasoning depth, correctness"
          value={data.conceptual}
          onChange={(v) => onChange({ ...data, conceptual: v })}
        />

        <EvalCard
          icon={AlignLeft}
          title="Language Clarity"
          desc="Grammar, structure, meaning"
          value={data.languageClarity}
          onChange={(v) => onChange({ ...data, languageClarity: v })}
        />

        <EvalCard
          icon={SpellCheck}
          title="Spelling Accuracy"
          desc="Penalize spelling mistakes"
          value={data.spelling}
          onChange={(v) => onChange({ ...data, spelling: v })}
        />

        <EvalCard
          icon={Scale}
          title="Answer Completeness"
          desc="Length & coverage of answer"
          value={data.answerLength}
          onChange={(v) => onChange({ ...data, answerLength: v })}
        />

        <EvalCard
          icon={AlertTriangle}
          title="Handling Incorrect Answers"
          desc="Reward genuine effort even if wrong"
          value={data.handlingIncorrect}
          onChange={(v) => onChange({ ...data, handlingIncorrect: v })}
        />

        <EvalCard
          icon={Gift}
          title="Effort / Attempt Bonus"
          desc="Extra credit for sincere attempts"
          value={data.effortBonus}
          onChange={(v) => onChange({ ...data, effortBonus: v })}
        />
      </div>
      
    </div>

  );
}

/* ---------------------------------- */
/* CARD (same UX as QuestionTypeCard) */
/* ---------------------------------- */

function EvalCard({
  icon: Icon,
  title,
  desc,
  value,
  onChange,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <Card className="p-5 border-2 hover:border-primary/50 transition-all">
      <div className="flex items-start gap-4">
        
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{desc}</p>

          <div className="flex items-center gap-3 mt-4">
            <Button
              size="icon"
              variant="outline"
              onClick={() => onChange(Math.max(0, value - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>

            <span className="w-10 text-center text-lg font-semibold">
              {value}
            </span>

            <Button
              size="icon"
              variant="outline"
              onClick={() => onChange(value + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
