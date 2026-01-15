"use client";

import { useParams, useRouter } from "next/navigation";
import TeacherNavbar from "@/components/navigation/TeacherNavbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Clock, Layers, ArrowLeft } from "lucide-react";

/* ------------------------------------------------------------------
   Dummy Template Data
   (Backend integration ke baad yahin API call lage gi)
------------------------------------------------------------------- */
const TEMPLATE_DATA = [
  {
    id: "0",
    title: "MCQs – Quick Assessment",
    description:
      "A quick MCQ-based assessment designed to test basic understanding with automatic evaluation.",
    questions: 10,
    duration: "15 mins",
    level: "Beginner",
    category: "MCQ",
    topics: ["Basics", "Concept Check", "Quick Review"],
  },
  {
    id: "1",
    title: "Mid-Term Template",
    description:
      "A balanced mid-term quiz including MCQs and short descriptive questions.",
    questions: 25,
    duration: "60 mins",
    level: "Intermediate",
    category: "Mixed",
    topics: ["Theory", "Problem Solving", "Logic"],
  },
];

export default function TemplateDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // ✅ SAFELY extract id
  const templateId =
    typeof params.id === "string" ? params.id : params.id?.[0];

  const template = TEMPLATE_DATA.find(
    (item) => item.id === templateId
  );

  /* ------------------------------------------------------------------
     If template not found
  ------------------------------------------------------------------- */
  if (!template) {
    return (
      <div className="min-h-screen bg-background">
        <TeacherNavbar />
        <main className="pt-24 text-center">
          <p className="text-muted-foreground text-lg">
            Template not found
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => router.push("/templates")}
          >
            Back to Templates
          </Button>
        </main>
      </div>
    );
  }

  /* ------------------------------------------------------------------
     Main UI
  ------------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-background">
      <TeacherNavbar />

      <main className="pt-24 px-4 pb-16">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Back */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </button>

          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {template.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {template.description}
            </p>
          </div>

          {/* Meta Info */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 flex items-center gap-3">
              <Brain className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="font-medium">{template.level}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-3">
              <Clock className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{template.duration}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-3">
              <Layers className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="font-medium">{template.questions}</p>
              </div>
            </Card>

            <Card className="p-4 flex items-center gap-3">
              <Layers className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{template.category}</p>
              </div>
            </Card>
          </div>

          {/* Topics */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              Included Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {template.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-muted"
                >
                  {topic}
                </span>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={() =>
                router.push(`/create-quiz?template=${template.id}`)
              }
            >
              Use & Edit Template
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() =>
                router.push(
                  `/create-quiz?template=${template.id}&preview=true`
                )
              }
            >
              Preview Quiz
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
