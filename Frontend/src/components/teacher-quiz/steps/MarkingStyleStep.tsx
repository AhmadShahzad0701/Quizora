import { Counter } from "../Counter";

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
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[hsl(222,47%,11%)]">Evaluation Criteria/Style:</h2>
        <span className="text-3xl font-bold text-[hsl(222,47%,11%)]">{total}</span>
      </div>

      <div className="space-y-2 divide-y divide-[hsl(214,32%,91%)]">
        <Counter
          label="Conceptual Understanding / Logic"
          value={data.conceptual}
          onChange={(value) => onChange({ ...data, conceptual: value })}
        />
        <Counter
          label="Language Clarity (Grammar & Sentence Meaning)"
          value={data.languageClarity}
          onChange={(value) => onChange({ ...data, languageClarity: value })}
        />
        <Counter
          label="Spelling Accuracy"
          value={data.spelling}
          onChange={(value) => onChange({ ...data, spelling: value })}
        />
        <Counter
          label="Answer Length & Completeness"
          value={data.answerLength}
          onChange={(value) => onChange({ ...data, answerLength: value })}
        />
        <Counter
          label="Strict Marking"
          value={data.strictMarking}
          onChange={(value) => onChange({ ...data, strictMarking: value })}
        />
        <Counter
          label="Handling Incorrect or Contradictory Answers (logically incorrect but show genuine effort.)"
          value={data.handlingIncorrect}
          onChange={(value) => onChange({ ...data, handlingIncorrect: value })}
        />
        <Counter
          label="Effort / Attempt Bonus"
          value={data.effortBonus}
          onChange={(value) => onChange({ ...data, effortBonus: value })}
        />
      </div>
    </div>
  );
}
