
import { Button } from "@/components/ui/button";
import { FileSearch, CheckCircle, XCircle, Clock } from "lucide-react";

interface ActionButtonsProps {
  applicationId: number;
  status: string;
  onCheck: () => void;
  onUpdateStatus: (id: number, status: string) => void;
}

const ActionButtons = ({ 
  applicationId, 
  status, 
  onCheck, 
  onUpdateStatus 
}: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant="ghost" 
        className="h-8 w-8 p-0 text-blue-500 hover:text-blue-400 hover:bg-blue-400/10"
        onClick={onCheck}
        title="Check Application"
      >
        <FileSearch className="h-4 w-4" />
        <span className="sr-only">Check Application</span>
      </Button>
      {status !== "approved" && (
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-8 w-8 p-0 text-green-500 hover:text-green-400 hover:bg-green-400/10"
          onClick={() => onUpdateStatus(applicationId, "approved")}
        >
          <CheckCircle className="h-4 w-4" />
          <span className="sr-only">Approve</span>
        </Button>
      )}
      {status !== "rejected" && (
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-red-400/10"
          onClick={() => onUpdateStatus(applicationId, "rejected")}
        >
          <XCircle className="h-4 w-4" />
          <span className="sr-only">Reject</span>
        </Button>
      )}
      {status !== "pending" && (
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-8 w-8 p-0 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-400/10"
          onClick={() => onUpdateStatus(applicationId, "pending")}
        >
          <Clock className="h-4 w-4" />
          <span className="sr-only">Mark as Pending</span>
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
