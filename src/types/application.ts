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
  videoUrl?: string;
  country?: string;
  nationality?: string;
  graduationYear?: string;
  preparatoryClasses?: string;
  studentSocieties?: string;
  buildingCompany?: string;
  companyContext?: string;
  websiteUrl?: string;
  xUrl?: string;
  linkedinUrl?: string; // Already optional with ?
  educationLevel?: string;
  highSchool?: string;
  githubUrl?: string;
  categoryOfInterest?: string;
  hasCompetitionExperience?: string;
  competitionResults?: string[];
  competitiveProfiles?: string[];
}

export interface ApplicationUpdateFunctions {
  updateApplicationStatus: (id: string, newStatus: string) => Promise<void>;
  toggleFlagApplication: (id: string) => Promise<void>;
}
