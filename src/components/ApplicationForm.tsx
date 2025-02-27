
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
  graduationYear: z.string().min(4, { message: "Graduation year is required" }),
  interests: z.string().min(10, { message: "Please describe your interests (min 10 characters)" }),
  referral: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ApplicationFormProps {
  onSubmitSuccess?: () => void;
}

const ApplicationForm = ({ onSubmitSuccess }: ApplicationFormProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 3;

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
      graduationYear: "",
      interests: "",
      referral: "",
    },
  });

  const watchedFields = watch();

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

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Application submitted:", data);
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
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.university && (
                <p className="text-red-500 text-sm">{errors.university.message}</p>
              )}
            </div>
            
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
