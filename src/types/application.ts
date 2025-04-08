
export interface Application {
  id: string;
  name: string;
  email: string;
  school: string;
  major?: string;
  submissionDate: string;
  status: string;
  flagged?: boolean;
  resumeFile?: string;
  deckFile?: string;
  memoFile?: string;
  videoUrl: string; // No longer optional (removed ? mark)
  country?: string;
  nationality?: string;
  graduationYear?: string;
  preparatoryClasses?: string;
  studentSocieties?: string;
  buildingCompany?: string;
  companyContext?: string;
  websiteUrl?: string;
  xUrl?: string;
  linkedinUrl?: string;
  educationLevel?: string;
  highSchool?: string;
  githubUrl?: string;
  categoryOfInterest?: string;
  hasCompetitionExperience?: string;
  competitionResults?: string;
  competitiveProfiles?: string[];
  userRole?: "fellow" | "alumni" | "admin"; // Add the new user role field
}

export interface ApplicationUpdateFunctions {
  updateApplicationStatus: (id: string, newStatus: string) => Promise<void>;
  toggleFlagApplication: (id: string) => Promise<void>;
}
