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
}

interface QuizTableRowProps {
  children: ReactNode;
  columns: number;
}

export const QuizTable = ({ columns, children }: QuizTableProps) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
      <div 
        className="grid gap-4 px-6 py-4 bg-table-header border-b border-border"
        style={{ gridTemplateColumns: `80px 200px 1fr` }}
      >
        {columns.map((col) => (
          <div 
            key={col.key} 
            className={cn("text-sm font-semibold text-table-header-foreground", col.className)}
          >
            {col.label}
          </div>
        ))}
      </div>
      <div className="divide-y divide-border/50">
        {children}
      </div>
    </div>
  );
};

export const QuizTableRow = ({ children, columns }: QuizTableRowProps) => {
  return (
    <div 
      className="grid gap-4 px-6 py-4 items-center bg-table-row hover:bg-table-row-hover transition-colors"
      style={{ gridTemplateColumns: `80px 200px 1fr` }}
    >
      {children}
    </div>
  );
};
