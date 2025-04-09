import React, { createContext, useContext, useState } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OnboardingFormData {
  first_name: string;
  last_name: string;
  university: string;
  otherUniversity?: string;
  major: string;
  graduation_year: string;
  country: string;
  nationality: string;
  website_url: string;
  linkedin_url: string;
  github_url: string;
  x_url: string;
  profile_picture_url: string;
  education_level?: string;
  high_school?: string;
  category_of_interest?: string;
  has_competition_experience?: string;
  competition_results?: string;
  student_societies?: string;
  preparatory_classes?: string;
  competitive_profiles: string[];
}

interface OnboardingContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  profilePicture: File | null;
  setProfilePicture: React.Dispatch<React.SetStateAction<File | null>>;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleCompetitiveProfileAdd: () => void;
  handleCompetitiveProfileChange: (index: number, value: string) => void;
  handleCompetitiveProfileRemove: (index: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { profile, updateProfile, completeOnboarding } = useProfile();
  const { user, session } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    university: profile?.university || "",
    otherUniversity: "",
    major: profile?.major || "",
    graduation_year: profile?.graduation_year || "",
    country: profile?.country || "",
    nationality: profile?.nationality || "",
    website_url: profile?.website_url || "",
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
  });
  
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const handleCompetitiveProfileAdd = () => {
    setFormData((prev) => ({
      ...prev,
      competitive_profiles: [...prev.competitive_profiles, ""],
    }));
  };

  const handleCompetitiveProfileChange = (index: number, value: string) => {
    const updatedProfiles = [...formData.competitive_profiles];
    updatedProfiles[index] = value;
    setFormData((prev) => ({
      ...prev,
      competitive_profiles: updatedProfiles,
    }));
  };

  const handleCompetitiveProfileRemove = (index: number) => {
    const updatedProfiles = [...formData.competitive_profiles];
    updatedProfiles.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      competitive_profiles: updatedProfiles,
    }));
  };

  const uploadProfilePicture = async (): Promise<string | null> => {
    if (!profilePicture || !session) return null;

    try {
      const fileExtension = profilePicture.name.split(".").pop() || "";
      const filePath = `users/${session.user.id}/${Date.now()}.${fileExtension}`;

      const { error: uploadError, data } = await supabase.storage
        .from("profiles")
        .upload(filePath, profilePicture);

      if (uploadError) {
        toast.error("Failed to upload profile picture");
        console.error("Error uploading file:", uploadError);
        return null;
      }

      const { data: urlData } = supabase.storage
        .from("profiles")
        .getPublicUrl(filePath);
      return urlData.publicUrl;
    } catch (error) {
      console.error("Error in profile picture upload:", error);
      return null;
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.first_name || !formData.last_name) {
        toast.error("Please provide your first and last name");
        return;
      }
    } else if (step === 2) {
      if (formData.education_level === "university") {
        if (!formData.university || !formData.major || !formData.graduation_year) {
          toast.error("Please fill in all required university fields");
          return;
        }
        
        if (formData.university === "Other" && !formData.otherUniversity) {
          toast.error("Please specify your university");
          return;
        }
      } else if (formData.education_level === "highSchool") {
        if (!formData.high_school || !formData.graduation_year) {
          toast.error("Please fill in all required high school fields");
          return;
        }
      }
    }
    
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let pictureUrl = formData.profile_picture_url;
      if (profilePicture) {
        const uploadedUrl = await uploadProfilePicture();
        if (uploadedUrl) {
          pictureUrl = uploadedUrl;
        }
      }

      const dataToUpdate: any = {
        ...formData,
        profile_picture_url: pictureUrl,
      };
      
      if (formData.university === "Other" && formData.otherUniversity) {
        dataToUpdate.university = formData.otherUniversity;
      }

      await updateProfile(dataToUpdate);
      await completeOnboarding();

      toast.success("Onboarding completed successfully!");

      if (user?.role === "fellow") {
        navigate("/fellowship");
      } else if (user?.role === "alumni") {
        navigate("/alumni");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting onboarding:", error);
      toast.error("There was an error completing your onboarding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        step,
        setStep,
        formData,
        setFormData,
        profilePicture,
        setProfilePicture,
        loading,
        handleInputChange,
        handleSelectChange,
        handleFileChange,
        handleNextStep,
        handlePrevStep,
        handleSubmit,
        handleCompetitiveProfileAdd,
        handleCompetitiveProfileChange,
        handleCompetitiveProfileRemove
      }}
    >
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
