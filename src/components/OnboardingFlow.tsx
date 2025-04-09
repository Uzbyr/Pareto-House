
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/contexts/ProfileContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";
import { countries } from "@/components/application/utils/formUtils";
import { nationalities } from "@/utils/formConstants";

const OnboardingFlow = () => {
  const { profile, updateProfile, completeOnboarding } = useProfile();
  const { user, session } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    university: profile?.university || "",
    major: profile?.major || "",
    graduation_year: profile?.graduation_year || "",
    country: profile?.country || "",
    nationality: profile?.nationality || "",
    website_url: profile?.website_url || "",
    linkedin_url: profile?.linkedin_url || "",
    github_url: profile?.github_url || "",
    x_url: profile?.x_url || "",
    profile_picture_url: profile?.profile_picture_url || ""
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const uploadProfilePicture = async (): Promise<string | null> => {
    if (!profilePicture || !session) return null;

    try {
      const fileExtension = profilePicture.name.split(".").pop() || "";

      const filePath = `users/${session.user.id}/${Date.now()}.${fileExtension}`;

      const { error: uploadError, data } = await supabase.storage
        .from("profiles")
        .upload(filePath, profilePicture);

      if (uploadError) {
        toast.error("Failed to upload profile picture");
        console.error("Error uploading file:", uploadError);
        return null;
      }

      const { data: urlData } = supabase.storage
        .from("profiles")
        .getPublicUrl(filePath);
      return urlData.publicUrl;
    } catch (error) {
      console.error("Error in profile picture upload:", error);
      return null;
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.first_name || !formData.last_name) {
        toast.error("Please provide your first and last name");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let pictureUrl = formData.profile_picture_url;
      if (profilePicture) {
        const uploadedUrl = await uploadProfilePicture();
        if (uploadedUrl) {
          pictureUrl = uploadedUrl;
        }
      }

      await updateProfile({
        ...formData,
        profile_picture_url: pictureUrl,
      });

      await completeOnboarding();

      toast.success("Onboarding completed successfully!");

      if (user?.role === "fellow") {
        navigate("/fellowship");
      } else if (user?.role === "alumni") {
        navigate("/alumni");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting onboarding:", error);
      toast.error("There was an error completing your onboarding");
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            Personal Information
          </h1>
          <p className="text-gray-400">Tell us about yourself</p>
        </div>

        <div className="flex flex-col items-center space-y-4 mb-6">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={
                profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : formData.profile_picture_url || ""
              }
              alt="Profile"
            />
            <AvatarFallback className="bg-zinc-700 text-lg">
              {formData.first_name && formData.last_name
                ? `${formData.first_name[0]}${formData.last_name[0]}`
                : "PF"}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center">
            <Label
              htmlFor="picture"
              className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Upload size={16} />
              Upload Profile Picture
            </Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Label htmlFor="first_name">
              First Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="first_name"
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              placeholder="First Name"
              required
            />
          </div>
          <div className="w-full">
            <Label htmlFor="last_name">
              Last Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="last_name"
              name="last_name"
              value={formData.last_name || ""}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Label htmlFor="country">
              Country of Residence<span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleSelectChange("country", value)}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Label htmlFor="nationality">
              Nationality<span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.nationality}
              onValueChange={(value) => handleSelectChange("nationality", value)}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select your nationality" />
              </SelectTrigger>
              <SelectContent>
                {nationalities.map((nationality) => (
                  <SelectItem key={nationality} value={nationality}>
                    {nationality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-end">
            <Button
              onClick={handleNextStep}
              className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
            >
              Next Step
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Education</h1>
          <p className="text-gray-400">
            Tell us about your educational background
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="university">
              University<span className="text-red-500">*</span>
            </Label>
            <Input
              id="university"
              name="university"
              value={formData.university || ""}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              placeholder="University name"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <Label htmlFor="major">
                Major<span className="text-red-500">*</span>
              </Label>
              <Input
                id="major"
                name="major"
                value={formData.major || ""}
                onChange={handleInputChange}
                className="bg-zinc-800 border-zinc-700"
                placeholder="Your field of study"
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="graduation_year">
                Graduation Year<span className="text-red-500">*</span>
              </Label>
              <Input
                id="graduation_year"
                name="graduation_year"
                value={formData.graduation_year || ""}
                onChange={handleInputChange}
                className="bg-zinc-800 border-zinc-700"
                placeholder="Expected graduation year"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-between">
            <Button
              onClick={handlePrevStep}
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-800"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextStep}
              className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
            >
              Next Step
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Online Presence</h1>
          <p className="text-gray-400">Add your professional links</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
            <Input
              id="linkedin_url"
              name="linkedin_url"
              value={formData.linkedin_url || ""}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div>
            <Label htmlFor="github_url">GitHub Profile</Label>
            <Input
              id="github_url"
              name="github_url"
              value={formData.github_url || ""}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <Label htmlFor="website_url">Personal Website</Label>
            <Input
              id="website_url"
              name="website_url"
              value={formData.website_url || ""}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              placeholder="https://..."
            />
          </div>

          <div>
            <Label htmlFor="x_url">X (Twitter) Profile</Label>
            <Input
              id="x_url"
              name="x_url"
              value={formData.x_url || ""}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              placeholder="https://x.com/..."
            />
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-between">
            <Button
              onClick={handlePrevStep}
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-800"
            >
              Previous
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
            >
              {loading ? "Completing..." : "Complete Onboarding"}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-6 bg-zinc-800 border-zinc-700">
        <div className="w-full mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Step {step} of 3</span>
            <span className="text-sm text-gray-400">
              {step === 1
                ? "Personal Information"
                : step === 2
                  ? "Education"
                  : "Online Presence"}
            </span>
          </div>
          <div className="w-full bg-zinc-700 h-2 rounded-full">
            <div
              className="bg-pareto-pink h-2 rounded-full transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {renderCurrentStep()}
      </Card>
    </div>
  );
};

export default OnboardingFlow;
