
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nationalities } from "@/utils/formConstants";

interface NationalitySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const NationalitySelect: React.FC<NationalitySelectProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <div>
      <Label htmlFor="nationality">Nationality</Label>
      <Select
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="bg-zinc-800 border-zinc-700">
          <SelectValue placeholder="Select your nationality">
            {value}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {nationalities.map((nationality) => (
            <SelectItem key={nationality} value={nationality}>
              {nationality}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default NationalitySelect;

