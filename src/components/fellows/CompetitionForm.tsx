
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CompetitionFormProps {
  formData: {
    competition_results: string;
    competitive_profiles: string[];
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCompetitiveProfileChange: (index: number, value: string) => void;
  addCompetitiveProfile: () => void;
  removeCompetitiveProfile: (index: number) => void;
}

const CompetitionForm = ({
  formData,
  handleInputChange,
  handleCompetitiveProfileChange,
  addCompetitiveProfile,
  removeCompetitiveProfile,
}: CompetitionFormProps) => {
  return (
    <>
      <h3 className="text-lg font-medium text-white">Competition Experience</h3>
      
      <div>
        <Label htmlFor="competition_results">Competition Results</Label>
        <Textarea
          id="competition_results"
          name="competition_results"
          value={formData.competition_results}
          onChange={handleInputChange}
          className="bg-zinc-700 border-zinc-600 min-h-[120px]"
          placeholder="Share your competition achievements"
        />
      </div>
      
      <div>
        <Label className="mb-2 block">Competitive Profiles</Label>
        {formData.competitive_profiles.map((profile, index) => (
          <div key={index} className="flex mb-2">
            <Input
              value={profile}
              onChange={(e) => handleCompetitiveProfileChange(index, e.target.value)}
              className="bg-zinc-700 border-zinc-600 flex-1"
              placeholder="https://codeforces.com/profile/username"
            />
            <Button 
              type="button" 
              variant="destructive" 
              size="sm"
              onClick={() => removeCompetitiveProfile(index)}
              className="ml-2"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addCompetitiveProfile}
          className="mt-2"
        >
          Add Profile
        </Button>
      </div>
    </>
  );
};

export default CompetitionForm;
