"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { generateQuiz } from "../../../services/quizservice";

/* ================= TYPES ================= */

export interface Question {
  id: number;
  type: string;
  points: number;
  text: string;
  answer?: string;
  options?: string[];
}

const mainSteps = [
  { id: 1, title: "Quiz Details", subtitle: "Basic Information" },
  { id: 2, title: "Add Questions", subtitle: "Create or Generate Questions" },
  { id: 3, title: "Preview", subtitle: "Review your Quiz" },
  { id: 4, title: "Publish", subtitle: "Make it Live" },
];

/* ================= HOOK ================= */

export const useCreateQuiz = () => {
  /* ---------- Step Control ---------- */
  const [currentMainStep, setCurrentMainStep] = useState(1);
  const [completedMainSteps, setCompletedMainSteps] = useState<number[]>([]);
  const [step1SubStep, setStep1SubStep] = useState(1);
  const [step2SubStep, setStep2SubStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  /* ---------- UI State ---------- */
  const [showShareModal, setShowShareModal] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  /* ---------- Step 1 Data ---------- */
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    subject: "",
    difficulty: "medium",
  });

  const [quizContent, setQuizContent] = useState({
    timeLimit: "60",
    numberOfQuestions: "10",
    totalMarks: "20",
    content: "",
  });

  const [questionCounts, setQuestionCounts] = useState({
    mcq: 1,
    fillBlanks: 1,
    trueFalse: 1,
    short: 1,
    long: 1,
    coding: 0,
  });

  /* ---------- Step 2 Data ---------- */
  const [evaluationCriteria, setEvaluationCriteria] = useState({
    conceptual: 10,
    languageClarity: 7,
    spelling: 0,
    answerLength: 5,
    strictMarking: 2,
    handlingIncorrect: 1,
    effortBonus: 1,
  });

  const [rubricsData, setRubricsData] = useState({
    rubrics: "",
    aiRubrics: "",
    evaluationMethod: "llm" as "llm" | "custom",
    selectedModel: "deepseek",
  });

  /* ---------- Questions ---------- */
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: "True / False",
      points: 2,
      text: "Time Complexity of DFS is more",
      answer: "True",
    },
    {
      id: 2,
      type: "MCQ",
      points: 2,
      text: "Capital of France?",
      options: ["Paris", "Rome", "Berlin"],
      answer: "Paris",
    },
  ]);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<Question | null>(null);

  /* ================= ACTIONS ================= */

  const handleEditQuestion = (id: number) => {
    const q = questions.find((q) => q.id === id);
    if (q) {
      setSelectedQuestion(q);
      setEditModalOpen(true);
    }
  };

  const handleSaveQuestion = (updated: Question) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updated.id ? updated : q))
    );
    setEditModalOpen(false);
  };

  const calculateProgress = () => {
    if (currentMainStep === 1) return (step1SubStep / 3) * 25;
    if (currentMainStep === 2) return 25 + (step2SubStep / 3) * 25;
    if (currentMainStep === 3) return 75;
    return 100;
  };

  const handleNext = () => {
    if (currentMainStep === 1) {
      if (step1SubStep < 3) setStep1SubStep((s) => s + 1);
      else {
        setIsGenerating(true);
        setTimeout(() => {
          setIsGenerating(false);
          setCompletedMainSteps([1]);
          setCurrentMainStep(2);
          setStep2SubStep(1);
        }, 1500);
      }
    } else if (currentMainStep === 2) {
      if (step2SubStep < 3) setStep2SubStep((s) => s + 1);
      else {
        setCompletedMainSteps([1, 2]);
        setCurrentMainStep(3);
      }
    } else if (currentMainStep === 3) {
      setCompletedMainSteps([1, 2, 3]);
      setCurrentMainStep(4);
    }
  };

  const handlePrevious = () => {
    if (currentMainStep === 1 && step1SubStep > 1)
      setStep1SubStep((s) => s - 1);
    else if (currentMainStep === 2 && step2SubStep > 1)
      setStep2SubStep((s) => s - 1);
    else if (currentMainStep === 2) setCurrentMainStep(1);
    else if (currentMainStep === 3) setCurrentMainStep(2);
    else if (currentMainStep === 4) setCurrentMainStep(3);
  };

  const handlePublish = async () => {
  const payload = {
    metadata: {
      title: quizDetails.title,
      subject: quizDetails.subject,
      difficulty: quizDetails.difficulty,
    },
    config: {
      total_questions: Number(quizContent.numberOfQuestions),
      question_types: {
        mcq: questionCounts.mcq,
        true_false: questionCounts.trueFalse,
        short: questionCounts.short,
        long: questionCounts.long,
      },
    },
  };

  try {
    await generateQuiz(payload);
    toast({ title: "Quiz Published Successfully" });
  } catch (error) {
    toast({
      title: "Error",
      description: "Quiz generation failed",
      variant: "destructive",
    });
  }
};

  const handleDownload = () =>
    toast({
      title: "Download started",
      description: "Your quiz is downloading",
    });

  const quizSummary = {
  title: quizDetails.title || "Sample Quiz",
  subject: quizDetails.subject || "Subject",
  difficulty: quizDetails.difficulty || "medium",
  description: quizContent.content || "Quiz description",
  timeMinutes: Number(quizContent.timeLimit) || 30,
  points: Number(quizContent.totalMarks) || 0,
};


  const getNextButtonState = () => {
    let label = "Next";
    let onClick = handleNext;
    let showDownload = false;

    if (currentMainStep === 1 && step1SubStep === 3) label = "Create Quiz";
    if (currentMainStep === 4) {
      label = "Publish Quiz";
      onClick = handlePublish;
      showDownload = true;
    }
    if (currentMainStep === 2 && step2SubStep === 1) {
      label = "Next";
      showDownload = true;
    }

    return { label, onClick, showDownload };
  };

  /* ================= RETURN ================= */

  return {
    mainSteps,

    currentMainStep,
    completedMainSteps,
    step1SubStep,
    step2SubStep,
    isGenerating,

    quizDetails,
    setQuizDetails,
    quizContent,
    setQuizContent,
    questionCounts,
    setQuestionCounts,

    evaluationCriteria,
    setEvaluationCriteria,
    rubricsData,
    setRubricsData,

    questions,
    setQuestions,

    isEditModalOpen,
    selectedQuestion,
    showShareModal,
    isPublic,

    setIsPublic,
    setShowShareModal,
    setEditModalOpen,

    handleEditQuestion,
    handleSaveQuestion,
    handlePrevious,
    calculateProgress,
    quizSummary,
    getNextButtonState,
    handleDownload,
  };
};
