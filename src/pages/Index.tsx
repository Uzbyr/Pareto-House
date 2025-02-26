
import { motion } from "framer-motion";
import ScrollingUniversities from "../components/ScrollingUniversities";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-pareto-black text-white font-inter">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-pareto-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src="/lovable-uploads/f136e975-2a52-41a5-9cd9-e464dda2a69b.png"
              alt="Pareto Logo"
              className="w-36 md:w-44"
            />
            <div className="flex gap-6">
              <Link
                to="/mentors"
                className="text-lg text-white/80 hover:text-pareto-pink transition-all duration-300 px-4 py-2"
              >
                Mentors
              </Link>
              <Link
                to="/faq"
                className="text-lg text-white/80 hover:text-pareto-pink transition-all duration-300 px-4 py-2"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div 
        className="container mx-auto px-4 pt-48 md:pt-52 pb-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={item} className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Join the World's Most Ambitious{" "}
              <span className="text-pareto-pink">Undergraduate Community</span>
            </h1>
          </motion.div>

          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto"
          >
            Connect with exceptional peers, access unparalleled opportunities, and accelerate your path to impact.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center mb-16">
            <Link
              to="/apply"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-pareto-pink text-black hover:bg-white transition-colors duration-300 text-lg font-semibold rounded-sm"
            >
              Apply Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://www.pareto20.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white hover:bg-white/20 transition-colors duration-300 text-lg font-semibold rounded-sm border border-white/20"
            >
              Learn More
            </a>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-32"
          >
            {[
              { number: "50", label: "Fellows Per Batch" },
              { number: "30+", label: "Universities" },
              { number: "$100K", label: "Potential Check" },
              { number: "50+", label: "Tech Partners" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pareto-pink mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Universities Section */}
        <motion.div
          variants={item}
          className="relative overflow-hidden py-10 bg-gradient-to-b from-transparent to-white/5 rounded-lg mt-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pareto-black via-transparent to-pareto-black z-10 pointer-events-none" />
          <h2 className="text-sm uppercase tracking-widest mb-6 text-pareto-pink text-center relative z-20">
            TARGET UNIVERSITIES
          </h2>
          <ScrollingUniversities />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
