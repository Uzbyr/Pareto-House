import React, { useState } from "react";
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
  Calendar,
  Briefcase,
  Award,
  TrendingUp,
  Star,
} from "lucide-react";

// Sample data for internship opportunities
const opportunities = [
  {
    id: 1,
    company: "OpenAI",
    position: "Research Intern - LLM Alignment",
    location: "San Francisco, CA (Hybrid)",
    type: "Internship",
    deadline: "May 15, 2025",
    description:
      "Work with our alignment team to improve AI models' capacity to follow complex human intentions safely and reliably.",
    requirements:
      "Strong background in ML, experience with transformer models, Python proficiency",
    tags: ["AI", "Machine Learning", "Research"],
    featured: true,
    applyUrl: "#apply",
  },
  {
    id: 2,
    company: "Anthropic",
    position: "AI Safety Engineering Intern",
    location: "Remote",
    type: "Internship",
    deadline: "May 28, 2025",
    description:
      "Join our team working on helpful, harmless, and honest AI systems. Help develop improved techniques for AI alignment and safety.",
    requirements: "ML background, interest in AI safety, strong coding skills",
    tags: ["AI Safety", "Deep Learning", "Python"],
    featured: true,
    applyUrl: "#apply",
  },
  {
    id: 3,
    company: "Stripe",
    position: "Software Engineering Intern",
    location: "Seattle, WA",
    type: "Internship",
    deadline: "June 1, 2025",
    description:
      "Build economic infrastructure for the internet by solving complex problems in payments, fraud prevention, and financial services.",
    requirements:
      "Strong coding skills, systems design knowledge, any language experience",
    tags: ["Fintech", "Payments", "Software Engineering"],
    featured: false,
    applyUrl: "#apply",
  },
  {
    id: 4,
    company: "Databricks",
    position: "Data Science Intern",
    location: "Remote",
    type: "Internship",
    deadline: "June 15, 2025",
    description:
      "Work with our team to build and improve our data science platform, helping organizations process massive amounts of data.",
    requirements:
      "Experience with Python/SQL, knowledge of ML frameworks, strong analytical skills",
    tags: ["Data Science", "Big Data", "Analytics"],
    featured: false,
    applyUrl: "#apply",
  },
  {
    id: 5,
    company: "Figma",
    position: "Product Design Intern",
    location: "New York, NY",
    type: "Internship",
    deadline: "May 20, 2025",
    description:
      "Help design the future of collaborative design tools. Work on user experience improvements and new feature designs.",
    requirements:
      "Design portfolio, experience with design tools, user research skills",
    tags: ["Design", "UX/UI", "Product"],
    featured: true,
    applyUrl: "#apply",
  },
  {
    id: 6,
    company: "Notion",
    position: "Product Engineering Intern",
    location: "Remote",
    type: "Internship",
    deadline: "June 30, 2025",
    description:
      "Join our team to build the next generation of productivity tools that help people and companies organize their work.",
    requirements:
      "React experience, interest in productivity software, CS fundamentals",
    tags: ["Product", "Frontend", "React"],
    featured: false,
    applyUrl: "#apply",
  },
];

// Filters for opportunity search
const tags = [
  "AI",
  "Machine Learning",
  "Software Engineering",
  "Data Science",
  "Design",
  "Product",
  "Remote",
  "Fintech",
];
const types = ["Internship", "Fellowship", "Grant", "Competition"];

const FellowOpportunities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Filter opportunities based on search term, tags, and type
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      opp.tags.some((tag) => selectedTags.includes(tag));

    const matchesType = !selectedType || opp.type === selectedType;

    return matchesSearch && matchesTags && matchesType;
  });

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

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
              {tags.map((tag) => (
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

          <div>
            <h3 className="text-white font-medium mb-3">Opportunity Type</h3>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <Badge
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedType === type
                      ? "bg-pareto-pink hover:bg-pareto-pink/80 text-black"
                      : "hover:bg-zinc-700"
                  }`}
                  onClick={() =>
                    setSelectedType(type === selectedType ? null : type)
                  }
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Featured Opportunities */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <Star className="h-5 w-5 text-pareto-pink mr-2" />
          Featured Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOpportunities
            .filter((opp) => opp.featured)
            .map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
        </div>
      </div>

      {/* All Opportunities */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <Briefcase className="h-5 w-5 text-pareto-pink mr-2" />
          All Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity) => (
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
                  setSelectedType(null);
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Opportunity Card Component
interface OpportunityCardProps {
  opportunity: (typeof opportunities)[0];
}

const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  return (
    <Card className="bg-zinc-800 border-zinc-700 overflow-hidden">
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
        <div className="flex items-center text-gray-300">
          <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
          <span>{opportunity.location}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          <span>Deadline: {opportunity.deadline}</span>
        </div>
        <p className="text-gray-300">{opportunity.description}</p>

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-1">
            Requirements
          </h4>
          <p className="text-gray-300 text-sm">{opportunity.requirements}</p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {opportunity.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-gray-600 text-gray-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
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
