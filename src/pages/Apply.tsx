
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";

const Apply = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-pareto-black text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-pareto-pink text-black font-semibold hover:bg-white transition-colors duration-300 rounded"
            >
              ← Back to Homepage
            </button>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold"
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
