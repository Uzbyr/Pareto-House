
export interface OnboardingFormData {
  first_name: string;
  last_name: string;
  university: string;
  otherUniversity?: string;
  major: string;
  graduation_year: string;
  country: string;
  nationality: string;
  video_url: string;
  linkedin_url: string;
  github_url: string;
  x_url: string;
  profile_picture_url: string;
  education_level?: string;
  high_school?: string;
  category_of_interest?: string;
  has_competition_experience?: string;
  competition_results?: string;
  student_societies?: string;
  preparatory_classes?: string;
  competitive_profiles: string[];
}

export interface OnboardingContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  profilePicture: File | null;
  setProfilePicture: React.Dispatch<React.SetStateAction<File | null>>;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleCompetitiveProfileAdd: () => void;
  handleCompetitiveProfileChange: (index: number, value: string) => void;
  handleCompetitiveProfileRemove: (index: number) => void;
}
