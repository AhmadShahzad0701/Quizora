import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  variant?: "blue" | "green" | "orange";
  className?: string;
}

const variantStyles = {
  blue: "text-[#1976D2]",  // Replaces text-quizora with #1976D2
  green: "text-[#4CAF50]",  // Replaces text-success with #4CAF50
  orange: "text-[#FF9800]",  // Replaces text-warning with #FF9800
};

const StatCard = ({ value, label, variant = "blue", className }: StatCardProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-[#DDDDDD]",  // Replaces bg-card and border-border
      className
    )}>
      <span className={cn("text-4xl font-bold", variantStyles[variant])}>
        {value}
      </span>
      <span className="text-[#999999] font-medium mt-1">  {/* Replaces text-muted-foreground */}
        {label}
      </span>
    </div>
  );
};

export default StatCard;
