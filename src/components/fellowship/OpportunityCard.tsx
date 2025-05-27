
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

interface Opportunity {
  id: string;
  position: string | null;
  company: string | null;
  company_logo: string | null;
  location: string | null;
  description: string | null;
  requirements: string | null;
  tags: string[] | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string | null;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onApply: (opportunity: Opportunity) => void;
}

const OpportunityCard = ({ opportunity, onApply }: OpportunityCardProps) => {
  return (
    <Card className="bg-zinc-800 border-zinc-700 overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-white">
              {opportunity.position || "Position Not Specified"}
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg mt-1 flex items-center">
              {opportunity.company_logo && (
                <img
                  src={opportunity.company_logo}
                  alt={`${opportunity.company} logo`}
                  className="w-6 h-6 object-contain rounded mr-2 bg-white"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              {opportunity.company || "Company Not Specified"}
            </CardDescription>
          </div>
          {opportunity.featured && (
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              <Star className="h-3 w-3 mr-1" /> Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {opportunity.location && (
          <div className="flex items-center text-gray-300">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{opportunity.location}</span>
          </div>
        )}
        
        {opportunity.description && (
          <p className="text-gray-300 line-clamp-3">
            {opportunity.description}
          </p>
        )}

        {opportunity.requirements && (
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-1">
              Requirements
            </h4>
            <p className="text-gray-300 text-sm line-clamp-2">
              {opportunity.requirements}
            </p>
          </div>
        )}

        {opportunity.tags && opportunity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {opportunity.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-zinc-700 pt-4">
        <Button 
          className="w-full bg-pareto-pink text-black hover:bg-pareto-pink/80"
          onClick={() => onApply(opportunity)}
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
