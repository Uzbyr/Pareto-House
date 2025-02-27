
export interface Application {
  id: number;
  name: string;
  email: string;
  school: string;
  major?: string;
  resumeUrl?: string;
  videoUrl?: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
  firstName?: string;
  lastName?: string;
  graduationYear?: string;
  interests?: string;
  preparatoryClasses?: string;
  referral?: string;
}
