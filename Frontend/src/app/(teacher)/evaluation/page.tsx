"use client";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { evaluateAnswer } from "@/services/evaluationService";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TeacherNavbar from "@/components/navigation/TeacherNavbar";
import {
  Zap,
  Scale,
  ShieldCheck,
} from "lucide-react";

type Mode = "fast" | "balanced" | "strict";

export default function EvaluationPage() {
  const [mode, setMode] = useState<Mode>("balanced");
  const router = useRouter();

  const [form, setForm] = useState({
    student_id: "",
    question_id: "",
    question: "",
     model_answer: "",
    student_answer: "",
  });

  const [isEvaluating, setIsEvaluating] = useState(false);

const handleEvaluate = async () => {
  setIsEvaluating(true);

  const payload = {
  evaluations: [
    {
      student_id: form.student_id,
      question_id: form.question_id,
      question_type: "descriptive" as const,
      question: form.question,

      model_answer: form.model_answer,   // 👈 ADD THIS
      student_answer: form.student_answer,

      rubric:
        mode === "fast"
          ? { "Conceptual Understanding": 4, Clarity: 2, Completeness: 1 }
          : mode === "strict"
          ? { "Conceptual Understanding": 6, Clarity: 3, Completeness: 1 }
          : { "Conceptual Understanding": 5, Clarity: 3, Completeness: 2 },

      max_score: 10,
    },
  ],
};


  try {
    const result = await evaluateAnswer(payload);

    // 🧠 Save result temporarily (localStorage / state / context)
    localStorage.setItem("evaluationResult", JSON.stringify(result));

    router.push("/evaluation/results");
  } catch (err) {
    console.error("Evaluation failed", err);
    alert("Evaluation failed. Please try again.");
  } finally {
    setIsEvaluating(false);
  }
};


  return (
    <div className="min-h-screen bg-background">
      <TeacherNavbar />

      <main className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-semibold mb-1">
              AI Evaluation
            </h1>
            <p className="text-base text-muted-foreground">
              Evaluate student answers using Quizora’s AI-powered grading engine
            </p>
          </div>

          {/* EVALUATION STYLE */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              Evaluation Style
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              <EvalModeCard
                active={mode === "fast"}
                onClick={() => setMode("fast")}
                title="Fast"
                desc="Quick & lenient checking"
                icon={Zap}
              />
              <EvalModeCard
                active={mode === "balanced"}
                onClick={() => setMode("balanced")}
                title="Balanced"
                desc="Recommended default"
                icon={Scale}
              />
              <EvalModeCard
                active={mode === "strict"}
                onClick={() => setMode("strict")}
                title="Strict"
                desc="Exam-level evaluation"
                icon={ShieldCheck}
              />
            </div>
          </div>

          {/* INPUT DETAILS */}
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">
              Evaluation Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Student ID (e.g. S5)"
                value={form.student_id}
                onChange={(e) =>
                  setForm({ ...form, student_id: e.target.value })
                }
              />
              <Input
                placeholder="Question ID (e.g. Q1)"
                value={form.question_id}
                onChange={(e) =>
                  setForm({ ...form, question_id: e.target.value })
                }
              />
            </div>

            <Textarea
              placeholder="Question statement"
              value={form.question}
              onChange={(e) =>
                setForm({ ...form, question: e.target.value })
              }
            />

            <Textarea
              placeholder="Student answer (leave empty if not attempted)"
              value={form.student_answer}
              onChange={(e) =>
                setForm({ ...form, student_answer: e.target.value })
              }
            />
            <Textarea
  placeholder="Expected / Model Answer (Teacher Answer)"
  value={form.model_answer}
  onChange={(e) =>
    setForm({ ...form, model_answer: e.target.value })
  }
/>

          </Card>

          {/* ACTION */}
          <div className="flex justify-end">
            <Button
  size="lg"
  disabled={isEvaluating}
  onClick={handleEvaluate}
  className="bg-gradient-primary hover:opacity-90"
>
  {isEvaluating ? "Evaluating..." : "Start Evaluation"}
</Button>

          </div>

        </div>
      </main>
    </div>
  );
}

/* ------------------ */
/* MODE CARD (same vibe as Quick Actions) */
/* ------------------ */
function EvalModeCard({
  title,
  desc,
  icon: Icon,
  active,
  onClick,
}: {
  title: string;
  desc: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className={`p-5 cursor-pointer transition-all hover:shadow-md ${
        active
          ? "border-primary bg-primary/5"
          : "border hover:border-muted-foreground/30"
      }`}
    >
      <div className="space-y-3">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            active ? "bg-primary text-white" : "bg-muted"
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
    </Card>
  );
}
