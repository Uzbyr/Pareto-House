
import { Button } from "@/components/ui/button";
import PersonalInformationStep from "./application/form-steps/PersonalInformationStep";
import EducationalBackgroundStep from "./application/form-steps/EducationalBackgroundStep";
import AdditionalInformationStep from "./application/form-steps/AdditionalInformationStep";
import SuccessStep from "./application/form-steps/SuccessStep";
import ApplicationProgress from "./application/form-steps/ApplicationProgress";
import useApplicationForm from "./application/hooks/useApplicationForm";
import { useEffect } from "react";

interface ApplicationFormProps {
  onSubmitSuccess?: () => void;
  onFormChange?: (isDirty: boolean) => void;
}

const ApplicationForm = ({ onSubmitSuccess, onFormChange }: ApplicationFormProps) => {
  const {
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
    checkPreparatoryQuestion
  } = useApplicationForm({ onSubmitSuccess });

  // Report form dirty state changes to parent component
  useEffect(() => {
    if (onFormChange && currentStep < 4) {
      onFormChange(isFormDirty);
    }
  }, [isFormDirty, onFormChange, currentStep]);

  // Reset form dirty state when form is completed
  useEffect(() => {
    if (onFormChange && currentStep === 4) {
      onFormChange(false);
    }
  }, [currentStep, onFormChange]);

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: 
        return <PersonalInformationStep 
                 formData={formData} 
                 handleInputChange={handleInputChange} 
                 handleSelectChange={handleSelectChange} 
               />;
      case 2: 
        return <EducationalBackgroundStep 
                 formData={formData} 
                 handleInputChange={handleInputChange} 
                 handleSelectChange={handleSelectChange} 
                 handleFileChange={handleFileChange}
                 availableUniversities={availableUniversities}
                 requiresPreparatoryQuestion={checkPreparatoryQuestion}
               />;
      case 3: 
        return <AdditionalInformationStep 
                 formData={formData} 
                 handleInputChange={handleInputChange} 
                 handleSelectChange={handleSelectChange} 
                 handleFileChange={handleFileChange}
               />;
      case 4: 
        return <SuccessStep onReturnHome={goToHomepage} />;
      default: 
        return null;
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 shadow-lg">
      {currentStep < 4 && <ApplicationProgress currentStep={currentStep} />}

      {currentStep <= 3 ? (
        <form onSubmit={handleSubmit}>
          <div key={`step-${currentStep}`}>{renderStepContent()}</div>

          <div className="flex justify-between pt-4 mt-6">
            {currentStep > 1 && (
              <Button
                key="prev-step-button"
                type="button"
                onClick={prevStep}
                variant="outline"
                className="border-zinc-700 hover:bg-zinc-800"
              >
                Previous
              </Button>
            )}
            
            {currentStep < 3 ? (
              <Button
                key="next-step-button"
                type="button"
                onClick={nextStep}
                className="bg-pareto-pink hover:bg-pareto-pink/90 text-black ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button
                key="submit-button"
                type="submit"
                className="bg-pareto-pink hover:bg-pareto-pink/90 text-black ml-auto"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </form>
      ) : (
        <div key="success-step">{renderStepContent()}</div>
      )}
    </div>
  );
};

export default ApplicationForm;
