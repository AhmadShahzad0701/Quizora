import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Question {
  id: number;
  type: string;
  points: number;
  text: string;
  answer?: string;
  options?: string[];
}

interface EditQuestionModalProps {
  isOpen: boolean;
  question: Question | null;
  onClose: () => void;
  onSave: (question: Question) => void;
}

export function EditQuestionModal({
  isOpen,
  question,
  onClose,
  onSave,
}: EditQuestionModalProps) {
  const [editedQuestion, setEditedQuestion] = useState<Question | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (question) {
      setEditedQuestion({ ...question });
      setOptions(question.options || ["", "", "", ""]);
    }
  }, [question]);

  if (!editedQuestion) return null;

  const handleSave = () => {
    if (editedQuestion) {
      const questionToSave = {
        ...editedQuestion,
        options: editedQuestion.type === "MCQ" ? options.filter(o => o.trim()) : undefined,
      };
      onSave(questionToSave);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type">Question Type</Label>
            <Select
              value={editedQuestion.type}
              onValueChange={(value) =>
                setEditedQuestion({ ...editedQuestion, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MCQ">MCQ</SelectItem>
                <SelectItem value="True / False">True / False</SelectItem>
                <SelectItem value="Fill in the Blanks">Fill in the Blanks</SelectItem>
                <SelectItem value="Short Answer">Short Answer</SelectItem>
                <SelectItem value="Long Answer">Long Answer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="text">Question Text</Label>
            <Textarea
              id="text"
              value={editedQuestion.text}
              onChange={(e) =>
                setEditedQuestion({ ...editedQuestion, text: e.target.value })
              }
              placeholder="Enter question text"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="points">Points</Label>
            <Input
              id="points"
              type="number"
              min={1}
              value={editedQuestion.points}
              onChange={(e) =>
                setEditedQuestion({
                  ...editedQuestion,
                  points: parseInt(e.target.value) || 1,
                })
              }
            />
          </div>

          {editedQuestion.type === "MCQ" && (
            <div className="space-y-2">
              <Label>Options</Label>
              {options.map((option, index) => (
                <Input
                  key={index}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
              ))}
            </div>
          )}

          {(editedQuestion.type === "MCQ" ||
            editedQuestion.type === "True / False" ||
            editedQuestion.type === "Fill in the Blanks") && (
            <div className="space-y-2">
              <Label htmlFor="answer">Correct Answer</Label>
              {editedQuestion.type === "True / False" ? (
                <Select
                  value={editedQuestion.answer || ""}
                  onValueChange={(value) =>
                    setEditedQuestion({ ...editedQuestion, answer: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="True">True</SelectItem>
                    <SelectItem value="False">False</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="answer"
                  value={editedQuestion.answer || ""}
                  onChange={(e) =>
                    setEditedQuestion({ ...editedQuestion, answer: e.target.value })
                  }
                  placeholder="Enter correct answer"
                />
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
