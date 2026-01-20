"use client";

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
   Dummy Result (API se replace hoga)
-------------------- */
const evaluationResult = {
  student_id: "S5",
  question_id: "Q1",
  total_score: 10,
  breakdown: {
    "Conceptual Understanding": 0,
    Clarity: 0,
    Completeness: 0,
  },
  feedback:
    "The student demonstrates a good understanding of the differences between TCP and UDP, highlighting key aspects such as connection-oriented vs. connectionless, reliability, and use cases. However, the explanation could be clearer and more structured, and it lacks some details that would enhance completeness.",
  confidence: 1,
};

export default function EvaluationResultsPage() {
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
                  {evaluationResult.total_score}
                </p>
              </div>
            </Card>

            <Card className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <BarChart3 className="w-6 h-6 text-accent" />
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
                  Evaluation Confidence
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

            <div className="space-y-4">
              {Object.entries(evaluationResult.breakdown).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between"
                  >
                    <p className="text-sm">{key}</p>
                    <span className="text-sm font-semibold">
                      {value}
                    </span>
                  </div>
                )
              )}
            </div>
          </Card>

          {/* FEEDBACK */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquareText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">
                AI Examiner Feedback
              </h2>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {evaluationResult.feedback}
            </p>
          </Card>

          {/* ACTIONS */}
          <div className="flex justify-between items-center">
            <Link href="/evaluation">
              <Button variant="outline">
                Evaluate Another Answer
              </Button>
            </Link>

            <Link href="/teacher">
              <Button className="bg-gradient-primary hover:opacity-90">
                Back to Dashboard
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
