import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Application {
  id: string; // Updated to string type for UUID
  name: string;
  email: string;
  school: string;
  major?: string;
  submissionDate: string;
  status: string;
}

interface CommunicationDialogProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommunicationDialog = ({
  application,
  open,
  onOpenChange
}: CommunicationDialogProps) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [template, setTemplate] = useState<string | undefined>(undefined);

  const handleSendEmail = () => {
    if (!application) return;

    // Simulate sending email
    toast.success(`Email sent to ${application.email} with subject: ${subject}`);
    onOpenChange(false);
  };

  const handleTemplateChange = (value: string) => {
    setTemplate(value);
    switch (value) {
      case "approved":
        setSubject("Application Approved");
        setBody(`Dear ${application?.name},\n\nWe are pleased to inform you that your application has been approved.`);
        break;
      case "rejected":
        setSubject("Application Rejected");
        setBody(`Dear ${application?.name},\n\nWe regret to inform you that your application has been rejected.`);
        break;
      case "pending":
        setSubject("Application Pending");
        setBody(`Dear ${application?.name},\n\nYour application is currently under review.`);
        break;
      default:
        setSubject("");
        setBody("");
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] bg-zinc-900 border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-white">Send Email</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right text-gray-400">
              To
            </Label>
            <Input
              type="email"
              id="email"
              value={application?.email || ""}
              className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="template" className="text-right text-gray-400">
              Template
            </Label>
            <Select onValueChange={handleTemplateChange}>
              <SelectTrigger className="col-span-3 bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right text-gray-400">
              Subject
            </Label>
            <Input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="col-span-3 bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="body" className="text-right text-gray-400">
              Body
            </Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="col-span-3 bg-zinc-800 border-zinc-700 text-white resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSendEmail}>Send Email</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommunicationDialog;
