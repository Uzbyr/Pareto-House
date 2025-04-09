
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

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
  console.log("Starting send-magic-link function handler");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request (CORS preflight)");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Parsing request body");
    const requestBody = await req.text();
    console.log("Request body:", requestBody);
    
    let email, redirectTo;
    try {
      const parsed = JSON.parse(requestBody);
      email = parsed.email;
      redirectTo = parsed.redirectTo;
      console.log(`Parsed request: email=${email}, redirectTo=${redirectTo}`);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!email) {
      console.error("Missing required field: email");
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
    console.log("Checking environment variables");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    console.log("Environment variables check:", {
      supabaseUrl: supabaseUrl ? "✅ Set" : "❌ Missing",
      supabaseAnonKey: supabaseAnonKey ? "✅ Set" : "❌ Missing",
      supabaseServiceRoleKey: supabaseServiceRoleKey ? "✅ Set" : "❌ Missing",
      resendApiKey: resendApiKey ? "✅ Set" : "❌ Missing"
    });

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      console.error("Missing Supabase environment variables");
      return new Response(
        JSON.stringify({
          error: "Server configuration error: Missing Supabase credentials",
          details: {
            supabaseUrl: !!supabaseUrl,
            supabaseAnonKey: !!supabaseAnonKey,
            supabaseServiceRoleKey: !!supabaseServiceRoleKey
          }
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

    console.log("Creating Supabase client");
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    // Check if the user exists first
    console.log("Checking if user exists with email:", email);
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error("Error checking if user exists:", userError);
      return new Response(
        JSON.stringify({ 
          error: `Failed to check if user exists: ${userError.message}` 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    const userExists = users.some(user => user.email === email);
    
    if (!userExists) {
      console.error("User does not exist with email:", email);
      return new Response(
        JSON.stringify({ 
          error: "No account found with this email",
          exists: false 
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    console.log("Generating sign-in link for existing user");
    
    // Generate a sign-in link only for existing users
    const { data, error } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: email,
      options: {
        redirectTo: redirectTo,
      }
    });
    
    console.log("Generate link response:", data ? "Success" : "Failed");
    
    if (error) {
      console.error("Error generating magic link:", error);
      return new Response(
        JSON.stringify({
          error: `Failed to generate magic link: ${error.message}`,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const signInLink = data?.properties?.action_link;
    console.log("Sign-in link generated:", signInLink ? "✅ Yes" : "❌ No");
    
    if (!signInLink) {
      console.error("No action_link returned from Supabase:", data);
      return new Response(
        JSON.stringify({ 
          error: "Failed to generate magic link: No action link returned",
          responseData: data
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Magic link generated successfully, initializing Resend");
    const resend = new Resend(resendApiKey);
    
    console.log("Sending custom email with Resend");
    // Send the custom branded email with the magic link
    try {
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

      console.log("Resend email response:", emailResponse);

      if (emailResponse.error) {
        console.error("Resend email error:", emailResponse.error);
        return new Response(
          JSON.stringify({ 
            error: "Failed to send email with magic link",
            details: emailResponse.error
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

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
    } catch (emailError: any) {
      console.error("Resend API error:", emailError);
      return new Response(
        JSON.stringify({ 
          error: "Error sending email with Resend API",
          details: emailError.toString()
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
  } catch (error: any) {
    console.error("Unexpected error in send-magic-link function:", error);
    return new Response(
      JSON.stringify({ 
        error: `Error sending magic link: ${error.message}`,
        details: error.toString(),
        stack: error.stack
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
