
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GraduationYearSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const GraduationYearSelect: React.FC<GraduationYearSelectProps> = ({
  value,
  onValueChange,
}) => {
  // Graduation year options
  const graduationYears = ["2025", "2026", "2027", "2028", "2029", "2030"];

  return (
    <div>
      <Label htmlFor="graduationYear">
        Graduation Year<span className="text-red-500">*</span>
      </Label>
      <Select
        value={value || ""}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="bg-zinc-800 border-zinc-700">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {graduationYears.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default GraduationYearSelect;
