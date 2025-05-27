
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

// Available filter tags (can be expanded based on actual data)
const availableTags = [
  "AI",
  "Machine Learning",
  "Software Engineering",
  "Data Science",
  "Design",
  "Product",
  "Remote",
  "Fintech",
  "Frontend",
  "Backend",
  "Full Stack",
  "Startup",
  "Big Tech",
];

interface OpportunityFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

const OpportunityFilters = ({
  searchTerm,
  setSearchTerm,
  selectedTags,
  setSelectedTags
}: OpportunityFiltersProps) => {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Card className="bg-zinc-800 border-zinc-700 p-6 mb-8">
      <div className="flex flex-col space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search opportunities..."
            className="pl-10 bg-zinc-700 border-zinc-600 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-white font-medium mb-3">Filter by Tags</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedTags.includes(tag)
                    ? "bg-pareto-pink hover:bg-pareto-pink/80 text-black"
                    : "hover:bg-zinc-700"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OpportunityFilters;
