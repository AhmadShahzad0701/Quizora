"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Search,
  Users,
  TrendingUp,
  TrendingDown,
  Target,
  BookOpen,
} from "lucide-react";
import TeacherNavbar from "@/components/navigation/TeacherNavbar";
import StatCard from "@/components/results/StatCard";
import StudentResultRow from "@/components/results/StudentResultRow";
import { getQuizById } from "@/data/mockQuizResults";
import { toast } from "@/hooks/use-toast";

export default function QuizResultDetail() {
  const params = useParams();

  const quizId = params.id as string; 


  const [searchQuery, setSearchQuery] = useState("");

  if (Number.isNaN(quizId)) {
    notFound();
  }

  const quiz = getQuizById(quizId);

  if (!quiz) {
    return (
      <div className="min-h-screen gradient-background">
        <TeacherNavbar />
        <main className="pt-20 px-4">
          <div className="max-w-4xl mx-auto text-center p-12 card-elevated">
            <h2 className="text-xl font-semibold mb-2">Quiz not found</h2>
            <p className="text-muted-foreground mb-4">
              {"The quiz you're looking for doesn't exist."}
            </p>
            <Link href="/results">
              <Button>Back to Results</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const filteredStudents = quiz.students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort(
    (a, b) => b.percentage - a.percentage
  );

  const handleDownload = () => {
    const headers = [
      "Rank",
      "Student ID",
      "Name",
      "Email",
      "Score",
      "Percentage",
    ];

    const rows = sortedStudents.map((s, i) => [
      i + 1,
      s.id,
      s.name,
      s.email,
      s.score,
      `${s.percentage}%`,
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${quiz.title}_results.csv`;
    a.click();

    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: "Quiz results downloaded successfully.",
    });
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return <Badge className="bg-success/10 text-success">Easy</Badge>;
      case "Medium":
        return <Badge className="bg-warning/10 text-warning">Medium</Badge>;
      case "Hard":
        return <Badge className="bg-destructive/10 text-destructive">Hard</Badge>;
      default:
        return <Badge variant="secondary">{difficulty}</Badge>;
    }
  };

  return (
    <div className="min-h-screen gradient-background">
      <TeacherNavbar />

      <main className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Back */}
          <Link
            href="/results"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </Link>

          {/* Header */}
          <div className="flex justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-blue-400">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{quiz.title}</h1>
                <div className="flex gap-3 text-lg mt-2 text-muted-foreground">
                  <span>{quiz.subject}</span>
                  <span>•</span>
                  {getDifficultyBadge(quiz.difficulty)}
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-2">
              {/* Download */}
              <Link href={`/create-quiz`}>
              <Button className="gap-2 gradient-primary">
                Take Quiz
                <ArrowRight className="w-4 h-4" />
              </Button>
              </Link>
              {/* Download */}
              <Button onClick={handleDownload} className="gap-2 gradient-primary">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard value={`${quiz.averageScore}%`} label="Average" icon={Target} />
            <StatCard value={`${quiz.highestScore}%`} label="Highest" icon={TrendingUp} />
            <StatCard value={`${quiz.lowestScore}%`} label="Lowest" icon={TrendingDown} />
            <StatCard value={quiz.completedStudents} label="Students" icon={Users} />
          </div>

          {/* Students */}
          <Card>
            <div className="p-6 border-b flex justify-between gap-4">
              <h2 className="font-semibold">
                Students ({sortedStudents.length})
              </h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="divide-y">
              {sortedStudents.map((student, index) => (
                <StudentResultRow
                  key={student.id}
                  student={student}
                  rank={index + 1}
                />
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
