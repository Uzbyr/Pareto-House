
import { useState, useEffect } from "react";
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
  FileText,
  Video,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Application {
  id: number;
  name: string;
  email: string;
  school: string;
  major?: string;
  submissionDate: string;
  status: string;
  resume?: string;
  video?: string;
}

const Applications = () => {
  const { getApplications } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initial load of applications
  useEffect(() => {
    setApplications(getApplications());
  }, [getApplications]);

  const refreshApplications = () => {
    setIsRefreshing(true);
    // Fetch fresh data
    setApplications(getApplications());
    toast.success("Applications data refreshed");
    setTimeout(() => setIsRefreshing(false), 800); // Add a small delay for UX
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.school?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.major?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter ? app.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    // Create CSV data
    const headers = ["ID", "Name", "Email", "School", "Major", "Submission Date", "Status", "Resume", "Video"];
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
        app.resume || "",
        app.video || "",
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
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return "Invalid date";
    }
  };

  const updateApplicationStatus = (id: number, newStatus: string) => {
    // Get applications from localStorage
    const storedApps = localStorage.getItem('applications');
    const apps = storedApps ? JSON.parse(storedApps) : [];
    
    // Update the status
    const updatedApps = apps.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    
    // Save back to localStorage
    localStorage.setItem('applications', JSON.stringify(updatedApps));
    
    // Update state
    setApplications(updatedApps);
    toast.success(`Application #${id} marked as ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Applications</h1>
        <div className="flex gap-3">
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
          </div>
        </div>

        <div className="rounded-md border border-zinc-700 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-900">
              <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                <TableHead className="text-gray-300">ID</TableHead>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">School</TableHead>
                <TableHead className="text-gray-300">Major</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Files</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id} className="border-zinc-700 hover:bg-zinc-800/50">
                  <TableCell className="font-medium text-gray-300">#{app.id}</TableCell>
                  <TableCell className="text-white">{app.name}</TableCell>
                  <TableCell className="text-gray-300">{app.email}</TableCell>
                  <TableCell className="text-gray-300">{app.school}</TableCell>
                  <TableCell className="text-gray-300">{app.major || "-"}</TableCell>
                  <TableCell className="text-gray-300">{formatDate(app.submissionDate)}</TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex space-x-2">
                      {app.resume && (
                        <span title={`Resume: ${app.resume}`} className="text-blue-400">
                          <FileText className="h-4 w-4" />
                        </span>
                      )}
                      {app.video && (
                        <span title={`Video: ${app.video}`} className="text-emerald-400">
                          <Video className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </TableCell>
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
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No applications found matching your filters.
          </div>
        )}
      </Card>
    </div>
  );
};

export default Applications;
