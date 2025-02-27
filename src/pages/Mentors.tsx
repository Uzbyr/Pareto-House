
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Flag } from "lucide-react";

interface Mentor {
  name: string;
  linkedIn: string;
  twitter?: string;
  description?: string;
  imagePlaceholder?: string;
  imageUrl?: string;
  country: string;
}

const mentors: Mentor[] = [
  {
    name: "Edward Lando",
    linkedIn: "https://www.linkedin.com/in/edwardlando/",
    description: "Serial entrepreneur and investor, co-founder of Pareto Holdings",
    imageUrl: "/lovable-uploads/6b47b599-6ded-4b14-a09b-44c0dbad8481.png",
    country: "USA"
  },
  {
    name: "Ben Cambier",
    linkedIn: "https://www.linkedin.com/in/jbenjamin-cambier/",
    description: "Early-stage investor and founder",
    imageUrl: "/lovable-uploads/b4e34a3e-e7d3-4045-a380-3fe37f7b05ce.png",
    country: "USA"
  },
  {
    name: "Abhi Ramesh",
    linkedIn: "https://www.linkedin.com/in/abhiramesh/",
    description: "Founder & CEO at Misfits Market",
    imageUrl: "/lovable-uploads/7d1b363b-018d-4f30-a2db-f2eb6515cc8e.png",
    country: "USA"
  },
  {
    name: "Zach Bookman",
    linkedIn: "https://www.linkedin.com/in/zacharybookman/",
    description: "Co-founder & CEO at OpenGov",
    imageUrl: "/lovable-uploads/1cc17b96-3462-4d26-974f-15ba3628034c.png",
    country: "USA"
  },
  {
    name: "Eric Glyman",
    linkedIn: "https://www.linkedin.com/in/eglyman/",
    description: "Co-founder & CEO at Ramp",
    imageUrl: "/lovable-uploads/3a89b51a-b995-42c3-85a2-c29983c21e46.png",
    country: "USA"
  },
  {
    name: "Pietro Invernizzi",
    linkedIn: "https://www.linkedin.com/in/pietro-invernizzi/",
    description: "Investor and entrepreneur",
    imageUrl: "/lovable-uploads/687c5fe9-ccfa-4d12-bdb9-066f37806034.png",
    country: "UK"
  },
  {
    name: "Liu Jiang",
    linkedIn: "https://www.linkedin.com/in/liujiang1/",
    description: "Engineering leader and startup advisor",
    imageUrl: "/lovable-uploads/86c1fa85-94f4-464c-9ba6-1d7dc3b6dd1e.png",
    country: "USA"
  },
  {
    name: "Grant Gordon",
    linkedIn: "https://www.linkedin.com/in/grantgordonconnect/",
    description: "Founder & CEO at Artemis",
    imageUrl: "/lovable-uploads/29fe48b3-0fa6-425e-abc6-7add6c5d7236.png",
    country: "USA"
  },
  {
    name: "Arthur Querou",
    linkedIn: "https://www.linkedin.com/in/arthurquerou/",
    description: "Founder & CEO at PlayPlay",
    imageUrl: "/lovable-uploads/8545216b-c853-4042-b152-cada13843026.png",
    country: "USA"
  },
  {
    name: "Nicolas Douay",
    linkedIn: "https://www.linkedin.com/in/nicolasdouay/",
    description: "Technology entrepreneur and investor",
    imageUrl: "/lovable-uploads/e838327a-3836-4221-bb14-73a96f840ec9.png",
    country: "France"
  },
  {
    name: "Mathias Adam",
    linkedIn: "https://www.linkedin.com/in/mathias-adam-7a10274a/",
    description: "Technology leader and advisor",
    imageUrl: "/lovable-uploads/296914cf-fcac-4a48-9c42-8e9bc9b50f4a.png",
    country: "France"
  }
];

const Mentors = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
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

  // Helper function to get flag color based on country
  const getFlagColor = (country: string) => {
    switch(country) {
      case "USA":
        return "text-blue-600";
      case "France":
        return "text-blue-800";
      case "UK":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-pareto-black text-black dark:text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-pareto-pink hover:text-black dark:hover:text-white mb-8 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Mentors</h1>
          <p className="text-xl text-black/80 dark:text-white/80 mb-16 max-w-2xl">
            Meet our exceptional mentors who are leaders in their fields, ready to share their knowledge and experience with the next generation of entrepreneurs.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-black/5 dark:bg-white/5 rounded-lg p-6 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {mentor.imageUrl ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={mentor.imageUrl} 
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-pareto-pink flex items-center justify-center text-black font-bold text-xl">
                    {mentor.imagePlaceholder}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{mentor.name}</h3>
                    <Flag 
                      className={`w-4 h-4 ${getFlagColor(mentor.country)}`} 
                      aria-label={mentor.country}
                    />
                  </div>
                  {mentor.description && (
                    <p className="text-black/60 dark:text-white/60 mb-4 text-sm">
                      {mentor.description} <span className="text-black/40 dark:text-white/40">({mentor.country})</span>
                    </p>
                  )}
                  <div className="flex gap-3">
                    <a
                      href={mentor.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    {mentor.twitter && (
                      <a
                        href={mentor.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Mentors;
