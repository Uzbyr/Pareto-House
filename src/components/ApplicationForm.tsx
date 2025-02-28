
import { useState, useEffect } from "react";
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
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check } from "lucide-react";

interface ApplicationFormProps {
  onSubmitSuccess?: () => void;
}

// University data organized by country
const universities = {
  "United States": [
    "Harvard",
    "Stanford",
    "Berkeley", 
    "Columbia",
    "Princeton",
    "UPenn",
    "Caltech"
  ],
  "United Kingdom": [
    "Cambridge University",
    "Oxford University"
  ],
  "France": [
    "HEC",
    "ENS",
    "ESSEC",
    "Polytechnique",
    "Centrale Supélec"
  ],
  "Germany": [
    "TU Munich",
    "KIT"
  ],
  "Ireland": [
    "Trinity Dublin"
  ],
  "Israel": [
    "Technion"
  ],
  "Canada": [
    "McGill University"
  ]
};

// List of countries
const countries = Object.keys(universities);

const nationalities = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguan", "Argentine", "Armenian", "Australian",
  "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean", "Beninese",
  "Bhutanese", "Bolivian", "Bosnian", "Motswana", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe", "Burmese",
  "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African", "Chadian", "Chilean", "Chinese", "Colombian",
  "Comorian", "Congolese", "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican",
  "Dutch", "East Timorese", "Ecuadorian", "Egyptian", "Emirati", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Fijian",
  "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek", "Grenadian",
  "Guatemalan", "Guinean", "Guyanese", "Haitian", "Honduran", "Hungarian", "Icelandic", "Indian", "Indonesian", "Iranian",
  "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan",
  "Kittian", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtensteiner", "Lithuanian",
  "Luxembourgish", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese", "Marshallese", "Mauritanian",
  "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian", "Montenegrin", "Moroccan", "Mozambican", "Namibian",
  "Nauruan", "Nepalese", "New Zealander", "Nicaraguan", "Nigerian", "Norwegian", "Omani", "Pakistani", "Palauan", "Panamanian",
  "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saint Lucian",
  "Salvadoran", "Samoan", "San Marinese", "Sao Tomean", "Saudi", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean",
  "Slovakian", "Slovenian", "Solomon Islander", "Somali", "South African", "South Korean", "Spanish", "Sri Lankan", "Sudanese", "Surinamese",
  "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", "Togolese", "Tongan",
  "Trinidadian", "Tunisian", "Turkish", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbekistani", "Vatican", "Venezuelan",
  "Vietnamese", "Vincentian", "Yemeni", "Zambian", "Zimbabwean"
];

