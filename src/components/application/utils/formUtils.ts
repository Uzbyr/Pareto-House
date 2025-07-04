// University data organized by country
export const universities = {
  "United States": [
    "MIT",
    "Harvard",
    "Stanford",
    "Berkeley",
    "Columbia",
    "Princeton",
    "UPenn",
    "Caltech",
  ],
  "United Kingdom": ["Cambridge University", "Oxford University"],
  France: ["HEC", "ENS", "ESSEC", "Polytechnique", "Centrale Supélec"],
  Germany: ["TU Munich", "KIT"],
  Ireland: ["Trinity Dublin"],
  Israel: ["Technion"],
  Canada: ["McGill University"],
};

// Check if the selected university requires preparatory class question
export const requiresPreparatoryQuestion = (university: string): boolean => {
  const frenchUniversities = [
    "HEC",
    "ENS",
    "ESSEC",
    "Polytechnique",
    "Centrale Supélec",
  ];
  return frenchUniversities.includes(university);
};

// Email validation
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// URL validation (for social media profiles)
export const validateUrl = (url: string): boolean => {
  // Basic URL validation that requires https:// protocol
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "https:";
  } catch {
    return false;
  }
};

// LinkedIn URL validation
export const validateLinkedInUrl = (url: string): boolean => {
  if (!validateUrl(url)) return false;

  // Check if it's a LinkedIn URL (contains linkedin.com)
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("linkedin.com");
  } catch {
    return false;
  }
};

// GitHub URL validation
export const validateGitHubUrl = (url: string): boolean => {
  if (!validateUrl(url)) return false;

  // Check if it's a GitHub URL (contains github.com)
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes("github.com");
  } catch {
    return false;
  }
};

// List of countries
export const countries = [...Object.keys(universities), "Other"];

// Initial form data
export const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  otherCountry: "",
  nationality: "",
  currentSituation: "",
  educationBackground: "",
  university: "",
  otherUniversity: "",
  highSchool: "",
  graduateSchool: "",
  graduateProgram: "",
  otherEducation: "",
  major: "",
  graduationYear: "",
  preparatoryClasses: "",
  projects: "",
  buildingCompany: "no",
  companyContext: "",
  resumeFile: null as File | null,
  deckFile: null as File | null,
  memoFile: null as File | null,
  websiteUrl: "",
  videoUrl: "",
  linkedInUrl: "",
  githubUrl: "",
  xUrl: "",
  categoryOfInterest: "",
  hasCompetitionExperience: "",
  competitionResults: "",
  competitiveProfiles: [] as string[],
};

export type FormDataType = typeof initialFormData;
