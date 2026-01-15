"use client";

import { Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizTable, QuizTableRow } from "@/components/quiz-session/StudentTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/navigation/SessionNavbar";

const studentsData = Array.from({ length: 6 }, (_, i) => ({
  rank: i + 4,
  name: "Asad",
  id: "221400089",
  accuracyRate: "80%",
  atpq: "3 Min",
  violations: Math.floor(Math.random() * 5),
}));

const columns = [
  { key: "rank", label: "Rank" },
  { key: "username", label: "User name" },
  { key: "accuracy", label: "Accuracy Rate", className: "text-center" },
  { key: "atpq", label: "ATPQ", className: "text-center" },
  { key: "violations", label: "Violations", className: "text-center" },
  { key: "action", label: "Action", className: "text-center" },
];

const SessionStudents = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <Navbar />

      <main className="container py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Manage Students</h1>

        <QuizTable columns={columns}>
          {studentsData.map((row) => (
            <QuizTableRow key={row.rank} columns={6}>
              <div className="font-semibold">{row.rank}</div>

              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">
                    AS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{row.name}</p>
                  <p className="text-xs text-white">{row.id}</p>
                </div>
              </div>

              <div className="text-center font-semibold">{row.accuracyRate}</div>

              <div className="text-center font-semibold">{row.atpq}</div>

              <div className="text-center">
                <span className={`font-semibold ${row.violations > 0 ? 'text-destructive' : 'text-white'}`}>
                  {row.violations}
                </span>
              </div>

              <div className="flex justify-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Lock className="h-4 w-4 text-yellow-200" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </QuizTableRow>
          ))}
        </QuizTable>
      </main>
    </div>
  );
};

export default SessionStudents;
