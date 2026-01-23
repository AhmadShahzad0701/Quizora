"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizTable, QuizTableRow } from "@/components/quiz-session/StudentTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/navigation/SessionNavbar";
import Link from "next/link"; // Import Link from next/link

const pendingData = [
  { srNo: 4, name: "Asad", id: "221400089", questionCount: 8 },
  { srNo: 5, name: "Asad", id: "221400089", questionCount: 8 },
  { srNo: 6, name: "Asad", id: "221400089", questionCount: 8 },
  { srNo: 7, name: "Asad", id: "221400089", questionCount: 8 },
  { srNo: 8, name: "Asad", id: "221400089", questionCount: 8 },
  { srNo: 9, name: "Asad", id: "221400089", questionCount: 8 },
];

const columns = [
  { key: "srNo", label: "Sr No." },
  { key: "username", label: "User name" },
  { key: "question", label: "Question", className: "text-center" },
  { key: "submit", label: "Submit Decision", className: "text-center" },
];

const SessionPending = () => {
  return (
    <div className="min-h-screen gradient-background">
      <Navbar />

      <main className="container py-8">
        <h1 className="text-2xl font-bold text-foreground mb-8">Manage Reports</h1>

        <QuizTable columns={columns}>
          {pendingData.map((row) => (
            <QuizTableRow key={row.srNo} columns={4}>
              <div className="font-semibold">{row.srNo}</div>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xs">
                    AS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{row.name}</p>
                  <p className="text-xs text-primary-foreground/70">{row.id}</p>
                </div>
              </div>
              <div className="text-center font-semibold">{row.questionCount}</div>
              <div className="flex items-center justify-center">
                {/* Using Link for navigation */}
                <Link 
                  href={{
                    pathname: `/pending-review`,
                    query: { studentId: row.id, studentName: row.name }, // Passing query params
                  }}
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </QuizTableRow>
          ))}
        </QuizTable>
      </main>
    </div>
  );
};

export default SessionPending;
