
import { useState, useMemo } from "react";

// University data for the onboarding process
const commonUniversities = [
  "MIT",
  "Stanford",
  "Harvard",
  "Oxford",
  "Cambridge",
  "ETH Zurich",
  "Polytechnique",
  "ENS",
  "HEC",
  "ESSEC",
  "Centrale Supélec",
  "Other"
];

// Helper function to check if preparatory question is needed
const requiresPreparatoryQuestion = (university: string): boolean => {
  const frenchUniversities = [
    "HEC",
    "ENS",
    "ESSEC",
    "Polytechnique",
    "Centrale Supélec",
  ];
  return frenchUniversities.includes(university);
};

export const useUniversityData = () => {
  // Get list of universities
  const universities = useMemo(() => {
    return commonUniversities;
  }, []);

  // Check if the university requires preparatory question
  const checkPreparatoryQuestion = (university: string): boolean => {
    return requiresPreparatoryQuestion(university);
  };

  return {
    universities,
    checkPreparatoryQuestion,
  };
};
