"use client";

import { useEffect, useState } from "react";
import { Loader2, Sparkles, Brain, FileText } from "lucide-react";

interface Props {
  isGenerating: boolean;
}

const messages = [
  {
    icon: <Brain className="h-5 w-5 text-blue-600" />,
    text: "Analyzing your quiz requirements",
  },
  {
    icon: <FileText className="h-5 w-5 text-purple-600" />,
    text: "Structuring questions and marks",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-green-600" />,
    text: "Generating high-quality questions using AI",
  },
  {
    icon: <Loader2 className="h-5 w-5 animate-spin text-orange-600" />,
    text: "Finalizing and polishing your quiz",
  },
];

export const GeneratingQuizStep = ({ isGenerating }: Props) => {
  const [progress, setProgress] = useState(5);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isGenerating) return;

    const progressTimer = setInterval(() => {
  setProgress((prev) => {
    if (prev >= 90) return prev;
    return prev + Math.random() * 6;
  });
}, 700);

const stageTimer = setInterval(() => {
  setStage((prev) => (prev + 1) % messages.length);
}, 2500);


    return () => {
      clearInterval(progressTimer);
      clearInterval(stageTimer);
    };
  }, [isGenerating]);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
      {/* Spinner */}
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-4 border-blue-200 animate-pulse" />
        <Loader2 className="h-10 w-10 absolute inset-0 m-auto animate-spin text-blue-600" />
      </div>

      {/* Heading */}
      <h2 className="text-xl font-semibold">
        Generating Quiz using AI
      </h2>

      {/* Dynamic message */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {messages[stage].icon}
        <span>{messages[stage].text}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-xs mt-2 text-muted-foreground">
          {Math.floor(progress)}% completed
        </p>
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 max-w-sm">
        This usually takes a few seconds. Please don’t refresh or close the page.
      </p>
    </div>
  );
};
