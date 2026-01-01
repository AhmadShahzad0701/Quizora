import { CodingQuestion as CodingQuestionType } from "@/types/quiz";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

interface CodingQuestionProps {
  question: CodingQuestionType;
  code: string;
  onCodeChange: (code: string) => void;
}

export const CodingQuestionComponent = ({
  question,
  code,
  onCodeChange,
}: CodingQuestionProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(question.language);
  const [showConsole, setShowConsole] = useState(false);

  const lineNumbers = code.split("\n").map((_, i) => i + 1);

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Problem description */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-4">
              <span className="font-semibold text-[#1a1a1a] min-w-[140px]">
                Problem Statement
              </span>
              <span className="text-[#1a1a1a]">{question.problemStatement}</span>
            </div>
            <div className="flex gap-4">
              <span className="font-semibold text-[#1a1a1a] min-w-[140px]">
                Language
              </span>
              <span className="text-[#1a1a1a]">{question.language}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#1a1a1a] mb-2">Description</h4>
            <p className="text-[#6e6e6e] leading-relaxed">
              {question.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#1a1a1a] mb-3">Test Cases</h4>
            <div className="space-y-2">
              {question.testCases.map((testCase, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-[#6e6e6e]">Input</span>
                  <span className="text-[#6e6e6e]">→</span>
                  <code className="px-3 py-1 bg-[#f0f4f8] rounded-lg text-sm font-mono">
                    {testCase.input}
                  </code>
                </div>
              ))}
              {question.testCases.map((testCase, index) => (
                <div key={`output-${index}`} className="flex items-center gap-4">
                  <span className="text-[#6e6e6e]">Output</span>
                  <span className="text-[#6e6e6e]">→</span>
                  <code className="px-3 py-1 bg-[#f0f4f8] rounded-lg text-sm font-mono">
                    {testCase.output}
                  </code>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#1a1a1a] mb-2">Returns</h4>
            <p className="text-[#6e6e6e]">{question.returns}</p>
          </div>
        </div>

        {/* Right side - Code editor */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#6e6e6e]">Select Language</span>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="C++">C++</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-[#d1d5db] code-editor-shadow">
            <div className="flex bg-[#1c1c1c] text-[#f8f8f8] font-mono text-sm">
              <div className="py-4 px-3 text-[#6e6e6e] select-none border-r border-[#d1d5db]/20 bg-[#2a2a2a]/80">
                {lineNumbers.map((num) => (
                  <div
                    key={num}
                    className="leading-6 text-right pr-2 text-[#6e6e6e]/60"
                  >
                    {num}
                  </div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => onCodeChange(e.target.value)}
                className="flex-1 bg-transparent p-4 outline-none resize-none font-mono text-sm leading-6 text-[#f8f8f8] min-h-[320px]"
                spellCheck={false}
              />
            </div>
          </div>

          {showConsole && (
            <div className="bg-[#2a2a2a] rounded-lg p-4 min-h-[100px] font-mono text-sm text-[#f8f8f8]">
              <span className="text-[#6e6e6e]">
                Console output will appear here
              </span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowConsole(!showConsole)}
              className="rounded-full px-6"
            >
              Console
            </Button>
            <Button variant="secondary" className="rounded-full px-6">
              Run
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
