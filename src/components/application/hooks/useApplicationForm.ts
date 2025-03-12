
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  FormDataType, 
  initialFormData, 
  validateEmail, 
  requiresPreparatoryQuestion, 
  universities,
  validateLinkedInUrl
} from "../utils/formUtils";

interface UseApplicationFormProps {
  onSubmitSuccess?: () => void;
}

const useApplicationForm = ({ onSubmitSuccess }: UseApplicationFormProps = {}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [availableUniversities, setAvailableUniversities] = useState<string[]>([]);
  const [isFormDirty, setIsFormDirty] = useState(false);
  
  useEffect(() => {
    if (formData.country && universities[formData.country as keyof typeof universities]) {
      const countryUniversities = universities[formData.country as keyof typeof universities];
      setAvailableUniversities([...countryUniversities, "Other"]);
    } else {
      setAvailableUniversities(["Other"]);
    }
  }, [formData.country]);

  useEffect(() => {
    const isDirty = Object.entries(formData).some(([key, value]) => {
      if (key === 'resumeFile' || key === 'deckFile' || key === 'memoFile') {
        return false;
      }
      
      if (typeof value === 'string') {
        return value !== '' && value !== initialFormData[key as keyof FormDataType];
      }
      
      return !!value;
    });
    
    const hasFiles = !!formData.resumeFile || !!formData.deckFile || !!formData.memoFile;
    
    setIsFormDirty(isDirty || hasFiles);
  }, [formData]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ 
        ...prev, 
        [fieldName]: e.target.files?.[0] || null 
      }));
    }
  }, []);

  const checkPreparatoryQuestion = useCallback(() => {
    return requiresPreparatoryQuestion(formData.university);
  }, [formData.university]);

  const nextStep = useCallback(() => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast.error("Please fill in all required fields.");
        return;
      }
      if (!validateEmail(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.country || !formData.nationality || !formData.graduationYear) {
        toast.error("Please fill in all required fields.");
        return;
      }
      
      if (formData.educationLevel === "university") {
        if (!formData.university || !formData.major) {
          toast.error("Please fill in all required fields.");
          return;
        }
        
        if (formData.university === "Other" && !formData.otherUniversity) {
          toast.error("Please specify your university.");
          return;
        }
        
        if (checkPreparatoryQuestion() && !formData.preparatoryClasses) {
          toast.error("Please answer the preparatory classes question.");
          return;
        }
      } else if (formData.educationLevel === "highSchool") {
        if (!formData.highSchool) {
          toast.error("Please enter your high school name.");
          return;
        }
      }
    }

    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  }, [currentStep, formData, checkPreparatoryQuestion]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  }, []);

  const goToHomepage = useCallback(() => {
    window.location.href = "/";
  }, []);

  const uploadFile = async (file: File, path: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        throw new Error(uploadError.message);
      }
      
      return filePath;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleCompetitiveProfileAdd = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      competitiveProfiles: [...prev.competitiveProfiles, ""]
    }));
  }, []);

  const handleCompetitiveProfileChange = useCallback((index: number, value: string) => {
    setFormData(prev => {
      const newProfiles = [...prev.competitiveProfiles];
      newProfiles[index] = value;
      return {
        ...prev,
        competitiveProfiles: newProfiles
      };
    });
  }, []);

  const handleCompetitiveProfileRemove = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      competitiveProfiles: prev.competitiveProfiles.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.linkedInUrl) {
        toast.error("Please provide your LinkedIn profile URL.");
        setLoading(false);
        return;
      }

      if (!validateLinkedInUrl(formData.linkedInUrl)) {
        toast.error("Please enter a valid LinkedIn URL (should start with https://www.linkedin.com/).");
        setLoading(false);
        return;
      }

      let universityValue = "";
      if (formData.educationLevel === "university") {
        universityValue = formData.university === "Other" 
          ? formData.otherUniversity 
          : formData.university;
      }
      
      let resumeFilePath = null;
      let deckFilePath = null;
      let memoFilePath = null;
      
      if (formData.resumeFile) {
        resumeFilePath = await uploadFile(formData.resumeFile, 'resumes');
      }
      
      if (formData.deckFile) {
        deckFilePath = await uploadFile(formData.deckFile, 'decks');
      }
      
      if (formData.memoFile) {
        memoFilePath = await uploadFile(formData.memoFile, 'memos');
      }
      
      const applicationData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        country: formData.country,
        nationality: formData.nationality,
        education_level: formData.educationLevel,
        university: formData.educationLevel === "university" ? universityValue : null,
        high_school: formData.educationLevel === "highSchool" ? formData.highSchool : null,
        major: formData.educationLevel === "university" ? formData.major : null,
        graduation_year: formData.graduationYear,
        preparatory_classes: formData.educationLevel === "university" && checkPreparatoryQuestion() ? formData.preparatoryClasses : null,
        student_societies: formData.studentSocieties || null,
        building_company: formData.buildingCompany,
        company_context: formData.buildingCompany === "yes" ? formData.companyContext : null,
        website_url: formData.buildingCompany === "yes" ? formData.websiteUrl : null,
        video_url: formData.videoUrl || null,
        linkedin_url: formData.linkedInUrl,
        github_url: formData.githubUrl || null,
        x_url: formData.xUrl || null,
        resume_file: resumeFilePath,
        deck_file: deckFilePath,
        memo_file: memoFilePath,
        category_of_interest: formData.categoryOfInterest || null,
        has_competition_experience: formData.hasCompetitionExperience || null,
        competition_results: formData.hasCompetitionExperience === "yes" ? formData.competitionResults : null,
        competitive_profiles: formData.competitiveProfiles.filter(url => url.trim() !== ""),
      };

      const { error } = await supabase
        .from('applications')
        .insert([applicationData]);

      if (error) {
        console.error("Error submitting application:", error);
        throw new Error(error.message);
      }

      const newApplication = {
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
        nationality: formData.nationality,
        educationLevel: formData.educationLevel,
        university: formData.educationLevel === "university" ? universityValue : "N/A",
        highSchool: formData.educationLevel === "highSchool" ? formData.highSchool : "N/A",
        major: formData.educationLevel === "university" ? formData.major : "N/A",
        graduationYear: formData.graduationYear,
        studentSocieties: formData.studentSocieties || "",
        preparatoryClasses: formData.educationLevel === "university" && checkPreparatoryQuestion() ? formData.preparatoryClasses : "n/a",
        buildingCompany: formData.buildingCompany,
        companyContext: formData.buildingCompany === "yes" ? formData.companyContext : "",
        resumeFile: resumeFilePath || (formData.resumeFile ? formData.resumeFile.name : ""),
        deckFile: deckFilePath || (formData.deckFile ? formData.deckFile.name : ""),
        memoFile: memoFilePath || (formData.memoFile ? formData.memoFile.name : ""),
        websiteUrl: formData.buildingCompany === "yes" ? formData.websiteUrl : "",
        videoUrl: formData.videoUrl || "",
        linkedInUrl: formData.linkedInUrl,
        githubUrl: formData.githubUrl || "",
        xUrl: formData.xUrl || "",
        categoryOfInterest: formData.categoryOfInterest || "",
        hasCompetitionExperience: formData.hasCompetitionExperience || "",
        competitionResults: formData.hasCompetitionExperience === "yes" ? formData.competitionResults : "",
        competitiveProfiles: formData.competitiveProfiles.filter(url => url.trim() !== ""),
        submissionDate: new Date().toISOString(),
        status: "pending",
      };

      const storedApps = localStorage.getItem('applications') || '[]';
      const applications = JSON.parse(storedApps);
      applications.push(newApplication);
      localStorage.setItem('applications', JSON.stringify(applications));
      
      const appCount = localStorage.getItem('applicationCount') || '0';
      localStorage.setItem('applicationCount', (parseInt(appCount) + 1).toString());
      
      setTimeout(() => {
        setLoading(false);
        setCurrentStep(4);
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
        toast.success("Application submitted successfully!");
      }, 1500);
    } catch (error) {
      console.error("Error submitting application:", error);
      setLoading(false);
      toast.error("There was an error submitting your application. Please try again.");
    }
  }, [formData, onSubmitSuccess, checkPreparatoryQuestion]);

  return {
    currentStep,
    loading,
    formData,
    isFormDirty,
    availableUniversities,
    handleInputChange,
    handleSelectChange,
    handleFileChange,
    nextStep,
    prevStep,
    handleSubmit,
    goToHomepage,
    checkPreparatoryQuestion,
    handleCompetitiveProfileAdd,
    handleCompetitiveProfileChange,
    handleCompetitiveProfileRemove
  };
};

export default useApplicationForm;
