import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  subtitle: string;
}

interface MainStepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export function MainStepIndicator({ steps, currentStep, completedSteps }: MainStepIndicatorProps) {
  return (
    <div className="flex items-start justify-between w-full max-w-3xl mx-auto">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = currentStep === step.id;
        const isUpcoming = !isCompleted && !isCurrent;

        return (
          <div key={step.id} className="flex flex-col items-center text-center flex-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                isCompleted
                  ? "bg-[hsl(217,91%,60%)] text-[hsl(0,0%,100%)] shadow-md scale-110" // Blue for completed steps
                  : isCurrent
                  ? "bg-[hsl(217,91%,60%)] text-[hsl(0,0%,100%)]" // Blue for current step
                  : "bg-[hsl(210,40%,96%)] text-[hsl(215,16%,47%)] border-2 border-[hsl(214,32%,91%)]" // Grey for upcoming/incomplete steps
              }`}
            >
              {isCompleted ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <div className="mt-2">
              <p
                className={`text-sm font-medium ${
                  isCurrent
                    ? "text-[hsl(217,91%,60%)]" // Blue for current step text
                    : isCompleted
                    ? "text-[hsl(222,47%,11%)]" // Dark text for completed steps
                    : "text-[hsl(215,16%,47%)]" // Grey for upcoming/incomplete steps
                }`}
              >
                {step.title}
              </p>
              <p className="text-xs text-[hsl(215,16%,47%)] mt-0.5">{step.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
