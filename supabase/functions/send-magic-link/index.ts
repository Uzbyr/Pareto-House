
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MagicLinkRequest {
  email: string;
  redirectTo: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, redirectTo }: MagicLinkRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({
          error: "Missing required field: email is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create a sign-in link that is valid for 24 hours
    const { data: signInData, error: signInError } = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/auth/v1/otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: Deno.env.get("SUPABASE_ANON_KEY") || "",
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
        body: JSON.stringify({
          email,
          type: "magiclink",
          options: {
            redirect_to: redirectTo,
          },
        }),
      }
    ).then((res) => res.json());

    if (signInError) {
      throw new Error(signInError.message);
    }

    const signInLink = signInData?.action_link;
    if (!signInLink) {
      throw new Error("Failed to generate magic link");
    }

    // Send the custom branded email with the magic link
    const emailResponse = await resend.emails.send({
      from: "Pareto Fellowship <noreply@transactional.paretofellowship.com>",
      to: [email],
      subject: "Sign in to Pareto Fellowship",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <img src="https://paretofellowship.com/logo.png" alt="Pareto Fellowship" style="max-width: 150px; margin-bottom: 20px;">
          <h1 style="color: #E91E63;">Sign in to Pareto Fellowship</h1>
          <p>Hello,</p>
          <p>Click the button below to sign in to your Pareto Fellowship account. This link will expire in 24 hours.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${signInLink}" style="background-color: #E91E63; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Sign In</a>
          </div>
          
          <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 4px;">${signInLink}</p>
          
          <p>If you didn't request this email, you can safely ignore it.</p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>&copy; ${new Date().getFullYear()} Pareto Fellowship. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log("Custom magic link email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Magic link sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending magic link email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
