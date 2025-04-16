
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface HighSchoolInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HighSchoolInput: React.FC<HighSchoolInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <Label htmlFor="highSchool">
        High School<span className="text-red-500">*</span>
      </Label>
      <Input
        id="highSchool"
        name="high_school"
        value={value || ""}
        onChange={onChange}
        className="bg-zinc-800 border-zinc-700"
        placeholder="Enter your high school name"
      />
    </div>
  );
};

export default HighSchoolInput;
