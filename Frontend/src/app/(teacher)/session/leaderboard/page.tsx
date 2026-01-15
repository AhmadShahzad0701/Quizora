"use client";

import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Podium from "@/components/quiz-session/Podium";
import { QuizTable, QuizTableRow } from "@/components/quiz-session/QuizTable";
import ScoreBar from "@/components/quiz-session/ScoreBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/navigation/SessionNavbar";

const topPlayers = [
  { name: "Asad", id: "221400089", marks: 10, position: 2 as const, badge: "Earn 2,000 points" },
  { name: "Asad", id: "221400089", marks: 15, position: 1 as const, timeRemaining: "10 Minutes 50 Seconds" },
  { name: "Asad", id: "221400089", marks: 8, position: 3 as const, badge: "Earn 2,000 points" },
];

const leaderboardData = Array.from({ length: 6 }, (_, i) => ({
  rank: i + 4,
  name: "Asad",
  id: "221400089",
  score: 75 - (i * 12),
}));

const columns = [
  { key: "rank", label: "Rank" },
  { key: "username", label: "User name" },
  { key: "score", label: "Score" },
];

const SessionLeaderboard = () => {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navbar />
      
      {showNotification && (
        <div className="fixed top-20 right-6 bg-card rounded-xl border border-border shadow-lg p-4 w-72 animate-slide-in z-50">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Notification</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Asad 221400089 tried to switch his tab
                </p>
                <Button variant="default" size="sm" className="mt-3">
                  Do Action
                </Button>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 -mt-1 -mr-1"
              onClick={() => setShowNotification(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <main className="container py-8">
        <Podium players={topPlayers} />

        <div className="mt-8">
          <QuizTable columns={columns}>
            {leaderboardData.map((row) => (
              <QuizTableRow key={row.rank} columns={3}>
                <div className="font-semibold text-foreground">{row.rank}</div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      AS
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{row.name}</p>
                    <p className="text-xs text-muted-foreground">{row.id}</p>
                  </div>
                </div>
                <ScoreBar score={row.score} maxScore={100} />
              </QuizTableRow>
            ))}
          </QuizTable>
        </div>
      </main>
    </div>
  );
};

export default SessionLeaderboard;
