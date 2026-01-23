"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TeacherNavbar from "@/components/navigation/TeacherNavbar";
import {
  CheckCircle2,
  MessageSquareText,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

/* --------------------
   TYPES
-------------------- */
interface EvaluationResult {
  student_id: string;
  question_id: string;
  score: number;
  breakdown: Record<string, number>;
  feedback: string;
  confidence: number;
}

export default function EvaluationResultsPage() {
  const [evaluationResult] = useState<EvaluationResult | null>(() => {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem("evaluationResult");
  if (!stored) return null;

  const parsed = JSON.parse(stored);
  return parsed?.results?.[0] ?? null;
});


  

  if (!evaluationResult) {
    return (
      <div className="min-h-screen bg-background">
        <TeacherNavbar />
        <main className="pt-20 px-6 text-center">
          <p className="text-muted-foreground">
            No evaluation result found.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TeacherNavbar />

      <main className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-semibold mb-1">
              Evaluation Results
            </h1>
            <p className="text-base text-muted-foreground">
              AI-generated evaluation with detailed breakdown and feedback
            </p>
          </div>

          {/* SUMMARY */}
          <div className="grid md:grid-cols-3 gap-5">
            <Card className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Total Score
                </p>
                <p className="text-2xl font-semibold">
                  {evaluationResult.score}
                </p>
              </div>
            </Card>

            <Card className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Question ID
                </p>
                <p className="text-lg font-medium">
                  {evaluationResult.question_id}
                </p>
              </div>
            </Card>

            <Card className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <ShieldCheck className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Confidence
                </p>
                <p className="text-lg font-medium">
                  {evaluationResult.confidence === 1
                    ? "High"
                    : "Medium"}
                </p>
              </div>
            </Card>
          </div>

          {/* BREAKDOWN */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Marks Breakdown
            </h2>

            {Object.entries(evaluationResult.breakdown).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between text-sm py-1"
                >
                  <span>{key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              )
            )}
          </Card>

          {/* FEEDBACK */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquareText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">
                AI Examiner Feedback
              </h2>
            </div>

            <p className="text-sm text-muted-foreground">
              {evaluationResult.feedback}
            </p>
          </Card>

          {/* ACTIONS */}
          <div className="flex justify-between">
            <Link href="/evaluation">
              <Button variant="outline">
                Evaluate Another Answer
              </Button>
            </Link>

            <Link href="/teacher">
              <Button className="bg-gradient-primary">
                Back to Dashboard
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
