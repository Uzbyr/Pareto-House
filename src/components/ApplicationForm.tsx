
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ApplicationFormProps {
  onSubmitSuccess?: () => void;
}

const ApplicationForm = ({ onSubmitSuccess }: ApplicationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    school: "",
    major: "",
    graduationYear: "",
    interests: "",
    preparatoryClasses: "",
    referral: "",
    videoUrl: "",
    resumeUrl: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create the application object with all form data
      const newApplication = {
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        school: formData.school,
        major: formData.major || "",
        graduationYear: formData.graduationYear || "",
        interests: formData.interests || "",
        preparatoryClasses: formData.preparatoryClasses || "no",
        referral: formData.referral || "",
        videoUrl: formData.videoUrl || "",
        resumeUrl: formData.resumeUrl || "",
        submissionDate: new Date().toISOString(),
        status: "pending",
      };

      // Store the application in localStorage for the admin dashboard
      const storedApps = localStorage.getItem('applications') || '[]';
      const applications = JSON.parse(storedApps);
      applications.push(newApplication);
      localStorage.setItem('applications', JSON.stringify(applications));
      
      // Update metrics
      const appCount = localStorage.getItem('applicationCount') || '0';
      localStorage.setItem('applicationCount', (parseInt(appCount) + 1).toString());
      
      setTimeout(() => {
        setLoading(false);
        setCurrentStep(4); // Success step
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      }, 1500);
    } catch (error) {
      console.error("Error submitting application:", error);
      setLoading(false);
      toast.error("There was an error submitting your application. Please try again.");
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-2"
              >
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-zinc-800 border-zinc-700"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-2"
              >
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-zinc-800 border-zinc-700"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={nextStep}
              className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
            >
              Next Step
            </Button>
          </div>
        </motion.div>
      )}

      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Educational Background</h2>
          <div className="mb-6">
            <label htmlFor="school" className="block text-sm font-medium mb-2">
              Current School
            </label>
            <Input
              id="school"
              name="school"
              placeholder="Enter your school name"
              value={formData.school}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="major" className="block text-sm font-medium mb-2">
              Major (Optional)
            </label>
            <Input
              id="major"
              name="major"
              placeholder="Enter your major"
              value={formData.major}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="graduationYear"
              className="block text-sm font-medium mb-2"
            >
              Expected Graduation Year
            </label>
            <Select
              value={formData.graduationYear}
              onValueChange={(value) =>
                handleSelectChange("graduationYear", value)
              }
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
                <SelectItem value="2028">2028</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="preparatoryClasses"
              className="block text-sm font-medium mb-2"
            >
              Have you taken any preparatory classes for this fellowship?
            </label>
            <Select
              value={formData.preparatoryClasses}
              onValueChange={(value) =>
                handleSelectChange("preparatoryClasses", value)
              }
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
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-800"
            >
              Previous Step
            </Button>
            <Button
              type="button"
              onClick={nextStep}
              className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
            >
              Next Step
            </Button>
          </div>
        </motion.div>
      )}

      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
          <div className="mb-6">
            <label htmlFor="interests" className="block text-sm font-medium mb-2">
              Areas of Interest
            </label>
            <Textarea
              id="interests"
              name="interests"
              placeholder="Tell us about your areas of interest"
              value={formData.interests}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700 min-h-[120px]"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="referral" className="block text-sm font-medium mb-2">
              How did you hear about us?
            </label>
            <Select
              value={formData.referral}
              onValueChange={(value) => handleSelectChange("referral", value)}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="social_media">Social Media</SelectItem>
                <SelectItem value="friend">Friend or Colleague</SelectItem>
                <SelectItem value="university">University</SelectItem>
                <SelectItem value="search">Search Engine</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-6">
            <label htmlFor="videoUrl" className="block text-sm font-medium mb-2">
              Link to Video Presentation (Optional)
            </label>
            <Input
              id="videoUrl"
              name="videoUrl"
              placeholder="Enter URL to your video presentation"
              value={formData.videoUrl}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="resumeUrl" className="block text-sm font-medium mb-2">
              Link to Resume (Optional)
            </label>
            <Input
              id="resumeUrl"
              name="resumeUrl"
              placeholder="Enter URL to your resume"
              value={formData.resumeUrl}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-800"
            >
              Previous Step
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </motion.div>
      )}

      {currentStep === 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
          <p className="text-gray-400 mb-8">
            Thank you for applying to the Pareto Fellowship. We will review your
            application and get back to you soon.
          </p>
          <Button
            onClick={() => window.location.href = "/"}
            className="bg-pareto-pink hover:bg-pareto-pink/90 text-black"
          >
            Return to Homepage
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ApplicationForm;
