
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// Define the form schema with zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  school: z.string().min(1, {
    message: "Please select your school.",
  }),
  major: z.string().min(1, {
    message: "Please enter your major.",
  }),
  prepClass: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ApplicationForm = () => {
  const { submitApplication } = useAuth();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrepClassField, setShowPrepClassField] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      school: "",
      major: "",
      prepClass: "",
    },
  });

  // Handle school change to show/hide prep class field
  const handleSchoolChange = (value: string) => {
    const frenchSchools = ["HEC Paris", "Essec", "Polytechnique", "CentraleSupelec"];
    setShowPrepClassField(frenchSchools.includes(value));
    
    // Reset the prepClass value if not a French school
    if (!frenchSchools.includes(value)) {
      form.setValue("prepClass", "");
    }
  };

  // Handle resume file upload
  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Validate file type and size
      if (!file.type.match('application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size must be less than 5MB");
        return;
      }
      
      setResumeFile(file);
      toast.success("Resume uploaded successfully");
    }
  };

  // Handle video file upload
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Validate file type and size
      if (!file.type.match('video/mp4|video/quicktime|video/x-msvideo')) {
        toast.error("Please upload an MP4, MOV, or AVI video file");
        return;
      }
      
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast.error("File size must be less than 100MB");
        return;
      }
      
      setVideoFile(file);
      toast.success("Video uploaded successfully");
    }
  };

  // Submit handler
  const onSubmit = (values: FormValues) => {
    if (!videoFile) {
      toast.error("Please upload your 90-second presentation video");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate file upload delay
    setTimeout(() => {
      try {
        // In a real app, we would upload files to a server
        // For now, we'll just store the file names
        submitApplication({
          name: values.name,
          email: values.email,
          school: values.school,
          major: values.major,
          resume: resumeFile ? resumeFile.name : undefined,
          video: videoFile ? videoFile.name : undefined
        });
        
        // Show success message
        toast.success("Your application has been submitted successfully!");
        
        // Reset form
        form.reset();
        setResumeFile(null);
        setVideoFile(null);
        setShowPrepClassField(false);
      } catch (error) {
        console.error("Error submitting application:", error);
        toast.error("There was an error submitting your application");
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-zinc-900 p-6 rounded-lg border border-zinc-800 max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-white">Personal Information</h2>
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <h2 className="text-2xl font-bold text-white pt-4">Education</h2>
        
        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleSchoolChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Select your school" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="Harvard">Harvard</SelectItem>
                  <SelectItem value="Stanford">Stanford</SelectItem>
                  <SelectItem value="MIT">MIT</SelectItem>
                  <SelectItem value="Berkeley">Berkeley</SelectItem>
                  <SelectItem value="Princeton">Princeton</SelectItem>
                  <SelectItem value="Columbia">Columbia</SelectItem>
                  <SelectItem value="UPenn">UPenn</SelectItem>
                  <SelectItem value="Caltech">Caltech</SelectItem>
                  <SelectItem value="Cambridge">Cambridge</SelectItem>
                  <SelectItem value="Oxford">Oxford</SelectItem>
                  <SelectItem value="ETH Zurich">ETH Zurich</SelectItem>
                  <SelectItem value="UCL">UCL</SelectItem>
                  <SelectItem value="LSE">LSE</SelectItem>
                  <SelectItem value="Imperial">Imperial</SelectItem>
                  <SelectItem value="Polytechnique">Polytechnique</SelectItem>
                  <SelectItem value="CentraleSupelec">CentraleSupelec</SelectItem>
                  <SelectItem value="HEC Paris">HEC Paris</SelectItem>
                  <SelectItem value="Essec">Essec</SelectItem>
                  <SelectItem value="ENS">ENS</SelectItem>
                  <SelectItem value="McGill">McGill</SelectItem>
                  <SelectItem value="Trinity">Trinity</SelectItem>
                  <SelectItem value="TUT">TUT</SelectItem>
                  <SelectItem value="Tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Major/Field of Study</FormLabel>
              <FormControl>
                <Input placeholder="Enter your major or field of study" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {showPrepClassField && (
          <FormField
            control={form.control}
            name="prepClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preparatory Class</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select your preparatory class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="MP">MP</SelectItem>
                    <SelectItem value="PC">PC</SelectItem>
                    <SelectItem value="PSI">PSI</SelectItem>
                    <SelectItem value="PT">PT</SelectItem>
                    <SelectItem value="BCPST">BCPST</SelectItem>
                    <SelectItem value="ECS">ECS</SelectItem>
                    <SelectItem value="ECE">ECE</SelectItem>
                    <SelectItem value="ECT">ECT</SelectItem>
                    <SelectItem value="BL">BL</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Only for students from French schools.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white pt-4">Supporting Documents</h2>
          
          <div>
            <FormLabel className="block mb-2">Resume (Optional)</FormLabel>
            <Input
              type="file"
              className="bg-zinc-800 border-zinc-700"
              onChange={handleResumeChange}
              accept=".pdf,.doc,.docx"
            />
            <FormDescription>
              Upload your resume in PDF or Word format (max 5MB).
            </FormDescription>
            {resumeFile && (
              <p className="text-sm text-emerald-500 mt-1">
                File uploaded: {resumeFile.name}
              </p>
            )}
          </div>
          
          <div>
            <FormLabel className="block mb-2">
              90-Second Presentation Video <span className="text-red-500">*</span>
            </FormLabel>
            <Input
              type="file"
              className="bg-zinc-800 border-zinc-700"
              onChange={handleVideoChange}
              accept=".mp4,.mov,.avi"
              required
            />
            <FormDescription>
              Upload a 90-second video presenting yourself and why you want to join Pareto 20 (max 100MB).
            </FormDescription>
            {videoFile && (
              <p className="text-sm text-emerald-500 mt-1">
                File uploaded: {videoFile.name}
              </p>
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-pareto-pink hover:bg-pareto-pink/90" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </Form>
  );
};

export default ApplicationForm;
