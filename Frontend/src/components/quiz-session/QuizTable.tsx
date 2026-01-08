import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Column {
  key: string;
  label: string;
  className?: string;
}

interface QuizTableProps {
  columns: Column[];
  children: ReactNode;
  className?: string;
}

const QuizTable = ({ columns, children, className }: QuizTableProps) => {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="grid gap-2">
        {/* Header */}
        <div className="grid gap-4 px-6 py-3" style={{ 
          gridTemplateColumns: columns.map(() => "1fr").join(" ") 
        }}>
          {columns.map((col) => (
            <div 
              key={col.key} 
              className={cn("text-sm font-medium text-[#999999]", col.className)} // Replaced text-muted-foreground
            >
              {col.label}
            </div>
          ))}
        </div>
        {/* Rows */}
        <div className="grid gap-2">
          {children}
        </div>
      </div>
    </div>
  );
};

interface QuizTableRowProps {
  children: ReactNode;
  columns: number;
  className?: string;
}

const QuizTableRow = ({ children, columns, className }: QuizTableRowProps) => {
  return (
    <div 
      className={cn(
        "grid gap-4 px-6 py-4 bg-[#1976D2] rounded-xl text-[#FFFFFF] items-center animate-fade-in", // Replaced bg-quizora and text-primary-foreground
        className
      )}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {children}
    </div>
  );
};

export { QuizTable, QuizTableRow };
