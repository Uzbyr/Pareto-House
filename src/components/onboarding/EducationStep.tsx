
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check, Award } from "lucide-react";

const EducationStep = () => {
  const { formData, handleInputChange, handleSelectChange, handleNextStep, handlePrevStep } = useOnboarding();

  // Education level options
  const educationLevels = [
    { value: "university", label: "University" },
    { value: "highSchool", label: "High School" },
  ];

  // Graduation year options
  const graduationYears = ["2025", "2026", "2027", "2028", "2029", "2030"];

  // Generate universities based on country (simplified for onboarding)
  const getUniversities = () => {
    const commonUniversities = [
      "MIT",
      "Stanford",
      "Harvard",
      "Oxford",
      "Cambridge",
      "ETH Zurich",
      "Polytechnique",
      "ENS",
      "HEC",
      "ESSEC",
      "Centrale Supélec",
      "Other"
    ];
    return commonUniversities;
  };

  // Check if preparatory question is needed
  const requiresPreparatoryQuestion = () => {
    const frenchUniversities = [
      "HEC",
      "ENS",
      "ESSEC",
      "Polytechnique",
      "Centrale Supélec",
    ];
    return frenchUniversities.includes(formData.university || "");
  };

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
          <Label htmlFor="educationLevel">
            Current Education<span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.education_level || "university"}
            onValueChange={(value) => handleSelectChange("education_level", value)}
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Select your education level" />
            </SelectTrigger>
            <SelectContent>
              {educationLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(formData.education_level === "university" || !formData.education_level) && (
          <>
            <div>
              <Label htmlFor="university">
                University<span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.university || ""}
                onValueChange={(value) => handleSelectChange("university", value)}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select your university" />
                </SelectTrigger>
                <SelectContent>
                  {getUniversities().map((uni) => (
                    <SelectItem key={uni} value={uni}>
                      {uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.university === "Other" && (
              <div>
                <Label htmlFor="otherUniversity">
                  Specify University<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="otherUniversity"
                  name="otherUniversity"
                  value={formData.otherUniversity || ""}
                  onChange={handleInputChange}
                  className="bg-zinc-800 border-zinc-700"
                  placeholder="Enter your university name"
                />
              </div>
            )}

            {requiresPreparatoryQuestion() && (
              <div>
                <Label htmlFor="preparatoryClasses">
                  Have you taken preparatory classes (classes préparatoires) in
                  the French education system?
                </Label>
                <Select
                  value={formData.preparatory_classes || ""}
                  onValueChange={(value) => handleSelectChange("preparatory_classes", value)}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="major">
                Major<span className="text-red-500">*</span>
              </Label>
              <Input
                id="major"
                name="major"
                value={formData.major || ""}
                onChange={handleInputChange}
                className="bg-zinc-800 border-zinc-700"
                placeholder="Enter your major"
              />
            </div>
          </>
        )}

        {formData.education_level === "highSchool" && (
          <div>
            <Label htmlFor="highSchool">
              High School<span className="text-red-500">*</span>
            </Label>
            <Input
              id="highSchool"
              name="high_school"
              value={formData.high_school || ""}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter your high school name"
            />
          </div>
        )}

        <div>
          <Label htmlFor="graduationYear">
            Graduation Year<span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.graduation_year || ""}
            onValueChange={(value) => handleSelectChange("graduation_year", value)}
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {graduationYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="categoryOfInterest">
            Which category of interest are you interested in?
          </Label>
          <Select
            value={formData.category_of_interest || ""}
            onValueChange={(value) => handleSelectChange("category_of_interest", value)}
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Select your category of interest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.category_of_interest && (
          <div>
            <Label htmlFor="hasCompetitionExperience">
              Have you participated in national or international competitions in
              your field of interest?
            </Label>
            <Select
              value={formData.has_competition_experience || ""}
              onValueChange={(value) => handleSelectChange("has_competition_experience", value)}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {formData.has_competition_experience === "yes" && (
          <div>
            <Label htmlFor="competitionResults">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Competition Results
              </div>
            </Label>
            <Textarea
              id="competitionResults"
              name="competition_results"
              value={formData.competition_results || ""}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700 min-h-[80px]"
              placeholder="Please describe your competition experiences and results"
            />
          </div>
        )}

        <div>
          <Label htmlFor="studentSocieties">Student Societies</Label>
          <Textarea
            id="studentSocieties"
            name="student_societies"
            value={formData.student_societies || ""}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700 min-h-[80px]"
            placeholder="Are you part of any student societies or organizations? Please list them."
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
