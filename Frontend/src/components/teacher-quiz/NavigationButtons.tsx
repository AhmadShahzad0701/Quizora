import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  nextDisabled?: boolean;
  isLastStep?: boolean;
  additionalButtons?: React.ReactNode;
}

export function NavigationButtons({
  onPrevious,
  onNext,
  showPrevious = true,
  showNext = true,
  nextLabel = "Next",
  previousLabel = "Previous",
  nextDisabled = false,
  additionalButtons,
}: NavigationButtonsProps) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-[hsl(214,32%,91%)]"> {/* Replaced border color */}
      <div>
        {showPrevious && (
          <Button variant="ghost" onClick={onPrevious} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-white">{previousLabel}</span> {/* Replaced text color */}
          </Button>
        )}
      </div>
      <div className="flex items-center gap-3">
        {additionalButtons}
        {showNext && (
          <Button onClick={onNext} disabled={nextDisabled} className="gap-2">
            <span className="text-white">{nextLabel}</span> {/* Replaced text color */}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
