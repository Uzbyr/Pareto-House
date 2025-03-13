import React from "react";
import { Building } from "lucide-react";
import { Application } from "@/types/application";

interface ProjectTabProps {
  application: Application;
}

const ProjectTab = ({ application }: ProjectTabProps) => {
  return (
    <div className="bg-zinc-900 rounded-md p-4 space-y-3">
      {application.buildingCompany && (
        <div>
          <span className="text-sm text-gray-400">Building Company:</span>
          <p className="text-white flex items-center">
            <Building className="h-4 w-4 mr-1 text-gray-400" />
            {application.buildingCompany}
          </p>
        </div>
      )}
      {application.companyContext && (
        <div>
          <span className="text-sm text-gray-400">Company Context:</span>
          <p className="text-white whitespace-pre-wrap">
            {application.companyContext}
          </p>
        </div>
      )}
      {application.categoryOfInterest && (
        <div>
          <span className="text-sm text-gray-400">Category of Interest:</span>
          <p className="text-white">{application.categoryOfInterest}</p>
        </div>
      )}
      <div>
        <span className="text-sm text-gray-400">Submission Date:</span>
        <p className="text-white">{application.submissionDate}</p>
      </div>
      <div>
        <span className="text-sm text-gray-400">Status:</span>
        <p
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            application.status === "approved"
              ? "bg-green-400/10 text-green-400"
              : application.status === "rejected"
                ? "bg-red-400/10 text-red-400"
                : "bg-yellow-400/10 text-yellow-400"
          }`}
        >
          {application.status.charAt(0).toUpperCase() +
            application.status.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default ProjectTab;
