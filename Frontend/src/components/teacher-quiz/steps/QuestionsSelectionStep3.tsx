import {
  Brain,
  CheckCircle,
  Edit3,
  AlignLeft,
  Code,
} from "lucide-react";
import { QuestionTypeCard } from "../QuestionTypeCard";

interface QuestionCounts {
  mcq: number;
  fillBlanks: number;
  trueFalse: number;
  short: number;
  long: number;
  coding: number;
}

interface QuestionsSelectionStep3Props {
  data: QuestionCounts;
  onChange: (data: QuestionCounts) => void;
}

export const QuestionsSelectionStep3 = ({
  data,
  onChange,
}: QuestionsSelectionStep3Props) => {
  const update = (key: string, value: number) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">
        Choose Question Types
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Select how many questions you want for each type
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <QuestionTypeCard
          title="Multiple Choice"
          description="Best for conceptual and factual testing"
          icon={<Brain className="w-6 h-6 text-primary" />}
          value={data.mcq}
          onChange={(v) => update("mcq", v)}
        />

        <QuestionTypeCard
          title="Fill in the Blanks"
          description="Tests recall and understanding"
          icon={<Edit3 className="w-6 h-6 text-primary" />}
          value={data.fillBlanks}
          onChange={(v) => update("fillBlanks", v)}
        />

        <QuestionTypeCard
          title="True / False"
          description="Quick concept verification"
          icon={<CheckCircle className="w-6 h-6 text-primary" />}
          value={data.trueFalse}
          onChange={(v) => update("trueFalse", v)}
        />

        <QuestionTypeCard
          title="Short Answer"
          description="Explain briefly in own words"
          icon={<AlignLeft className="w-6 h-6 text-primary" />}
          value={data.short}
          onChange={(v) => update("short", v)}
        />

        <QuestionTypeCard
          title="Long Answer"
          description="Detailed explanation and reasoning"
          icon={<AlignLeft className="w-6 h-6 text-primary" />}
          value={data.long}
          onChange={(v) => update("long", v)}
        />

        <QuestionTypeCard
          title="Coding Question"
          description="Problem solving with code"
          icon={<Code className="w-6 h-6 text-primary" />}
          value={data.coding}
          onChange={(v) => update("coding", v)}
        />
      </div>
    </div>
  );
};
