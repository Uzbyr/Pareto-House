
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

        const applicationData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          country: countryValue,
          nationality: formData.nationality,
          education_level: formData.educationLevel,
          university:
            formData.educationLevel === "university" ? universityValue : null,
          high_school:
            formData.educationLevel === "highSchool"
              ? formData.highSchool
              : null,
          major:
            formData.educationLevel === "university" ? formData.major : null,
          graduation_year: formData.graduationYear,
          preparatory_classes:
            formData.educationLevel === "university" &&
            checkPreparatoryQuestion()
              ? formData.preparatoryClasses
              : null,
          student_societies: formData.studentSocieties || null,
          building_company: formData.buildingCompany,
          company_context:
            formData.buildingCompany === "yes" ? formData.companyContext : null,
          website_url:
            formData.buildingCompany === "yes" ? formData.websiteUrl : null,
          video_url: formData.videoUrl || null,
          linkedin_url: formData.linkedInUrl || null,
          github_url: formData.githubUrl || null,
          x_url: formData.xUrl || null,
          resume_file: resumeFilePath,
          deck_file: deckFilePath,
          memo_file: memoFilePath,
          category_of_interest: formData.categoryOfInterest || null,
          has_competition_experience: formData.hasCompetitionExperience || null,
          competition_results:
            formData.hasCompetitionExperience === "yes"
              ? formData.competitionResults
              : null,
          competitive_profiles: formData.competitiveProfiles.filter(
            (url) => url.trim() !== "",
          ),
        };

        const { error } = await supabase
          .from("applications")
          .insert([applicationData]);

        if (error) {
          console.error("Error submitting application:", error);
          throw new Error(error.message);
        }

        const newApplication = {
          id: Date.now(),
          name: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          country: countryValue,
          nationality: formData.nationality,
          educationLevel: formData.educationLevel,
          university:
            formData.educationLevel === "university" ? universityValue : "N/A",
          highSchool:
            formData.educationLevel === "highSchool"
              ? formData.highSchool
              : "N/A",
          major:
            formData.educationLevel === "university" ? formData.major : "N/A",
          graduationYear: formData.graduationYear,
          studentSocieties: formData.studentSocieties || "",
          preparatoryClasses:
            formData.educationLevel === "university" &&
            checkPreparatoryQuestion()
              ? formData.preparatoryClasses
              : "n/a",
          buildingCompany: formData.buildingCompany,
          companyContext:
            formData.buildingCompany === "yes" ? formData.companyContext : "",
          resumeFile:
            resumeFilePath ||
            (formData.resumeFile ? formData.resumeFile.name : ""),
          deckFile:
            deckFilePath || (formData.deckFile ? formData.deckFile.name : ""),
          memoFile:
            memoFilePath || (formData.memoFile ? formData.memoFile.name : ""),
          websiteUrl:
            formData.buildingCompany === "yes" ? formData.websiteUrl : "",
          videoUrl: formData.videoUrl || "",
          linkedInUrl: formData.linkedInUrl || "",
          githubUrl: formData.githubUrl || "",
          xUrl: formData.xUrl || "",
          categoryOfInterest: formData.categoryOfInterest || "",
          hasCompetitionExperience: formData.hasCompetitionExperience || "",
          competitionResults:
            formData.hasCompetitionExperience === "yes"
              ? formData.competitionResults
              : "",
          competitiveProfiles: formData.competitiveProfiles.filter(
            (url) => url.trim() !== "",
          ),
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
