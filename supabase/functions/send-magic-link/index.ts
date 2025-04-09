
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
    console.log(`Processing magic link for email: ${email} with redirect: ${redirectTo}`);

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

    // Check if environment variables are set
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      console.error("Missing Supabase environment variables");
      return new Response(
        JSON.stringify({
          error: "Server configuration error: Missing Supabase credentials",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!resendApiKey) {
      console.error("Missing Resend API Key");
      return new Response(
        JSON.stringify({
          error: "Server configuration error: Missing email service credentials",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Creating sign-in link via Supabase API");
    // Create a sign-in link that is valid for 24 hours
    const response = await fetch(
      `${supabaseUrl}/auth/v1/otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseServiceRoleKey}`,
        },
        body: JSON.stringify({
          email,
          type: "magiclink",
          options: {
            redirect_to: redirectTo,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase OTP API error:", response.status, errorText);
      return new Response(
        JSON.stringify({
          error: `Failed to generate magic link: ${response.status} - ${errorText}`,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const data = await response.json();
    const signInLink = data?.action_link;
    
    if (!signInLink) {
      console.error("No action_link returned from Supabase:", data);
      return new Response(
        JSON.stringify({ error: "Failed to generate magic link: No action link returned" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Magic link generated successfully, sending custom email");
    
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

    console.log("Custom magic link email response:", emailResponse);

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
    return new Response(
      JSON.stringify({ 
        error: `Error sending magic link: ${error.message}`,
        details: error.toString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
