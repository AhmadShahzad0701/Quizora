import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";  // Assuming you have a Modal component

interface Question {
  id: number;
  type: string;
  points: number;
  text: string;
  answer?: string; // For true/false and other types
  options?: string[]; // For MCQs
}

interface QuestionEditModalProps {
  isOpen: boolean;
  question: Question | null;
  onClose: () => void;
  onSave: (updatedQuestion: Question) => void;
}

export function QuestionEditModal({
  isOpen,
  question,
  onClose,
  onSave,
}: QuestionEditModalProps) {
  const [updatedQuestion, setUpdatedQuestion] = useState<Question | null>(question);

  // Update the state whenever the question prop changes
  useEffect(() => {
    setUpdatedQuestion(question);
  }, [question]);

  // Handle the save action
  const handleSave = () => {
    if (updatedQuestion) {
      onSave(updatedQuestion); // Save the updated question
      onClose(); // Close the modal
    }
  };

  if (!updatedQuestion) return null;  // If no question, return nothing

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Question</h2>
        
        <div>
          <label className="block">Question Text</label>
          <input
            type="text"
            value={updatedQuestion.text}
            onChange={(e) =>
              setUpdatedQuestion((prev) => (prev ? { ...prev, text: e.target.value } : prev))
            }
            className="w-full p-2 border mb-4"
          />
        </div>

        {/* Fields for different question types */}
        {updatedQuestion.type === "MCQ" && (
          <div>
            <label className="block">Options</label>
            {updatedQuestion.options?.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...(updatedQuestion.options || [])];
                    newOptions[index] = e.target.value;
                    setUpdatedQuestion((prev) => (prev ? { ...prev, options: newOptions } : prev));
                  }}
                  className="w-full p-2 border mb-2"
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}

        {updatedQuestion.type === "True / False" && (
          <div>
            <label className="block">Correct Answer</label>
            <select
              value={updatedQuestion.answer || "True"}
              onChange={(e) =>
                setUpdatedQuestion((prev) => (prev ? { ...prev, answer: e.target.value } : prev))
              }
              className="w-full p-2 border mb-4"
            >
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
          </div>
        )}

        {updatedQuestion.type === "Fill in the Blanks" && (
          <div>
            <label className="block">Correct Answer</label>
            <input
              type="text"
              value={updatedQuestion.answer || ""}
              onChange={(e) =>
                setUpdatedQuestion((prev) => (prev ? { ...prev, answer: e.target.value } : prev))
              }
              className="w-full p-2 border mb-4"
            />
          </div>
        )}

        {/* Other question types can be handled here (Short Answer, Long Answer, Coding, etc.) */}

        <Button variant="outline" onClick={handleSave} className="mr-2">
          Save
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
