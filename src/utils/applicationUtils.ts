import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Handles the approval process for an application, including:
 * 1. Creating a user account
 * 2. Sending an acceptance email with login magic link
 *
 * @param firstName - Applicant's first name
 * @param lastName - Applicant's last name
 * @param email - Applicant's email
 * @returns Promise that resolves when the process completes
 */
export const handleApplicationApproval = async (
  firstName: string,
  lastName: string,
  email: string,
): Promise<boolean> => {
  // Show a loading toast while processing
  const loadingToast = toast.loading("Processing application approval...");

  try {
    // Call the edge function to create the user account
    const { data, error } = await supabase.functions.invoke(
      "create-approved-user",
      {
        body: {
          firstName,
          lastName,
          email,
          approved_date: new Date().toISOString(),
        },
      },
    );

    if (error) {
      console.error("Error creating user account:", error);
      toast.dismiss(loadingToast);
      toast.error("Failed to create user account. Please try again.");
      return false;
    }

    if (data?.error) {
      console.error("Error response from create-approved-user:", data.error);
      toast.dismiss(loadingToast);
      toast.error(data.message || "Failed to create user account.");

      // If user already exists, continue with sending the email
      if (data.error.includes("already exists")) {
        console.log("User already exists, proceeding with acceptance email.");
      } else {
        return false;
      }
    }

    // Send the acceptance email with magic link
    const { data: emailData, error: emailError } =
      await supabase.functions.invoke("send-acceptance-email", {
        body: {
          firstName,
          lastName,
          email,
        },
      });

    // Remove the loading toast
    toast.dismiss(loadingToast);

    if (emailError) {
      console.error("Error sending acceptance email:", emailError);
      toast.error("Application approved but failed to send acceptance email");
      return false;
    } else {
      // Show success message with email confirmation
      toast.success(`Acceptance email sent to ${email}`, {
        description:
          "The applicant has been notified of their acceptance to the fellowship.",
      });
      console.log("Acceptance email response:", emailData);
      return true;
    }
  } catch (err) {
    console.error("Error in approval process:", err);
    toast.dismiss(loadingToast);
    toast.error("Error in approval process");
    return false;
  }
};
