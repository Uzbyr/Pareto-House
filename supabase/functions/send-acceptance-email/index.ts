
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AcceptanceData {
  firstName: string;
  lastName: string;
  email: string;
}

const getDeadlineDate = (): string => {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 7);
  return deadline.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const acceptanceData: AcceptanceData = await req.json();
    const { firstName, lastName, email } = acceptanceData;

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

    // Check if environment variables are set
    console.log("Checking environment variables");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
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

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    
    console.log(`Generating magic link for ${email}`);
    
    // Get the correct origin for the redirect URL
    const requestUrl = new URL(req.url);
    const origin = requestUrl.origin.replace('supabase', 'lovable-preview');
    
    // Generate a sign-in link
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: email,
      options: {
        redirectTo: `${origin}/auth-callback`,
      }
    });
    
    if (linkError) {
      console.error("Error generating magic link:", linkError);
      return new Response(
        JSON.stringify({ error: linkError.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const signInLink = linkData?.properties?.action_link;
    
    if (!signInLink) {
      console.error("No action_link returned from Supabase");
      return new Response(
        JSON.stringify({ error: "Failed to generate sign-in link" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const deadlineDate = getDeadlineDate();

    console.log(`Sending acceptance email to ${email}`);

    const emailResponse = await resend.emails.send({
      from: "Pareto Fellowship <noreply@transactional.paretofellowship.com>",
      to: [email],
      subject: "🎉 Welcome to the Pareto Fellowship!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <img src="https://paretofellowship.com/logo.png" alt="Pareto Fellowship" style="max-width: 150px; margin-bottom: 20px;">
          <p>Dear ${firstName} ${lastName},</p>
          
          <p>🌟 Congratulations! You're officially part of the Pareto Fellowship's inaugural cohort! We were blown away by your achievements and can't wait to see what you'll accomplish as part of this exceptional community.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #2c3e50;">🚀 Your Pareto Journey Begins Now</h2>
            <p>We've created your account on the Pareto Fellowship platform, your central hub for all fellowship activities.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${signInLink}" style="background-color: #E91E63; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Sign In to Your Account</a>
            </div>
            
            <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 4px;">${signInLink}</p>
            
            <p>This login link will expire in 24 hours. If you miss it, you can always request a new one by visiting <a href="https://paretofellowship.com/login" style="color: #3498db;">our login page</a>.</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #2c3e50;">⏱️ Required: Complete Your Fellow Profile (Deadline: ${deadlineDate})</h2>
            <p>Your profile in our fellows directory is your digital presence within the Pareto community. While we've imported some basic information from your application, we need you to:</p>
            
            <p><strong>📝 Complete your profile details:</strong></p>
            <ul>
              <li>Update your bio (250-500 words recommended)</li>
              <li>Add your LinkedIn, GitHub, and other relevant profiles</li>
              <li>List your key achievements and competition results</li>
              <li>Tag your areas of expertise and interests</li>
              <li>Add your university information and graduation year</li>
            </ul>
            
            <p><strong>📸 Upload your materials:</strong></p>
            <ul>
              <li>Professional headshot</li>
              <li>Portfolio pieces (optional)</li>
              <li>Links to published work or projects</li>
              <li>Any other media that showcases your talents</li>
            </ul>
            
            <p style="color: #e74c3c;">⚠️ <strong>Note:</strong> Your profile must be completed to gain full access to the platform features and appear in the fellows directory.</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #2c3e50;">🗺️ Explore Your Fellow Portal</h2>
            <p>Your portal gives you exclusive access to:</p>
            
            <ul>
              <li>👥 <strong>Fellows Directory:</strong> Connect with your cohort and see everyone's profiles</li>
              <li>📆 <strong>Events Calendar:</strong> All upcoming mentor talks, workshops, and networking events</li>
              <li>🏆 <strong>Opportunities Board:</strong> Exclusive internships, grants, and competitions</li>
              <li>📚 <strong>Resource Library:</strong> Curated content and tools from our mentors</li>
            </ul>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h2 style="margin-top: 0; color: #2c3e50;">🤔 Questions?</h2>
            <p>We're here to help you make the most of this opportunity. Reach out anytime:</p>
            
            <ul>
              <li>Email: <a href="mailto:jules@pareto20.com" style="color: #3498db;">jules@pareto20.com</a></li>
              <li>Fellowship Coordinators: Jules Boustouller & Ben Cambier</li>
            </ul>
          </div>
          
          <p>We're thrilled to welcome you to this exceptional community and can't wait to see the connections you'll make and the impact you'll create.</p>
          
          <p>Welcome aboard!</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    });

    console.log("Acceptance email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Acceptance email sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  } catch (error: any) {
    console.error("Error in send-acceptance-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
