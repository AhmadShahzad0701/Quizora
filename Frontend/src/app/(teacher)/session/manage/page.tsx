"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TimeControl from "@/components/quiz-session/TimeControl";
import SecretKey from "@/components/quiz-session/SecretKey";
import Navbar from "@/components/navigation/SessionNavbar";
import Link from 'next/link';

const SessionManage = () => {
  const [timeRemaining, setTimeRemaining] = useState(60);

  return (
    <div className="min-h-screen gradient-background">
      <Navbar />

      <main className="container py-8 max-w-3xl">
        <h1 className="text-2xl font-bold text-foreground mb-8">Manage Quiz</h1>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          {/* Teacher Info */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">Teacher</h2>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-quizora text-primary-foreground">
                  AS
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">Asad</p>
                <p className="text-sm text-muted-foreground">asad1</p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-6">
            {/* Time Remaining */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-foreground">Time Remaining</span>
              <TimeControl value={timeRemaining} onChange={setTimeRemaining} />
            </div>

            {/* Joining Key */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-foreground">Joining Key</span>
              <SecretKey value="XYZ789" />
            </div>

            {/* Leaving Key */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-foreground">Leaving Key</span>
              <SecretKey value="ABC123" />
            </div>
          </div>

          {/* End Quiz Button */}
          <div className="flex justify-center mt-12">
            <Link href="/quiz-result">
            <Button 
              variant="destructive" 
              className="w-full max-w-md"
            >
              End Quiz
            </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionManage;
