
import { motion, AnimatePresence } from "framer-motion";
import ScrollingUniversities from "../components/ScrollingUniversities";
import { Link } from "react-router-dom";
import { ArrowRight, Gift, LogIn } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";

const Index = () => {
  const { isAuthenticated, login, logout } = useAuth();
  
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, 0.01, 0.9],
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen bg-white dark:bg-pareto-black text-black dark:text-white font-inter"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        {/* Navigation */}
        <motion.nav 
          variants={childVariants}
          className="fixed w-full top-0 z-50 bg-white/80 dark:bg-pareto-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <motion.img
                src="/lovable-uploads/f136e975-2a52-41a5-9cd9-e464dda2a69b.png"
                alt="Pareto Logo"
                className="w-36 md:w-44"
              />
              <div className="flex items-center gap-2">
                <Link
                  to="/mentors"
                  className="text-lg text-black/80 dark:text-white/80 hover:text-pareto-pink dark:hover:text-pareto-pink transition-all duration-300 px-4 py-2"
                >
                  Mentors
                </Link>
                <Link
                  to="/perks"
                  className="text-lg text-black/80 dark:text-white/80 hover:text-pareto-pink dark:hover:text-pareto-pink transition-all duration-300 px-4 py-2"
                >
                  Perks
                </Link>
                <Link
                  to="/faq"
                  className="text-lg text-black/80 dark:text-white/80 hover:text-pareto-pink dark:hover:text-pareto-pink transition-all duration-300 px-4 py-2"
                >
                  FAQ
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div 
          className="container mx-auto px-4 pt-64 md:pt-80 pb-20"
          variants={childVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={childVariants} className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight">
                The Most Ambitious{" "}
                <span className="relative inline-block group">
                  <span className="text-pareto-pink">Undergraduate</span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pareto-pink transform scale-x-0 transition-all duration-500 origin-left group-hover:scale-x-100 group-hover:h-1"></span>
                </span>{" "}
                Community
              </h1>
            </motion.div>

            <motion.p
              variants={childVariants}
              className="text-xl md:text-2xl text-black/80 dark:text-white/80 mb-16 max-w-2xl mx-auto"
            >
              Connect with exceptional peers, access unparalleled opportunities, and accelerate your path to impact.
            </motion.p>

            <motion.div variants={childVariants} className="flex flex-wrap gap-4 justify-center mb-20">
              <Link
                to="/apply"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-pareto-pink text-black hover:bg-white dark:hover:bg-white transition-colors duration-300 text-lg font-semibold rounded-sm"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://www.pareto20.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-300 text-lg font-semibold rounded-sm border border-black/20 dark:border-white/20"
              >
                About Pareto
              </a>
            </motion.div>

            {/* Universities Section */}
            <motion.div
              variants={childVariants}
              className="relative overflow-hidden py-10 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 rounded-lg mt-20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white dark:from-pareto-black dark:via-transparent dark:to-pareto-black z-10 pointer-events-none" />
              <h2 className="text-sm uppercase tracking-widest mb-6 text-pareto-pink text-center relative z-20">
                TARGET UNIVERSITIES
              </h2>
              <ScrollingUniversities />
            </motion.div>
            
            {/* Login Button */}
            <motion.div 
              variants={childVariants}
              className="flex justify-center my-10"
            >
              {isAuthenticated ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                  className="flex items-center gap-2 px-6 py-2 text-sm border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span>Signed in as Fellow</span>
                </Button>
              ) : (
                <Button 
                  variant="login" 
                  size="sm" 
                  onClick={login}
                  className="flex items-center gap-2 px-6 py-2 text-sm"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login as Fellow</span>
                </Button>
              )}
            </motion.div>

            {/* Stats Section */}
            <motion.div
              variants={childVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-40"
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
                  <div className="text-sm text-black/60 dark:text-white/60 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
