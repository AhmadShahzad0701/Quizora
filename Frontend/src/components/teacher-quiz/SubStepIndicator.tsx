interface SubStepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export function SubStepIndicator({
  totalSteps,
  currentStep,
}: SubStepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
        (step, index) => {
          const isActive = step <= currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  isCurrent
                    ? "bg-[hsl(217,91%,60%)] text-white"
                    : isActive
                    ? "bg-[hsl(217,91%,60%)]/90 text-white"
                    : "bg-[hsl(210,40%,96%)] text-[hsl(215,16%,47%)] border border-[hsl(214,32%,91%)]"
                }`}
              >
                {step}
              </div>

              {/* Connector */}
              {index < totalSteps - 1 && (
                <div
                  className={`w-8 h-px mx-1 transition-colors ${
                    step < currentStep
                      ? "bg-[hsl(217,91%,60%)]"
                      : "bg-[hsl(214,32%,91%)]"
                  }`}
                />
              )}
            </div>
          );
        }
      )}
    </div>
  );
}
