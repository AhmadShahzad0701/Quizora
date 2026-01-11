import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "../FileUpload";

interface QuizContentFormData {
  timeLimit: string;
  numberOfQuestions: string;
  totalMarks: string;
  content: string;
}

interface QuizContentStep2Props {
  data: QuizContentFormData;
  onChange: (data: QuizContentFormData) => void;
}

export function QuizContentStep2({ data, onChange }: QuizContentStep2Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-[hsl(222,47%,11%)]">Quiz Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-medium text-[hsl(222,47%,11%)]">Time Limit (Minutes)</Label>
          <Select
            value={data.timeLimit}
            onValueChange={(value) => onChange({ ...data, timeLimit: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select time limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="45">45</SelectItem>
              <SelectItem value="60">60</SelectItem>
              <SelectItem value="90">90</SelectItem>
              <SelectItem value="120">120</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-[hsl(222,47%,11%)]">Number of Questions</Label>
          <Select
            value={data.numberOfQuestions}
            onValueChange={(value) => onChange({ ...data, numberOfQuestions: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select number" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="space-y-2">
          <Label className="font-medium text-[hsl(222,47%,11%)]">Total Marks</Label>
          <Select
            value={data.totalMarks}
            onValueChange={(value) => onChange({ ...data, totalMarks: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select total marks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-medium text-[hsl(222,47%,11%)]">Quiz Content/Description</Label>
        <Textarea
          placeholder="Paste Content of Quiz (5000 words)"
          value={data.content}
          onChange={(e) => onChange({ ...data, content: e.target.value })}
          className="min-h-[120px] resize-none"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-[hsl(215,16%,47%)] text-center">Upload Files</p>
        <FileUpload />
      </div>
    </div>
  );
}
