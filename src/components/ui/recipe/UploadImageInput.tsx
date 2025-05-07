import { useRef } from "react";

interface IUploadImageInputProps {
  onFileSelect: (file: File) => void;
  label?: string;
}

export default function UploadImageInput({
  onFileSelect,
  label = "Imagen"
}: IUploadImageInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="my-4 flex flex-col items-center">
      <label className="self-start text-sm font-medium font-mono text-gray-700 mb-1">
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        name="image"
        accept="image/*"
        placeholder="ads"
        onChange={handleChange}
        className="w-full text-sm my-4 text-gray-700 file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-medium
                   file:bg-blue-200 file:text-blue-700
                   hover:file:bg-blue-100"
      />
    </div>
  );
}
