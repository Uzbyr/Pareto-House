
import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, Star } from "lucide-react";
import ApplicationModal from "@/components/fellowship/ApplicationModal";
import OpportunityCard from "@/components/fellowship/OpportunityCard";
import OpportunityFilters from "@/components/fellowship/OpportunityFilters";
import { useOpportunityManagement } from "@/hooks/useOpportunityManagement";

const FellowOpportunities = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedTags,
    setSelectedTags,
    applicationModal,
    featuredOpportunities,
    allOpportunities,
    isLoading,
    error,
    handleApplyClick,
    closeApplicationModal,
    getFellowName,
    clearFilters,
  } = useOpportunityManagement();

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
      <OpportunityFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />

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
                  <OpportunityCard 
                    key={opportunity.id} 
                    opportunity={opportunity} 
                    onApply={handleApplyClick}
                  />
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
                  <OpportunityCard 
                    key={opportunity.id} 
                    opportunity={opportunity} 
                    onApply={handleApplyClick}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-10">
                  <p className="text-gray-400 text-lg">
                    No opportunities match your filters.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-zinc-600 text-white hover:bg-zinc-700"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Application Modal */}
      {applicationModal.opportunity && (
        <ApplicationModal
          isOpen={applicationModal.isOpen}
          onClose={closeApplicationModal}
          opportunity={applicationModal.opportunity}
          fellowName={getFellowName()}
        />
      )}
    </div>
  );
};

export default FellowOpportunities;
