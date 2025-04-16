
import { Loader2 } from "lucide-react";
import FellowCard from "./FellowCard";
import { Fellow } from "@/types/fellow";

interface FellowListProps {
  fellows: Fellow[];
  loading: boolean;
}

const FellowList = ({ fellows, loading }: FellowListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 text-pareto-pink animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {fellows.length > 0 ? (
        fellows.map((fellow) => <FellowCard key={fellow.id} fellow={fellow} />)
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-400">
            No fellows found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default FellowList;
