import { FileUpload } from "../FileUpload";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/* ----------------------------------
   Types
----------------------------------- */

interface QuizContentData {
  content: string;
}

interface QuizContentStep3Props {
  data: QuizContentData;
  onChange: (data: QuizContentData) => void;
}

/* ----------------------------------
   Component
----------------------------------- */

export const QuizContentStep3 = ({
  data,
  onChange,
}: QuizContentStep3Props) => {
  return (
    <div className="space-y-6 animate-fade-in">

      <h2 className="text-xl font-semibold">
        Quiz Content & Files
      </h2>

      <p className="text-sm text-muted-foreground">
        Provide description or learning material for AI question generation
      </p>

      {/* Quiz Description */}
      <div className="space-y-2">
        <Label className="font-medium text-[hsl(222,47%,11%)]">
          Quiz Content / Description
        </Label>

        <Textarea
          placeholder="Paste Content of Quiz (up to 5000 words)"
          value={data.content}
          onChange={(e) =>
            onChange({ ...data, content: e.target.value })
          }
          className="min-h-[140px] resize-none"
        />
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <p className="text-sm text-[hsl(215,16%,47%)] text-center">
          Upload Files (Optional)
        </p>
        <FileUpload />
      </div>
    </div>
  );
};
