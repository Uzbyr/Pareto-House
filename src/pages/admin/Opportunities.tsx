
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import OpportunityCard from "@/components/admin/opportunities/OpportunityCard";
import OpportunityForm from "@/components/admin/opportunities/OpportunityForm";

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

interface OpportunityFormData {
  position: string;
  company: string;
  company_logo?: string;
  location: string;
  description: string;
  requirements: string;
  tags: string;
  featured: boolean;
}

const Opportunities = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);
  const queryClient = useQueryClient();

  // Fetch opportunities
  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("opportunities")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Opportunity[];
    },
  });

  // Create opportunity mutation
  const createMutation = useMutation({
    mutationFn: async (data: OpportunityFormData) => {
      const { error } = await supabase.from("opportunities").insert({
        ...data,
        tags: data.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });
      toast.success("Opportunity created successfully");
      setIsDialogOpen(false);
      setEditingOpportunity(null);
    },
    onError: (error) => {
      toast.error("Failed to create opportunity");
      console.error(error);
    },
  });

  // Update opportunity mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: OpportunityFormData }) => {
      const { error } = await supabase
        .from("opportunities")
        .update({
          ...data,
          tags: data.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });
      toast.success("Opportunity updated successfully");
      setIsDialogOpen(false);
      setEditingOpportunity(null);
    },
    onError: (error) => {
      toast.error("Failed to update opportunity");
      console.error(error);
    },
  });

  // Delete opportunity mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("opportunities").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });
      toast.success("Opportunity deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete opportunity");
      console.error(error);
    },
  });

  const onSubmit = (data: OpportunityFormData) => {
    if (editingOpportunity) {
      updateMutation.mutate({ id: editingOpportunity.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingOpportunity(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Opportunities Management</h1>
          <p className="text-gray-400 mt-2">
            Manage internships, grants, and competitions for fellows
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-pareto-pink text-black hover:bg-pareto-pink/80">
              <Plus className="h-4 w-4 mr-2" />
              Add Opportunity
            </Button>
          </DialogTrigger>
          <OpportunityForm
            editingOpportunity={editingOpportunity}
            onSubmit={onSubmit}
            onCancel={handleDialogClose}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-400">Loading opportunities...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Opportunities;
