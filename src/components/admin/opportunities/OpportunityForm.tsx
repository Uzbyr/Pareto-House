
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLogoUpload } from "@/hooks/useLogoUpload";
import LogoUpload from "./LogoUpload";

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

interface OpportunityFormProps {
  editingOpportunity: Opportunity | null;
  onSubmit: (data: OpportunityFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const OpportunityForm = ({ 
  editingOpportunity, 
  onSubmit, 
  onCancel, 
  isLoading 
}: OpportunityFormProps) => {
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

  // Reset form when editingOpportunity changes
  useEffect(() => {
    if (editingOpportunity) {
      form.reset({
        position: editingOpportunity.position || "",
        company: editingOpportunity.company || "",
        company_logo: editingOpportunity.company_logo || "",
        location: editingOpportunity.location || "",
        description: editingOpportunity.description || "",
        requirements: editingOpportunity.requirements || "",
        tags: editingOpportunity.tags?.join(", ") || "",
        featured: editingOpportunity.featured || false,
      });
    } else {
      form.reset({
        position: "",
        company: "",
        company_logo: "",
        location: "",
        description: "",
        requirements: "",
        tags: "",
        featured: false,
      });
    }
  }, [editingOpportunity, form]);

  const handleSubmit = async (data: OpportunityFormData) => {
    // Upload logo if file is selected
    let logoUrl = data.company_logo;
    if (logoFile) {
      const uploadedUrl = await uploadLogo();
      if (uploadedUrl) {
        logoUrl = uploadedUrl;
      }
    }

    onSubmit({
      ...data,
      company_logo: logoUrl,
    });
  };

  return (
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
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
          
          <LogoUpload
            logoFile={logoFile}
            setLogoFile={setLogoFile}
            companyLogoUrl={form.watch("company_logo")}
          />

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
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-pareto-pink text-black hover:bg-pareto-pink/80"
              disabled={isLoading || isUploading}
            >
              {isUploading ? "Uploading..." : editingOpportunity ? "Update" : "Create"} Opportunity
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default OpportunityForm;
