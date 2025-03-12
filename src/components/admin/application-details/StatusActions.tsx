
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Flag } from "lucide-react";
import { Application } from "@/types/application";

interface StatusActionsProps {
  application: Application;
  onStatusChange: (id: string, status: string) => void;
  onFlagToggle: (id: string) => void;
}

const StatusActions = ({ application, onStatusChange, onFlagToggle }: StatusActionsProps) => {
  return (
    <div className="bg-zinc-900/60 rounded-md p-3 flex flex-wrap gap-2 justify-center border border-zinc-700">
      <Button
        variant="outline"
        size="sm"
        className="text-green-500 border-green-500/20 hover:bg-green-500/10 hover:text-green-400"
        onClick={() => onStatusChange(application.id, "approved")}
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Approve (A)
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-red-500 border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
        onClick={() => onStatusChange(application.id, "rejected")}
      >
        <XCircle className="h-4 w-4 mr-2" />
        Reject (R)
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/10 hover:text-yellow-400"
        onClick={() => onStatusChange(application.id, "pending")}
      >
        <Clock className="h-4 w-4 mr-2" />
        Pending (P)
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={`${
          application.flagged 
            ? "text-amber-400 border-amber-400/20 hover:bg-amber-400/10 hover:text-amber-300"
            : "text-gray-400 border-gray-400/20 hover:bg-gray-400/10 hover:text-gray-300"
        }`}
        onClick={() => onFlagToggle(application.id)}
      >
        <Flag className="h-4 w-4 mr-2" />
        {application.flagged ? "Unflag (F)" : "Flag (F)"}
      </Button>
    </div>
  );
};

export default StatusActions;
