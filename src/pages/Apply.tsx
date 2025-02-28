
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
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pareto-black to-zinc-900 text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto"
        >
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
          <ApplicationForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;
