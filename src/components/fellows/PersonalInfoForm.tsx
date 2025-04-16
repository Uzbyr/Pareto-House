
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PersonalInfoFormProps {
  formData: {
    first_name: string;
    last_name: string;
    about: string;
    country: string;
    nationality: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const PersonalInfoForm = ({
  formData,
  handleInputChange,
}: PersonalInfoFormProps) => {
  return (
    <>
      <h3 className="text-lg font-medium text-white">Personal Information</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="bg-zinc-700 border-zinc-600"
          />
        </div>

        <div>
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="bg-zinc-700 border-zinc-600"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="about">About</Label>
        <Textarea
          id="about"
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          className="bg-zinc-700 border-zinc-600 min-h-[120px]"
          placeholder="Tell others a bit about yourself"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="bg-zinc-700 border-zinc-600"
          />
        </div>

        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Input
            id="nationality"
            name="nationality"
            onChange={handleInputChange}
            value={formData.nationality}
            className="bg-zinc-700 border-zinc-600"
          />
        </div>
      </div>
    </>
  );
};

export default PersonalInfoForm;
