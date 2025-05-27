
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Briefcase,
  Star,
  MapPin,
} from "lucide-react";

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

const FellowOpportunities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Fetch opportunities from Supabase
  const { data: opportunities = [], isLoading, error } = useQuery({
    queryKey: ["fellowship-opportunities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("opportunities")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Opportunity[];
    },
  });

  // Filter opportunities based on search term and tags
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = !searchTerm || 
      (opp.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       opp.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       opp.description?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTags = selectedTags.length === 0 ||
      (opp.tags && opp.tags.some((tag) => selectedTags.includes(tag)));

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const featuredOpportunities = filteredOpportunities.filter((opp) => opp.featured);
  const allOpportunities = filteredOpportunities;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-10">
          <p className="text-red-400">Error loading opportunities: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Opportunities Board</h1>
        <p className="text-gray-400 mt-2">
          Exclusive internships, grants, and competitions for Pareto fellows
        </p>
      </div>

      {/* Search and filters */}
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

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-400">Loading opportunities...</p>
        </div>
      ) : (
        <>
          {/* Featured Opportunities */}
          {featuredOpportunities.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Star className="h-5 w-5 text-pareto-pink mr-2" />
                Featured Opportunities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            </div>
          )}

          {/* All Opportunities */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Briefcase className="h-5 w-5 text-pareto-pink mr-2" />
              All Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allOpportunities.length > 0 ? (
                allOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))
              ) : (
                <div className="col-span-2 text-center py-10">
                  <p className="text-gray-400 text-lg">
                    No opportunities match your filters.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-zinc-600 text-white hover:bg-zinc-700"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedTags([]);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Opportunity Card Component
interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
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
        <Button className="w-full bg-pareto-pink text-black hover:bg-pareto-pink/80">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FellowOpportunities;
