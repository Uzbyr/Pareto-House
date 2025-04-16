
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/components/application/utils/formUtils";
import { nationalities } from "@/utils/formConstants";
import AboutTextarea from "./about/AboutTextarea";

const PersonalInfoStep = () => {
  const { 
    formData, 
    profilePicture, 
    handleInputChange, 
    handleFileChange, 
    handleSelectChange, 
    handleNextStep 
  } = useOnboarding();

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

      {/* Add About Textarea right after the profile picture section */}
      <AboutTextarea 
        value={formData.about || ""} 
        onChange={handleInputChange} 
      />

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

export default PersonalInfoStep;
