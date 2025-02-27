
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isPareto20Email } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password");
      setLoading(false);
      return;
    }

    if (!isPareto20Email(email)) {
      toast.error("Access restricted to @pareto20.com email addresses only");
      setLoading(false);
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Login successful");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black p-4">
      <div className="w-full max-w-md space-y-8 bg-zinc-800/50 backdrop-blur-sm p-8 rounded-xl border border-zinc-700/50 shadow-xl">
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 text-gray-400 hover:text-white"
          >
            ← Back to Homepage
          </Button>
          <h2 className="text-3xl font-bold text-pareto-pink">Admin Portal</h2>
          <p className="mt-2 text-gray-400">Sign in to access the admin dashboard</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 bg-zinc-900/70 border-zinc-700 text-white"
                placeholder="name@pareto20.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-400">Only @pareto20.com email addresses are allowed</p>
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 bg-zinc-900/70 border-zinc-700 text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="pink"
            className="w-full py-6"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

