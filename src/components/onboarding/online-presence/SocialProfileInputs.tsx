
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SocialProfileInputsProps {
  xUrl: string;
  githubUrl: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialProfileInputs: React.FC<SocialProfileInputsProps> = ({
  xUrl,
  githubUrl,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="x_url">X (Twitter) Profile URL</Label>
        <Input
          id="x_url"
          name="x_url"
          value={xUrl || ""}
          onChange={onChange}
          className="bg-zinc-800 border-zinc-700"
          placeholder="https://x.com/..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="github_url">GitHub Profile URL</Label>
        <Input
          id="github_url"
          name="github_url"
          value={githubUrl || ""}
          onChange={onChange}
          className="bg-zinc-800 border-zinc-700"
          placeholder="https://github.com/..."
        />
      </div>
    </div>
  );
};

export default SocialProfileInputs;
