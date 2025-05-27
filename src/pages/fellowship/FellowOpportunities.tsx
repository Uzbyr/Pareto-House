
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
    opportunities,
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

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-400">Loading opportunities...</p>
        </div>
      ) : opportunities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Briefcase className="h-16 w-16 text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No opportunities yet</h3>
          <p className="text-gray-500 text-center max-w-md">
            Opportunities will appear here once they are posted. Check back soon for exclusive internships, grants, and competitions.
          </p>
        </div>
      ) : (
        <>
          {/* Search and filters */}
          <OpportunityFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />

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
