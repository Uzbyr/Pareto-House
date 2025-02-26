
import { motion } from "framer-motion";
import ApplicationForm from "../components/ApplicationForm";

const Apply = () => {
  return (
    <div className="min-h-screen bg-pareto-black text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-8 text-center"
          >
            Apply to Pareto Fellowship
          </motion.h1>
          <ApplicationForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;
