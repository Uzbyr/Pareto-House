
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: {
    id: string;
    position: string | null;
    company: string | null;
  };
  fellowName: string;
}

const ApplicationModal = ({ isOpen, onClose, opportunity, fellowName }: ApplicationModalProps) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-application-email', {
        body: {
          fellowName,
          position: opportunity.position || "Position Not Specified",
          company: opportunity.company || "Company Not Specified",
          message,
          opportunityId: opportunity.id
        }
      });

      if (error) throw error;

      toast({
        title: "Application Sent!",
        description: "Your application has been sent successfully. We'll be in touch soon!",
      });

      onClose();
      setMessage("");
    } catch (error) {
      console.error("Error sending application:", error);
      toast({
        title: "Error",
        description: "Failed to send application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Apply to {opportunity.position}</DialogTitle>
          <DialogDescription>
            at {opportunity.company}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="message">Why are you interested in this opportunity?</Label>
            <Textarea
              id="message"
              placeholder="Tell us why you'd be a great fit for this role..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1"
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-pareto-pink text-black hover:bg-pareto-pink/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
