
import React from "react";
import { GraduationCap, Users } from "lucide-react";
import { Application } from "@/types/application";

interface EducationTabProps {
  application: Application;
}

const EducationTab = ({ application }: EducationTabProps) => {
  return (
    <div className="bg-zinc-900 rounded-md p-4 space-y-3">
      <div>
        <span className="text-sm text-gray-400">Education Level:</span>
        <p className="text-white">
          <GraduationCap className="h-4 w-4 inline mr-1 text-gray-400" />
          {application.educationLevel || "Not specified"}
        </p>
      </div>
      {application.highSchool && (
        <div>
          <span className="text-sm text-gray-400">High School:</span>
          <p className="text-white">{application.highSchool}</p>
        </div>
      )}
      <div>
        <span className="text-sm text-gray-400">University:</span>
        <p className="text-white">{application.school}</p>
      </div>
      {application.major && (
        <div>
          <span className="text-sm text-gray-400">Major:</span>
          <p className="text-white">{application.major}</p>
        </div>
      )}
      {application.graduationYear && (
        <div>
          <span className="text-sm text-gray-400">Expected Graduation:</span>
          <p className="text-white">{application.graduationYear}</p>
        </div>
      )}
      {application.preparatoryClasses && (
        <div>
          <span className="text-sm text-gray-400">Preparatory Classes:</span>
          <p className="text-white">{application.preparatoryClasses}</p>
        </div>
      )}
      {application.studentSocieties && (
        <div>
          <span className="text-sm text-gray-400">Student Societies:</span>
          <p className="text-white">
            <Users className="h-4 w-4 inline mr-1 text-gray-400" />
            {application.studentSocieties}
          </p>
        </div>
      )}
    </div>
  );
};

export default EducationTab;
