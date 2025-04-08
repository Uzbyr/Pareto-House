
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
