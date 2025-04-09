
import { useEffect } from "react";
import { FormDataType } from "../utils/formUtils";

interface UseCountryEffectsProps {
  formData: FormDataType;
  setFormData: (updater: (prev: FormDataType) => FormDataType) => void;
}

/**
 * Hook to handle side effects when country changes
 */
const useCountryEffects = ({
  formData,
  setFormData
}: UseCountryEffectsProps) => {
  // When country changes to Other, set university to Other
  useEffect(() => {
    if (formData.country === "Other") {
      setFormData((prev) => ({
        ...prev,
        university: "Other",
      }));
    }
  }, [formData.country, setFormData]);
  
  return {};
};

export default useCountryEffects;
