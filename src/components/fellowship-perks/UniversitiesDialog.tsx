
import React from "react";
import { School } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { targetUniversities } from "./universityData";

interface UniversitiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UniversitiesDialog: React.FC<UniversitiesDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <School className="w-5 h-5 text-pareto-pink" />
            Target Universities
          </DialogTitle>
          <DialogDescription>
            Pareto Fellows come from the world's most prestigious institutions
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {Object.entries(targetUniversities).map(
            ([country, universities]) => (
              <div
                key={country}
                className="bg-black/5 dark:bg-white/5 p-4 rounded-lg"
              >
                <h3 className="font-semibold text-lg mb-2">{country}</h3>
                <ul className="space-y-1">
                  {universities.map((university, index) => (
                    <li
                      key={index}
                      className="text-sm text-black/70 dark:text-white/70"
                    >
                      {university}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UniversitiesDialog;
