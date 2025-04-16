
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface PasswordStrength {
  score: number;
  isStrong: boolean;
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const usePasswordManagement = () => {
  const { changePassword } = useAuth();
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    isStrong: false,
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  useEffect(() => {
    const { newPassword } = passwordData;
    const hasMinLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    let score = 0;
    if (hasMinLength) score += 1;
    if (hasUppercase) score += 1;
    if (hasLowercase) score += 1;
    if (hasNumber) score += 1;

    const isStrong = score >= 3;

    setPasswordStrength({
      score,
      isStrong,
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial: false,
    });
  }, [passwordData.newPassword]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStrengthColor = () => {
    if (passwordStrength.score <= 1) return "bg-red-500";
    if (passwordStrength.score === 2) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (!passwordStrength.isStrong) {
      toast.error("Please create a stronger password");
      return;
    }

    setPasswordLoading(true);
    try {
      const success = await changePassword(passwordData.newPassword);
      
      if (success) {
        toast.success("Password changed successfully");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred while changing your password");
      console.error("Password change error:", error);
    } finally {
      setPasswordLoading(false);
    }
  };

  return {
    passwordData,
    passwordStrength,
    passwordLoading,
    showPassword,
    setShowPassword,
    handlePasswordChange,
    handleChangePassword,
    getStrengthColor,
  };
};
