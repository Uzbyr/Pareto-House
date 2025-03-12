
import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Plus, Trash2 } from "lucide-react";

interface AdditionalInformationStepProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  handleCompetitiveProfileAdd: () => void;
  handleCompetitiveProfileChange: (index: number, value: string) => void;
  handleCompetitiveProfileRemove: (index: number) => void;
}

const AdditionalInformationStep = memo(({ 
  formData, 
  handleInputChange, 
  handleSelectChange,
  handleFileChange,
  handleCompetitiveProfileAdd,
  handleCompetitiveProfileChange,
  handleCompetitiveProfileRemove
}: AdditionalInformationStepProps) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
    
    <div className="space-y-2">
      <Label htmlFor="linkedInUrl">LinkedIn Profile URL<span className="text-red-500">*</span></Label>
      <Input
        id="linkedInUrl"
        name="linkedInUrl"
        placeholder="https://www.linkedin.com/in/yourusername"
        value={formData.linkedInUrl}
        onChange={handleInputChange}
        className="bg-zinc-800 border-zinc-700"
        required
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="space-y-2">
        <Label htmlFor="xUrl">X (Twitter) Profile URL (Optional)</Label>
        <Input
          id="xUrl"
          name="xUrl"
          placeholder="https://x.com/yourusername"
          value={formData.xUrl}
          onChange={handleInputChange}
          className="bg-zinc-800 border-zinc-700"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="githubUrl">GitHub Profile URL (Optional)</Label>
        <Input
          id="githubUrl"
          name="githubUrl"
          placeholder="https://github.com/yourusername"
          value={formData.githubUrl}
          onChange={handleInputChange}
          className="bg-zinc-800 border-zinc-700"
        />
      </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="videoUrl">Video Presentation URL</Label>
      <Input
        id="videoUrl"
        name="videoUrl"
        placeholder="Link to a short video presentation of yourself (YouTube, Vimeo, etc.)"
        value={formData.videoUrl}
        onChange={handleInputChange}
        className="bg-zinc-800 border-zinc-700"
        onClick={(e) => e.stopPropagation()} // Prevent form submission on click
        onKeyDown={(e) => {
          // Prevent form submission when pressing Enter in the URL field
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      />
      <p className="text-xs text-zinc-500 mt-1">
        Upload a 1-2 minute video presentation about yourself and your goals
      </p>
    </div>

    <div className="space-y-2">
      <Label htmlFor="buildingCompany">Are you building a company?</Label>
      <Select
        value={formData.buildingCompany}
        onValueChange={(value) => handleSelectChange("buildingCompany", value)}
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

    {formData.buildingCompany === "yes" && (
      <>
        <div className="space-y-2">
          <Label htmlFor="companyContext">Company Context</Label>
          <Textarea
            id="companyContext"
            name="companyContext"
            placeholder="Tell us about the company you're building"
            value={formData.companyContext}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700 min-h-[120px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deckFile">Pitch Deck (Optional)</Label>
          <Input
            id="deckFile"
            name="deckFile"
            type="file"
            accept=".pdf,.ppt,.pptx"
            onChange={(e) => handleFileChange(e, "deckFile")}
            className="bg-zinc-800 border-zinc-700 file:bg-zinc-700 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3"
          />
          {formData.deckFile && (
            <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
              <Check className="h-4 w-4" /> {formData.deckFile.name}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="memoFile">Memo (Optional)</Label>
          <Input
            id="memoFile"
            name="memoFile"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange(e, "memoFile")}
            className="bg-zinc-800 border-zinc-700 file:bg-zinc-700 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3"
          />
          {formData.memoFile && (
            <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
              <Check className="h-4 w-4" /> {formData.memoFile.name}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
          <Input
            id="websiteUrl"
            name="websiteUrl"
            placeholder="https://your-company.com"
            value={formData.websiteUrl}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700"
          />
        </div>
      </>
    )}

    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Competitive Programming Profiles</Label>
        <Button
          type="button"
          onClick={handleCompetitiveProfileAdd}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Profile URL
        </Button>
      </div>
      
      {formData.competitiveProfiles.map((profile: string, index: number) => (
        <div key={index} className="flex gap-2">
          <Input
            placeholder="Enter Codeforces/CPHOF/Atcoder/Codechef/IOI profile URL"
            value={profile}
            onChange={(e) => handleCompetitiveProfileChange(index, e.target.value)}
            className="bg-zinc-800 border-zinc-700"
          />
          <Button
            type="button"
            onClick={() => handleCompetitiveProfileRemove(index)}
            variant="destructive"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  </div>
));

export default AdditionalInformationStep;
