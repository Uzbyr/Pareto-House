
import { useEffect, useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import BackToHomeButton from "../components/application/BackToHomeButton";
import PageHeader from "../components/application/PageHeader";

const Apply = () => {
  const [isFormDirty, setIsFormDirty] = useState(false);
  
  // Track page visit for analytics
  useEffect(() => {
    // In a production app, this would be an analytics service call
    console.log("Application page visited");
    
    // For our demo, we'll just increment a page view counter in localStorage
    const applyPageViews = localStorage.getItem('applyPageViews') || '0';
    localStorage.setItem('applyPageViews', (parseInt(applyPageViews) + 1).toString());
  }, []);

  const handleFormChange = (isDirty: boolean) => {
    setIsFormDirty(isDirty);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <BackToHomeButton isFormDirty={isFormDirty} />
            <PageHeader />
          </div>
          
          <ApplicationForm onFormChange={handleFormChange} />
        </div>
      </div>
    </div>
  );
};

export default Apply;
