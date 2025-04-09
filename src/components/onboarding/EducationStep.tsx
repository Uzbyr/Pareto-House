
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

const EducationStep = () => {
  const { formData, handleInputChange, handleNextStep, handlePrevStep } = useOnboarding();

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

export default EducationStep;
