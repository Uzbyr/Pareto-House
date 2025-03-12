
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Users } from "lucide-react";

interface ApplicationActionButtonsProps {
  isRefreshing: boolean;
  refreshApplications: () => void;
  exportToCSV: () => void;
  handleBatchComparison: () => void;
  applicationCount: number;
  showKeyboardShortcuts: () => void;
}

const ApplicationActionButtons = ({
  isRefreshing,
  refreshApplications,
  exportToCSV,
  handleBatchComparison,
  applicationCount,
  showKeyboardShortcuts,
}: ApplicationActionButtonsProps) => {
  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        className="flex items-center gap-2 border-zinc-700 text-gray-300 hover:bg-zinc-800"
        onClick={showKeyboardShortcuts}
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
        disabled={applicationCount < 2}
      >
        <Users className="h-4 w-4" />
        Compare Batch
      </Button>
    </div>
  );
};

export default ApplicationActionButtons;
