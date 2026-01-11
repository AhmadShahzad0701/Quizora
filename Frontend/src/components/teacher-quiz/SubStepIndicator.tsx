interface SubStepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export function SubStepIndicator({ totalSteps, currentStep }: SubStepIndicatorProps) {
  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => {
        const isActive = step <= currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className="flex items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                isCurrent
                  ? "bg-[hsl(217,91%,60%)] text-[hsl(0,0%,100%)] shadow-md scale-110"
                  : isActive
                  ? "bg-[hsl(217,91%,60%)] text-[hsl(0,0%,100%)]"
                  : "bg-[hsl(210,40%,96%)] text-[hsl(215,16%,47%)] border-2 border-[hsl(214,32%,91%)]"
              }`}
            >
              {step}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`w-14 h-0.5 transition-colors duration-300 ${
                  step < currentStep ? "bg-[hsl(217,91%,60%)]" : "bg-[hsl(214,32%,91%)]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
