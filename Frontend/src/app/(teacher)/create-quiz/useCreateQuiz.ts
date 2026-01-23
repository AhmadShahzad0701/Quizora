"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { generateQuiz } from "../../../services/quizservice";

/* ================= TYPES ================= */
interface GeneratedQuestion {
  type: string;
  question: string;
  marks: number;
  options?: string[];
  correct_answer?: string;
}

interface GeneratedQuiz {
  title: string;
  subject: string;
  difficulty: string;
  total_questions: number;
  total_marks: number;
  questions: GeneratedQuestion[];
}
export interface Question {
  id: number;
  type: string;
  points: number;
  text: string;
  answer?: string;
  options?: string[];
}

/* ================= CONSTANTS ================= */

const handleDownload = () => {
  toast({
    title: "Download started",
    description: "Your quiz is downloading",
  });
};

const mainSteps = [
  { id: 1, title: "Quiz Details", subtitle: "Basic Information" },
  { id: 2, title: "Add Questions", subtitle: "Create or Generate Questions" },
  { id: 3, title: "Preview", subtitle: "Review your Quiz" },
  { id: 4, title: "Publish", subtitle: "Make it Live" },
];

/* ================= HOOK ================= */

export const useCreateQuiz = () => {
  const [rubricsData, setRubricsData] = useState({
    rubrics: "",
    aiRubrics: "",
    evaluationMethod: "llm" as "llm" | "custom",
    selectedModel: "deepseek",
  });
  const [evaluationCriteria, setEvaluationCriteria] = useState({
  conceptual: 10,
  languageClarity: 7,
  spelling: 0,
  answerLength: 5,
  strictMarking: 2,
  handlingIncorrect: 1,
  effortBonus: 1,
});

  /* ---------- Generation ---------- */
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuiz | null>(null);

  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  /* ---------- Step Control ---------- */
  const [currentMainStep, setCurrentMainStep] = useState(1);
  const [completedMainSteps, setCompletedMainSteps] = useState<number[]>([]);
  const [step1SubStep, setStep1SubStep] = useState(1);
  const [step2SubStep, setStep2SubStep] = useState(1);

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
    fillBlanks: 0,
    trueFalse: 1,
    short: 1,
    long: 1,
    coding: 0,
  });

  /* ---------- Step 2 Data ---------- */
  const [questions, setQuestions] = useState<Question[]>([]);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<Question | null>(null);

  /* ================= CORE: AI GENERATION ================= */

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const result = await generateQuiz({
        title: quizDetails.title,
        subject: quizDetails.subject,
        difficulty: quizDetails.difficulty,
        timeLimit: Number(quizContent.timeLimit),
        totalQuestions: Number(quizContent.numberOfQuestions),
        totalMarks: Number(quizContent.totalMarks),
        quizType: "mixed",
        distribution: {
          mcq: questionCounts.mcq,
          true_false: questionCounts.trueFalse,
          short: questionCounts.short,
          long: questionCounts.long,
        },
        contentText: quizContent.content,
      });

      setGeneratedQuiz(result);

      if (result && result.questions.length > 0) {
        setQuestions(
          result.questions.map((q, index) => ({
            id: index + 1,
            type: q.type,
            points: q.marks,
            text: q.question,
            options: q.options,
            answer: q.correct_answer,
          }))
        );
      }

      setCompletedMainSteps([1]);
      setCurrentMainStep(2);
      setStep2SubStep(1);
    } catch{
      setGenerationError("Quiz generation failed");
      toast({
        title: "Error",
        description: "Quiz generation failed",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  /* ================= QUESTION EDIT ================= */

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

  /* ================= STEP LOGIC ================= */

  const handleNext = () => {
    if (currentMainStep === 1) {
      if (step1SubStep < 3) {
        setStep1SubStep((s) => s + 1);
      } else {
        handleGenerateQuiz();
      }
      return;
    }

    if (currentMainStep === 2) {
      if (step2SubStep < 3) {
        setStep2SubStep((s) => s + 1);
      } else {
        setCompletedMainSteps([1, 2]);
        setCurrentMainStep(3);
      }
      return;
    }

    if (currentMainStep === 3) {
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

  /* ================= PUBLISH ================= */

  const handlePublish = async () => {
    toast({
      title: "Quiz Published Successfully",
      description: "Your quiz is now live",
    });
  };

  /* ================= UI HELPERS ================= */

  const calculateProgress = () => {
    if (currentMainStep === 1) return (step1SubStep / 3) * 25;
    if (currentMainStep === 2) return 25 + (step2SubStep / 3) * 25;
    if (currentMainStep === 3) return 75;
    return 100;
  };

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

    if (currentMainStep === 1 && step1SubStep === 3) label = "Create Quiz";
    if (currentMainStep === 4) {
      label = "Publish Quiz";
      onClick = handlePublish;
    }

    return {
  label,
  onClick,
  showDownload:
    currentMainStep === 2 && step2SubStep === 1,
};

  };

  /* ================= RETURN ================= */

  return {
    mainSteps,
    evaluationCriteria,
    setEvaluationCriteria,
    rubricsData,
    setRubricsData,
    handleDownload,
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

    questions,
    setQuestions,

    generatedQuiz,
    generationError,

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
    handleNext,

    calculateProgress,
    quizSummary,
    getNextButtonState,
  };
};
