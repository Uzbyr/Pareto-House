
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UniversitySelectProps {
  university: string;
  otherUniversity?: string;
  onSelectUniversity: (value: string) => void;
  onOtherUniversityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  universities: string[];
}

const UniversitySelect: React.FC<UniversitySelectProps> = ({
  university,
  otherUniversity,
  onSelectUniversity,
  onOtherUniversityChange,
  universities,
}) => {
  return (
    <>
      <div>
        <Label htmlFor="university">
          University<span className="text-red-500">*</span>
        </Label>
        <Select
          value={university || ""}
          onValueChange={onSelectUniversity}
        >
          <SelectTrigger className="bg-zinc-800 border-zinc-700">
            <SelectValue placeholder="Select your university" />
          </SelectTrigger>
          <SelectContent>
            {universities.map((uni) => (
              <SelectItem key={uni} value={uni}>
                {uni}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {university === "Other" && (
        <div>
          <Label htmlFor="otherUniversity">
            Specify University<span className="text-red-500">*</span>
          </Label>
          <Input
            id="otherUniversity"
            name="otherUniversity"
            value={otherUniversity || ""}
            onChange={onOtherUniversityChange}
            className="bg-zinc-800 border-zinc-700"
            placeholder="Enter your university name"
          />
        </div>
      )}
    </>
  );
};

export default UniversitySelect;
