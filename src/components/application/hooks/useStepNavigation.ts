
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
      if (
        !formData.country ||
        !formData.nationality ||
        !formData.graduationYear
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }

      if (formData.educationLevel === "university") {
        if (!formData.university || !formData.major) {
          toast.error("Please fill in all required fields.");
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
      } else if (formData.educationLevel === "highSchool") {
        if (!formData.highSchool) {
          toast.error("Please enter your high school name.");
          return;
        }
      }
    }

    setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  }, [currentStep, formData, setCurrentStep, checkPreparatoryQuestion]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  }, [setCurrentStep]);

  return {
    nextStep,
    prevStep
  };
};

export default useStepNavigation;
