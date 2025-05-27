
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
import { Edit, Trash2, Star } from "lucide-react";

interface Opportunity {
  id: string;
  position: string;
  company: string;
  company_logo?: string;
  location: string;
  description: string;
  requirements: string;
  tags: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  onEdit: (opportunity: Opportunity) => void;
  onDelete: (id: string) => void;
}

const OpportunityCard = ({ opportunity, onEdit, onDelete }: OpportunityCardProps) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      onDelete(opportunity.id);
    }
  };

  return (
    <Card className="bg-zinc-800 border-zinc-700">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white">{opportunity.position}</CardTitle>
            <CardDescription className="text-gray-300 text-lg mt-1">
              {opportunity.company}
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
        <p className="text-gray-300 text-sm">{opportunity.location}</p>
        <p className="text-gray-300 text-sm line-clamp-3">
          {opportunity.description}
        </p>
        <div className="flex flex-wrap gap-2">
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
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t border-zinc-700 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(opportunity)}
          className="border-zinc-600 text-gray-300 hover:bg-zinc-700"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          className="border-red-600 text-red-400 hover:bg-red-600/20"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
