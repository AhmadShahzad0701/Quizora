import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SecretKeyProps {
  value: string;
}

const SecretKey = ({ value }: SecretKeyProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-lg tracking-wider text-[#222222]">
        {visible ? value : "******"}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setVisible(!visible)}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default SecretKey;
