
import { useState, useEffect, useCallback } from "react";
import { FormDataType, initialFormData } from "../utils/formUtils";

interface UseFormCoreProps {
  onSubmitSuccess?: () => void;
}

/**
 * Core form state management hook that handles the basic form state
 */
const useFormCore = ({ onSubmitSuccess }: UseFormCoreProps = {}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [isFormDirty, setIsFormDirty] = useState(false);
  
  // Track if form is dirty based on changes to formData
  useEffect(() => {
    const isDirty = Object.entries(formData).some(([key, value]) => {
      if (key === "resumeFile" || key === "deckFile" || key === "memoFile") {
        return false;
      }

      if (typeof value === "string") {
        return (
          value !== "" && value !== initialFormData[key as keyof FormDataType]
        );
      }

      return !!value;
    });

    const hasFiles =
      !!formData.resumeFile || !!formData.deckFile || !!formData.memoFile;

    setIsFormDirty(isDirty || hasFiles);
  }, [formData]);
  
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
      if (e.target.files && e.target.files[0]) {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: e.target.files?.[0] || null,
        }));
      }
    },
    []
  );

  const goToHomepage = useCallback(() => {
    window.location.href = "/";
  }, []);
  
  return {
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
    goToHomepage,
    onSubmitSuccess
  };
};

export default useFormCore;
