import { Counter } from "../Counter";

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

export function QuestionsSelectionStep3({ data, onChange }: QuestionsSelectionStep3Props) {
  const total = data.mcq + data.fillBlanks + data.trueFalse + data.short + data.long + data.coding;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[hsl(222,47%,11%)]">Questions *</h2>
        <span className="text-3xl font-bold text-[hsl(222,47%,11%)]">{total}</span>
      </div>

      <div className="space-y-2 divide-y divide-[hsl(214,32%,91%)]">
        <Counter
          label="Multiple Choice Questions"
          value={data.mcq}
          onChange={(value) => onChange({ ...data, mcq: value })}
        />
        <Counter
          label="Fill in the Blanks"
          value={data.fillBlanks}
          onChange={(value) => onChange({ ...data, fillBlanks: value })}
        />
        <Counter
          label="True / False"
          value={data.trueFalse}
          onChange={(value) => onChange({ ...data, trueFalse: value })}
        />
        <Counter
          label="Short"
          value={data.short}
          onChange={(value) => onChange({ ...data, short: value })}
        />
        <Counter
          label="Long"
          value={data.long}
          onChange={(value) => onChange({ ...data, long: value })}
        />
        <Counter
          label="Coding"
          value={data.coding}
          onChange={(value) => onChange({ ...data, coding: value })}
        />
      </div>
    </div>
  );
}
