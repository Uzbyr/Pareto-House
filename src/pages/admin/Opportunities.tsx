import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Star, Upload, X } from "lucide-react";
import { useLogoUpload } from "@/hooks/useLogoUpload";

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
  const { logoFile, setLogoFile, uploadLogo, isUploading } = useLogoUpload();

  const form = useForm<OpportunityFormData>({
    defaultValues: {
      position: "",
      company: "",
      company_logo: "",
      location: "",
      description: "",
      requirements: "",
      tags: "",
      featured: false,
    },
  });

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
      // Upload logo if file is selected
      let logoUrl = data.company_logo;
      if (logoFile) {
        const uploadedUrl = await uploadLogo();
        if (uploadedUrl) {
          logoUrl = uploadedUrl;
        }
      }

      const { error } = await supabase.from("opportunities").insert({
        ...data,
        company_logo: logoUrl,
        tags: data.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opportunities"] });
      toast.success("Opportunity created successfully");
      setIsDialogOpen(false);
      form.reset();
      setLogoFile(null);
    },
    onError: (error) => {
      toast.error("Failed to create opportunity");
      console.error(error);
    },
  });

  // Update opportunity mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: OpportunityFormData }) => {
      // Upload logo if file is selected
      let logoUrl = data.company_logo;
      if (logoFile) {
        const uploadedUrl = await uploadLogo();
        if (uploadedUrl) {
          logoUrl = uploadedUrl;
        }
      }

      const { error } = await supabase
        .from("opportunities")
        .update({
          ...data,
          company_logo: logoUrl,
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
      form.reset();
      setLogoFile(null);
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
    form.reset({
      position: opportunity.position,
      company: opportunity.company,
      company_logo: opportunity.company_logo || "",
      location: opportunity.location,
      description: opportunity.description,
      requirements: opportunity.requirements,
      tags: opportunity.tags.join(", "),
      featured: opportunity.featured,
    });
    setLogoFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingOpportunity(null);
    form.reset();
    setLogoFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setLogoFile(file);
    }
  };

  const removeSelectedFile = () => {
    setLogoFile(null);
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingOpportunity ? "Edit Opportunity" : "Create New Opportunity"}
              </DialogTitle>
              <DialogDescription>
                {editingOpportunity
                  ? "Update the opportunity details below."
                  : "Fill in the details to create a new opportunity."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Software Engineering Intern" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., OpenAI" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Company Logo Upload Section */}
                <div className="space-y-2">
                  <FormLabel>Company Logo</FormLabel>
                  <div className="space-y-3">
                    {logoFile ? (
                      <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg border border-zinc-700">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center">
                            <Upload className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{logoFile.name}</p>
                            <p className="text-xs text-gray-400">
                              {(logoFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeSelectedFile}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-zinc-700 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-400 mb-2">
                          Upload company logo (optional)
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-zinc-800 border border-zinc-600 rounded-md hover:bg-zinc-700"
                        >
                          Choose File
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="company_logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder="Or enter logo URL directly" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., San Francisco, CA (Remote)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Describe the opportunity..."
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="List the requirements..."
                          className="min-h-[80px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="AI, Machine Learning, Remote (comma-separated)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="rounded"
                        />
                      </FormControl>
                      <FormLabel>Featured Opportunity</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-pareto-pink text-black hover:bg-pareto-pink/80"
                    disabled={createMutation.isPending || updateMutation.isPending || isUploading}
                  >
                    {isUploading ? "Uploading..." : editingOpportunity ? "Update" : "Create"} Opportunity
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-400">Loading opportunities...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="bg-zinc-800 border-zinc-700">
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
                <p className="text-gray-300 text-sm">{opportunity.location}</p>
                <p className="text-gray-300 text-sm line-clamp-3">
                  {opportunity.description}
                </p>
                <div className="flex flex-wrap gap-2">
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
              </CardContent>
              <CardFooter className="flex justify-end space-x-2 border-t border-zinc-700 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(opportunity)}
                  className="border-zinc-600 text-gray-300 hover:bg-zinc-700"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(opportunity.id)}
                  className="border-red-600 text-red-400 hover:bg-red-600/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Opportunities;
