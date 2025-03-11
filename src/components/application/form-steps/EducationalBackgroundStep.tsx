
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
import { Check } from "lucide-react";

interface EducationalBackgroundStepProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
  availableUniversities: string[];
  requiresPreparatoryQuestion: () => boolean;
}

const EducationalBackgroundStep = memo(({ 
  formData, 
  handleInputChange, 
  handleSelectChange,
  handleFileChange,
  availableUniversities,
  requiresPreparatoryQuestion
}: EducationalBackgroundStepProps) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-4">Educational Background</h2>
    <div className="space-y-2">
      <Label htmlFor="university">University<span className="text-red-500">*</span></Label>
      <Select
        value={formData.university}
        onValueChange={(value) => handleSelectChange("university", value)}
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

    {formData.university === "Other" && (
      <div className="space-y-2">
        <Label htmlFor="otherUniversity">Specify University</Label>
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
          Have you taken preparatory classes (classes préparatoires) in the French education system?
        </Label>
        <Select
          value={formData.preparatoryClasses}
          onValueChange={(value) => handleSelectChange("preparatoryClasses", value)}
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
      <Label htmlFor="major">Major<span className="text-red-500">*</span></Label>
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
    <div className="space-y-2">
      <Label htmlFor="graduationYear">Graduation Year<span className="text-red-500">*</span></Label>
      <Select
        value={formData.graduationYear}
        onValueChange={(value) => handleSelectChange("graduationYear", value)}
      >
        <SelectTrigger className="bg-zinc-800 border-zinc-700">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
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
      <Label htmlFor="studentSocieties">Student Societies</Label>
      <Textarea
        id="studentSocieties"
        name="studentSocieties"
        placeholder="Are you part of any student societies or organizations? Please list them."
        value={formData.studentSocieties}
        onChange={handleInputChange}
        className="bg-zinc-800 border-zinc-700 min-h-[80px]"
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
      />
      {formData.resumeFile && (
        <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
          <Check className="h-4 w-4" /> {formData.resumeFile.name}
        </p>
      )}
    </div>
  </div>
));

export default EducationalBackgroundStep;
