
import React from "react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useUniversityData } from "@/hooks/useUniversityData";

// Import our new component files
import EducationLevelSelect from "./education/EducationLevelSelect";
import UniversitySelect from "./education/UniversitySelect";
import HighSchoolInput from "./education/HighSchoolInput";
import MajorInput from "./education/MajorInput";
import GraduationYearSelect from "./education/GraduationYearSelect";
import PreparatoryClassesSelect from "./education/PreparatoryClassesSelect";
import CompetitionSection from "./education/CompetitionSection";
import StudentSocietiesTextarea from "./education/StudentSocietiesTextarea";

const EducationStep = () => {
  const { 
    formData, 
    handleInputChange, 
    handleSelectChange, 
    handleNextStep, 
    handlePrevStep 
  } = useOnboarding();
  
  const { universities, checkPreparatoryQuestion } = useUniversityData();

  const showPreparatoryQuestion = 
    formData.university && checkPreparatoryQuestion(formData.university);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Education</h1>
        <p className="text-gray-400">
          Tell us about your educational background
        </p>
      </div>

      <div className="space-y-4">
        <EducationLevelSelect 
          value={formData.education_level || "university"}
          onValueChange={(value) => handleSelectChange("education_level", value)}
        />

        {(formData.education_level === "university" || !formData.education_level) && (
          <>
            <UniversitySelect
              university={formData.university}
              otherUniversity={formData.otherUniversity}
              onSelectUniversity={(value) => handleSelectChange("university", value)}
              onOtherUniversityChange={handleInputChange}
              universities={universities}
            />

            {showPreparatoryQuestion && (
              <PreparatoryClassesSelect 
                value={formData.preparatory_classes}
                onValueChange={(value) => handleSelectChange("preparatory_classes", value)}
              />
            )}

            <MajorInput 
              value={formData.major}
              onChange={handleInputChange}
            />
          </>
        )}

        {formData.education_level === "highSchool" && (
          <HighSchoolInput 
            value={formData.high_school || ""}
            onChange={handleInputChange}
          />
        )}

        <GraduationYearSelect 
          value={formData.graduation_year}
          onValueChange={(value) => handleSelectChange("graduation_year", value)}
        />

        <CompetitionSection 
          categoryOfInterest={formData.category_of_interest}
          hasCompetitionExperience={formData.has_competition_experience}
          competitionResults={formData.competition_results}
          onSelectChange={handleSelectChange}
          onInputChange={handleInputChange}
        />

        <StudentSocietiesTextarea 
          value={formData.student_societies}
          onChange={handleInputChange}
        />
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
