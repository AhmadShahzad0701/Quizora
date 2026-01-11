import { Upload } from "lucide-react";

interface FileUploadProps {
  onFilesSelected?: (files: FileList) => void;
}

export function FileUpload({ onFilesSelected }: FileUploadProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && onFilesSelected) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onFilesSelected) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-[hsl(214,32%,91%)] rounded-lg p-8 text-center hover:border-[hsl(217,91%,60%)] transition-colors cursor-pointer"
    >
      <input
        type="file"
        multiple
        onChange={handleChange}
        className="hidden"
        id="file-upload"
        accept=".jpeg,.jpg,.png,.pdf,.doc,.docx,.ppt,.pptx"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[hsl(217,91%,60%)]/10 flex items-center justify-center">
            <Upload className="h-6 w-6 text-[hsl(217,91%,60%)]" />
          </div>
          <div>
            <p className="text-[hsl(215,16%,47%)]">
              Drag & drop files or{" "}
              <span className="text-[hsl(217,91%,60%)] font-medium hover:underline">Browse</span>
            </p>
            <p className="text-xs text-[hsl(215,16%,47%)] mt-1">
              Supported formats: JPEG, PNG, PDF, Word, PPT
            </p>
          </div>
        </div>
      </label>
    </div>
  );
}
