
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hasAdminPrivileges } from "@/utils/authUtils";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      const success = await login(email, password);

      if (success) {
        toast.success("Login successful!");
        
        // Redirect based on user role
        if (user?.role === "fellow") {
          navigate("/fellowship", { replace: true });
        } else if (user?.role === "alumni") {
          navigate("/alumni", { replace: true });
        } else {
          // Admin or super_admin
          navigate("/admin/dashboard", { replace: true });
        }
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-800 border-zinc-700 p-8">
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="Pareto Logo" className="h-12 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white">Login</h1>
          <p className="text-zinc-400 mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-zinc-700 border-zinc-600 text-white"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-pareto-pink hover:bg-pink-600 text-black font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

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
