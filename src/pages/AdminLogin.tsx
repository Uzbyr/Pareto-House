
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hasAdminPrivileges } from "@/utils/authUtils";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or use default paths based on role
  const from = (location.state as any)?.from?.pathname || "/admin/dashboard";

  // If user is already authenticated, redirect based on role
  if (isAuthenticated && user) {
    if (hasAdminPrivileges(user.role)) {
      navigate("/admin/dashboard", { replace: true });
    } else if (user.role === "fellow") {
      navigate("/fellowship", { replace: true });
    } else if (user.role === "alumni") {
      navigate("/alumni", { replace: true });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email);

      if (success) {
        setMagicLinkSent(true);
        toast.success("Magic link sent! Check your email for login instructions.");
      } else {
        toast.error("Failed to send magic link. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-800 border-zinc-700 p-8">
        <div className="mb-8 text-center">
          <img
            src="/logo.png"
            alt="Pareto Logo"
            className="h-12 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-white">Login</h1>
          <p className="text-zinc-400 mt-2">
            Enter your email to receive a custom branded magic link
          </p>
        </div>

        {magicLinkSent ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Mail className="h-16 w-16 text-pareto-pink" />
            </div>
            <h2 className="text-xl font-medium text-white">Check your inbox</h2>
            <p className="text-zinc-400">
              We've sent a branded magic link to <span className="text-white">{email}</span>
            </p>
            <p className="text-zinc-400">
              Click the link in the email to sign in to your Pareto Fellowship account.
            </p>
            <Button
              onClick={() => setMagicLinkSent(false)}
              variant="outline"
              className="mt-4 border-zinc-700 hover:bg-zinc-700"
            >
              Use a different email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-zinc-700 border-zinc-600 text-white"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-pareto-pink hover:bg-pink-600 text-black font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Magic Link"}
            </Button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-zinc-500">
          <p>
            Don't have a fellowship account yet?{" "}
            <a href="/apply" className="text-pareto-pink hover:underline">
              Apply now
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
