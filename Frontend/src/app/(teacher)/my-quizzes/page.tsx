"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TeacherNavbar from "@/components/navigation/TeacherNavbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  ArrowLeft,
  Search,
  CheckCircle,
} from "lucide-react";

/* ------------------------------------------------------------------
   Dummy Teacher Quizzes (Backend se replace honge)
------------------------------------------------------------------- */
const myQuizzes = [
  {
    id: "q1",
    title: "Software Engineering – Quiz 1",
    description: "Basic concepts of Software Engineering",
    questions: 10,
    duration: "20 mins",
    status: "Published",
    category: "MCQ",
    createdAt: "Jan 10, 2026",
  },
  {
    id: "q2",
    title: "OOP Mid Quiz",
    description: "OOP principles & examples",
    questions: 15,
    duration: "30 mins",
    status: "Draft",
    category: "Mixed",
    createdAt: "Jan 12, 2026",
  },
  {
    id: "q3",
    title: "DBMS Practice Quiz",
    description: "Normalization, keys, ER diagrams",
    questions: 20,
    duration: "40 mins",
    status: "Published",
    category: "Concept",
    createdAt: "Jan 14, 2026",
  },
];

export default function MyQuizzesPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  /* -------------------- FILTER LOGIC -------------------- */
  const filteredQuizzes = useMemo(() => {
    return myQuizzes.filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(search.toLowerCase()) ||
        quiz.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || quiz.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="min-h-screen bg-background">
      <TeacherNavbar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Back */}
          <button
            onClick={() => router.push("/teacher")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">
              My Quizzes
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage quizzes created by you
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search your quizzes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.length === 0 && (
              <p className="text-muted-foreground">
                No quizzes found.
              </p>
            )}

            {filteredQuizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="space-y-4">

                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-7 h-7 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {quiz.description}
                    </p>
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{quiz.questions} Questions</span>
                    <span>{quiz.duration}</span>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs bg-muted">
                      {quiz.category}
                    </span>

                    {quiz.status === "Published" && (
                      <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Published
                      </span>
                    )}

                    {quiz.status === "Draft" && (
                      <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                        Draft
                      </span>
                    )}
                  </div>

                  <Link  href="/results/1" className="block">
                    <Button className="w-full">
                      View Quiz
                    </Button>
                  </Link>

                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
