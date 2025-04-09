
import { useState } from "react";
import useFormCore from "./useFormCore";
import useUniversityData from "./useUniversityData";
import useStepNavigation from "./useStepNavigation";
import useCompetitiveProfiles from "./useCompetitiveProfiles";
import useFormSubmission from "./useFormSubmission";
import useCountryEffects from "./useCountryEffects";

interface UseApplicationFormProps {
  onSubmitSuccess?: () => void;
}

/**
 * Main hook that composes all other hooks for application form functionality
 */
const useApplicationForm = ({ onSubmitSuccess }: UseApplicationFormProps = {}) => {
  // Core form state and handlers
  const {
    currentStep,
    setCurrentStep,
    loading,
    setLoading,
    formData,
    setFormData,
    isFormDirty,
    handleInputChange,
    handleSelectChange,
    handleFileChange,
    goToHomepage
  } = useFormCore({ onSubmitSuccess });

  // Country-related side effects
  useCountryEffects({ formData, setFormData });

  // University data based on country
  const { availableUniversities, checkPreparatoryQuestion } = useUniversityData(formData.country);

  // Step navigation with validation
  const { nextStep, prevStep } = useStepNavigation({
    formData,
    currentStep,
    setCurrentStep,
    checkPreparatoryQuestion: () => checkPreparatoryQuestion(formData.university)
  });

  // Competitive profiles management
  const {
    handleCompetitiveProfileAdd,
    handleCompetitiveProfileChange,
    handleCompetitiveProfileRemove
  } = useCompetitiveProfiles({ setFormData });

  // Form submission
  const { handleSubmit } = useFormSubmission({
    formData,
    setLoading,
    setCurrentStep,
    onSubmitSuccess,
    checkPreparatoryQuestion: () => checkPreparatoryQuestion(formData.university)
  });

  return {
    currentStep,
    loading,
    formData,
    isFormDirty,
    availableUniversities,
    handleInputChange,
    handleSelectChange,
    handleFileChange,
    nextStep,
    prevStep,
    handleSubmit,
    goToHomepage,
    checkPreparatoryQuestion: () => checkPreparatoryQuestion(formData.university),
    handleCompetitiveProfileAdd,
    handleCompetitiveProfileChange,
    handleCompetitiveProfileRemove,
  };
};

export default useApplicationForm;
