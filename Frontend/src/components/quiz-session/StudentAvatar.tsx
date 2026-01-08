import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudentAvatarProps {
  name: string;
  id: string;
  image?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showInfo?: boolean;
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-20 w-20",
  xl: "h-28 w-28",
};

const textSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const StudentAvatar = ({ 
  name, 
  id, 
  image, 
  size = "md", 
  showInfo = true 
}: StudentAvatarProps) => {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex flex-col items-center gap-1">
      <Avatar className={`${sizeClasses[size]} ring-2 ring-[#1976D2]/20`}>
        <AvatarImage src={image || "/placeholder.svg"} alt={name} />
        <AvatarFallback className="bg-[#1976D2] text-[#FFFFFF] font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      {showInfo && (
        <div className="text-center">
          <p className={`font-medium text-[#222222] ${textSizes[size]}`}>{name}</p>
          <p className={`text-[#999999] ${size === "sm" ? "text-[10px]" : "text-xs"}`}>{id}</p>
        </div>
      )}
    </div>
  );
};

export default StudentAvatar;
