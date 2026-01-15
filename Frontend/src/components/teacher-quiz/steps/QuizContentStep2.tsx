"use client";

import {
  Brain,
  CheckCircle,
  Edit3,
  AlignLeft,
  Code,
  Info,
} from "lucide-react";
import { QuestionTypeCard } from "../QuestionTypeCard";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

/* ----------------------------------
   Types
----------------------------------- */

export interface QuestionCounts {
  mcq: number;
  fillBlanks: number;
  trueFalse: number;
  short: number;
  long: number;
  coding: number;
}

interface Props {
  timeLimit: string;
  numberOfQuestions: string;
  totalMarks: string;
  questionCounts: QuestionCounts;
  onChangeMeta: (data: {
    timeLimit: string;
    numberOfQuestions: string;
    totalMarks: string;
  }) => void;
  onChangeQuestions: (data: QuestionCounts) => void;
}

/* ----------------------------------
   Constants
----------------------------------- */

const QUIZ_MODE_DISTRIBUTION = {
  objective: {
    mcq: 0.7,
    fillBlanks: 0.15,
    trueFalse: 0.15,
    short: 0,
    long: 0,
    coding: 0,
  },
  mixed: {
    mcq: 0.4,
    short: 0.3,
    trueFalse: 0.15,
    fillBlanks: 0.15,
    long: 0,
    coding: 0,
  },
  descriptive: {
    short: 0.4,
    long: 0.4,
    mcq: 0.2,
    fillBlanks: 0,
    trueFalse: 0,
    coding: 0,
  },
} as const;

/* ----------------------------------
   Component
----------------------------------- */

export const QuizContentStep2 = ({
  timeLimit,
  numberOfQuestions,
  totalMarks,
  questionCounts,
  onChangeMeta,
  onChangeQuestions,
}: Props) => {
  const [quizMode, setQuizMode] = useState<
    "objective" | "mixed" | "descriptive" | null
  >(null);

  const totalSelected = Object.values(questionCounts).reduce(
    (a, b) => a + b,
    0
  );

  const applyDistribution = (
    mode: keyof typeof QUIZ_MODE_DISTRIBUTION
  ) => {
    const total = Number(numberOfQuestions);
    if (!total) return;

    const dist = QUIZ_MODE_DISTRIBUTION[mode];

    const updated: QuestionCounts = {
      mcq: Math.round((dist.mcq ?? 0) * total),
      fillBlanks: Math.round((dist.fillBlanks ?? 0) * total),
      trueFalse: Math.round((dist.trueFalse ?? 0) * total),
      short: Math.round((dist.short ?? 0) * total),
      long: Math.round((dist.long ?? 0) * total),
      coding: Math.round((dist.coding ?? 0) * total),
    };

    onChangeQuestions(updated);
  };

  const updateQuestionCount = (
    key: keyof QuestionCounts,
    value: number
  ) => {
    onChangeQuestions({
      ...questionCounts,
      [key]: value,
    });
  };

  const QUESTION_TYPES = [
    { key: "mcq", title: "Multiple Choice", desc: "Best for conceptual and factual testing", icon: Brain },
    { key: "fillBlanks", title: "Fill in the Blanks", desc: "Tests recall and understanding", icon: Edit3 },
    { key: "trueFalse", title: "True / False",desc: "Quick concept verification", icon: CheckCircle },
    { key: "short", title: "Short Answer", desc: "Brief explanation in own words", icon: AlignLeft },
    { key: "long", title: "Long Answer", desc: "Detailed reasoning and explanation", icon: AlignLeft },
    { key: "coding", title: "Coding Question", desc: "Problem solving with code", icon: Code },
  ] as const;

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold">Questions & Marks</h2>
{/* ---------------- Quiz Nature (OPTION B) ---------------- */}

      <div className="space-y-3">
        <Label className="text-base font-semibold">
          What type of quiz are you creating?
        </Label>

        <div className="grid md:grid-cols-3 gap-4">
          {(["objective", "mixed", "descriptive"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => {
                setQuizMode(mode);
                applyDistribution(mode);
              }}
              className={`p-4 rounded-xl border text-left transition ${
                quizMode === mode
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/40"
              }`}
            >
              <h4 className="font-medium capitalize">{mode}</h4>
              <p className="text-sm text-muted-foreground">
                Smart auto distribution
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- Meta ---------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Time Limit (Minutes)</Label>
          <Select
            value={timeLimit}
            onValueChange={(value) =>
              onChangeMeta({ timeLimit: value, numberOfQuestions, totalMarks })
            }
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {["15", "30", "45", "60", "90", "120"].map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Total Questions</Label>
          <Select
            value={numberOfQuestions}
            onValueChange={(value) =>
              onChangeMeta({ timeLimit, numberOfQuestions: value, totalMarks })
            }
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select number" />
            </SelectTrigger>
            <SelectContent>
              {["5", "10", "15", "20", "25", "30"].map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full md:w-1/2 space-y-2">
        <Label>Total Marks</Label>
        <Select
          value={totalMarks}
          onValueChange={(value) =>
            onChangeMeta({ timeLimit, numberOfQuestions, totalMarks: value })
          }
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select marks" />
          </SelectTrigger>
          <SelectContent>
            {["10", "20", "50", "100"].map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      
      {/* ---------------- Info Hint ---------------- */}

      {Number(numberOfQuestions) !== totalSelected && (
        <div className="flex items-center gap-2 text-sm bg-muted px-4 py-3 rounded-lg">
          <Info className="w-4 h-4" />
          Total questions and type distribution don’t match!
        </div>
      )}

      {/* ---------------- Question Types ---------------- */}

      <div className="grid md:grid-cols-2 gap-6">
        {QUESTION_TYPES.map((q) => (
          <QuestionTypeCard
            key={q.key}
            title={q.title}
            description={q.desc}
            icon={<q.icon className="w-6 h-6 text-primary" />}
            value={questionCounts[q.key]}
            onChange={(v) => updateQuestionCount(q.key, v)}
          />
        ))}
      </div>
    </div>
  );
};
