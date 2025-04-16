
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AboutTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AboutTextarea: React.FC<AboutTextareaProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="about">
        About Yourself<span className="text-red-500">*</span>
      </Label>
      <Textarea
        id="about"
        name="about"
        value={value || ""}
        onChange={onChange}
        className="bg-zinc-800 border-zinc-700 min-h-32"
        placeholder="Tell us about yourself, your interests, and your goals..."
        required
      />
      <p className="text-xs text-gray-400">
        {value ? value.length : 0} characters (minimum 100 recommended)
      </p>
    </div>
  );
};

export default AboutTextarea;
