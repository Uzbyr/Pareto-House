
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";
import { useEffect } from "react";

const Apply = () => {
  const navigate = useNavigate();

  // Track page visit for analytics
  useEffect(() => {
    // In a production app, this would be an analytics service call
    console.log("Application page visited");
    
    // For our demo, we'll just increment a page view counter in localStorage
    const applyPageViews = localStorage.getItem('applyPageViews') || '0';
    localStorage.setItem('applyPageViews', (parseInt(applyPageViews) + 1).toString());
    
    // Add a listener for form submissions
    const handleApplicationSubmitted = () => {
      // Increment application count
      const appCount = localStorage.getItem('applicationCount') || '0';
      localStorage.setItem('applicationCount', (parseInt(appCount) + 1).toString());
      
      // Store application data
      const newApp = {
        id: new Date().getTime(),
        name: "New Applicant",
        email: `applicant${Math.floor(Math.random() * 1000)}@example.com`,
        school: ["Harvard", "MIT", "Stanford", "Berkeley", "Oxford"][Math.floor(Math.random() * 5)],
        submissionDate: new Date().toISOString(),
        status: "pending",
      };
      
      const storedApps = localStorage.getItem('applications') || '[]';
      const apps = JSON.parse(storedApps);
      apps.push(newApp);
      localStorage.setItem('applications', JSON.stringify(apps));
    };
    
    window.addEventListener('application_submitted', handleApplicationSubmitted);
    
    return () => {
      window.removeEventListener('application_submitted', handleApplicationSubmitted);
    };
  }, []);

  return (
    <div className="min-h-screen bg-pareto-black text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-pareto-pink text-black font-semibold hover:bg-white transition-colors duration-300 rounded text-sm"
            >
              ← Back to Homepage
            </button>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-center mt-8"
            >
              Apply to Pareto Fellowship
            </motion.h1>
          </div>
          <ApplicationForm onSubmitSuccess={() => {
            // Dispatch a custom event when application is submitted
            window.dispatchEvent(new Event('application_submitted'));
          }} />
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;
