import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Flag, Mail } from "lucide-react";
import { Application } from "@/types/application";
import { handleApplicationApproval } from "@/utils/applicationUtils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface StatusActionsProps {
  application: Application;
  onStatusChange: (id: string, status: string) => void;
  onFlagToggle: (id: string) => void;
}

const StatusActions = ({
  application,
  onStatusChange,
  onFlagToggle,
}: StatusActionsProps) => {
  const [showApproveDialog, setShowApproveDialog] = useState(false);

  const handleApprove = async () => {
    try {
      if (application.status === "approved") {
        return;
      }

      // First update the status
      onStatusChange(application.id, "approved");

      // Get first and last name
      const firstName = application.name.split(" ")[0];
      const lastName = application.name.split(" ").slice(1).join(" ");

      // Call the shared utility function to handle the approval process
      await handleApplicationApproval(firstName, lastName, application.email);
    } catch (err) {
      console.error("Error in approval process:", err);
    }
  };

  return (
    <>
      <div className="bg-zinc-900/60 rounded-md p-3 flex flex-wrap gap-2 justify-center border border-zinc-700">
        <Button
          variant="outline"
          size="sm"
          className="text-green-500 border-green-500/20 hover:bg-green-500/10 hover:text-green-400"
          onClick={() => setShowApproveDialog(true)}
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

      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Application</AlertDialogTitle>
            <AlertDialogDescription>
              This will approve {application.name}'s application and:
              <ul className="list-disc ml-5 mt-2">
                <li>Create a user account with a temporary password</li>
                <li>Assign the fellow role to the user</li>
                <li>Send an acceptance email with login instructions</li>
              </ul>
              <div className="mt-2 flex items-center p-2 bg-yellow-500/10 text-yellow-500 rounded-md">
                <Mail className="h-5 w-5 mr-2" />
                The applicant will receive an email with login credentials.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve & Create Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StatusActions;
