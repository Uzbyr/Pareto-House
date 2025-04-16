
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EducationFormProps {
  formData: {
    university: string;
    major: string;
    graduation_year: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const EducationForm = ({
  formData,
  handleInputChange,
}: EducationFormProps) => {
  return (
    <>
      <h3 className="text-lg font-medium text-white">Education</h3>

      <div>
        <Label htmlFor="university">University</Label>
        <Input
          id="university"
          name="university"
          value={formData.university}
          onChange={handleInputChange}
          className="bg-zinc-700 border-zinc-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="major">Major</Label>
          <Input
            id="major"
            name="major"
            value={formData.major}
            onChange={handleInputChange}
            className="bg-zinc-700 border-zinc-600"
          />
        </div>

        <div>
          <Label htmlFor="graduation_year">Graduation Year</Label>
          <Input
            id="graduation_year"
            name="graduation_year"
            value={formData.graduation_year}
            onChange={handleInputChange}
            className="bg-zinc-700 border-zinc-600"
          />
        </div>
      </div>
    </>
  );
};

export default EducationForm;
