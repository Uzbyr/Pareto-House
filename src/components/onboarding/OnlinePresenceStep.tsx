
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Plus, Trash2 } from "lucide-react";

const OnlinePresenceStep = () => {
  const { 
    formData, 
    handleInputChange, 
    handleSubmit, 
    handlePrevStep, 
    loading,
    handleCompetitiveProfileAdd,
    handleCompetitiveProfileChange,
    handleCompetitiveProfileRemove
  } = useOnboarding();

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Online Presence</h1>
        <p className="text-gray-400">Add your professional links and profiles</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="video_url">Video Presentation URL</Label>
          <Input
            id="video_url"
            name="video_url"
            value={formData.video_url || ""}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700"
            placeholder="https://youtube.com/... or https://vimeo.com/..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin_url">LinkedIn Profile URL</Label>
          <Input
            id="linkedin_url"
            name="linkedin_url"
            value={formData.linkedin_url || ""}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700"
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="x_url">X (Twitter) Profile URL</Label>
            <Input
              id="x_url"
              name="x_url"
              value={formData.x_url || ""}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              placeholder="https://x.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github_url">GitHub Profile URL</Label>
            <Input
              id="github_url"
              name="github_url"
              value={formData.github_url || ""}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              placeholder="https://github.com/..."
            />
          </div>
        </div>

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

          {formData.competitive_profiles && formData.competitive_profiles.map((profile, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Enter Codeforces/CPHOF/Atcoder/Codechef/IOI profile URL"
                value={profile}
                onChange={(e) =>
                  handleCompetitiveProfileChange(index, e.target.value)
                }
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

      <div className="pt-4">
        <div className="flex justify-between">
          <Button
            onClick={handlePrevStep}
            variant="outline"
            className="border-zinc-700 hover:bg-zinc-800"
          >
            Previous
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
          >
            {loading ? "Completing..." : "Complete Onboarding"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnlinePresenceStep;
