"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ProgressBar } from "../../../components/teacher-quiz/ProgessBar";
import { MainStepIndicator } from "../../../components/teacher-quiz/MainStepIndicator";
import { SubStepIndicator } from "../../../components/teacher-quiz/SubStepIndicator";
import { NavigationButtons } from "../../../components/teacher-quiz/NavigationButtons";
import { ShareModal } from "../../../components/teacher-quiz/ShareModel";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";  

// Step Components
import { QuizDetailsStep1 } from "../../../components/teacher-quiz/steps/QuizDetailsStep1";
import { QuizContentStep2 } from "../../../components/teacher-quiz/steps/QuizContentStep2";
import { QuestionsSelectionStep3 } from "../../../components/teacher-quiz/steps/QuestionsSelectionStep3";
import { GeneratingQuizStep } from "../../../components/teacher-quiz/steps/GeneratingQuizStep";
import { AddQuestionsStep } from "../../../components/teacher-quiz/steps/AddQuestionsStep";
import { MarkingStyleStep } from "../../../components/teacher-quiz/steps/MarkingStyleStep";
import { RubricsStep } from "../../../components/teacher-quiz/steps/RubricsStep";
import { PreviewStep } from "../../../components/teacher-quiz/steps/PreviewStep";
import { PublishStep } from "../../../components/teacher-quiz/steps/PublishStep";
import Navbar from "@/components/navigation/Navbar";
import { EditQuestionModal } from "../../../components/teacher-quiz/EditQuestionModal";

// Define the Question type
interface Question {
  id: number;
  type: string;
  points: number;
  text: string;
  answer?: string;  // Optional for question types like True/False and Fill-in-the-blanks
  options?: string[];  // Optional for MCQs
}

const mainSteps = [
  { id: 1, title: "Quiz Details", subtitle: "Basic Information" },
  { id: 2, title: "Add Questions", subtitle: "Create or Generate Questions" },
  { id: 3, title: "Preview", subtitle: "Review your Quiz" },
  { id: 4, title: "Publish", subtitle: "Make it Live" },
];

