"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, ClipboardList } from "lucide-react";
import TeacherNavbar from "@/components/navigation/TeacherNavbar";
import QuizResultCard from "@/components/results/QuizResultCard";
import { getQuizSummaries } from "@/data/mockQuizResults";

const Results = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const quizSummaries = getQuizSummaries();

  const filteredQuizzes = quizSummaries.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || quiz.status === statusFilter;
    const matchesSubject = subjectFilter === "all" || quiz.subject === subjectFilter;
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const subjects = [...new Set(quizSummaries.map((q) => q.subject))];

  return (
    <div className="min-h-screen gradient-background">
      <TeacherNavbar />

      <main className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Quiz Results</h1>
              <p className="text-muted-foreground mt-1">
                View and manage all your quiz results
              </p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ClipboardList className="w-5 h-5" />
              <span className="font-medium">{quizSummaries.length} Total Quizzes</span>
            </div>
          </div>

          {/* Filters */}
          <div className="card-elevated p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>

              {/* Subject Filter */}
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quiz List */}
          <div className="space-y-4">
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz, index) => (
                <div
                  key={quiz.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <QuizResultCard quiz={quiz} />
                </div>
              ))
            ) : (
              <div className="card-elevated p-12 text-center">
                <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No quizzes found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
