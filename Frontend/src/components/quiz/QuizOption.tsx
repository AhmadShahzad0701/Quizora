interface QuizOptionProps {
  option: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const QuizOption = ({ option, isSelected, onSelect }: QuizOptionProps) => {
  return (
    <button
      onClick={onSelect}
      className={`flex items-center gap-4 w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
        isSelected
          ? 'border-[#0d21ba] bg-[#0d21ba]/5'
          : 'border-[#d1d5db] bg-[#f0f4f8] hover:border-[#0d21ba]/50'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          isSelected
            ? 'border-[#0d21ba]'
            : 'border-[#6e6e6e]'
        }`}
      >
        {isSelected && (
          <div className="w-2.5 h-2.5 rounded-full bg-[#0d21ba]" />
        )}
      </div>
      <span className="text-[#1a1a1a] font-medium">{option}</span>
    </button>
  );
};
