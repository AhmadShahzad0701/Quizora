interface ProgressBarProps {
  progress: number; // 0 to 100
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-[hsl(210,40%,96%)] rounded-full overflow-hidden">
      <div
        className="h-full bg-[linear-gradient(90deg,_hsl(217,91%,60%)_0%,_hsl(174,72%,56%)_50%,_hsl(142,71%,45%)_100%)] transition-all duration-500 ease-out rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
