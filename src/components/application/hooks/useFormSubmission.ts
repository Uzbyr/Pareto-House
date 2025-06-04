import { useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FormDataType } from "../utils/formUtils";
import { validateLinkedInUrl } from "../utils/formUtils";
import useFileUpload from "./useFileUpload";
import useEmailNotification from "./useEmailNotification";

interface UseFormSubmissionProps {
  formData: FormDataType;
  setLoading: (loading: boolean) => void;
  setCurrentStep: (step: number) => void;
  onSubmitSuccess?: () => void;
  checkPreparatoryQuestion: () => boolean;
}

/**
 * Hook to handle form submission logic
 */
const useFormSubmission = ({
  formData,
  setLoading,
  setCurrentStep,
  onSubmitSuccess,
  checkPreparatoryQuestion
}: UseFormSubmissionProps) => {
  const { uploadFile } = useFileUpload();
  const { sendConfirmationEmail } = useEmailNotification();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        if (!formData.videoUrl) {
          toast.error("Please provide a video presentation URL.");
          setLoading(false);
          return;
        }

        if (
          formData.linkedInUrl &&
          !validateLinkedInUrl(formData.linkedInUrl)
        ) {
          toast.error(
            "Please enter a valid LinkedIn URL (should start with https://www.linkedin.com/).",
          );
          setLoading(false);
          return;
        }

        let universityValue = "";
        if (formData.educationLevel === "university") {
          universityValue =
            formData.university === "Other"
              ? formData.otherUniversity
              : formData.university;
        }

        const countryValue =
          formData.country === "Other"
            ? formData.otherCountry
            : formData.country;

        let resumeFilePath = null;
        let deckFilePath = null;
        let memoFilePath = null;

        if (formData.resumeFile) {
          resumeFilePath = await uploadFile(formData.resumeFile, "resumes");
        }

        if (formData.deckFile) {
          deckFilePath = await uploadFile(formData.deckFile, "decks");
        }

        if (formData.memoFile) {
          memoFilePath = await uploadFile(formData.memoFile, "memos");
        }

        // Build the application data for the new 'houseapplications' table
        const applicationData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          current_situation: formData.currentSituation,
          education_background: formData.educationBackground,
          university: formData.university,
          other_university: formData.otherUniversity,
          high_school: formData.highSchool,
          graduate_school: formData.graduateSchool,
          graduate_program: formData.graduateProgram,
          other_education: formData.otherEducation,
          major: formData.major,
          graduation_year: formData.graduationYear,
          country: countryValue,
          nationality: formData.nationality,
          category_of_interest: formData.categoryOfInterest,
          projects: formData.projects,
          resume_url: resumeFilePath, // uploaded file path
          has_competition_experience: formData.hasCompetitionExperience,
          competition_results: formData.competitionResults,
          preparatory_classes: formData.preparatoryClasses,
          about: (formData as any).about || '',
          video_url: formData.videoUrl,
          linkedin_url: formData.linkedInUrl,
          github_url: formData.githubUrl,
          x_url: formData.xUrl,
          website_url: formData.websiteUrl,
          competitive_profiles: formData.competitiveProfiles.filter((url) => url.trim() !== ""),
          // status and created_at are handled by the DB defaults
        };

        // @ts-ignore
        const { error } = await supabase
          .from("houseapplications")
          .insert([applicationData]);

        const newApplication = {
          id: Date.now(),
          name: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          country: countryValue,
          nationality: formData.nationality,
          educationBackground: formData.educationBackground,
          university: formData.university,
          otherUniversity: formData.otherUniversity,
          highSchool: formData.highSchool,
          graduateSchool: formData.graduateSchool,
          graduateProgram: formData.graduateProgram,
          otherEducation: formData.otherEducation,
          major: formData.major,
          graduationYear: formData.graduationYear,
          preparatoryClasses: formData.preparatoryClasses,
          projects: formData.projects,
          resumeFile: resumeFilePath || (formData.resumeFile ? formData.resumeFile.name : ""),
          websiteUrl: formData.websiteUrl,
          videoUrl: formData.videoUrl,
          linkedInUrl: formData.linkedInUrl,
          githubUrl: formData.githubUrl,
          xUrl: formData.xUrl,
          categoryOfInterest: formData.categoryOfInterest,
          hasCompetitionExperience: formData.hasCompetitionExperience,
          competitionResults: formData.competitionResults,
          competitiveProfiles: formData.competitiveProfiles.filter((url) => url.trim() !== ""),
          about: (formData as any).about || '',
          submissionDate: new Date().toISOString(),
          status: "pending",
        };

        const storedApps = localStorage.getItem("applications") || "[]";
        const applications = JSON.parse(storedApps);
        applications.push(newApplication);
        localStorage.setItem("applications", JSON.stringify(applications));

        const appCount = localStorage.getItem("applicationCount") || "0";
        localStorage.setItem(
          "applicationCount",
          (parseInt(appCount) + 1).toString(),
        );

        // Send confirmation email
        await sendConfirmationEmail(
          formData.firstName,
          formData.lastName,
          formData.email,
        );

        setTimeout(() => {
          setLoading(false);
          setCurrentStep(4);
          if (onSubmitSuccess) {
            onSubmitSuccess();
          }
          toast.success("Application submitted successfully!");
        }, 1500);
      } catch (error) {
        console.error("Error submitting application:", error);
        setLoading(false);
        toast.error(
          "There was an error submitting your application. Please try again.",
        );
      }
    },
    [
      formData,
      setLoading,
      setCurrentStep, 
      onSubmitSuccess, 
      checkPreparatoryQuestion, 
      uploadFile,
      sendConfirmationEmail
    ],
  );

  return { handleSubmit };
};

export default useFormSubmission;
