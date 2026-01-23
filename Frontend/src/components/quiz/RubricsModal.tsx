import { useState } from "react";
import { X } from "lucide-react"; // Import the cross icon
import { Button } from "../ui/button";

interface RubricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RubricsModal = ({ isOpen, onClose }: RubricsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Rubrics</h2>
          <button onClick={onClose} className="text-xl text-black">
            <X />
          </button>
        </div>
        <div className="mt-4">
          <ul className="list-disc pl-5">
            <li>{`Answer is well-explained with sufficient detail.`}</li>
            <li>{`Provide accurate, complete answers; partial credit for partial correctness.`}</li>
            <li>{`Relevant examples are used where appropriate.`}</li>
          </ul>
        </div>
        <div className="mt-4">
          <Button onClick={onClose} className="w-full bg-blue-500 text-white">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RubricsModal;