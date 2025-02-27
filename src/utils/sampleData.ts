
import { Application } from '../types/application';
import { getStoredApplications, storeApplications } from './localStorage';

// Create sample applications for testing if none exist
export const createSampleApplicationsIfNeeded = (): void => {
  const applications = getStoredApplications();
  if (applications.length === 0) {
    const sampleApplications: Application[] = [
      {
        id: 1,
        name: "Jane Smith",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@university.edu",
        school: "Stanford University",
        major: "Computer Science",
        graduationYear: "2025",
        interests: "Machine Learning, Blockchain",
        preparatoryClasses: "yes",
        referral: "Friend",
        resumeUrl: "https://example.com/resume1.pdf",
        videoUrl: "https://example.com/video1.mp4",
        submissionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: "approved"
      },
      {
        id: 2,
        name: "John Doe",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@college.edu",
        school: "MIT",
        major: "Data Science",
        graduationYear: "2024",
        interests: "AI, Quantum Computing",
        preparatoryClasses: "no",
        resumeUrl: "https://example.com/resume2.pdf",
        videoUrl: "https://example.com/video2.mp4",
        submissionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: "pending"
      },
      {
        id: 3,
        name: "Alice Johnson",
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@university.edu",
        school: "Harvard University",
        major: "Economics",
        graduationYear: "2026",
        interests: "Fintech, Cryptocurrencies",
        preparatoryClasses: "yes",
        referral: "Social Media",
        resumeUrl: "https://example.com/resume3.pdf",
        videoUrl: "https://example.com/video3.mp4",
        submissionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: "rejected"
      }
    ];
    storeApplications(sampleApplications);
    console.log("Created sample applications for testing");
  }
};
