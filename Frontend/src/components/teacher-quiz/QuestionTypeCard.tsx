import { Plus, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
}

export const QuestionTypeCard = ({
  title,
  description,
  icon,
  value,
  onChange,
}: Props) => {
  return (
    <Card className="p-5 border-2 hover:border-primary/50 transition-all">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-[hsl(222,47%,11%)]">{title}</h3>
          <p className="text-sm text-[hsl(215,16%,47%)] mt-1">
            {description}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <Button
              size="icon"
              variant="outline"
              onClick={() => onChange(Math.max(0, value - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>

            <span className="w-8 text-center font-semibold">{value}</span>

            <Button
              size="icon"
              variant="outline"
              onClick={() => onChange(value + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
