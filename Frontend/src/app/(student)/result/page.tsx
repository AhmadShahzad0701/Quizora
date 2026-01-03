"use client";  

import { CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import StudentNavbar from "@/components/navigation/StudentNavbar";
import { useRouter } from "next/navigation";

interface QuizResultsProps {
  userName: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  scorePercentage: number;
  onDownloadResult?: () => void;
  onLeaveRoom?: () => void;
}

const QuizResults = ({
  userName = "Guest", // Default user name
  totalQuestions = 10, // Default number of total questions
  correctAnswers = 7, // Default number of correct answers
  wrongAnswers = 3, // Default number of wrong answers
  scorePercentage = 70, // Default score percentage
  onDownloadResult = () => alert("Download not available"), // Default action for download result
}: QuizResultsProps) => {
  const router = useRouter();  // Initialize the router


  const handleLeaveRoom = () => {
    router.push("/");  // Redirect to the homepage
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-green-200">
      {/* Header */}
      <StudentNavbar studentName={userName} />

      {/* Results Card */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl bg-[#f8f9fa] rounded-2xl shadow-lg p-8 md:p-12">
          {/* Score Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 rounded-full bg-[#3b82f6]/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-[#3b82f6]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">You Scored</h2>
            <p className="text-6xl md:text-7xl font-bold text-[#6e6e6e]/60">
              {scorePercentage} %
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-[#ffffff] border border-[#d1d5db] rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-[#3b82f6] mb-1">{totalQuestions}</p>
              <p className="text-sm font-medium text-[#1a1a1a]">Total Questions</p>
            </div>
            <div className="bg-[#ffffff] border border-[#d1d5db] rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-[#3b82f6] mb-1">{correctAnswers}</p>
              <p className="text-sm font-medium text-[#1a1a1a]">Correct Answers</p>
            </div>
            <div className="bg-[#ffffff] border border-[#d1d5db] rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-[#3b82f6] mb-1">{wrongAnswers}</p>
              <p className="text-sm font-medium text-[#1a1a1a]">Wrong Answers</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              onClick={onDownloadResult}
              className="px-6 border-black border bg-white text-black hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6]"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Result
            </Button>
            <Button
              onClick={handleLeaveRoom}  // Use handleLeaveRoom function for redirection
              className="px-6 bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white"
            >
              Leave Room
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
