
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ApplicationDetailsDialog from "@/components/ApplicationDetailsDialog";
import ApplicationsHeader from "@/components/admin/ApplicationsHeader";
import ApplicationsFilters from "@/components/admin/ApplicationsFilters";
import ApplicationsTable from "@/components/admin/ApplicationsTable";

interface Application {
  id: number;
  name: string;
  email: string;
  school: string;
  major?: string;
  submissionDate: string;
  status: string;
}

const Applications = () => {
  const { getApplications, refreshMetrics } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Initial load of applications
  useEffect(() => {
    setApplications(getApplications());
    console.log("Loading applications from AuthContext");
  }, [getApplications]);

  const refreshApplications = () => {
    setIsRefreshing(true);
    const updatedApplications = getApplications();
    setApplications(updatedApplications);
    console.log("Applications refreshed:", updatedApplications.length);
    refreshMetrics();
    toast.success("Applications data refreshed");
    setTimeout(() => setIsRefreshing(false), 800); // Add a small delay for UX
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.major && app.major.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesStatus = statusFilter ? app.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    // Create CSV data
    const headers = ["ID", "Name", "Email", "School", "Major", "Submission Date", "Status"];
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
      ].join(","))
    ];
    const csvString = csvRows.join("\n");
    
    // Create download link
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const updateApplicationStatus = (id: number, newStatus: string) => {
    // Get current apps from localStorage to ensure we're using the latest data
    const currentApps = localStorage.getItem('applications');
    let allApps = currentApps ? JSON.parse(currentApps) : [];
    
    // Update the application status
    allApps = allApps.map((app: Application) => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    
    // Save back to localStorage
    localStorage.setItem('applications', JSON.stringify(allApps));
    
    // Update state and refresh metrics
    setApplications(allApps);
    refreshMetrics();
    
    toast.success(`Application #${id} marked as ${newStatus}`);
  };

  const handleCheckApplication = (application: Application) => {
    setSelectedApplication(application);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <ApplicationsHeader 
        refreshApplications={refreshApplications}
        exportToCSV={exportToCSV}
        isRefreshing={isRefreshing}
      />

      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <ApplicationsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <ApplicationsTable 
          applications={filteredApplications}
          formatDate={formatDate}
          handleCheckApplication={handleCheckApplication}
          updateApplicationStatus={updateApplicationStatus}
        />
      </Card>

      <ApplicationDetailsDialog 
        application={selectedApplication}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </div>
  );
};

export default Applications;
