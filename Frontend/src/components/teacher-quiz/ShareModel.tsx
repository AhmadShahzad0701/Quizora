import { useState } from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Teacher {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (teacherId: string) => void;
}

const mockTeachers: Teacher[] = [
  { id: "1", name: "Zerlish", username: "zerlish1" },
  { id: "2", name: "Zerlish", username: "zerlish1" },
  { id: "3", name: "Zerlish", username: "zerlish1" },
];

export function ShareModal({ isOpen, onClose, onShare }: ShareModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeachers = mockTeachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search for Teacher</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(215,16%,47%)]" />
            <Input
              placeholder="Teacher ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[hsl(215,16%,47%)]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={teacher.avatar} />
                    <AvatarFallback className="bg-[hsl(217,91%,60%)]/10 text-[hsl(217,91%,60%)]">
                      {teacher.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-[hsl(222,47%,11%)]">{teacher.name}</p>
                    <p className="text-sm text-[hsl(215,16%,47%)]">{teacher.username}</p>
                  </div>
                </div>
                <Button size="sm" onClick={() => onShare(teacher.id)} className="text-[hsl(217,91%,60%)] hover:text-[hsl(217,91%,60%)]">
                  Share →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
