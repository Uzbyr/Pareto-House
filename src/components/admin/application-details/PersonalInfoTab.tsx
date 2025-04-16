
import React from "react";
import { MapPin } from "lucide-react";
import { Application } from "@/types/application";
import FlagEmoji from "@/components/ui/flag-emoji";

interface PersonalInfoTabProps {
  application: Application;
}

const PersonalInfoTab = ({ application }: PersonalInfoTabProps) => {
  return (
    <div className="bg-zinc-900 rounded-md p-4 space-y-3">
      <div>
        <span className="text-sm text-gray-400">Name:</span>
        <p className="text-white">{application.name}</p>
      </div>
      <div>
        <span className="text-sm text-gray-400">Email:</span>
        <p className="text-white">{application.email}</p>
      </div>
      {application.country && (
        <div>
          <span className="text-sm text-gray-400">Country:</span>
          <p className="text-white flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
            <FlagEmoji nationality={application.country} showName={true} />
          </p>
        </div>
      )}
      {application.nationality && (
        <div>
          <span className="text-sm text-gray-400">Nationality:</span>
          <p className="text-white flex items-center">
            <FlagEmoji nationality={application.nationality} showName={true} />
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoTab;
