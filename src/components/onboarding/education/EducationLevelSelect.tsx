
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OnboardingFormData } from "@/types/onboarding";

interface EducationLevelSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const EducationLevelSelect: React.FC<EducationLevelSelectProps> = ({
  value,
  onValueChange,
}) => {
  // Education level options
  const educationLevels = [
    { value: "university", label: "University" },
    { value: "highSchool", label: "High School" },
  ];

  return (
    <div>
      <Label htmlFor="educationLevel">
        Current Education<span className="text-red-500">*</span>
      </Label>
      <Select
        value={value || "university"}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="bg-zinc-800 border-zinc-700">
          <SelectValue placeholder="Select your education level" />
        </SelectTrigger>
        <SelectContent>
          {educationLevels.map((level) => (
            <SelectItem key={level.value} value={level.value}>
              {level.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EducationLevelSelect;
