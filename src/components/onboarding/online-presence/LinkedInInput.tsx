
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LinkedInInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LinkedInInput: React.FC<LinkedInInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="linkedin_url">LinkedIn Profile URL</Label>
      <Input
        id="linkedin_url"
        name="linkedin_url"
        value={value || ""}
        onChange={onChange}
        className="bg-zinc-800 border-zinc-700"
        placeholder="https://linkedin.com/in/..."
      />
    </div>
  );
};

export default LinkedInInput;
