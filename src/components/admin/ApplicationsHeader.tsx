
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { toast } from "sonner";

interface ApplicationsHeaderProps {
  refreshApplications: () => void;
  exportToCSV: () => void;
  isRefreshing: boolean;
}

const ApplicationsHeader = ({ 
  refreshApplications, 
  exportToCSV, 
  isRefreshing 
}: ApplicationsHeaderProps) => {
  return (
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
  );
};

export default ApplicationsHeader;
