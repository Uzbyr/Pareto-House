
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApplicationEmailRequest {
  fellowName: string;
  position: string;
  company: string;
  message: string;
  opportunityId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fellowName, position, company, message, opportunityId }: ApplicationEmailRequest = await req.json();

    console.log(`Sending application email for ${fellowName} applying to ${position} at ${company}`);

    const emailResponse = await resend.emails.send({
      from: "Pareto Fellowship <noreply@transactional.paretofellowship.com>",
      to: ["hello@mrdotb.com"],
      subject: `Fellow ${fellowName} wants to apply to ${position} at ${company}`,
      html: `
        <h2>New Fellowship Application</h2>
        <p><strong>Fellow:</strong> ${fellowName}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Opportunity ID:</strong> ${opportunityId}</p>
        
        <h3>Fellow's Message:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <p style="margin-top: 20px;">
          Please review this application and decide whether to forward it to the company.
        </p>
      `,
    });

    console.log("Application email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-application-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
