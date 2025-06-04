import { supabase } from "@/integrations/supabase/client";

/**
 * Hook for sending email notifications
 */
const useEmailNotification = () => {
  const sendConfirmationEmail = async (
    firstName: string,
    lastName: string,
    email: string,
  ) => {
    try {
      const { error } = await supabase.functions.invoke(
        "send-confirmation-email-house",
        {
          body: { firstName, lastName, email },
        },
      );

      if (error) {
        console.error("Error sending confirmation email:", error);
      } else {
        console.log("Confirmation email sent successfully");
      }
    } catch (error) {
      console.error("Error invoking email function:", error);
    }
  };

  return { sendConfirmationEmail };
};

export default useEmailNotification;
