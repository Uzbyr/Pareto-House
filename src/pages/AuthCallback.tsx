
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This effect runs when the component mounts
    const handleAuthCallback = async () => {
      try {
        // Get the session data from the URL
        const { data, error } = await supabase.auth.getSession();
        
        console.log("Auth callback session data:", data);
        
        if (error) {
          console.error("Auth callback error:", error);
          navigate('/login');
          return;
        }
        
        if (data.session) {
          console.log("User authenticated, redirecting to dashboard");
          // Get user role to determine where to redirect
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            // Determine the redirect path based on user role
            // For now, redirect to admin dashboard or fellowship based on domain
            const isAdmin = user.email?.endsWith('@pareto20.com');
            
            if (isAdmin) {
              navigate('/admin/dashboard', { replace: true });
            } else {
              navigate('/fellowship', { replace: true });
            }
          } else {
            // Fallback to admin dashboard if unable to determine role
            navigate('/admin/dashboard', { replace: true });
          }
        } else {
          // No session found, redirect to login
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error("Error in auth callback:", error);
        navigate('/login', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 text-pareto-pink animate-spin mb-4" />
      <p className="text-white text-lg">Authenticating...</p>
    </div>
  );
};

export default AuthCallback;