const ApplicationForm = ({ onSubmitSuccess }: ApplicationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    nationality: "",
    university: "",
    otherUniversity: "",
    major: "",
    graduationYear: "",
    preparatoryClasses: "",
    studentSocieties: "",
    buildingCompany: "no",
    companyContext: "",
    resumeFile: null as File | null,
    deckFile: null as File | null,
    memoFile: null as File | null,
    websiteUrl: "",
    videoUrl: "",
  });

  // State for available universities based on country selection
  const [availableUniversities, setAvailableUniversities] = useState<string[]>([]);
  
  // Update available universities when country changes
  useEffect(() => {
    if (formData.country && universities[formData.country as keyof typeof universities]) {
      const countryUniversities = universities[formData.country as keyof typeof universities];
      // Always include "Other" as an option, regardless of the country
      setAvailableUniversities([...countryUniversities, "Other"]);
    } else {
      setAvailableUniversities(["Other"]);
    }
  }, [formData.country]);

  // Check if the selected university requires preparatory class question
  const requiresPreparatoryQuestion = () => {
    const frenchUniversities = ["HEC", "ENS", "ESSEC", "Polytechnique", "Centrale Supélec"];
    return frenchUniversities.includes(formData.university);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ 
        ...prev, 
        [fieldName]: e.target.files?.[0] || null 
      }));
    }
  };

  const nextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast.error("Please fill in all required fields.");
        return;
      }
      if (!validateEmail(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.country || !formData.nationality || !formData.university || !formData.major || !formData.graduationYear) {
        toast.error("Please fill in all required fields.");
        return;
      }
      
      if (formData.university === "Other" && !formData.otherUniversity) {
        toast.error("Please specify your university.");
        return;
      }
      
      if (requiresPreparatoryQuestion() && !formData.preparatoryClasses) {
        toast.error("Please answer the preparatory classes question.");
        return;
      }
    }

    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for file uploads
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("country", formData.country);
      data.append("nationality", formData.nationality);
      
      // Handle university field (including "Other" option)
      const universityValue = formData.university === "Other" 
        ? formData.otherUniversity 
        : formData.university;
      data.append("university", universityValue);
      
      data.append("major", formData.major);
      data.append("graduationYear", formData.graduationYear);
      data.append("studentSocieties", formData.studentSocieties || "");
      
      if (requiresPreparatoryQuestion()) {
        data.append("preparatoryClasses", formData.preparatoryClasses);
      }
      
      data.append("buildingCompany", formData.buildingCompany);
      
      if (formData.buildingCompany === "yes") {
        data.append("companyContext", formData.companyContext || "");
        if (formData.websiteUrl) data.append("websiteUrl", formData.websiteUrl);
      }
      
      if (formData.videoUrl) data.append("videoUrl", formData.videoUrl);
      if (formData.resumeFile) data.append("resumeFile", formData.resumeFile);
      if (formData.deckFile) data.append("deckFile", formData.deckFile);
      if (formData.memoFile) data.append("memoFile", formData.memoFile);

      // In a real app, we would send this data to an API
      // For demo purposes, we'll use localStorage
      const newApplication = {
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
        nationality: formData.nationality,
        university: universityValue,
        major: formData.major,
        graduationYear: formData.graduationYear,
        studentSocieties: formData.studentSocieties || "",
        preparatoryClasses: requiresPreparatoryQuestion() ? formData.preparatoryClasses : "n/a",
        buildingCompany: formData.buildingCompany,
        companyContext: formData.buildingCompany === "yes" ? formData.companyContext : "",
        resumeFile: formData.resumeFile ? formData.resumeFile.name : "",
        deckFile: formData.deckFile ? formData.deckFile.name : "",
        memoFile: formData.memoFile ? formData.memoFile.name : "",
        websiteUrl: formData.buildingCompany === "yes" ? formData.websiteUrl : "",
        videoUrl: formData.videoUrl || "",
        submissionDate: new Date().toISOString(),
        status: "pending",
      };

      // Store the application in localStorage
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

  // Personal Information Step (Step 1)
  const renderPersonalInformationStep = () => {
    return (
      <div key="step1" className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
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
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
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
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="country">Country of Residence</Label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleSelectChange("country", value)}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Select
              value={formData.nationality}
              onValueChange={(value) => handleSelectChange("nationality", value)}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select your nationality" />
              </SelectTrigger>
              <SelectContent>
                {nationalities.map((nationality) => (
                  <SelectItem key={nationality} value={nationality}>
                    {nationality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  };

  // Educational Background Step (Step 2)
  const renderEducationalBackgroundStep = () => {
    return (
      <div key="step2" className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Educational Background</h2>
        <div className="space-y-2">
          <Label htmlFor="university">University</Label>
          <Select
            value={formData.university}
            onValueChange={(value) => handleSelectChange("university", value)}
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Select your university" />
            </SelectTrigger>
            <SelectContent>
              {availableUniversities.map((uni) => (
                <SelectItem key={uni} value={uni}>
                  {uni}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {formData.university === "Other" && (
          <div className="space-y-2">
            <Label htmlFor="otherUniversity">Specify University</Label>
            <Input
              id="otherUniversity"
              name="otherUniversity"
              placeholder="Enter your university name"
              value={formData.otherUniversity}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              required
            />
          </div>
        )}
        
        {requiresPreparatoryQuestion() && (
          <div className="space-y-2">
            <Label htmlFor="preparatoryClasses">
              Have you taken preparatory classes (classes préparatoires) in the French education system?
            </Label>
            <Select
              value={formData.preparatoryClasses}
              onValueChange={(value) => handleSelectChange("preparatoryClasses", value)}
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
          <Label htmlFor="major">Major</Label>
          <Input
            id="major"
            name="major"
            placeholder="Enter your major"
            value={formData.major}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="graduationYear">Graduation Year</Label>
          <Select
            value={formData.graduationYear}
            onValueChange={(value) => handleSelectChange("graduationYear", value)}
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

        <div className="space-y-2">
          <Label htmlFor="studentSocieties">Student Societies</Label>
          <Textarea
            id="studentSocieties"
            name="studentSocieties"
            placeholder="Are you part of any student societies or organizations? Please list them."
            value={formData.studentSocieties}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700 min-h-[80px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="resumeFile">Resume (PDF)</Label>
          <Input
            id="resumeFile"
            name="resumeFile"
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, "resumeFile")}
            className="bg-zinc-800 border-zinc-700 file:bg-zinc-700 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3"
          />
          {formData.resumeFile && (
            <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
              <Check className="h-4 w-4" /> {formData.resumeFile.name}
            </p>
          )}
        </div>
      </div>
    );
  };

  // Additional Information Step (Step 3)
  const renderAdditionalInformationStep = () => {
    return (
      <div key="step3" className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
        <div className="space-y-2">
          <Label htmlFor="videoUrl">Video Presentation URL</Label>
          <Input
            id="videoUrl"
            name="videoUrl"
            placeholder="Link to a short video presentation of yourself (YouTube, Vimeo, etc.)"
            value={formData.videoUrl}
            onChange={handleInputChange}
            className="bg-zinc-800 border-zinc-700"
          />
          <p className="text-xs text-zinc-500 mt-1">
            Upload a 1-2 minute video presentation about yourself and your goals
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="buildingCompany">Are you building a company?</Label>
          <Select
            value={formData.buildingCompany}
            onValueChange={(value) => handleSelectChange("buildingCompany", value)}
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

        {formData.buildingCompany === "yes" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyContext">Company Context</Label>
              <Textarea
                id="companyContext"
                name="companyContext"
                placeholder="Tell us about the company you're building"
                value={formData.companyContext}
                onChange={handleInputChange}
                className="bg-zinc-800 border-zinc-700 min-h-[120px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deckFile">Pitch Deck (Optional)</Label>
              <Input
                id="deckFile"
                name="deckFile"
                type="file"
                accept=".pdf,.ppt,.pptx"
                onChange={(e) => handleFileChange(e, "deckFile")}
                className="bg-zinc-800 border-zinc-700 file:bg-zinc-700 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3"
              />
              {formData.deckFile && (
                <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                  <Check className="h-4 w-4" /> {formData.deckFile.name}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="memoFile">Memo (Optional)</Label>
              <Input
                id="memoFile"
                name="memoFile"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "memoFile")}
                className="bg-zinc-800 border-zinc-700 file:bg-zinc-700 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3"
              />
              {formData.memoFile && (
                <p className="text-sm text-green-400 flex items-center gap-1 mt-1">
                  <Check className="h-4 w-4" /> {formData.memoFile.name}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
              <Input
                id="websiteUrl"
                name="websiteUrl"
                placeholder="https://your-company.com"
                value={formData.websiteUrl}
                onChange={handleInputChange}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
          </>
        )}
      </div>
    );
  };

  // Success Step (Step 4)
  const renderSuccessStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-white" />
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
    );
  };

  // Render the appropriate step content based on currentStep
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInformationStep();
      case 2:
        return renderEducationalBackgroundStep();
      case 3:
        return renderAdditionalInformationStep();
      case 4:
        return renderSuccessStep();
      default:
        return null;
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 shadow-lg">
      {currentStep < 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? "bg-pareto-pink text-black"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {currentStep > step ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <span className="text-xs mt-1 text-zinc-400">
                  {step === 1 ? "Personal" : step === 2 ? "Education" : "Additional"}
                </span>
              </div>
            ))}
          </div>
          <div className="relative w-full h-1 bg-zinc-800 mt-2">
            <div
              className="absolute top-0 left-0 h-1 bg-pareto-pink"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {currentStep <= 3 ? (
        <form onSubmit={handleSubmit}>
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>

          <div className="flex justify-between pt-4 mt-6">
            {currentStep > 1 && (
              <Button
                type="button"
                onClick={prevStep}
                variant="outline"
                className="border-zinc-700 hover:bg-zinc-800"
              >
                Previous
              </Button>
            )}
            
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-pareto-pink hover:bg-pareto-pink/90 text-black ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-pareto-pink hover:bg-pareto-pink/90 text-black ml-auto"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </form>
      ) : (
        renderSuccessStep()
      )}
    </div>
  );
};

export default ApplicationForm;
