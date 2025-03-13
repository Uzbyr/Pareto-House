import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, CheckCircle, XCircle, Flag } from "lucide-react";

interface ApplicationFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
}

const ApplicationFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: ApplicationFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search applications..."
          className="pl-10 bg-zinc-900 border-zinc-700 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={statusFilter === null ? "pink" : "outline"}
          className={`${
            statusFilter === null
              ? ""
              : "border-zinc-700 text-gray-300 hover:bg-zinc-800"
          }`}
          onClick={() => setStatusFilter(null)}
        >
          All
        </Button>
        <Button
          variant={statusFilter === "pending" ? "pink" : "outline"}
          className={`${
            statusFilter === "pending"
              ? ""
              : "border-zinc-700 text-gray-300 hover:bg-zinc-800"
          }`}
          onClick={() => setStatusFilter("pending")}
        >
          <Clock className="h-4 w-4 mr-2" />
          Pending
        </Button>
        <Button
          variant={statusFilter === "approved" ? "pink" : "outline"}
          className={`${
            statusFilter === "approved"
              ? ""
              : "border-zinc-700 text-gray-300 hover:bg-zinc-800"
          }`}
          onClick={() => setStatusFilter("approved")}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Approved
        </Button>
        <Button
          variant={statusFilter === "rejected" ? "pink" : "outline"}
          className={`${
            statusFilter === "rejected"
              ? ""
              : "border-zinc-700 text-gray-300 hover:bg-zinc-800"
          }`}
          onClick={() => setStatusFilter("rejected")}
        >
          <XCircle className="h-4 w-4 mr-2" />
          Rejected
        </Button>
        <Button
          variant={statusFilter === "flagged" ? "pink" : "outline"}
          className={`${
            statusFilter === "flagged"
              ? ""
              : "border-zinc-700 text-gray-300 hover:bg-zinc-800"
          }`}
          onClick={() => setStatusFilter("flagged")}
        >
          <Flag className="h-4 w-4 mr-2" />
          Flagged
        </Button>
      </div>
    </div>
  );
};

export default ApplicationFilters;
