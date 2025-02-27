
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Form schema
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  university: z.string().min(2, { message: "University is required" }),
  major: z.string().min(2, { message: "Major is required" }),
  preparatoryClasses: z.string().optional(),
  graduationYear: z.string().min(4, { message: "Graduation year is required" }),
  interests: z.string().min(10, { message: "Please describe your interests (min 10 characters)" }),
  referral: z.string().optional(),
  videoPresentation: z.instanceof(FileList).optional().nullable(),
  resume: z.instanceof(FileList).optional().nullable(),
});

type FormData = z.infer<typeof formSchema>;

interface ApplicationFormProps {
  onSubmitSuccess?: () => void;
}

const ApplicationForm = ({ onSubmitSuccess }: ApplicationFormProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4; // Increased to 4 steps
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      university: "",
      major: "",
      preparatoryClasses: "",
      graduationYear: "",
      interests: "",
      referral: "",
    },
  });

  const watchedFields = watch();
  
  // Universities that trigger preparatory classes question
  const prepClassesUniversities = ["HEC", "Essec", "Polytechnique", "Centrale"];
  
  // Flag to check if we should show the preparatory classes question
  const showPrepClassesQuestion = prepClassesUniversities.includes(watchedFields.university);

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check if it's a video file
      if (!file.type.includes('video/')) {
        toast.error("Please upload a video file");
        e.target.value = '';
        return;
      }
      
      // Load the video to check its duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = function() {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        
        if (duration > 90) {
          toast.error("Video must be 90 seconds or less");
          e.target.value = '';
          setVideoFile(null);
        } else {
          setVideoFile(file);
          toast.success("Video uploaded successfully");
        }
      };
      
      video.src = URL.createObjectURL(file);
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check if it's a PDF or document file
      if (!file.type.includes('pdf') && !file.type.includes('document')) {
        toast.error("Please upload a PDF or document file");
        e.target.value = '';
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        e.target.value = '';
        return;
      }
      
      setResumeFile(file);
      toast.success("Resume uploaded successfully");
    }
  };

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    
    // Add file data
    const formData = new FormData();
    if (videoFile) {
      formData.append('videoPresentation', videoFile);
    }
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }
    
    // Simulate API call
    setTimeout(() => {
      console.log("Application submitted:", data);
      console.log("Video file:", videoFile);
      console.log("Resume file:", resumeFile);
      toast.success("Application submitted successfully!");
      setIsSubmitting(false);
      
      // Call the success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      
      // Redirect to homepage
      navigate("/");
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Your first name"
                  className="bg-zinc-800 border-zinc-700"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Your last name"
                  className="bg-zinc-800 border-zinc-700"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-zinc-800 border-zinc-700"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Education</h2>
            
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Select
                value={watchedFields.university}
                onValueChange={(value) => setValue("university", value)}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select your university" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Harvard">Harvard University</SelectItem>
                  <SelectItem value="MIT">MIT</SelectItem>
                  <SelectItem value="Stanford">Stanford University</SelectItem>
                  <SelectItem value="Berkeley">UC Berkeley</SelectItem>
                  <SelectItem value="Oxford">Oxford University</SelectItem>
                  <SelectItem value="Cambridge">Cambridge University</SelectItem>
                  <SelectItem value="Princeton">Princeton University</SelectItem>
                  <SelectItem value="Yale">Yale University</SelectItem>
                  <SelectItem value="Caltech">Caltech</SelectItem>
                  <SelectItem value="HEC">HEC Paris</SelectItem>
                  <SelectItem value="Essec">ESSEC Business School</SelectItem>
                  <SelectItem value="Polytechnique">École Polytechnique</SelectItem>
                  <SelectItem value="Centrale">École Centrale</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.university && (
                <p className="text-red-500 text-sm">{errors.university.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="major">Major / Field of Study</Label>
              <Input
                id="major"
                placeholder="e.g. Computer Science, Business, etc."
                className="bg-zinc-800 border-zinc-700"
                {...register("major")}
              />
              {errors.major && (
                <p className="text-red-500 text-sm">{errors.major.message}</p>
              )}
            </div>
            
            {showPrepClassesQuestion && (
              <div className="space-y-2">
                <Label htmlFor="preparatoryClasses">Did you attend preparatory classes?</Label>
                <Select
                  value={watchedFields.preparatoryClasses}
                  onValueChange={(value) => setValue("preparatoryClasses", value)}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Expected Graduation Year</Label>
              <Select
                value={watchedFields.graduationYear}
                onValueChange={(value) => setValue("graduationYear", value)}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select graduation year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                  <SelectItem value="2028">2028</SelectItem>
                </SelectContent>
              </Select>
              {errors.graduationYear && (
                <p className="text-red-500 text-sm">{errors.graduationYear.message}</p>
              )}
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Supporting Documents</h2>
            
            <div className="space-y-2">
              <Label htmlFor="videoPresentation">Video Presentation (90 seconds max)</Label>
              <div className="mt-1">
                <Input
                  id="videoPresentation"
                  type="file"
                  accept="video/*"
                  className="bg-zinc-800 border-zinc-700"
                  onChange={handleVideoChange}
                />
                <p className="text-sm text-gray-400 mt-1">
                  Please upload a short video (max 90 seconds) introducing yourself and why you want to join the fellowship.
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="resume">Resume / CV (Optional)</Label>
              <div className="mt-1">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="bg-zinc-800 border-zinc-700"
                  onChange={handleResumeChange}
                />
                <p className="text-sm text-gray-400 mt-1">
                  Optional: Upload your resume in PDF or Document format (max 5MB).
                </p>
              </div>
            </div>
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Additional Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="interests">Areas of Interest</Label>
              <Textarea
                id="interests"
                placeholder="Tell us about your interests, projects, and goals"
                className="min-h-32 bg-zinc-800 border-zinc-700"
                {...register("interests")}
              />
              {errors.interests && (
                <p className="text-red-500 text-sm">{errors.interests.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="referral">How did you hear about us? (Optional)</Label>
              <Select
                value={watchedFields.referral}
                onValueChange={(value) => setValue("referral", value)}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friend">From a friend</SelectItem>
                  <SelectItem value="social">Social media</SelectItem>
                  <SelectItem value="search">Search engine</SelectItem>
                  <SelectItem value="university">University event</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 md:p-8 shadow-xl">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
        <Progress value={(step / totalSteps) * 100} className="h-2" />
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderStep()}
        
        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              className="border-zinc-700 text-white hover:bg-zinc-800"
              onClick={prevStep}
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < totalSteps ? (
            <Button
              type="button"
              variant="pink"
              onClick={nextStep}
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              variant="pink"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
