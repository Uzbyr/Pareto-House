
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Apply = () => {
  const navigate = useNavigate();
  const { trackPageVisit } = useAuth();

  // Track page visit for analytics
  useEffect(() => {
    // Track this page visit in our analytics system
    trackPageVisit("Apply");
    
    // For our demo, we'll also increment a page view counter in localStorage (legacy approach)
    const applyPageViews = localStorage.getItem('applyPageViews') || '0';
    localStorage.setItem('applyPageViews', (parseInt(applyPageViews) + 1).toString());
    
    // Log for debugging purposes
    console.log("Application page visited");
  }, [trackPageVisit]);

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
          <ApplicationForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;
