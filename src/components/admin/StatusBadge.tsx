
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span 
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        status === "approved" 
          ? "bg-green-400/10 text-green-400" 
          : status === "rejected"
          ? "bg-red-400/10 text-red-400" 
          : "bg-yellow-400/10 text-yellow-400"
      }`}
    >
      {status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
      {status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
      {status === "pending" && <Clock className="h-3 w-3 mr-1" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
