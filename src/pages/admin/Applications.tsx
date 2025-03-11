import { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  FileSearch,
  Flag,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Users
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ApplicationDetailsDialog from "@/components/ApplicationDetailsDialog";
import BatchComparisonDialog from "@/components/BatchComparisonDialog";
import KeyboardShortcutsHelp from "@/components/KeyboardShortcutsHelp";
import { useHotkeys } from "react-hotkeys-hook";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

interface Application {
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
  linkedinUrl?: string;
}

const Applications = () => {
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
  const tableRef = useRef<HTMLDivElement>(null);

  const loadApplications = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*');
        
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
          videoUrl: app.video_url
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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

  useHotkeys('right', () => {
    if (isDetailsOpen) navigateToApplication('next');
  }, [isDetailsOpen, navigateToApplication]);
  
  useHotkeys('left', () => {
    if (isDetailsOpen) navigateToApplication('prev');
  }, [isDetailsOpen, navigateToApplication]);
  
  useHotkeys('a', () => {
    if (isDetailsOpen && selectedApplication) {
      updateApplicationStatus(selectedApplication.id, 'approved');
    }
  }, [isDetailsOpen, selectedApplication]);
  
  useHotkeys('r', () => {
    if (isDetailsOpen && selectedApplication) {
      updateApplicationStatus(selectedApplication.id, 'rejected');
    }
  }, [isDetailsOpen, selectedApplication]);
  
  useHotkeys('p', () => {
    if (isDetailsOpen && selectedApplication) {
      updateApplicationStatus(selectedApplication.id, 'pending');
    }
  }, [isDetailsOpen, selectedApplication]);
  
  useHotkeys('f', () => {
    if (isDetailsOpen && selectedApplication) {
      toggleFlagApplication(selectedApplication.id);
    }
  }, [isDetailsOpen, selectedApplication]);
  
  useHotkeys('c', () => {}, [isDetailsOpen, selectedApplication]);
  
  useHotkeys('escape', () => {
    setIsDetailsOpen(false);
  }, []);
  
  useHotkeys('?', () => {
    setIsHelpOpen(prev => !prev);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Applications</h1>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-zinc-700 text-gray-300 hover:bg-zinc-800"
            onClick={() => setIsHelpOpen(true)}
          >
            ?
            <span className="sr-only">Keyboard Shortcuts</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-zinc-700 text-gray-300 hover:bg-zinc-800"
            onClick={refreshApplications}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-zinc-700 text-gray-300 hover:bg-zinc-800"
            onClick={exportToCSV}
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-zinc-700 text-gray-300 hover:bg-zinc-800"
            onClick={handleBatchComparison}
            disabled={filteredApplications.length < 2}
          >
            <Users className="h-4 w-4" />
            Compare Batch
          </Button>
        </div>
      </div>

      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search applications..."
              className="pl-10 bg-zinc-900 border-zinc-700 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={statusFilter === null ? "pink" : "outline"}
              className={`${
                statusFilter === null ? "" : "border-zinc-700 text-gray-300 hover:bg-zinc-800"
              }`}
              onClick={() => setStatusFilter(null)}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "pending" ? "pink" : "outline"}
              className={`${
                statusFilter === "pending" ? "" : "border-zinc-700 text-gray-300 hover:bg-zinc-800"
              }`}
              onClick={() => setStatusFilter("pending")}
            >
              <Clock className="h-4 w-4 mr-2" />
              Pending
            </Button>
            <Button
              variant={statusFilter === "approved" ? "pink" : "outline"}
              className={`${
                statusFilter === "approved" ? "" : "border-zinc-700 text-gray-300 hover:bg-zinc-800"
              }`}
              onClick={() => setStatusFilter("approved")}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approved
            </Button>
            <Button
              variant={statusFilter === "rejected" ? "pink" : "outline"}
              className={`${
                statusFilter === "rejected" ? "" : "border-zinc-700 text-gray-300 hover:bg-zinc-800"
              }`}
              onClick={() => setStatusFilter("rejected")}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Rejected
            </Button>
            <Button
              variant={statusFilter === "flagged" ? "pink" : "outline"}
              className={`${
                statusFilter === "flagged" ? "" : "border-zinc-700 text-gray-300 hover:bg-zinc-800"
              }`}
              onClick={() => setStatusFilter("flagged")}
            >
              <Flag className="h-4 w-4 mr-2" />
              Flagged
            </Button>
          </div>
        </div>

        <div ref={tableRef} className="rounded-md border border-zinc-700 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-900">
              <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                <TableHead className="text-gray-300">ID</TableHead>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">School</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <TableRow key={app.id} className="border-zinc-700 hover:bg-zinc-800/50">
                    <TableCell className="font-medium text-gray-300">#{app.id}</TableCell>
                    <TableCell className="text-white">
                      <div className="flex items-center gap-2">
                        {app.flagged && <Flag className="h-3 w-3 text-amber-400" />}
                        {app.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{app.email}</TableCell>
                    <TableCell className="text-gray-300">{app.school}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(app.submissionDate)}</TableCell>
                    <TableCell>
                      <span 
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === "approved" 
                            ? "bg-green-400/10 text-green-400" 
                            : app.status === "rejected"
                            ? "bg-red-400/10 text-red-400" 
                            : "bg-yellow-400/10 text-yellow-400"
                        }`}
                      >
                        {app.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {app.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                        {app.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-blue-500 hover:text-blue-400 hover:bg-blue-400/10"
                          onClick={() => handleCheckApplication(app)}
                          title="Check Application"
                        >
                          <FileSearch className="h-4 w-4" />
                          <span className="sr-only">Check Application</span>
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-amber-500 hover:text-amber-400 hover:bg-amber-400/10"
                          onClick={() => toggleFlagApplication(app.id)}
                          title={app.flagged ? "Unflag" : "Flag for Review"}
                        >
                          <Flag className="h-4 w-4" />
                          <span className="sr-only">Flag</span>
                        </Button>
                        
                        {app.status !== "approved" && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 text-green-500 hover:text-green-400 hover:bg-green-400/10"
                            onClick={() => updateApplicationStatus(app.id, "approved")}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Approve</span>
                          </Button>
                        )}
                        {app.status !== "rejected" && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-red-400/10"
                            onClick={() => updateApplicationStatus(app.id, "rejected")}
                          >
                            <XCircle className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                          </Button>
                        )}
                        {app.status !== "pending" && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-400/10"
                            onClick={() => updateApplicationStatus(app.id, "pending")}
                          >
                            <Clock className="h-4 w-4" />
                            <span className="sr-only">Mark as Pending</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-400">
                    {applications.length === 0 
                      ? "No applications have been submitted yet." 
                      : "No applications found matching your filters."
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <ApplicationDetailsDialog 
        application={selectedApplication}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onNavigate={navigateToApplication}
        onStatusChange={updateApplicationStatus}
        onFlagToggle={toggleFlagApplication}
      />

      <BatchComparisonDialog
        applications={selectedApplications}
        open={isBatchOpen}
        onOpenChange={setIsBatchOpen}
      />

      <KeyboardShortcutsHelp 
        open={isHelpOpen}
        onOpenChange={setIsHelpOpen}
      />
    </div>
  );
};

export default Applications;
