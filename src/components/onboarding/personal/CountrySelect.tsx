
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/components/application/utils/formUtils";

interface CountrySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <div>
      <Label htmlFor="country">Country of Residence</Label>
      <Select
        value={value}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="bg-zinc-800 border-zinc-700">
          <SelectValue placeholder="Select your country">
            {value}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelect;
