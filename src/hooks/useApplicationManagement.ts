
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Application } from "@/types/application";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

export const useApplicationManagement = () => {
  const { getApplications, refreshMetrics } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState<Application[]>([]);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const loadApplications = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('submission_date', { ascending: false });
        
      if (error) {
        console.error("Error fetching applications:", error);
        return;
      }
      
      if (data) {
        const formattedApplications = data.map((app: Tables<"applications">) => ({
          id: app.id,
          name: `${app.first_name} ${app.last_name}`,
          email: app.email,
          school: app.university,
          major: app.major,
          submissionDate: app.submission_date,
          status: app.status,
          flagged: app.flagged,
          country: app.country,
          nationality: app.nationality,
          graduationYear: app.graduation_year,
          preparatoryClasses: app.preparatory_classes,
          studentSocieties: app.student_societies,
          buildingCompany: app.building_company,
          companyContext: app.company_context,
          websiteUrl: app.website_url,
          linkedinUrl: app.linkedin_url,
          xUrl: app.x_url,
          resumeFile: app.resume_file,
          deckFile: app.deck_file,
          memoFile: app.memo_file,
          videoUrl: app.video_url,
          educationLevel: app.education_level,
          highSchool: app.high_school,
          githubUrl: app.github_url,
          categoryOfInterest: app.category_of_interest,
          hasCompetitionExperience: app.has_competition_experience,
          competitionResults: app.competition_results ? 
            (typeof app.competition_results === 'string' ? 
              JSON.parse(app.competition_results) : 
              app.competition_results) : 
            [],
          competitiveProfiles: app.competitive_profiles || []
        }));
        
        setApplications(formattedApplications);
      }
    } catch (error) {
      console.error("Error loading applications:", error);
      const fallbackData = getApplications();
      setApplications(fallbackData as unknown as Application[]);
    }
  }, [getApplications]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const refreshApplications = () => {
    setIsRefreshing(true);
    loadApplications();
    refreshMetrics();
    toast.success("Applications data refreshed");
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.major && app.major.toLowerCase().includes(searchTerm.toLowerCase()));
      
    let matchesFilter = true;
    if (statusFilter === "flagged") {
      matchesFilter = !!app.flagged;
    } else if (statusFilter) {
      matchesFilter = app.status === statusFilter;
    }
    
    return matchesSearch && matchesFilter;
  });

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Email", "School", "Major", "Submission Date", "Status", "Flagged"];
    const csvRows = [
      headers.join(","),
      ...filteredApplications.map((app) => [
        app.id,
        app.name,
        app.email,
        app.school,
        app.major || "",
        new Date(app.submissionDate).toLocaleDateString(),
        app.status,
        app.flagged ? "Yes" : "No"
      ].join(","))
    ];
    const csvString = csvRows.join("\n");
    
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "pareto_applications.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV file downloaded");
  };

  const updateApplicationStatus = async (id: string, newStatus: string) => {
    try {
      const { error: updateError } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (updateError) {
        console.error("Error updating application:", updateError);
        throw new Error(updateError.message);
      }
      
      setApplications(prev => 
        prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
      );
      
      if (selectedApplication && selectedApplication.id === id) {
        setSelectedApplication({ ...selectedApplication, status: newStatus });
      }
      
      refreshMetrics();
      
      toast.success(`Application ${id} marked as ${newStatus}`);
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Failed to update application status. Please try again.");
    }
  };

  const toggleFlagApplication = async (id: string) => {
    try {
      const app = applications.find(a => a.id === id);
      if (!app) return;
      
      const newFlaggedStatus = !app.flagged;
      
      const { error: updateError } = await supabase
        .from('applications')
        .update({ flagged: newFlaggedStatus })
        .eq('id', id);
      
      if (updateError) {
        console.error("Error updating application flag:", updateError);
        throw new Error(updateError.message);
      }
      
      setApplications(prev => 
        prev.map(a => a.id === id ? { ...a, flagged: newFlaggedStatus } : a)
      );
      
      if (selectedApplication && selectedApplication.id === id) {
        setSelectedApplication({ ...selectedApplication, flagged: newFlaggedStatus });
      }
      
      toast.success(`Application ${id} ${newFlaggedStatus ? 'flagged' : 'unflagged'}`);
    } catch (error) {
      console.error("Error toggling application flag:", error);
      toast.error("Failed to update application flag. Please try again.");
    }
  };

  const handleCheckApplication = (application: Application) => {
    setSelectedApplication(application);
    setIsDetailsOpen(true);
  };

  const handleBatchComparison = () => {
    const appsToCompare = filteredApplications.slice(0, 4);
    setSelectedApplications(appsToCompare);
    setIsBatchOpen(true);
  };

  const navigateToApplication = (direction: 'next' | 'prev') => {
    if (!selectedApplication || applications.length === 0) return;
    
    const currentIndex = applications.findIndex(app => app.id === selectedApplication.id);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % applications.length;
    } else {
      newIndex = (currentIndex - 1 + applications.length) % applications.length;
    }
    
    setSelectedApplication(applications[newIndex]);
  };

  return {
    applications,
    filteredApplications,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isRefreshing,
    refreshApplications,
    selectedApplication,
    setSelectedApplication,
    isDetailsOpen,
    setIsDetailsOpen,
    isBatchOpen,
    setIsBatchOpen,
    selectedApplications,
    setSelectedApplications,
    isHelpOpen,
    setIsHelpOpen,
    exportToCSV,
    updateApplicationStatus,
    toggleFlagApplication,
    handleCheckApplication,
    handleBatchComparison,
    navigateToApplication
  };
};

export default useApplicationManagement;
