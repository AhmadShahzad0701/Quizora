import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface RubricsData {
  rubrics: string;
  aiRubrics: string;
  evaluationMethod: "llm" | "custom";
  selectedModel: string;
}

interface RubricsStepProps {
  data: RubricsData;
  onChange: (data: RubricsData) => void;
}

export function RubricsStep({ data, onChange }: RubricsStepProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <h2 className="text-xs"><span className="font-bold">Note:</span> Rubrics are only valid for Short and Long Questions.</h2>
        <div className="space-y-2">
          <Label className="font-medium text-lg text-[hsl(222,47%,11%)]">Enter Rubrics</Label>
          <Input
            placeholder="Enter Rubrics"
            value={data.rubrics}
            onChange={(e) => onChange({ ...data, rubrics: e.target.value })}
            className="h-12"
          />
        </div>
        <p className="text-xs text-[hsl(215,16%,47%)] text-center">AI can make mistakes</p>
      </div>

      <div className="text-center text-[hsl(215,16%,47%)]">or</div>

      <div className="space-y-4">
        <Label className="font-medium text-lg text-[hsl(222,47%,11%)]">
          Create Rubrics with AI <span className="text-[hsl(215,16%,47%)] font-normal">(Optional)</span>
        </Label>
        <div className="relative">
          <Input
            placeholder="Enter Rubrics"
            value={data.aiRubrics}
            onChange={(e) => onChange({ ...data, aiRubrics: e.target.value })}
            className="h-12 pr-12"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <ArrowRight className="h-5 w-5 text-[hsl(217,91%,60%)]" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="font-medium text-lg text-[hsl(222,47%,11%)]">Choose Evaluation Method</Label>
        <RadioGroup
          value={data.evaluationMethod}
          onValueChange={(value: "llm" | "custom") =>
            onChange({ ...data, evaluationMethod: value })
          }
          className="space-y-4"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="llm" id="llm" />
            <Label htmlFor="llm" className="font-medium text-[hsl(222,47%,11%)]">LLM</Label>
          </div>
          
          {data.evaluationMethod === "llm" && (
            <div className="ml-7 space-y-2">
              <Label className="font-medium text-[hsl(222,47%,11%)]">Select Model</Label>
              <Select
                value={data.selectedModel}
                onValueChange={(value) => onChange({ ...data, selectedModel: value })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deepseek">DeepSeek</SelectItem>
                  <SelectItem value="gpt4">GPT-4</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom" className="font-medium text-[hsl(222,47%,11%)]">Custom Model</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
