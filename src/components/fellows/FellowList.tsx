
import { Loader2 } from "lucide-react";
import { useState } from "react";
import FellowCard from "./FellowCard";
import FellowDetailsModal from "./FellowDetailsModal";
import { Fellow } from "@/types/fellow";

interface FellowListProps {
  fellows: Fellow[];
  loading: boolean;
}

const FellowList = ({ fellows, loading }: FellowListProps) => {
  const [selectedFellow, setSelectedFellow] = useState<Fellow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFellowClick = (fellow: Fellow) => {
    setSelectedFellow(fellow);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 text-pareto-pink animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fellows.length > 0 ? (
          fellows.map((fellow) => (
            <FellowCard 
              key={fellow.id} 
              fellow={fellow} 
              onClick={handleFellowClick}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-400">
              No fellows found matching your search.
            </p>
          </div>
        )}
      </div>

      <FellowDetailsModal
        fellow={selectedFellow}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default FellowList;
