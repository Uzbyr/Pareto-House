import { Label } from "@/components/ui/label";

interface GraduationYearInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GraduationYearInput = ({ value, onChange }: GraduationYearInputProps) => {
  const years = Array.from({ length: 6 }, (_, i) => 2025 + i);

  return (
    <div className="mb-6">
      <Label htmlFor="graduationYear" className="block mb-2 text-white">
        Expected Graduation Year
      </Label>
      <select
        id="graduationYear"
        name="graduationYear"
        value={value}
        onChange={onChange}
        className="w-full p-3 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-pareto-pink"
      >
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GraduationYearInput;