const Index = () => {
  // Main step tracking
  const [currentMainStep, setCurrentMainStep] = useState(1);
  const [completedMainSteps, setCompletedMainSteps] = useState<number[]>([]);

  // Sub-step tracking for step 1 (Quiz Details has 3 sub-steps)
  const [step1SubStep, setStep1SubStep] = useState(1);

  // Sub-step tracking for step 2 (Add Questions has 3 sub-steps: questions, marking, rubrics)
  const [step2SubStep, setStep2SubStep] = useState(1);

  // Quiz generation state
  const [isGenerating, setIsGenerating] = useState(false);

  // Share modal
  const [showShareModal, setShowShareModal] = useState(false);

  // Quiz public state
  const [isPublic, setIsPublic] = useState(true);

  // Form data - Step 1.1
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    subject: "",
    difficulty: "medium",
  });

  // Form data - Step 1.2
  const [quizContent, setQuizContent] = useState({
    timeLimit: "60",
    numberOfQuestions: "10",
    totalMarks: "20",
    content: "",
  });

  // Form data - Step 1.3
  const [questionCounts, setQuestionCounts] = useState({
    mcq: 1,
    fillBlanks: 1,
    trueFalse: 1,
    short: 1,
    long: 1,
    coding: 0,
  });

  // Form data - Step 2.2
  const [evaluationCriteria, setEvaluationCriteria] = useState({
    conceptual: 10,
    languageClarity: 7,
    spelling: 0,
    answerLength: 5,
    strictMarking: 2,
    handlingIncorrect: 1,
    effortBonus: 1,
  });

  // Form data - Step 2.3
  const [rubricsData, setRubricsData] = useState<{
    rubrics: string;
    aiRubrics: string;
    evaluationMethod: "llm" | "custom";
    selectedModel: string;
  }>({
    rubrics: "",
    aiRubrics: "",
    evaluationMethod: "llm",
    selectedModel: "deepseek",
  });

  // Generated questions
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, type: "True / False", points: 2, text: "Time Complexity of DFS is more", answer: "True" },
    { id: 2, type: "True / False", points: 2, text: "Time Complexity of DFS is more" },
    { id: 7, type: "Fill in the Blanks", points: 1, text: "Java is a __________ Language." },
    { id: 8, type: "MCQ", points: 2, text: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
  ]);

  // Modal state
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // Handle editing a question
  const handleEditQuestion = (id: number) => {
    const question = questions.find((q) => q.id === id);
    if (question) {
      setSelectedQuestion(question);
      setEditModalOpen(true);
    }
  };

  // Handle saving the edited question
  const handleSaveQuestion = (updatedQuestion: Question) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
    setEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  // Calculate progress
  const calculateProgress = () => {
    if (currentMainStep === 1) {
      return (step1SubStep / 3) * 25;
    } else if (currentMainStep === 2) {
      return 25 + (step2SubStep / 3) * 25;
    } else if (currentMainStep === 3) {
      return 75;
    } else {
      return 100;
    }
  };

  const handleNext = () => {
    if (currentMainStep === 1) {
      if (step1SubStep < 3) {
        setStep1SubStep(step1SubStep + 1);
      } else {
        setIsGenerating(true);
        setTimeout(() => {
          setIsGenerating(false);
          setCompletedMainSteps([...completedMainSteps, 1]);
          setCurrentMainStep(2);
          setStep2SubStep(1);
        }, 2000);
      }
    } else if (currentMainStep === 2) {
      if (step2SubStep < 3) {
        setStep2SubStep(step2SubStep + 1);
      } else {
        setCompletedMainSteps([...completedMainSteps, 2]);
        setCurrentMainStep(3);
      }
    } else if (currentMainStep === 3) {
      setCompletedMainSteps([...completedMainSteps, 3]);
      setCurrentMainStep(4);
    }
  };

  const handlePrevious = () => {
    if (currentMainStep === 1) {
      if (step1SubStep > 1) {
        setStep1SubStep(step1SubStep - 1);
      }
    } else if (currentMainStep === 2) {
      if (step2SubStep > 1) {
        setStep2SubStep(step2SubStep - 1);
      } else {
        setCurrentMainStep(1);
        setStep1SubStep(3);
        setCompletedMainSteps(completedMainSteps.filter((s) => s !== 1));
      }
    } else if (currentMainStep === 3) {
      setCurrentMainStep(2);
      setStep2SubStep(3);
      setCompletedMainSteps(completedMainSteps.filter((s) => s !== 2));
    } else if (currentMainStep === 4) {
      setCurrentMainStep(3);
      setCompletedMainSteps(completedMainSteps.filter((s) => s !== 3));
    }
  };

  const handlePublish = () => {
    toast({
      title: "Quiz Published!",
      description: "Your quiz is now live and ready to be shared with students.",
    });

    // Redirect to the /quiz-session page after publishing the quiz
    router.push("/quiz-session");
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your quiz is being downloaded...",
    });
  };

  const getPageTitle = () => {
    if (currentMainStep === 1) {
      if (step1SubStep === 2) return "Quiz Content";
      return "Create new Quiz";
    }
    if (currentMainStep === 2 && step2SubStep === 2) {
      return "Marking Style & Evaluation Preferences";
    }
    return "Create new Quiz";
  };

  const getCurrentSubStepCount = () => {
    if (currentMainStep === 1) return 3;
    if (currentMainStep === 2) return 3;
    return 0;
  };

  const getCurrentSubStep = () => {
    if (currentMainStep === 1) return step1SubStep;
    if (currentMainStep === 2) return step2SubStep;
    return 0;
  };

  const quizSummary = {
    title: quizDetails.title || "Data Structures",
    description: "Depth First Search",
    subject: quizDetails.subject || "Software Engineering",
    timeMinutes: parseInt(quizContent.timeLimit) || 39,
    points: parseInt(quizContent.totalMarks) || 2,
    difficulty: quizDetails.difficulty || "easy",
  };

  // Use router for navigation
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[hsl(210,20%,98%)]">
      <Navbar />

      <main className="container py-6 pt-24">
        <a
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-[hsl(215,16%,47%)] hover:text-[hsl(222,47%,11%)] mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </a>

        <h1 className="text-3xl font-bold mb-2 text-[hsl(222,47%,11%)]">
          {getPageTitle()}
        </h1>
        <p className="text-[hsl(215,16%,47%)] mb-6">Follow the steps to create the quiz</p>

        <div className="mb-8">
          <ProgressBar progress={calculateProgress()} />
        </div>

        <div className="mb-8">
          <MainStepIndicator
            steps={mainSteps}
            currentStep={currentMainStep}
            completedSteps={completedMainSteps}
          />
        </div>

        <div className="card-elevated p-8 mb-6">
          {getCurrentSubStepCount() > 0 && !isGenerating && (
            <div className="mb-8">
              <SubStepIndicator
                totalSteps={getCurrentSubStepCount()}
                currentStep={getCurrentSubStep()}
              />
            </div>
          )}

          {isGenerating ? (
            <GeneratingQuizStep />
          ) : currentMainStep === 1 ? (
            step1SubStep === 1 ? (
              <QuizDetailsStep1 data={quizDetails} onChange={setQuizDetails} />
            ) : step1SubStep === 2 ? (
              <QuizContentStep2 data={quizContent} onChange={setQuizContent} />
            ) : (
              <QuestionsSelectionStep3 data={questionCounts} onChange={setQuestionCounts} />
            )
          ) : currentMainStep === 2 ? (
            step2SubStep === 1 ? (
              <AddQuestionsStep
                questions={questions}
                isPublic={isPublic}
                onTogglePublic={setIsPublic}
                onEditQuestion={handleEditQuestion}
                onDeleteQuestion={(id) => setQuestions(questions.filter((q) => q.id !== id))}
              />
            ) : step2SubStep === 2 ? (
              <MarkingStyleStep data={evaluationCriteria} onChange={setEvaluationCriteria} />
            ) : (
              <RubricsStep data={rubricsData} onChange={setRubricsData} />
            )
          ) : currentMainStep === 3 ? (
            <PreviewStep quiz={quizSummary} questions={questions} />
          ) : (
            <PublishStep
              quiz={quizSummary}
              questionCount={questions.length}
              isPublic={isPublic}
              onTogglePublic={setIsPublic}
              onShare={() => setShowShareModal(true)}
            />
          )}
        </div>

        <NavigationButtons
          onPrevious={handlePrevious}
          onNext={currentMainStep === 4 ? handlePublish : handleNext}
          showPrevious={!(currentMainStep === 1 && step1SubStep === 1)}
          showNext={!isGenerating}
          nextLabel={
            currentMainStep === 4
              ? "Publish Quiz"
              : currentMainStep === 2 && step2SubStep === 1
              ? "Download Quiz"
              : "Next"
          }
          additionalButtons={
            currentMainStep === 4 || (currentMainStep === 2 && step2SubStep === 1) ? (
              <Button variant="outline" onClick={handleDownload}>
                Download Quiz
              </Button>
            ) : undefined
          }
        />

        <EditQuestionModal
            isOpen={isEditModalOpen}
            question={selectedQuestion}
            onClose={handleCloseModal}
            onSave={handleSaveQuestion}
        />

      </main>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShare={(teacherId) => {
          toast({
            title: "Quiz Shared",
            description: `Quiz shared with teacher ${teacherId}`,
          });
          setShowShareModal(false);
        }}
      />
    </div>
  );
};

export default Index;
