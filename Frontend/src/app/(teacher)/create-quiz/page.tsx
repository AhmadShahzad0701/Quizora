"use client";

import TeacherNavbar from "@/components/navigation/TeacherNavbar";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ProgressBar } from "../../../components/teacher-quiz/ProgessBar";
import { MainStepIndicator } from "../../../components/teacher-quiz/MainStepIndicator";
import { SubStepIndicator } from "../../../components/teacher-quiz/SubStepIndicator";
import { NavigationButtons } from "../../../components/teacher-quiz/NavigationButtons";
import { ShareModal } from "../../../components/teacher-quiz/ShareModel";
import { EditQuestionModal } from "../../../components/teacher-quiz/EditQuestionModal";

import {
  QuizDetailsStep1,
  QuizContentStep2,
  QuizContentStep3,
  GeneratingQuizStep,
  AddQuestionsStep,
  MarkingStyleStep,
  RubricsStep,
  PreviewStep,
  PublishStep,
} from "@/components/teacher-quiz/steps";

import { useCreateQuiz } from "./useCreateQuiz";

const Page = () => {
  const q = useCreateQuiz();
  const nextBtn = q.getNextButtonState();

  return (
    <div className="min-h-screen bg-[hsl(210,20%,98%)]">
      <TeacherNavbar />

      <main className="container py-6 pt-24">
        {/* Back */}
        <a href="/dashboard" className="flex items-center gap-1 mb-6 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </a>

        {/* Progress */}
        <div className="mb-6">
          <ProgressBar progress={q.calculateProgress()} />
        </div>

        {/* Main Steps */}
        <div className="mb-8">
          <MainStepIndicator
            steps={q.mainSteps}
            currentStep={q.currentMainStep}
            completedSteps={q.completedMainSteps}
          />
        </div>

        {/* Sub Steps */}
        {!q.isGenerating && (
          <div className="mb-6">
            <SubStepIndicator
              totalSteps={q.currentMainStep === 1 ? 3 : 3}
              currentStep={
                q.currentMainStep === 1
                  ? q.step1SubStep
                  : q.step2SubStep
              }
            />
          </div>
        )}

        {/* Card Content */}
        <div className="card-elevated p-8 mb-6">
          {q.isGenerating ? (
            <GeneratingQuizStep isGenerating={q.isGenerating} />
          ) : q.currentMainStep === 1 ? (
            q.step1SubStep === 1 ? (
              <QuizDetailsStep1
                data={q.quizDetails}
                onChange={q.setQuizDetails}
              />
            ) : q.step1SubStep === 2 ? (
                          <QuizContentStep2
              timeLimit={q.quizContent.timeLimit}
              numberOfQuestions={q.quizContent.numberOfQuestions}
              totalMarks={q.quizContent.totalMarks}
              questionCounts={q.questionCounts}
              onChangeMeta={(meta) =>
                q.setQuizContent({ ...q.quizContent, ...meta })
              }
              onChangeQuestions={q.setQuestionCounts}
            />

            ) : (
<QuizContentStep3
  data={{ content: q.quizContent.content }}
  onChange={(data) =>
    q.setQuizContent({ ...q.quizContent, content: data.content })
  }
/>
            )
          ) : q.currentMainStep === 2 ? (
            q.step2SubStep === 1 ? (
              // <AddQuestionsStep
              //   questions={q.questions}
              //   isPublic={q.isPublic}
              //   onTogglePublic={q.setIsPublic}
              //   onEditQuestion={q.handleEditQuestion}
              //   onDeleteQuestion={(id: number) =>
              //     q.setQuestions(
              //       q.questions.filter((x) => x.id !== id)
              //     )
              //   }
              // />
              <AddQuestionsStep
                questions={q.questions}
                onEditQuestion={q.handleEditQuestion}
              />
            ) : q.step2SubStep === 2 ? (
              <MarkingStyleStep
                data={q.evaluationCriteria}
                onChange={q.setEvaluationCriteria}
              />
            ) : (
              <RubricsStep
                data={q.rubricsData}
                onChange={q.setRubricsData}
              />
            )
          ) : q.currentMainStep === 3 ? (
            <PreviewStep quiz={q.quizSummary} questions={q.questions} />
          ) : (
            <PublishStep
              quiz={q.quizSummary}
              questionCount={q.questions.length}
              isPublic={q.isPublic}
              onTogglePublic={q.setIsPublic}
              onShare={() => q.setShowShareModal(true)}
            />
          )}
        </div>

        {/* Navigation */}
        <NavigationButtons
          onPrevious={q.handlePrevious}
          onNext={nextBtn.onClick}
          nextLabel={nextBtn.label}
          showNext={!q.isGenerating}
          showPrevious
          additionalButtons={
            nextBtn.showDownload ? (
              <Button variant="outline" onClick={q.handleDownload}>
                Download Quiz
              </Button>
            ) : undefined
          }
        />

        {/* Modals */}
        <EditQuestionModal
          isOpen={q.isEditModalOpen}
          question={q.selectedQuestion}
          onClose={() => q.setEditModalOpen(false)}
          onSave={q.handleSaveQuestion}
        />
      </main>

      <ShareModal
        isOpen={q.showShareModal}
        onClose={() => q.setShowShareModal(false)}
        onShare={() => q.setShowShareModal(false)}
      />
    </div>
  );
};

export default Page;
