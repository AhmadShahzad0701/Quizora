import { Loader2 } from "lucide-react";

export function GeneratingQuizStep() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-[hsl(210,40%,96%)] border-t-[hsl(217,91%,60%)] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[hsl(217,91%,60%)]/10 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[hsl(217,91%,60%)]/30" />
          </div>
        </div>
      </div>
      <p className="mt-8 text-lg text-[hsl(215,16%,47%)]">Your Quiz will be generated Soon</p>
    </div>
  );
}
