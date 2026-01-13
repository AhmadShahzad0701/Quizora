"use client";

import { useState } from "react";
import { QuizCard } from "../../../components/quiz/QuizCard";
import { RubricsButton } from "../../../components/quiz/RubricsButton";
import { Question } from "../../../types/quiz";
import { useToast } from "../../../hooks/use-toast";
import StudentNavbar from "@/components/navigation/StudentNavbar";
import RubricsModal from "@/components/quiz/RubricsModal"; // Import RubricsModal

const sampleQuestions: Question[] = [
  // Sample questions structure here
  {
    id: "1",
    type: "mcq",
    question: "Where is GIFT University located?",
    points: 5,
    options: ["Gujranwala", "Lahore", "Faisalabad", "Karachi"],
  },
  {
    id: "2",
    type: "fill-blank",
    question: "GIFT University is located in _________.",
    points: 5,
    options: ["Gujranwala", "Lahore", "Faisalabad", "Karachi"],
  },
  {
    id: "3",
    type: "true-false",
    question: "GIFT University is located in Gujranwala.",
    points: 5,
  },
  {
    id: "4",
    type: "short-answer",
    question: "Who is the chairman of GIFT University Gujranwala?",
    points: 5,
    placeholder: "Type your answer here...",
  },
  {
    id: "5",
    type: "long-answer",
    question: "Write a detailed description on the history of Pakistan?",
    points: 5,
    placeholder: "Write your detailed answer here...",
  },
  {
    id: "6",
    type: "coding",
    question: "Coding Question",
    points: 5,
    problemStatement: "Sum of Even Numbers in an Array",
    language: "Python",
    description:
      "The problem asks you to write a Python function that calculates the sum of all even numbers in a given array of integers. The function should handle both positive and negative numbers, returning the sum of even numbers, or 0 if there are no even numbers in the array. The function should efficiently process arrays of up to 1000 integers.",
    testCases: [{ input: "[3, 5, 4, 2, 1]", output: "6" }],
    returns: "Print the sum of even elements in the array as a single integer.",
    starterCode: `import React, { useState, useEffect }
from "react";
import { defineProperties } from
"figma:react";

export default function AnalogClock({
  updateInterval = 1000,
  secondHandColor = "red",
  minuteHandColor = "black",
  hourHandColor = "black",
}) {
  const [time, setTime] = useState({
hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateClock = () => {`,
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [isRubricsModalOpen, setIsRubricsModalOpen] = useState(false); // State to manage the modal visibility
  const { toast } = useToast();

  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || "";

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleFlag = () => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion.id)) {
        newSet.delete(currentQuestion.id);
        toast({
          title: "Question unflagged",
          description: "You can review flagged questions later.",
        });
      } else {
        newSet.add(currentQuestion.id);
        toast({
          title: "Question flagged",
          description: "You can review this question later.",
        });
      }
      return newSet;
    });
  };

  const handleReport = () => {
    toast({
      title: "Question reported",
      description: "Thank you for your feedback.",
    });
  };

  const handleSubmit = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      toast({
        title: "Answer submitted",
        description: `Moving to question ${currentQuestionIndex + 2}`,
      });
    } else {
      toast({
        title: "Quiz completed!",
        description: "All answers have been submitted.",
      });
    }
  };

  const handleReadRubrics = () => {
    setIsRubricsModalOpen(true); // Open the rubrics modal
  };

  const handleCloseRubrics = () => {
    setIsRubricsModalOpen(false); // Close the rubrics modal
  };

  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + 1) / sampleQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-green-200 flex flex-col">
      <StudentNavbar studentName="Asad" />

      {/* Progress bar */}
      <div className="h-1 bg-secondary">
        <div
          className="h-full quiz-submit-gradient transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 bg-gradient-to-br from-blue-200 to-green-200 py-8 px-4">
        <QuizCard
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={sampleQuestions.length}
          answer={currentAnswer}
          isFlagged={flaggedQuestions.has(currentQuestion.id)}
          onAnswerChange={handleAnswerChange}
          onFlag={handleFlag}
          onReport={handleReport}
          onSubmit={handleSubmit}
        />

        <RubricsButton onClick={handleReadRubrics} />
      </main>

      {/* Render Rubrics Modal */}
      <RubricsModal isOpen={isRubricsModalOpen} onClose={handleCloseRubrics} />
    </div>
  );
};

export default Quiz;
