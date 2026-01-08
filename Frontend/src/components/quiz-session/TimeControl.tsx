import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimeControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

const TimeControl = ({ 
  value, 
  onChange, 
  min = 5, 
  max = 180, 
  step = 5,
  label = "Min"
}: TimeControlProps) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - step);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + step);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrease}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="text-xl font-semibold text-[#222222] min-w-[80px] text-center">
        {value} {label}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrease}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TimeControl;
