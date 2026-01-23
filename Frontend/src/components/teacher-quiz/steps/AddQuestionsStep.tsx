"use client";

import React from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Question } from "@/app/(teacher)/create-quiz/useCreateQuiz";

interface AddQuestionsStepProps {
  questions: Question[];
  onEditQuestion: (id: number) => void;
}

const AddQuestionsStep: React.FC<AddQuestionsStepProps> = ({
  questions,
  onEditQuestion,
}) => {
  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No questions generated yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((q, index) => (
        <div
          key={q.id}
          className="border rounded-lg p-4 space-y-3 bg-background"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Q{index + 1}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-muted">
                {q.type}
              </span>
              <span className="text-xs text-muted-foreground">
                {q.points} marks
              </span>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEditQuestion(q.id)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>

          {/* Question Text */}
          <p className="text-sm font-medium">{q.text}</p>

          {/* MCQ Options */}
          {q.options && q.options.length > 0 && (
            <ul className="space-y-1 pl-4">
              {q.options.map((opt, i) => (
                <li
                  key={i}
                  className={`text-sm ${
                    q.answer === opt
                      ? "font-semibold text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  • {opt}
                </li>
              ))}
            </ul>
          )}

          {/* Answer (Short / Long / True-False) */}
          {!q.options && q.answer && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Answer: </span>
              {q.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddQuestionsStep;
