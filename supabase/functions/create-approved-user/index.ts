
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApprovedUserData {
  firstName: string;
  lastName: string;
  email: string;
  approved_date?: string;
}

const generateTemporaryPassword = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const userData: ApprovedUserData = await req.json();

    if (!userData.email || !userData.firstName) {
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

    console.log(`Creating user account for ${userData.email}`);

    // Generate a temporary password
    const temporaryPassword = generateTemporaryPassword();

    // Create the user account with the temporary password
    // Role assignment will be handled by the database trigger
    const { data: newUser, error: userError } =
      await supabaseAdmin.auth.admin.createUser({
        email: userData.email,
        password: temporaryPassword,
        email_confirm: true,
        user_metadata: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          require_password_change: true,
          approved_date: userData.approved_date || new Date().toISOString(),
        },
      });

    if (userError) {
      console.error("Error creating user account:", userError);
      return new Response(
        JSON.stringify({
          error: userError.message,
          message: "Failed to create user account",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    console.log("User created successfully:", newUser);

    // Fetch application data to copy to profile
    if (newUser.user) {
      try {
        // Get application data by email
        console.log("Fetching application data for", userData.email);
        const { data: applicationData, error: appError } = await supabaseAdmin
          .from("applications")
          .select("*")
          .eq("email", userData.email)
          .single();

        if (appError) {
          console.error("Error fetching application data:", appError);
        } else if (applicationData) {
          console.log("Application data found, creating profile");
          
          // Create profile with data from application
          const profileData = {
            user_id: newUser.user.id,
            first_name: userData.firstName,
            last_name: userData.lastName,
            university: applicationData.university,
            major: applicationData.major,
            graduation_year: applicationData.graduation_year,
            preparatory_classes: applicationData.preparatory_classes,
            student_societies: applicationData.student_societies,
            building_company: applicationData.building_company,
            company_context: applicationData.company_context,
            website_url: applicationData.website_url,
            linkedin_url: applicationData.linkedin_url,
            x_url: applicationData.x_url,
            github_url: applicationData.github_url,
            country: applicationData.country,
            nationality: applicationData.nationality,
          };

          const { error: profileError } = await supabaseAdmin
            .from("profiles")
            .insert([profileData]);

          if (profileError) {
            console.error("Error creating user profile:", profileError);
          } else {
            console.log("User profile created successfully");
          }
        } else {
          console.log("No application data found for", userData.email);
          
          // Create minimal profile with just name
          const { error: profileError } = await supabaseAdmin
            .from("profiles")
            .insert([{
              user_id: newUser.user.id,
              first_name: userData.firstName,
              last_name: userData.lastName,
            }]);
            
          if (profileError) {
            console.error("Error creating minimal user profile:", profileError);
          } else {
            console.log("Minimal user profile created successfully");
          }
        }
      } catch (err) {
        console.error("Error while creating user profile:", err);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "User account created successfully",
        userId: newUser.user?.id,
        temporaryPassword,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  } catch (error: any) {
    console.error("Error in create-approved-user function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
