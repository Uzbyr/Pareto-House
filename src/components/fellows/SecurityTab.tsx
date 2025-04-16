
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { usePasswordManagement } from "@/hooks/usePasswordManagement";

const SecurityTab: React.FC = () => {
  const {
    passwordData,
    passwordStrength,
    passwordLoading,
    showPassword,
    setShowPassword,
    handlePasswordChange,
    handleChangePassword,
    getStrengthColor,
  } = usePasswordManagement();

  return (
    <Card className="bg-zinc-800 border-zinc-700 p-6">
      <h3 className="text-xl font-medium text-white mb-6">Change Password</h3>
      
      <form onSubmit={handleChangePassword} className="max-w-md space-y-6">
        <div>
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative">
            <Input
              id="currentPassword"
              name="currentPassword"
              type={showPassword ? "text" : "password"}
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="bg-zinc-800 border-zinc-700 pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-zinc-400" />
              ) : (
                <Eye className="h-5 w-5 text-zinc-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="bg-zinc-800 border-zinc-700 pr-10"
              required
            />
          </div>

          {passwordData.newPassword && (
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
                    ? `${passwordStrength.score}/4`
                    : "Very weak"}
                </span>
              </div>
              <div className="h-1 w-full bg-zinc-700 rounded">
                <div
                  className={`h-full rounded ${getStrengthColor()}`}
                  style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
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
              </ul>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="bg-zinc-800 border-zinc-700"
            required
          />
          {passwordData.newPassword &&
            passwordData.confirmPassword &&
            passwordData.newPassword !== passwordData.confirmPassword && (
              <p className="mt-1 text-xs text-red-400">
                Passwords do not match
              </p>
            )}
        </div>

        <Button
          type="submit"
          disabled={
            passwordLoading ||
            !passwordStrength.isStrong ||
            passwordData.newPassword !== passwordData.confirmPassword
          }
          className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
        >
          {passwordLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Changing Password...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-sm text-zinc-500">
        <p className="flex items-center">
          <ShieldCheck className="h-4 w-4 mr-1 text-zinc-400" />
          Your password is securely stored and encrypted
        </p>
      </div>
    </Card>
  );
};

export default SecurityTab;
