import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Flag } from "lucide-react";
import { Application } from "@/types/application";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const handleApprove = async () => {
    try {
      if (application.status === "approved") {
        toast.info("Application is already approved");
        return;
      }

      // First update the status
      onStatusChange(application.id, "approved");

      // Show a loading toast while sending the email
      toast.loading("Sending acceptance email...");

      // Then send the acceptance email
      const { data, error } = await supabase.functions.invoke(
        "send-acceptance-email",
        {
          body: {
            firstName: application.name.split(" ")[0],
            lastName: application.name.split(" ").slice(1).join(" "),
            email: application.email,
          },
        },
      );

      if (error) {
        console.error("Error sending acceptance email:", error);
        toast.error("Application approved but failed to send acceptance email");
      } else {
        // Remove loading toast and show success message with email confirmation
        toast.success(`Acceptance email sent to ${application.email}`, {
          description:
            "The applicant has been notified of their acceptance to the fellowship.",
        });
        console.log("Acceptance email response:", data);
      }
    } catch (err) {
      console.error("Error in approval process:", err);
      toast.error("Error in approval process");
    }
  };

  return (
    <div className="bg-zinc-900/60 rounded-md p-3 flex flex-wrap gap-2 justify-center border border-zinc-700">
      <Button
        variant="outline"
        size="sm"
        className="text-green-500 border-green-500/20 hover:bg-green-500/10 hover:text-green-400"
        onClick={handleApprove}
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
