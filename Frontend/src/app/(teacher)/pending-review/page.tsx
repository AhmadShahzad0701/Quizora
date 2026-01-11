"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/navigation/Navbar";

// Mock question data
const mockQuestion = {
  questionNumber: 3,
  totalQuestions: 6,
  text: "GIFT University is located in Gujranwala.",
  options: [
    { id: "true", label: "True" },
    { id: "false", label: "False" },
  ],
  points: 5,
  studentAnswer: "true",
  correctAnswer: "true",
};

const PendingQuestionReview = () => {
  const router = useRouter(); // Initialize useRouter
  const [selectedAnswer, setSelectedAnswer] = useState<string>(mockQuestion.studentAnswer);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // For now, using a hardcoded student name as example. You can replace this with your dynamic data.
  const studentName = "Asad";

  const handleSubmitResult = () => {
    toast({
      title: "Result Submitted",
      description: `Question ${mockQuestion.questionNumber} has been graded successfully.`,
    });
    router.push("/session/pending"); // Navigates to the pending page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-[#1A73E8]">
      <Navbar />

      <main className="container py-8 max-w-4xl">
        <h1 className="text-2xl font-bold text-[#222222] mb-8">Manage Reports</h1>

        <div className="bg-white rounded-2xl border border-[#DDDDDD] p-8 shadow-sm">
          {/* Student Info */}
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-[#1976D2] text-[#ffffff]">
                AS
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-[#222222]">{studentName}</span>
          </div>

          {/* Question Header */}
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-3xl font-bold text-[#222222]">
              Question {mockQuestion.questionNumber} of {mockQuestion.totalQuestions}
            </h2>
            <div className="text-right">
              <button 
                className="flex items-center gap-2 text-[#999999] hover:text-[#222222] transition-colors mb-2"
                onClick={() => setShowAnswer(!showAnswer)}
              >
                <Eye className="h-5 w-5" />
                <span className="font-medium">View Answer</span>
              </button>
              <div>
                <span className="text-[#999999] font-medium">Points</span>
                <span className="ml-3 font-bold text-[#222222]">{mockQuestion.points} Marks</span>
              </div>
            </div>
          </div>

          {/* Question Text */}
          <p className="text-lg text-[#222222] mb-8">{mockQuestion.text}</p>

          {/* Answer Options */}
          <div className="space-y-4 mb-10">
            {mockQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = showAnswer && option.id === mockQuestion.correctAnswer;
              
              return (
                <label
                  key={option.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isCorrect
                      ? "border-[#4CAF50] bg-[#4CAF50]/10"
                      : isSelected
                      ? "border-[#1976D2] bg-[#BBDEFB]"
                      : "border-[#DDDDDD] hover:border-[#1976D2]/50"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "border-[#1976D2]" : "border-[#999999]"
                  }`}>
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1976D2]" />
                    )}
                  </div>
                  <span className="text-[#222222] font-medium">{option.label}</span>
                </label>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full max-w-md"
              onClick={handleSubmitResult}
            >
              Submit Result
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PendingQuestionReview;
