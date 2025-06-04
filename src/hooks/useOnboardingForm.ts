import { useState } from "react";
import { OnboardingFormData } from "@/types/onboarding";
import { uploadProfilePicture } from "@/utils/fileUpload";
import { useProfile } from "@/contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useOnboardingForm = (initialData: OnboardingFormData) => {
  const { profile, updateProfile, completeOnboarding } = useProfile();
  const { user, session } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<OnboardingFormData>(initialData);
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

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.first_name || !formData.last_name) {
        toast.error("Please provide your first and last name");
        return;
      }
      
      // Add validation for the about field
      if (!formData.about || formData.about.length < 100) {
        toast.error("Please provide a detailed description about yourself (minimum 100 characters)");
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
      if (profilePicture && session) {
        const uploadedUrl = await uploadProfilePicture(profilePicture, session.user.id);
        if (uploadedUrl) {
          pictureUrl = uploadedUrl;
        }
      }

      // Prepare data for update, excluding the otherUniversity field
      const dataToUpdate: any = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        major: formData.major,
        graduation_year: formData.graduation_year,
        country: formData.country,
        nationality: formData.nationality,
        video_url: formData.video_url,
        linkedin_url: formData.linkedin_url,
        github_url: formData.github_url,
        x_url: formData.x_url,
        profile_picture_url: pictureUrl,
        education_level: formData.education_level,
        high_school: formData.high_school,
        category_of_interest: formData.category_of_interest,
        has_competition_experience: formData.has_competition_experience,
        competition_results: formData.competition_results,
        student_societies: formData.student_societies,
        preparatory_classes: formData.preparatory_classes,
        competitive_profiles: formData.competitive_profiles,
        about: formData.about, // Include the about field in the update
      };
      
      // Handle university field separately
      if (formData.university === "Other" && formData.otherUniversity) {
        dataToUpdate.university = formData.otherUniversity;
      } else {
        dataToUpdate.university = formData.university;
      }

      await updateProfile(dataToUpdate);
      await completeOnboarding();

      toast.success("Onboarding completed successfully!");

      if (user?.role === "fellow") {
        navigate("/house");
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

  return {
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
  };
};
