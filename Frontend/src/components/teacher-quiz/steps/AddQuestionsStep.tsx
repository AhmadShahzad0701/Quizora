import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionItem } from "../QuestionItem";

interface Question {
  id: number;
  type: string;
  points: number;
  text: string;
}

interface AddQuestionsStepProps {
  questions: Question[];
  isPublic: boolean;
  onTogglePublic: (value: boolean) => void;
  onEditQuestion: (id: number) => void;
  onDeleteQuestion: (id: number) => void;
}

export function AddQuestionsStep({
  questions,
  isPublic,
  onTogglePublic,
  onEditQuestion,
  onDeleteQuestion,
}: AddQuestionsStepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-[hsl(215,16%,47%)]">Make Quiz Public</span>
          {/* Replaced Switch with a native checkbox */}
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => onTogglePublic(e.target.checked)}
            className="form-checkbox"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            {/* Share or copy buttons */}
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[hsl(222,47%,11%)]">Add Questions</h2>
        <p className="text-sm text-[hsl(215,16%,47%)] mt-1">
          Create questions for your quiz ({questions.length} Added)
        </p>
      </div>

      <div className="space-y-3">
        {questions.map((question, index) => (
          <QuestionItem
            key={question.id}
            questionNumber={index + 1}
            questionType={question.type}
            points={question.points}
            questionText={question.text}
            onEdit={() => onEditQuestion(question.id)}
            onDelete={() => onDeleteQuestion(question.id)}
          />
        ))}
      </div>
    </div>
  );
}
