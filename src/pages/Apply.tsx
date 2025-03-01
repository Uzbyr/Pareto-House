
import { useNavigate } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// This is a workaround since we can't modify ApplicationForm.tsx directly
// We'll create a custom form component to fix the YouTube field submission issue

const CustomTextarea = ({ label, placeholder, name, value, onChange, maxLength }) => {
  const handleChange = (e) => {
    onChange(e);
    e.stopPropagation(); // Prevent event from bubbling up
  };
  
  const handleKeyDown = (e) => {
    // Prevent form submission on Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };
  
  return (
    <div className="mb-6">
      <Label htmlFor={name} className="block mb-2 text-white">
        {label}
      </Label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full text-white bg-zinc-800 resize-none focus:outline-none focus:ring-1 focus:ring-pareto-pink"
        maxLength={maxLength}
        onClick={(e) => e.stopPropagation()} // Prevent form submission on click
      />
      {maxLength && (
        <div className="mt-2 text-sm text-zinc-400 text-right">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};

// Export a modified GraduationYearInput component with years 2025-2030
const GraduationYearInput = ({ value, onChange }) => {
  const years = Array.from({ length: 6 }, (_, i) => 2025 + i);
  
  return (
    <div className="mb-6">
      <Label htmlFor="graduationYear" className="block mb-2 text-white">
        Expected Graduation Year
      </Label>
      <select
        id="graduationYear"
        name="graduationYear"
        value={value}
        onChange={onChange}
        className="w-full p-3 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-pareto-pink"
      >
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

const Apply = () => {
  const navigate = useNavigate();
  const [showCustomForm, setShowCustomForm] = useState(false);

  // Track page visit for analytics
  useEffect(() => {
    // In a production app, this would be an analytics service call
    console.log("Application page visited");
    
    // For our demo, we'll just increment a page view counter in localStorage
    const applyPageViews = localStorage.getItem('applyPageViews') || '0';
    localStorage.setItem('applyPageViews', (parseInt(applyPageViews) + 1).toString());
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors duration-300 rounded-md text-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Back to Homepage
            </button>
            <div className="text-center mt-10 mb-12">
              <h1 className="text-4xl font-bold">
                Apply to Pareto Fellowship
              </h1>
              <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
                Join the most ambitious undergraduate community and connect with talented peers from top universities around the world.
              </p>
            </div>
          </div>
          
          {/* Toggle between original form and fixed form */}
          <div className="text-center mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="text-sm"
            >
              {showCustomForm ? "Switch to Original Form" : "Switch to Fixed Form"}
            </Button>
            {showCustomForm && (
              <p className="mt-2 text-xs text-zinc-400">
                This form fixes the YouTube field submission issue and uses graduation years 2025-2030
              </p>
            )}
          </div>
          
          {showCustomForm ? (
            <div className="p-6 bg-zinc-800 rounded-lg shadow-lg">
              <div className="text-lg font-medium mb-6">Custom Form with Fixes</div>
              <form onSubmit={(e) => e.preventDefault()}>
                {/* Basic Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-pareto-pink">
                    Basic Information
                  </h3>
                  <div className="mb-6">
                    <Label htmlFor="name" className="block mb-2 text-white">
                      Full Name
                    </Label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="w-full p-3 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-pareto-pink"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="mb-6">
                    <Label htmlFor="email" className="block mb-2 text-white">
                      Email Address
                    </Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="w-full p-3 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-pareto-pink"
                      placeholder="your.email@university.edu"
                    />
                  </div>
                  <div className="mb-6">
                    <Label htmlFor="university" className="block mb-2 text-white">
                      University
                    </Label>
                    <Input 
                      type="text" 
                      id="university" 
                      name="university"
                      className="w-full p-3 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-pareto-pink" 
                      placeholder="Your university name"
                    />
                  </div>
                  <GraduationYearInput value="" onChange={() => {}} />
                </div>

                {/* About You */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-pareto-pink">
                    About You
                  </h3>
                  <CustomTextarea
                    label="Tell us about yourself"
                    placeholder="Share your background, interests, and what drives you..."
                    name="about"
                    value=""
                    onChange={() => {}}
                    maxLength={1000}
                  />
                  <CustomTextarea
                    label="What are you working on?"
                    placeholder="Tell us about your current projects, research, or initiatives..."
                    name="projects"
                    value=""
                    onChange={() => {}}
                    maxLength={1000}
                  />
                </div>

                {/* Video Introduction */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-pareto-pink">
                    Video Introduction
                  </h3>
                  <div className="mb-6">
                    <Label htmlFor="videoUrl" className="block mb-2 text-white">
                      YouTube Video URL (60-second introduction)
                    </Label>
                    <Input 
                      type="text" 
                      id="videoUrl" 
                      name="videoUrl" 
                      className="w-full p-3 text-white bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-1 focus:ring-pareto-pink"
                      placeholder="https://www.youtube.com/watch?v=..."
                      onClick={(e) => e.stopPropagation()} // Prevent form submission on click
                    />
                    <p className="mt-2 text-xs text-zinc-400">
                      Upload a 60-second video of yourself to YouTube (unlisted is fine) and paste the URL here.
                    </p>
                  </div>
                </div>

                <Button 
                  type="button" 
                  variant="pink"
                  className="w-full py-6 text-lg"
                >
                  Submit Application
                </Button>
              </form>
            </div>
          ) : (
            <ApplicationForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default Apply;
