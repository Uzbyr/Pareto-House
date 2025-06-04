import { useCallback } from "react";
import { toast } from "sonner";
import { FormDataType } from "../utils/formUtils";
import { validateEmail } from "../utils/formUtils";

interface UseStepNavigationProps {
  formData: FormDataType;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  checkPreparatoryQuestion: () => boolean;
}

/**
 * Hook to manage step navigation with validation
 */
const useStepNavigation = ({
  formData,
  currentStep,
  setCurrentStep,
  checkPreparatoryQuestion
}: UseStepNavigationProps) => {
  
  const nextStep = useCallback(() => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast.error("Please fill in all required fields.");
        return;
      }
      if (!validateEmail(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (!formData.country) {
        toast.error("Please select your country of residence.");
        return;
      }
      if (formData.country === "Other" && !formData.otherCountry) {
        toast.error("Please specify your country of residence.");
        return;
      }
      if (!formData.nationality) {
        toast.error("Please select your nationality.");
        return;
      }
    } else if (currentStep === 2) {
      // Check basic required fields
      if (!formData.currentSituation) {
        toast.error("Please select your current situation.");
        return;
      }
      
      if (!formData.educationBackground) {
        toast.error("Please select your education background.");
        return;
      }
      
      if (!formData.graduationYear) {
        toast.error("Please select your graduation year.");
        return;
      }

      // Check education-specific required fields
      if (formData.educationBackground === "university") {
        if (!formData.university || !formData.major) {
          toast.error("Please fill in your university and major.");
          return;
        }

        if (formData.university === "Other" && !formData.otherUniversity) {
          toast.error("Please specify your university.");
          return;
        }

        if (checkPreparatoryQuestion() && !formData.preparatoryClasses) {
          toast.error("Please answer the preparatory classes question.");
          return;
        }
      } else if (formData.educationBackground === "highSchool") {
        if (!formData.highSchool) {
          toast.error("Please enter your high school name.");
          return;
        }
      } else if (formData.educationBackground === "graduateSchool") {
        if (!formData.graduateSchool || !formData.graduateProgram) {
          toast.error("Please fill in your graduate school and program.");
          return;
        }
      } else if (formData.educationBackground === "other") {
        if (!formData.otherEducation) {
          toast.error("Please specify your education background.");
          return;
        }
      }

      // Check mandatory fields
      if (!formData.categoryOfInterest) {
        toast.error("Please select your category of interest.");
        return;
      }

      if (!formData.projects || formData.projects.trim() === "") {
        toast.error("Please describe your projects, startups, or research.");
        return;
      }

      if (!formData.resumeFile) {
        toast.error("Please upload your resume (PDF).");
        return;
      }
    }

    // Fix: Pass the direct next step number instead of a function
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  }, [currentStep, formData, setCurrentStep, checkPreparatoryQuestion]);

  const prevStep = useCallback(() => {
    // Fix: Pass the direct previous step number instead of a function
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  }, [setCurrentStep, currentStep]);

  return {
    nextStep,
    prevStep
  };
};

export default useStepNavigation;
