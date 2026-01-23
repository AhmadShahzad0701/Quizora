import { Trophy, Timer } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PodiumPlayer {
  name: string;
  id: string;
  image?: string;
  marks: number;
  position: 1 | 2 | 3;
  badge?: string;
  timeRemaining?: string;
}

interface PodiumProps {
  players: PodiumPlayer[];
}

const positionConfig = {
  1: { height: "h-72", avatarSize: "h-24 w-24", top: "-top-16" },
  2: { height: "h-64", avatarSize: "h-24 w-24", top: "-top-16" },
  3: { height: "h-48", avatarSize: "h-24 w-24", top: "-top-16" },
};

const PodiumResult = ({ players }: PodiumProps) => {
  // Sort players: 2nd, 1st, 3rd for visual display
  const sortedPlayers = [...players].sort((a, b) => {
    const order = { 2: 0, 1: 1, 3: 2 };
    return order[a.position] - order[b.position];
  });

  return (
    <div className="flex items-end justify-center gap-6 pt-24 pb-8">
      {sortedPlayers.map((player) => {
        const config = positionConfig[player.position];
        const initials = player.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

        return (
          <div key={player.position} className="flex flex-col items-center relative">
            {/* Avatar */}
            <div className={`absolute ${config.top} z-10`}>
              <Avatar className={`${config.avatarSize} ring-4 ring-[#FFFFFF] shadow-lg`}>
                <AvatarImage src={player.image || "/placeholder.svg"} alt={player.name} />
                <AvatarFallback className="bg-[#1976D2] text-[#FFFFFF] font-bold text-xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Podium */}
            <div className={`${config.height} w-64 bg-gradient-to-b from-[#1976D2] to-[#1565C0] rounded-t-3xl flex flex-col items-center justify-start pt-8 relative`}>
                          {/* Name */}
            <div className={`z-20`}>
              <p className="font-bold text-lg text-[#fff]">{player.name}</p>
            </div>

              {/* Badge */}
              <div className="bg-[#FFFFFF]/30 rounded-lg p-2 mb-3">
                <Trophy className={`h-6 w-6 ${player.position === 1 ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"}`} />
              </div>

              {player.badge && (
                <p className="text-xs text-[#FFFFFF]/80 mb-2">{player.badge}</p>
              )}

              {/* Marks */}
              <div className="flex items-center gap-1 text-[#FFFFFF]">
                <span className="text-green-300">♥</span>
                <span className="text-2xl font-bold">{player.marks}</span>
              </div>
              <p className="text-sm text-[#FFFFFF]/80">Marks</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PodiumResult;
