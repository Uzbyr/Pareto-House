
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PreparatoryClassesSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const PreparatoryClassesSelect: React.FC<PreparatoryClassesSelectProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <div>
      <Label htmlFor="preparatoryClasses">
        Have you taken preparatory classes (classes préparatoires) in
        the French education system?
      </Label>
      <Select
        value={value || ""}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="bg-zinc-800 border-zinc-700">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yes">Yes</SelectItem>
          <SelectItem value="no">No</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PreparatoryClassesSelect;
