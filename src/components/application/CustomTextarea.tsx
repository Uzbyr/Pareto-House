
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CustomTextareaProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
}

const CustomTextarea = ({ label, placeholder, name, value, onChange, maxLength }: CustomTextareaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    e.stopPropagation(); // Prevent event from bubbling up
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent form submission on Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };
  
  return (
    <div className="mb-6">
      <Label htmlFor={name} className="block mb-2 text-white">
        {label}
      </Label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full text-white bg-zinc-800 resize-none focus:outline-none focus:ring-1 focus:ring-pareto-pink"
        maxLength={maxLength}
        onClick={(e) => e.stopPropagation()} // Prevent form submission on click
      />
      {maxLength && (
        <div className="mt-2 text-sm text-zinc-400 text-right">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default CustomTextarea;
