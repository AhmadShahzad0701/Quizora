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
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">

      {/* Previous Button */}
      <div>
        {showPrevious && (
          <Button
            variant="outline"
            onClick={onPrevious}
            className="
              flex items-center gap-2
              text-muted-foreground
              border-muted-foreground/40
              bg-transparent
              hover:bg-muted/60
              hover:text-foreground
              hover:border-muted-foreground
              focus-visible:ring-0
              transition-all duration-200
            "
          >
            <ArrowLeft className="h-4 w-4" />
            {previousLabel}
          </Button>
        )}
      </div>

      {/* Next Button */}
      <div className="flex items-center gap-3">
        {additionalButtons}
        {showNext && (
          <Button
            onClick={onNext}
            disabled={nextDisabled}
            className="flex items-center gap-2"
          >
            {nextLabel}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
