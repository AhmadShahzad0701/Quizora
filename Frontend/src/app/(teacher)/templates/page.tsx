"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TeacherNavbar from "@/components/navigation/TeacherNavbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Brain,
  BookOpen,
  Timer,
  Layers,
  ArrowLeft,
  Search,
} from "lucide-react";

/* ------------------------------------------------------------------
   Dummy Templates (Backend se replace honge)
------------------------------------------------------------------- */
const templates = [
  {
    id: "0",
    title: "MCQs – Quick Assessment",
    description: "10 MCQs, auto-evaluation enabled",
    questions: 10,
    duration: "15 mins",
    icon: Brain,
    level: "Beginner",
    category: "MCQ",
  },
  {
    id: "1",
    title: "Mid-Term Template",
    description: "Mixed MCQs + Short Questions",
    questions: 25,
    duration: "60 mins",
    icon: BookOpen,
    level: "Intermediate",
    category: "Mixed",
  },
  {
    id: "2",
    title: "Timed Practice Quiz",
    description: "Speed-based assessment template",
    questions: 20,
    duration: "20 mins",
    icon: Timer,
    level: "Advanced",
    category: "Practice",
  },
  {
    id: "3",
    title: "Concept Check",
    description: "Conceptual understanding focused quiz",
    questions: 15,
    duration: "30 mins",
    icon: Layers,
    level: "Beginner",
    category: "Concept",
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  /* -------------------- STATE -------------------- */
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  /* -------------------- FILTER LOGIC -------------------- */
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(search.toLowerCase()) ||
        template.description.toLowerCase().includes(search.toLowerCase());

      const matchesLevel =
        levelFilter === "All" || template.level === levelFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        template.category === categoryFilter;

      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [search, levelFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-background">
      <TeacherNavbar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Back to Dashboard */}
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
              Ready-made Templates
            </h1>
            <p className="text-muted-foreground text-lg">
              Search and filter templates to quickly create quizzes
            </p>
          </div>

          {/* 🔍 Search + Filters */}
          <div className="flex flex-col md:flex-row gap-4">

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Level Filter */}
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-4 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Categories</option>
              <option value="MCQ">MCQ</option>
              <option value="Mixed">Mixed</option>
              <option value="Practice">Practice</option>
              <option value="Concept">Concept</option>
            </select>
          </div>

          {/* Templates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.length === 0 && (
              <p className="text-muted-foreground">
                No templates found.
              </p>
            )}

            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="space-y-4">

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <template.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {template.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{template.questions} Questions</span>
                    <span>{template.duration}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {template.level}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-muted">
                      {template.category}
                    </span>
                  </div>

                  {/* Action */}
                  <Link href={`/templates/${template.id}`}>
                    <Button className="w-full mt-2">
                      Use Template
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
