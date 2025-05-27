
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

    // Get the authorization header to access user's profile
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header is required');
    }

    // Create Supabase client with the user's token
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Failed to get user information');
    }

    // Fetch the user's profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw new Error('Failed to fetch user profile');
    }

    // Format profile information for email
    const formatProfileInfo = (profile: any) => {
      const sections = [];

      // Personal Information
      sections.push(`
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${profile.first_name} ${profile.last_name}</p>
        <p><strong>Email:</strong> ${profile.email}</p>
        <p><strong>Country:</strong> ${profile.country}</p>
        <p><strong>Nationality:</strong> ${profile.nationality}</p>
      `);

      // Education
      sections.push(`
        <h3>Education</h3>
        <p><strong>Education Level:</strong> ${profile.education_level}</p>
        ${profile.university ? `<p><strong>University:</strong> ${profile.university}</p>` : ''}
        ${profile.high_school ? `<p><strong>High School:</strong> ${profile.high_school}</p>` : ''}
        ${profile.major ? `<p><strong>Major:</strong> ${profile.major}</p>` : ''}
        <p><strong>Graduation Year:</strong> ${profile.graduation_year}</p>
        ${profile.preparatory_classes ? `<p><strong>Preparatory Classes:</strong> ${profile.preparatory_classes}</p>` : ''}
        ${profile.student_societies ? `<p><strong>Student Societies:</strong> ${profile.student_societies}</p>` : ''}
      `);

      // About section
      if (profile.about) {
        sections.push(`
          <h3>About</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${profile.about.replace(/\n/g, '<br>')}
          </div>
        `);
      }

      // Company/Project Information
      sections.push(`
        <h3>Company/Project Information</h3>
        <p><strong>Building a Company:</strong> ${profile.building_company}</p>
        ${profile.company_context ? `<p><strong>Company Context:</strong> ${profile.company_context}</p>` : ''}
        ${profile.website_url ? `<p><strong>Website:</strong> <a href="${profile.website_url}">${profile.website_url}</a></p>` : ''}
        ${profile.category_of_interest ? `<p><strong>Category of Interest:</strong> ${profile.category_of_interest}</p>` : ''}
      `);

      // Competition Experience
      if (profile.has_competition_experience) {
        sections.push(`
          <h3>Competition Experience</h3>
          <p><strong>Has Competition Experience:</strong> ${profile.has_competition_experience}</p>
          ${profile.competition_results ? `<p><strong>Competition Results:</strong> ${profile.competition_results}</p>` : ''}
          ${profile.competitive_profiles && profile.competitive_profiles.length > 0 ? 
            `<p><strong>Competitive Profiles:</strong></p>
             <ul>${profile.competitive_profiles.map((url: string) => `<li><a href="${url}">${url}</a></li>`).join('')}</ul>` : ''}
        `);
      }

      // Social Links
      const socialLinks = [];
      if (profile.linkedin_url) socialLinks.push(`<a href="${profile.linkedin_url}">LinkedIn</a>`);
      if (profile.github_url) socialLinks.push(`<a href="${profile.github_url}">GitHub</a>`);
      if (profile.x_url) socialLinks.push(`<a href="${profile.x_url}">X (Twitter)</a>`);
      
      if (socialLinks.length > 0) {
        sections.push(`
          <h3>Social Links</h3>
          <p>${socialLinks.join(' | ')}</p>
        `);
      }

      // Files
      const files = [];
      if (profile.resume_file) files.push(`Resume: ${profile.resume_file}`);
      if (profile.memo_file) files.push(`Memo: ${profile.memo_file}`);
      
      if (files.length > 0) {
        sections.push(`
          <h3>Files</h3>
          <p>${files.join('<br>')}</p>
        `);
      }

      return sections.join('');
    };

    const emailResponse = await resend.emails.send({
      from: "Pareto Fellowship <noreply@transactional.paretofellowship.com>",
      to: ["hello@mrdotb.com"],
      subject: `Fellow ${fellowName} wants to apply to ${position} at ${company}`,
      html: `
        <h2>New Fellowship Application</h2>
        <p><strong>Fellow:</strong> ${fellowName}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Company:</strong> ${company}</p>
        
        <h3>Fellow's Message:</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>

        <hr style="margin: 30px 0;">
        
        <h2>Fellow Profile Information</h2>
        ${formatProfileInfo(profile)}
        
        <p style="margin-top: 30px;">
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
