import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { changePassword, user, requirePasswordChange } = useAuth();
  const navigate = useNavigate();

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    isStrong: false,
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  useEffect(() => {
    // If user doesn't need to change password, redirect to appropriate dashboard
    if (!requirePasswordChange) {
      if (user?.role === "fellow" || user?.role === "alumni") {
        navigate("/fellowship");
      } else {
        navigate("/admin/dashboard");
      }
    }
  }, [requirePasswordChange, user, navigate]);

  // Check password strength
  useEffect(() => {
    const hasMinLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    // Calculate score
    let score = 0;
    if (hasMinLength) score += 1;
    if (hasUppercase) score += 1;
    if (hasLowercase) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;

    // Password is strong if it meets at least 4 criteria
    const isStrong = score >= 4;

    setPasswordStrength({
      score,
      isStrong,
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial,
    });
  }, [newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!passwordStrength.isStrong) {
      toast.error("Please create a stronger password");
      return;
    }

    setIsLoading(true);

    try {
      const success = await changePassword(newPassword);

      if (success) {
        toast.success("Password changed successfully");
        // Navigate to the appropriate dashboard based on role
        if (user?.role === "fellow" || user?.role === "alumni") {
          navigate("/fellowship");
        } else {
          navigate("/admin/dashboard");
        }
      } else {
        toast.error("Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred while changing your password");
      console.error("Password change error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Progress bar color based on strength
  const getStrengthColor = () => {
    if (passwordStrength.score <= 2) return "bg-red-500";
    if (passwordStrength.score === 3) return "bg-yellow-500";
    return "bg-green-500";
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
          <h1 className="text-2xl font-bold text-white">
            Change Your Password
          </h1>
          <p className="text-zinc-400 mt-2">
            Please create a strong password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-zinc-700 border-zinc-600 text-white pr-10"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-zinc-400" />
                ) : (
                  <Eye className="h-5 w-5 text-zinc-400" />
                )}
              </button>
            </div>

            {/* Password strength meter */}
            {newPassword && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-zinc-400 mb-1">
                  <span>Password strength</span>
                  <span
                    className={
                      passwordStrength.isStrong
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                  >
                    {passwordStrength.score > 0
                      ? `${passwordStrength.score}/5`
                      : "Very weak"}
                  </span>
                </div>
                <div className="h-1 w-full bg-zinc-700 rounded">
                  <div
                    className={`h-full rounded ${getStrengthColor()}`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  ></div>
                </div>

                <ul className="mt-3 space-y-1 text-xs">
                  <li
                    className={`flex items-center ${passwordStrength.hasMinLength ? "text-green-400" : "text-zinc-400"}`}
                  >
                    <div className="mr-1">
                      {passwordStrength.hasMinLength ? "✓" : "○"}
                    </div>
                    At least 8 characters
                  </li>
                  <li
                    className={`flex items-center ${passwordStrength.hasUppercase ? "text-green-400" : "text-zinc-400"}`}
                  >
                    <div className="mr-1">
                      {passwordStrength.hasUppercase ? "✓" : "○"}
                    </div>
                    Uppercase letter (A-Z)
                  </li>
                  <li
                    className={`flex items-center ${passwordStrength.hasLowercase ? "text-green-400" : "text-zinc-400"}`}
                  >
                    <div className="mr-1">
                      {passwordStrength.hasLowercase ? "✓" : "○"}
                    </div>
                    Lowercase letter (a-z)
                  </li>
                  <li
                    className={`flex items-center ${passwordStrength.hasNumber ? "text-green-400" : "text-zinc-400"}`}
                  >
                    <div className="mr-1">
                      {passwordStrength.hasNumber ? "✓" : "○"}
                    </div>
                    Number (0-9)
                  </li>
                  <li
                    className={`flex items-center ${passwordStrength.hasSpecial ? "text-green-400" : "text-zinc-400"}`}
                  >
                    <div className="mr-1">
                      {passwordStrength.hasSpecial ? "✓" : "○"}
                    </div>
                    Special character (!@#$%^&*...)
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-zinc-300 mb-1"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-zinc-700 border-zinc-600 text-white"
              required
            />
            {newPassword &&
              confirmPassword &&
              newPassword !== confirmPassword && (
                <p className="mt-1 text-xs text-red-400">
                  Passwords do not match
                </p>
              )}
          </div>

          <Button
            type="submit"
            className="w-full bg-pareto-pink hover:bg-pink-600 text-black font-medium"
            disabled={
              isLoading ||
              !passwordStrength.isStrong ||
              newPassword !== confirmPassword
            }
          >
            {isLoading ? (
              "Changing Password..."
            ) : (
              <>
                <ShieldCheck className="h-4 w-4 mr-2" />
                Change Password
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-500">
          <p className="flex items-center justify-center">
            <ShieldCheck className="h-4 w-4 mr-1 text-zinc-400" />
            Your password is securely stored and encrypted
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ChangePassword;
