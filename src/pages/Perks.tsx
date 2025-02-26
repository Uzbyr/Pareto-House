
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Gift } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import Footer from "../components/Footer";

const Perks = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const perks = [
    {
      title: "OpenAI API Credits",
      description: "Access state-of-the-art language models with $5,000 in API credits",
      icon: "🤖"
    },
    {
      title: "AWS Cloud Credits",
      description: "Scale your projects with $10,000 in AWS cloud computing credits",
      icon: "☁️"
    },
    {
      title: "Perplexity AI Access",
      description: "Premium access to advanced research tools worth $2,000",
      icon: "🔍"
    },
    {
      title: "Exclusive Workshops & Webinars",
      description: "Weekly sessions with industry experts on cutting-edge technologies",
      icon: "📚"
    },
    {
      title: "Personalized Mentorship",
      description: "1:1 mentoring sessions with leaders from top tech companies",
      icon: "🎯"
    },
    {
      title: "Networking Opportunities",
      description: "Access to exclusive events and a network of 500+ industry professionals",
      icon: "🤝"
    },
    {
      title: "Beta Access & Special Discounts",
      description: "Early access to emerging tech products and up to 80% off on premium tools",
      icon: "🎁"
    },
    {
      title: "Career Development Support",
      description: "Comprehensive career coaching and interview preparation resources",
      icon: "💼"
    },
    {
      title: "Research Funding & Stipends",
      description: "Up to $25,000 in funding for innovative projects and research",
      icon: "💰"
    },
    {
      title: "Hackathons & Innovation Challenges",
      description: "Monthly hackathons with prizes totaling $50,000+",
      icon: "🏆"
    }
  ];

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-pareto-black text-black dark:text-white"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-pareto-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="text-lg text-black/80 dark:text-white/80 hover:text-pareto-pink dark:hover:text-pareto-pink transition-all duration-300 inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-32 pb-20">
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Gift className="w-8 h-8 text-pareto-pink" />
            <h1 className="text-4xl font-bold">Fellowship Perks</h1>
          </div>
          <p className="text-xl text-black/60 dark:text-white/60 mb-12">
            As a Pareto Fellow, you'll get access to an extensive suite of resources and opportunities designed to accelerate your growth and impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-lg border border-black/10 dark:border-white/10 hover:border-pareto-pink dark:hover:border-pareto-pink transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{perk.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{perk.title}</h3>
                <p className="text-black/60 dark:text-white/60">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Perks;
