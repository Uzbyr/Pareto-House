
import { useState, useEffect } from "react";
import { universities } from "../utils/formUtils";

/**
 * Hook to manage university data and list availability based on country selection
 */
const useUniversityData = (country: string) => {
  const [availableUniversities, setAvailableUniversities] = useState<string[]>([]);

  // Update available universities when country changes
  useEffect(() => {
    if (country === "Other") {
      setAvailableUniversities(["Other"]);
      return;
    }
    
    if (country && universities[country as keyof typeof universities]) {
      const countryUniversities =
        universities[country as keyof typeof universities];
      setAvailableUniversities([...countryUniversities, "Other"]);
    } else {
      setAvailableUniversities(["Other"]);
    }
  }, [country]);

  // Helper to determine if preparatory question is needed
  const checkPreparatoryQuestion = (university: string): boolean => {
    const frenchUniversities = [
      "HEC",
      "ENS",
      "ESSEC",
      "Polytechnique",
      "Centrale Supélec",
    ];
    return frenchUniversities.includes(university);
  };

  return {
    availableUniversities,
    checkPreparatoryQuestion,
  };
};

export default useUniversityData;
