
import React, { createContext, useContext } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { OnboardingContextType, OnboardingFormData } from "@/types/onboarding";
import { useOnboardingForm } from "@/hooks/useOnboardingForm";

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useProfile();

  // Initialize form data from profile
  const initialFormData: OnboardingFormData = {
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    university: profile?.university || "",
    otherUniversity: "",
    major: profile?.major || "",
    graduation_year: profile?.graduation_year || "",
    country: profile?.country || "",
    nationality: profile?.nationality || "",
    video_url: profile?.video_url || "",
    linkedin_url: profile?.linkedin_url || "",
    github_url: profile?.github_url || "",
    x_url: profile?.x_url || "",
    profile_picture_url: profile?.profile_picture_url || "",
    education_level: profile?.education_level || "university",
    high_school: profile?.high_school || "",
    category_of_interest: profile?.category_of_interest || "",
    has_competition_experience: profile?.has_competition_experience || "",
    competition_results: profile?.competition_results || "",
    student_societies: profile?.student_societies || "",
    preparatory_classes: profile?.preparatory_classes || "",
    competitive_profiles: profile?.competitive_profiles || [],
  };

  // Use our custom hook for form handling
  const onboardingForm = useOnboardingForm(initialFormData);

  return (
    <OnboardingContext.Provider value={onboardingForm}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
