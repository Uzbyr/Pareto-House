
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdditionalInfoFormProps {
  formData: {
    video_url: string;
    preparatory_classes: string;
    student_societies: string;
    building_company: string;
    company_context: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const AdditionalInfoForm = ({
  formData,
  handleInputChange,
}: AdditionalInfoFormProps) => {
  return (
    <>
      <h3 className="text-lg font-medium text-white">Additional Information</h3>

      <div>
        <Label htmlFor="video_url">Presentation Video URL</Label>
        <Input
          id="video_url"
          name="video_url"
          value={formData.video_url}
          onChange={handleInputChange}
          className="bg-zinc-700 border-zinc-600"
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>

      <div>
        <Label htmlFor="preparatory_classes">Preparatory Classes</Label>
        <Input
          id="preparatory_classes"
          name="preparatory_classes"
          value={formData.preparatory_classes}
          onChange={handleInputChange}
          className="bg-zinc-700 border-zinc-600"
        />
      </div>

      <div>
        <Label htmlFor="student_societies">Student Societies</Label>
        <Input
          id="student_societies"
          name="student_societies"
          value={formData.student_societies}
          onChange={handleInputChange}
          className="bg-zinc-700 border-zinc-600"
        />
      </div>

      <div>
        <Label htmlFor="building_company">Building Company</Label>
        <Input
          id="building_company"
          name="building_company"
          value={formData.building_company}
          onChange={handleInputChange}
          className="bg-zinc-700 border-zinc-600"
        />
      </div>

      <div>
        <Label htmlFor="company_context">Company Context</Label>
        <Input
          id="company_context"
          name="company_context"
          value={formData.company_context}
          onChange={handleInputChange}
          className="bg-zinc-700 border-zinc-600"
        />
      </div>
    </>
  );
};

export default AdditionalInfoForm;
