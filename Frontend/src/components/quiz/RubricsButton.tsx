import { Button } from "@/components/ui/button";

interface RubricsButtonProps {
  onClick: () => void;
}

export const RubricsButton = ({ onClick }: RubricsButtonProps) => {
  return (
    <div className="flex justify-center mt-6">
      <Button
        variant="outline"
        onClick={onClick}
        className="rounded-lg px-6 py-2 font-medium border-[#6e6e6e]/20 hover:bg-gradient-primary duration-200"
      >
        Read Rubrics
      </Button>
    </div>
  );
};
