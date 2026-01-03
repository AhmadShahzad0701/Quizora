import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuizDetailsFormData {
  title: string;
  subject: string;
  difficulty: string;
}

interface QuizDetailsStep1Props {
  data: QuizDetailsFormData;
  onChange: (data: QuizDetailsFormData) => void;
}

export function QuizDetailsStep1({ data, onChange }: QuizDetailsStep1Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-[hsl(222,47%,11%)]">Quiz Details</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="font-medium text-[hsl(222,47%,11%)]">Quiz Title:</Label>
          <Input
            id="title"
            placeholder="e.g. Data Structures Midterm"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="h-12"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subject" className="font-medium text-[hsl(222,47%,11%)]">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g. Computer Science"
              value={data.subject}
              onChange={(e) => onChange({ ...data, subject: e.target.value })}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty" className="font-medium text-[hsl(222,47%,11%)]">Difficulty Level</Label>
            <Select
              value={data.difficulty}
              onValueChange={(value) => onChange({ ...data, difficulty: value })}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
