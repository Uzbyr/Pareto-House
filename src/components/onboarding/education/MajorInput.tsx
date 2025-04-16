
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MajorInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MajorInput: React.FC<MajorInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <Label htmlFor="major">
        Major<span className="text-red-500">*</span>
      </Label>
      <Input
        id="major"
        name="major"
        value={value || ""}
        onChange={onChange}
        className="bg-zinc-800 border-zinc-700"
        placeholder="Enter your major"
      />
    </div>
  );
};

export default MajorInput;
