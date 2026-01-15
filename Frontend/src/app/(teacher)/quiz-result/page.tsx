import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/navigation/Navbar";
import StatCard from "@/components/report/StatCard";
import QuizInfoCard from "@/components/report/QuizInfoCard";
import AIEvaluationCard from "@/components/report/AIEvaluationCard";
import Link from "next/link";
import PodiumResult from "@/components/report/PodiumResult";

const topPlayers = [
  { name: "Asad", id: "221400089", marks: 10, position: 2 as const, badge: "Earn 2,000 points" },
  { name: "Asad", id: "221400089", marks: 15, position: 1 as const, timeRemaining: "10 Minutes 50 Seconds" },
  { name: "Asad", id: "221400089", marks: 8, position: 3 as const, badge: "Earn 2,000 points" },
];

const aiSummaryPoints = [
  "The student has a basic understanding of array lists but needs to work on more complex operations such as dynamic resizing and efficient searching.",
  "Linked lists require more focus, especially on operations like insertion, deletion, and traversal. Graph-related concepts, particularly graph traversal algorithms (BFS, DFS), need improvement. The student should review these topics for better comprehension.",
  "Overall, more practice and targeted revision in linked lists and graphs will help solidify understanding.",
];

const Report = () => {
  return (
    <div className="min-h-screen gradient-background">
      <Navbar />

      {/* ⬇️ Padding added to prevent navbar overlap */}
      <main className="container pt-24 pb-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-2">
          Dashboard &gt; Report
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-foreground">Report</h1>
        <p className="text-muted-foreground mt-1">
          {"Here's the report for your quiz"}
        </p>

        {/* Main Card */}
        <div className="bg-card rounded-2xl border border-border shadow-sm mt-6 p-6">
          {/* Save to Gallery Toggle */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-muted-foreground">Save to Gallery</span>
            <Switch defaultChecked />
          </div>

          {/* Podium */}
          <PodiumResult players={topPlayers} />

          {/* Stats */}
          <div className="flex gap-4 mt-8">
            <StatCard value="78%" label="Class Average" variant="primary" />
            <StatCard value="98%" label="Highest" variant="success" />
            <StatCard value="57%" label="Lowest" variant="warning" />
          </div>

          {/* Quiz Info */}
          <div className="mt-6">
            <QuizInfoCard
              title="Data Structures"
              topic="Depth First Search"
              category="Software Engineering"
              duration="39 Minutes"
              points={2}
              difficulty="Easy"
            />
          </div>

          {/* AI Evaluation */}
          <div className="mt-6">
            <AIEvaluationCard summaryPoints={aiSummaryPoints} />
          </div>

          {/* Download Button */}
          <div className="flex justify-end mt-6">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download Result
            </Button>
          </div>
        </div>

        {/* Go to Dashboard */}
        <div className="flex justify-center mt-8">
          <Link href={"/"}>
          <Button size="lg" className="gap-2 px-8">
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Report;
