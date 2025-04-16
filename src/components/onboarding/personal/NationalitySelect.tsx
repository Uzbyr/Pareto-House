
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
import ReactCountryFlag from "react-country-flag";
import { getCountryCodeFromNationality } from "@/utils/flagUtils";

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
            {value && (
              <div className="flex items-center gap-2">
                {getCountryCodeFromNationality(value) && (
                  <ReactCountryFlag
                    countryCode={getCountryCodeFromNationality(value) || ""}
                    svg
                    style={{ width: '1em', height: '1em', borderRadius: '2px' }}
                  />
                )}
                {value}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {nationalities.map((nationality) => {
            const countryCode = getCountryCodeFromNationality(nationality);
            return (
              <SelectItem key={nationality} value={nationality}>
                <div className="flex items-center gap-2">
                  {countryCode && (
                    <ReactCountryFlag
                      countryCode={countryCode}
                      svg
                      style={{ width: '1em', height: '1em', borderRadius: '2px' }}
                    />
                  )}
                  {nationality}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default NationalitySelect;
