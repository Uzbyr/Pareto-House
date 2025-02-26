
import { motion } from "framer-motion";
import ScrollingUniversities from "../components/ScrollingUniversities";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-pareto-black text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-12">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src="/lovable-uploads/f136e975-2a52-41a5-9cd9-e464dda2a69b.png"
            alt="Pareto Logo"
            className="w-32 md:w-40"
          />
          <div className="flex gap-6">
            <Link
              to="/mentors"
              className="text-white hover:text-pareto-pink transition-colors duration-300 px-4 py-2"
            >
              Mentors
            </Link>
            <Link
              to="/faq"
              className="text-white hover:text-pareto-pink transition-colors duration-300 px-4 py-2"
            >
              FAQ
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            PARETO FELLOWSHIP
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-pareto-pink text-xl md:text-2xl mb-12 max-w-2xl"
          >
            Building the world's most ambitious undergraduate community
          </motion.p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              href="https://www.pareto20.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pareto-pink text-black hover:bg-white transition-colors duration-300"
            >
              <span>Pareto Website</span>
            </motion.a>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-pareto-pink transition-colors duration-300"
              >
                Apply Now
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Universities Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="py-16"
        >
          <h2 className="text-sm uppercase tracking-widest mb-8 text-pareto-pink text-center">
            TARGET UNIVERSITIES
          </h2>
          <ScrollingUniversities />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
