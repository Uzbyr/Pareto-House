
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

const OnlinePresenceStep = () => {
  const { formData, handleInputChange, handleSubmit, handlePrevStep, loading } = useOnboarding();

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Online Presence</h1>
        <p className="text-gray-400">Add your professional links</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
          <Input
            id="linkedin_url"
            name="linkedin_url"
            value={formData.linkedin_url || ""}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700"
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div>
          <Label htmlFor="github_url">GitHub Profile</Label>
          <Input
            id="github_url"
            name="github_url"
            value={formData.github_url || ""}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <Label htmlFor="website_url">Personal Website</Label>
          <Input
            id="website_url"
            name="website_url"
            value={formData.website_url || ""}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700"
            placeholder="https://..."
          />
        </div>

        <div>
          <Label htmlFor="x_url">X (Twitter) Profile</Label>
          <Input
            id="x_url"
            name="x_url"
            value={formData.x_url || ""}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700"
            placeholder="https://x.com/..."
          />
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
