import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface GetUserByEmailRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Starting get-user-by-email function");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request (CORS preflight)");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if environment variables are set
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
        },
      );
    }

    // Parse request body
    const requestBody = await req.text();
    const { email } = JSON.parse(requestBody) as GetUserByEmailRequest;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Searching for user with email:", email);

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Use the admin API to get user by email directly
    const { data, error } = await supabase.auth.admin.listUsers({
      filter: {
        email: email,
      },
    });

    if (error) {
      console.error("Error fetching user by email:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Check if user was found
    if (!data || !data.users || data.users.length === 0) {
      console.log("No user found with email:", email);
      return new Response(JSON.stringify({ userId: null }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Return the user ID
    const userId = data.users[0].id;
    console.log("Found user ID:", userId);

    return new Response(JSON.stringify({ userId }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
