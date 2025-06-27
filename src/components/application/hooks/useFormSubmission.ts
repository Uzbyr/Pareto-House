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
      console.log("Starting application submission...");

      // Test Supabase connection
      try {
        const { data: testData, error: testError } = await supabase
          .from("houseapplications" as any)
          .select("id")
          .limit(1);
        
        if (testError) {
          console.error("Supabase connection test failed:", testError);
          throw new Error(`Supabase connection failed: ${testError.message}`);
        }
        console.log("Supabase connection test successful");
      } catch (connectionError) {
        console.error("Connection test error:", connectionError);
        throw connectionError;
      }

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

        console.log("Validation passed, processing form data...");

        let universityValue = "";
        if (formData.educationBackground === "university") {
          universityValue =
            formData.university === "Other"
              ? formData.otherUniversity
              : formData.university;
        }

        const countryValue =
          formData.country === "Other"
            ? formData.otherCountry
            : formData.country;

        console.log("Processing file uploads...");
        let resumeFilePath = null;
        let deckFilePath = null;
        let memoFilePath = null;

        // Make file uploads optional - if they fail, continue without them
        if (formData.resumeFile) {
          try {
            console.log("Uploading resume file...");
            resumeFilePath = await uploadFile(formData.resumeFile, "resumes");
            console.log("Resume uploaded:", resumeFilePath);
          } catch (fileError) {
            console.warn("Resume upload failed, continuing without it:", fileError);
            resumeFilePath = null;
          }
        }

        if (formData.deckFile) {
          try {
            console.log("Uploading deck file...");
            deckFilePath = await uploadFile(formData.deckFile, "decks");
            console.log("Deck uploaded:", deckFilePath);
          } catch (fileError) {
            console.warn("Deck upload failed, continuing without it:", fileError);
            deckFilePath = null;
          }
        }

        if (formData.memoFile) {
          try {
            console.log("Uploading memo file...");
            memoFilePath = await uploadFile(formData.memoFile, "memos");
            console.log("Memo uploaded:", memoFilePath);
          } catch (fileError) {
            console.warn("Memo upload failed, continuing without it:", fileError);
            memoFilePath = null;
          }
        }

        console.log("Building application data...");
        // Build the application data for the new 'houseapplications' table
        // Start with minimal fields to test what columns exist
        const applicationData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          category_of_interest: formData.categoryOfInterest || '',
          projects: formData.projects || '',
          resume_url: resumeFilePath || '',
          // Add other fields one by one to test
        };

        console.log("Attempting to insert application data:", applicationData);

        try {
          const { data, error } = await supabase
            .from("houseapplications" as any)
            .insert([applicationData])
            .select();

          if (error) {
            console.error("Supabase insert error:", error);
            console.error("Error details:", {
              message: error.message,
              details: error.details,
              hint: error.hint,
              code: error.code
            });
            throw new Error(`Failed to save application to database: ${error.message}`);
          }

          console.log("Application saved successfully:", data);
        } catch (dbError) {
          console.error("Database error:", dbError);
          throw dbError;
        }

        console.log("Saving to localStorage...");
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
          about: '',
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

        console.log("Sending confirmation email...");
        try {
          // Send confirmation email
          await sendConfirmationEmail(
            formData.firstName,
            formData.lastName,
            formData.email,
          );
          console.log("Confirmation email sent successfully");
        } catch (emailError) {
          console.error("Email sending error:", emailError);
          // Don't throw here, as the application was saved successfully
        }

        console.log("Application submission completed successfully");
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
