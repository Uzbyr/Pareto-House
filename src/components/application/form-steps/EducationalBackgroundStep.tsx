import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Award } from "lucide-react";

interface EducationalBackgroundStepProps {
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => void;
  availableUniversities: string[];
  requiresPreparatoryQuestion: () => boolean;
}

const EducationalBackgroundStep = memo(
  ({
    formData,
    handleInputChange,
    handleSelectChange,
    handleFileChange,
    availableUniversities,
    requiresPreparatoryQuestion,
  }: EducationalBackgroundStepProps) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Background</h2>

      <div className="space-y-2">
        <Label htmlFor="currentSituation">
          Current Situation<span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.currentSituation}
          onValueChange={(value) => handleSelectChange("currentSituation", value)}
        >
          <SelectTrigger className="bg-zinc-800 border-zinc-700">
            <SelectValue placeholder="Select your current situation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="employee">Employee</SelectItem>
            <SelectItem value="founder">Founder</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="educationBackground">
          Education Background<span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.educationBackground}
          onValueChange={(value) => handleSelectChange("educationBackground", value)}
        >
          <SelectTrigger className="bg-zinc-800 border-zinc-700">
            <SelectValue placeholder="Select your education background" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="university">University</SelectItem>
            <SelectItem value="highSchool">High School</SelectItem>
            <SelectItem value="graduateSchool">Graduate School</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.educationBackground === "university" && (
        <>
          {formData.country !== "Other" && (
            <div className="space-y-2">
              <Label htmlFor="university">
                University<span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.university}
                onValueChange={(value) =>
                  handleSelectChange("university", value)
                }
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select your university" />
                </SelectTrigger>
                <SelectContent>
                  {availableUniversities.map((uni) => (
                    <SelectItem key={uni} value={uni}>
                      {uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.university === "Other" && (
            <div className="space-y-2">
              <Label htmlFor="otherUniversity">
                {formData.country === "Other"
                  ? "University"
                  : "Specify University"}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="otherUniversity"
                name="otherUniversity"
                placeholder="Enter your university name"
                value={formData.otherUniversity}
                onChange={handleInputChange}
                className="bg-zinc-800 border-zinc-700"
                required
              />
            </div>
          )}

          {requiresPreparatoryQuestion() && (
            <div className="space-y-2">
              <Label htmlFor="preparatoryClasses">
                Have you taken preparatory classes (classes préparatoires) in
                the French education system?
              </Label>
              <Select
                value={formData.preparatoryClasses}
                onValueChange={(value) =>
                  handleSelectChange("preparatoryClasses", value)
                }
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

          <div className="space-y-2">
            <Label htmlFor="major">
              Major<span className="text-red-500">*</span>
            </Label>
            <Input
              id="major"
              name="major"
              placeholder="Enter your major"
              value={formData.major}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              required
            />
          </div>
        </>
      )}

      {formData.educationBackground === "highSchool" && (
        <div className="space-y-2">
          <Label htmlFor="highSchool">
            High School<span className="text-red-500">*</span>
          </Label>
          <Input
            id="highSchool"
            name="highSchool"
            placeholder="Enter your high school name"
            value={formData.highSchool}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700"
            required
          />
        </div>
      )}

      {formData.educationBackground === "graduateSchool" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="graduateSchool">
              Graduate School<span className="text-red-500">*</span>
            </Label>
            <Input
              id="graduateSchool"
              name="graduateSchool"
              placeholder="Enter your graduate school name"
              value={formData.graduateSchool}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="graduateProgram">
              Program/Degree<span className="text-red-500">*</span>
            </Label>
            <Input
              id="graduateProgram"
              name="graduateProgram"
              placeholder="Enter your program or degree (e.g., PhD in Physics, Master's in CS)"
              value={formData.graduateProgram}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              required
            />
          </div>
        </>
      )}

      {formData.educationBackground === "other" && (
        <div className="space-y-2">
          <Label htmlFor="otherEducation">
            Please specify your education background<span className="text-red-500">*</span>
          </Label>
          <Input
            id="otherEducation"
            name="otherEducation"
            placeholder="Describe your education background"
            value={formData.otherEducation}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700"
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="graduationYear">
          Graduation Year<span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.graduationYear}
          onValueChange={(value) => handleSelectChange("graduationYear", value)}
        >
          <SelectTrigger className="bg-zinc-800 border-zinc-700">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2020">2020</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2026">2026</SelectItem>
            <SelectItem value="2027">2027</SelectItem>
            <SelectItem value="2028">2028</SelectItem>
            <SelectItem value="2029">2029</SelectItem>
            <SelectItem value="2030">2030</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryOfInterest">
          Which category are you most interested in?<span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.categoryOfInterest}
          onValueChange={(value) =>
            handleSelectChange("categoryOfInterest", value)
          }
        >
          <SelectTrigger className="bg-zinc-800 border-zinc-700">
            <SelectValue placeholder="Select your category of interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="computerScience">Computer Science</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="artificialIntelligence">Artificial Intelligence</SelectItem>
            <SelectItem value="dataScience">Data Science</SelectItem>
            <SelectItem value="robotics">Robotics</SelectItem>
            <SelectItem value="quantumComputing">Quantum Computing</SelectItem>
            <SelectItem value="biochemistry">Biochemistry</SelectItem>
            <SelectItem value="materialScience">Material Science</SelectItem>
            <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
            <SelectItem value="research">Research</SelectItem>
            <SelectItem value="fintech">Fintech</SelectItem>
            <SelectItem value="blockchain">Blockchain/Crypto</SelectItem>
            <SelectItem value="biotech">Biotech</SelectItem>
            <SelectItem value="climatetech">Climate Tech</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.categoryOfInterest && (
        <div className="space-y-2">
          <Label htmlFor="hasCompetitionExperience">
            Have you participated in national or international competitions in
            your field of interest?
          </Label>
          <Select
            value={formData.hasCompetitionExperience}
            onValueChange={(value) =>
              handleSelectChange("hasCompetitionExperience", value)
            }
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

      {formData.hasCompetitionExperience === "yes" && (
        <div className="space-y-2">
          <Label
            htmlFor="competitionResults"
            className="flex items-center gap-2"
          >
            <Award className="h-4 w-4" />
            Competition Results
          </Label>
          <Textarea
            id="competitionResults"
            name="competitionResults"
            placeholder="Please describe your competition experiences and results"
            value={formData.competitionResults}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700 min-h-[80px]"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="projects">Projects<span className="text-red-500">*</span></Label>
        <Textarea
          id="projects"
          name="projects"
          placeholder="List and detail the most impressive projects / startups / research you've been working on."
          value={formData.projects}
          onChange={handleInputChange}
          className="bg-zinc-800 border-zinc-700 min-h-[80px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resumeFile">Resume (PDF)<span className="text-red-500">*</span></Label>
        <Input
          id="resumeFile"
          name="resumeFile"
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, "resumeFile")}
          className="bg-zinc-800 border-zinc-700 file:bg-zinc-700 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3"
          required
        />
        {formData.resumeFile && (
          <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
            <Check className="h-4 w-4" /> {formData.resumeFile.name}
          </p>
        )}
      </div>
    </div>
  ),
);

export default EducationalBackgroundStep;
