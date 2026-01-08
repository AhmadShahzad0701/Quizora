"use client";

import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Ban, Undo2 } from "lucide-react";
import Link from "next/link"; // Corrected import to use Link from next/link
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import StudentAvatar from "@/components/quiz-session/StudentAvatar";
import TimeControl from "@/components/quiz-session/TimeControl";
import SecretKey from "@/components/quiz-session/SecretKey";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/navigation/Navbar";

// Define the Student interface
interface Student {
  id: string;
  name: string;
  image: string;
}

const initialStudents: Student[] = Array.from({ length: 20 }, (_, i) => ({
  id: `22140002${i + 1}`,
  name: "John",
  image: "/placeholder.svg",
}));

const LiveQuizSession = () => {
  const [timeLimit, setTimeLimit] = useState(60);
  const [showRubrics, setShowRubrics] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [bannedStudents, setBannedStudents] = useState<Student[]>([]);

  const studentsPerPage = 10;
  const totalPages = Math.ceil(students.length / studentsPerPage);

  const displayedStudents = students.slice(
    currentPage * studentsPerPage,
    (currentPage + 1) * studentsPerPage
  );

  const handleBanStudent = (student: Student) => {
    setStudents((prev) => prev.filter((s) => s.id !== student.id));
    setBannedStudents((prev) => [...prev, student]);
    toast({
      title: "Student Banned",
      description: `${student.name} (${student.id}) has been banned from the session.`,
      variant: "destructive",
    });
  };

  const handleUnbanStudent = (student: Student) => {
    setBannedStudents((prev) => prev.filter((s) => s.id !== student.id));
    setStudents((prev) => [...prev, student]);
    toast({
      title: "Student Unbanned",
      description: `${student.name} (${student.id}) has been restored to the session.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      <Navbar />

      {/* Add padding-top to the main content */}
      <main className="container py-6 pt-20 "> {/* Add pt-20 to give enough space */}
        <Link
          href="/dashboard" 
          className="inline-flex items-center gap-1 text-sm text-[#999999] hover:text-[#222222] mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#222222]">Live Quiz Session</h1>
          <p className="text-[#999999]">Waiting Room</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-[#DDDDDD] p-8 shadow-sm">
          {/* Students Joined Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#222222]">Students Joined</h2>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#222222]">{students.length}</span>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" // Retaining the original variant
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" // Retaining the original variant
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage >= totalPages - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {displayedStudents.map((student, idx) => (
                <div 
                  key={`${student.id}-${idx}`} 
                  className="animate-fade-in group relative" 
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <StudentAvatar
                    name={student.name}
                    id={student.id}
                    image={student.image}
                    size="lg"
                  />
                  {/* Ban Button Overlay */}
                  <Button
                    variant="destructive" // Retaining the original variant
                    size="sm"
                    className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 rounded-full shadow-lg"
                    onClick={() => handleBanStudent(student)}
                    title="Ban student"
                  >
                    <Ban className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-6 border-t border-[#DDDDDD] pt-6">
            {/* Time Limit */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-[#222222]">Time Limit</span>
              <TimeControl value={timeLimit} onChange={setTimeLimit} />
            </div>

            {/* Joining Key */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-[#222222]">Joining Key</span>
              <SecretKey value="ABC123" />
            </div>

            {/* Show Rubrics */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-[#222222]">Show Rubrics</span>
              <Switch checked={showRubrics} onCheckedChange={setShowRubrics} />
            </div>
          </div>

          {/* Banned Students */}
          <div className="mt-8 pt-6 border-t border-[#DDDDDD]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#222222]">Students Banned</h2>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#222222]">{bannedStudents.length}</span>
              </div>
            </div>

            {bannedStudents.length === 0 ? (
              <p className="text-[#999999] text-sm">No students have been banned.</p>
            ) : (
              <div className="flex flex-wrap gap-6">
                {bannedStudents.map((student) => (
                  <div key={student.id} className="group relative">
                    <StudentAvatar
                      name={student.name}
                      id={student.id}
                      image={student.image}
                      size="lg"
                    />
                    {/* Unban Button Overlay */}
                    <Button
                      variant="outline" // Retaining the original variant
                      size="sm"
                      className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 rounded-full shadow-lg"
                      onClick={() => handleUnbanStudent(student)}
                      title="Unban student"
                    >
                      <Undo2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-10">
            <Button variant="destructive" size="lg" className="px-8">
              End Room
            </Button>
            <Link href={'/session/leaderboard'}>
            <Button variant="outline" size="lg" className="px-8">
              Start Room
            </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveQuizSession;
