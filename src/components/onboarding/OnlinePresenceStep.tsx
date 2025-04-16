
import React from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import VideoUrlInput from "./online-presence/VideoUrlInput";
import LinkedInInput from "./online-presence/LinkedInInput";
import SocialProfileInputs from "./online-presence/SocialProfileInputs";
import CompetitiveProfiles from "./online-presence/CompetitiveProfiles";
import NavigationButtons from "./online-presence/NavigationButtons";

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
        <VideoUrlInput 
          value={formData.video_url} 
          onChange={handleInputChange} 
        />
        
        <LinkedInInput 
          value={formData.linkedin_url} 
          onChange={handleInputChange} 
        />

        <SocialProfileInputs
          xUrl={formData.x_url}
          githubUrl={formData.github_url}
          onChange={handleInputChange}
        />

        <CompetitiveProfiles
          profiles={formData.competitive_profiles}
          onAdd={handleCompetitiveProfileAdd}
          onChange={handleCompetitiveProfileChange}
          onRemove={handleCompetitiveProfileRemove}
        />
      </div>

      <NavigationButtons
        onPrevious={handlePrevStep}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default OnlinePresenceStep;
