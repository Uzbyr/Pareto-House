
// University data organized by country
export const universities = {
  "United States": [
    "Harvard",
    "Stanford",
    "Berkeley", 
    "Columbia",
    "Princeton",
    "UPenn",
    "Caltech"
  ],
  "United Kingdom": [
    "Cambridge University",
    "Oxford University"
  ],
  "France": [
    "HEC",
    "ENS",
    "ESSEC",
    "Polytechnique",
    "Centrale Supélec"
  ],
  "Germany": [
    "TU Munich",
    "KIT"
  ],
  "Ireland": [
    "Trinity Dublin"
  ],
  "Israel": [
    "Technion"
  ],
  "Canada": [
    "McGill University"
  ]
};

// Check if the selected university requires preparatory class question
export const requiresPreparatoryQuestion = (university: string): boolean => {
  const frenchUniversities = ["HEC", "ENS", "ESSEC", "Polytechnique", "Centrale Supélec"];
  return frenchUniversities.includes(university);
};

// Email validation
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// List of countries
export const countries = Object.keys(universities);

// Initial form data
export const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  nationality: "",
  university: "",
  otherUniversity: "",
  major: "",
  graduationYear: "",
  preparatoryClasses: "",
  studentSocieties: "",
  buildingCompany: "no",
  companyContext: "",
  resumeFile: null as File | null,
  deckFile: null as File | null,
  memoFile: null as File | null,
  websiteUrl: "",
  videoUrl: "",
};

export type FormDataType = typeof initialFormData;
