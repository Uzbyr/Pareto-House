import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const applicationData: ApplicationData = await req.json();
    const { firstName, lastName, email } = applicationData;

    if (!email || !firstName) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: email and firstName are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    console.log(`Sending confirmation email to ${email}`);

    const emailResponse = await resend.emails.send({
      from: "Pareto Fellowship <noreply@pareto.io>",
      to: [email],
      subject: "✅ We've Received Your Pareto Fellowship Application",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <img src="https://pareto.io/assets/logo.png" alt="Pareto Fellowship" style="max-width: 150px; margin-bottom: 20px;">
          <p>Dear ${firstName} ${lastName},</p>
          <p>Thank you for applying to the Pareto Fellowship. We've received your application and are impressed by your achievements.</p>
          <p><strong>Next Steps: 👣</strong></p>
          <ul>
            <li>🔍 Our selection committee will review your application shortly</li>
            <li>📞 Shortlisted candidates will be invited for interviews</li>
            <li>🎉 Final selections will be announced by 05/15/2025</li>
          </ul>
          <p>If you have any questions in the meantime, please don't hesitate to reach out.</p>
          <p>Best regards,<br><br>The Pareto team</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Confirmation email sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  } catch (error: any) {
    console.error("Error in send-confirmation-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
