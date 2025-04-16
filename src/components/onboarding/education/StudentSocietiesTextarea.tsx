
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StudentSocietiesTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const StudentSocietiesTextarea: React.FC<StudentSocietiesTextareaProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <Label htmlFor="studentSocieties">Student Societies</Label>
      <Textarea
        id="studentSocieties"
        name="student_societies"
        value={value || ""}
        onChange={onChange}
        className="bg-zinc-800 border-zinc-700 min-h-[80px]"
        placeholder="Are you part of any student societies or organizations? Please list them."
      />
    </div>
  );
};

export default StudentSocietiesTextarea;
