
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

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

interface ApplicationModal {
  isOpen: boolean;
  opportunity: Opportunity | null;
}

export const useOpportunityManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [applicationModal, setApplicationModal] = useState<ApplicationModal>({
    isOpen: false,
    opportunity: null,
  });
  const { session } = useAuth();

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

  const featuredOpportunities = filteredOpportunities.filter((opp) => opp.featured);
  const allOpportunities = filteredOpportunities;

  const handleApplyClick = (opportunity: Opportunity) => {
    setApplicationModal({
      isOpen: true,
      opportunity,
    });
  };

  const closeApplicationModal = () => {
    setApplicationModal({
      isOpen: false,
      opportunity: null,
    });
  };

  // Get fellow name from session user metadata
  const getFellowName = () => {
    if (session?.user?.user_metadata) {
      const { first_name, last_name } = session.user.user_metadata;
      return `${first_name || ''} ${last_name || ''}`.trim() || 'Fellow';
    }
    return 'Fellow';
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedTags,
    setSelectedTags,
    applicationModal,
    opportunities,
    filteredOpportunities,
    featuredOpportunities,
    allOpportunities,
    isLoading,
    error,
    handleApplyClick,
    closeApplicationModal,
    getFellowName,
    clearFilters,
  };
};
