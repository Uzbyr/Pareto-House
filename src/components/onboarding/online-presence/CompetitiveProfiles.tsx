
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface CompetitiveProfilesProps {
  profiles: string[];
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}

const CompetitiveProfiles: React.FC<CompetitiveProfilesProps> = ({
  profiles,
  onAdd,
  onChange,
  onRemove,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Competitive Programming Profiles</Label>
        <Button
          type="button"
          onClick={onAdd}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Profile URL
        </Button>
      </div>

      {profiles && profiles.map((profile, index) => (
        <div key={index} className="flex gap-2">
          <Input
            placeholder="Enter Codeforces/CPHOF/Atcoder/Codechef/IOI profile URL"
            value={profile}
            onChange={(e) => onChange(index, e.target.value)}
            className="bg-zinc-800 border-zinc-700"
          />
          <Button
            type="button"
            onClick={() => onRemove(index)}
            variant="destructive"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CompetitiveProfiles;
