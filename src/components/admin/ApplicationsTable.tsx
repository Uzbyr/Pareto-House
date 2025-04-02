
import React from "react";
import { Application, ApplicationUpdateFunctions } from "@/types/application";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { CheckCircle, XCircle, Clock, FileSearch, Flag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ApplicationsTableProps {
  applications: Application[];
  handleCheckApplication: (application: Application) => void;
  updateFunctions: ApplicationUpdateFunctions;
}

const ApplicationsTable = ({
  applications,
  handleCheckApplication,
  updateFunctions,
}: ApplicationsTableProps) => {
  const { updateApplicationStatus, toggleFlagApplication } = updateFunctions;

  const handleApprove = async (app: Application) => {
    try {
      if (app.status === "approved") {
        toast.info("Application is already approved");
        return;
      }

      // First update the status
      updateApplicationStatus(app.id, "approved");

      // Then send the acceptance email
      const { data, error } = await supabase.functions.invoke("send-acceptance-email", {
        body: { 
          firstName: app.name.split(' ')[0], 
          lastName: app.name.split(' ').slice(1).join(' '),
          email: app.email
        },
      });

      if (error) {
        console.error("Error sending acceptance email:", error);
        toast.error("Application approved but failed to send acceptance email");
      } else {
        toast.success("Application approved and acceptance email sent");
        console.log("Acceptance email response:", data);
      }
    } catch (err) {
      console.error("Error in approval process:", err);
      toast.error("Error in approval process");
    }
  };

  return (
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
        {applications.length > 0 ? (
          applications.map((app) => (
            <TableRow
              key={app.id}
              className="border-zinc-700 hover:bg-zinc-800/50"
            >
              <TableCell className="font-medium text-gray-300">
                #{app.id}
              </TableCell>
              <TableCell className="text-white">
                <div className="flex items-center gap-2">
                  {app.flagged && <Flag className="h-3 w-3 text-amber-400" />}
                  {app.name}
                </div>
              </TableCell>
              <TableCell className="text-gray-300">{app.email}</TableCell>
              <TableCell className="text-gray-300">{app.school}</TableCell>
              <TableCell className="text-gray-300">
                {formatDate(app.submissionDate)}
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
                  {app.status === "approved" && (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  )}
                  {app.status === "rejected" && (
                    <XCircle className="h-3 w-3 mr-1" />
                  )}
                  {app.status === "pending" && (
                    <Clock className="h-3 w-3 mr-1" />
                  )}
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
                      onClick={() => handleApprove(app)}
                      title="Approve and Send Acceptance Email"
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
                      onClick={() =>
                        updateApplicationStatus(app.id, "rejected")
                      }
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
              No applications found matching your filters.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ApplicationsTable;
