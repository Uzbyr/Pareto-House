
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Award } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CompetitionSectionProps {
  categoryOfInterest: string;
  hasCompetitionExperience: string;
  competitionResults: string;
  onSelectChange: (name: string, value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CompetitionSection: React.FC<CompetitionSectionProps> = ({
  categoryOfInterest,
  hasCompetitionExperience,
  competitionResults,
  onSelectChange,
  onInputChange,
}) => {
  return (
    <>
      <div>
        <Label htmlFor="categoryOfInterest">
          Which category of interest are you interested in?
        </Label>
        <Select
          value={categoryOfInterest || ""}
          onValueChange={(value) => onSelectChange("category_of_interest", value)}
        >
          <SelectTrigger className="bg-zinc-800 border-zinc-700">
            <SelectValue placeholder="Select your category of interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="cs">Computer Science</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {categoryOfInterest && (
        <div>
          <Label htmlFor="hasCompetitionExperience">
            Have you participated in national or international competitions in
            your field of interest?
          </Label>
          <Select
            value={hasCompetitionExperience || ""}
            onValueChange={(value) => onSelectChange("has_competition_experience", value)}
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
      )}

      {hasCompetitionExperience === "yes" && (
        <div>
          <Label htmlFor="competitionResults">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Competition Results
            </div>
          </Label>
          <Textarea
            id="competitionResults"
            name="competition_results"
            value={competitionResults || ""}
            onChange={onInputChange}
            className="bg-zinc-800 border-zinc-700 min-h-[80px]"
            placeholder="Please describe your competition experiences and results"
          />
        </div>
      )}
    </>
  );
};

export default CompetitionSection;
