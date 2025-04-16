
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SocialProfileInputsProps {
  xUrl: string;
  githubUrl: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialProfileInputs: React.FC<SocialProfileInputsProps> = ({
  xUrl,
  githubUrl,
  linkedinUrl = "",
  websiteUrl = "",
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
      
      {linkedinUrl !== undefined && (
        <div className="space-y-2">
          <Label htmlFor="linkedin_url">LinkedIn Profile URL</Label>
          <Input
            id="linkedin_url"
            name="linkedin_url"
            value={linkedinUrl || ""}
            onChange={onChange}
            className="bg-zinc-800 border-zinc-700"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      )}
      
      {websiteUrl !== undefined && (
        <div className="space-y-2">
          <Label htmlFor="website_url">Website URL</Label>
          <Input
            id="website_url"
            name="website_url"
            value={websiteUrl || ""}
            onChange={onChange}
            className="bg-zinc-800 border-zinc-700"
            placeholder="https://yourwebsite.com"
          />
        </div>
      )}
    </div>
  );
};

export default SocialProfileInputs;
