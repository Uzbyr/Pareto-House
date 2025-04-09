
import { useCallback } from "react";
import { FormDataType } from "../utils/formUtils";

interface UseCompetitiveProfilesProps {
  setFormData: (updater: (prev: FormDataType) => FormDataType) => void;
}

/**
 * Hook to manage competitive profiles operations
 */
const useCompetitiveProfiles = ({
  setFormData
}: UseCompetitiveProfilesProps) => {
  
  const handleCompetitiveProfileAdd = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      competitiveProfiles: [...prev.competitiveProfiles, ""],
    }));
  }, [setFormData]);

  const handleCompetitiveProfileChange = useCallback(
    (index: number, value: string) => {
      setFormData((prev) => {
        const newProfiles = [...prev.competitiveProfiles];
        newProfiles[index] = value;
        return {
          ...prev,
          competitiveProfiles: newProfiles,
        };
      });
    },
    [setFormData]
  );

  const handleCompetitiveProfileRemove = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      competitiveProfiles: prev.competitiveProfiles.filter(
        (_, i) => i !== index,
      ),
    }));
  }, [setFormData]);

  return {
    handleCompetitiveProfileAdd,
    handleCompetitiveProfileChange,
    handleCompetitiveProfileRemove
  };
};

export default useCompetitiveProfiles;
