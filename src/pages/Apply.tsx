
import { useEffect, useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import BackToHomeButton from "../components/application/BackToHomeButton";
import PageHeader from "../components/application/PageHeader";
import FormToggle from "../components/application/FormToggle";
import CustomApplicationForm from "../components/application/CustomApplicationForm";

const Apply = () => {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [formState, setFormState] = useState({
    about: "",
    projects: "",
    name: "",
    email: "",
    university: "",
    graduationYear: "",
    videoUrl: ""
  });

  // Track page visit for analytics
  useEffect(() => {
    // In a production app, this would be an analytics service call
    console.log("Application page visited");
    
    // For our demo, we'll just increment a page view counter in localStorage
    const applyPageViews = localStorage.getItem('applyPageViews') || '0';
    localStorage.setItem('applyPageViews', (parseInt(applyPageViews) + 1).toString());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally handle the form submission
    console.log("Form submitted:", formState);
    // For demo purposes, just show a success message
    alert("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <BackToHomeButton />
            <PageHeader />
          </div>
          
          <FormToggle 
            showCustomForm={showCustomForm} 
            setShowCustomForm={setShowCustomForm} 
          />
          
          {showCustomForm ? (
            <CustomApplicationForm 
              formState={formState}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <ApplicationForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default Apply;
