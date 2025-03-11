import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

// Using the same mentor data structure from the Mentors page
interface Mentor {
  name: string;
  linkedIn: string;
  description?: string;
  imageUrl?: string;
  country: string;
}

// Import only the mentors we want to display in the scrolling banner
const mentors: Mentor[] = [
  {
    name: "Fabrice Grinda",
    linkedIn: "https://www.linkedin.com/in/fabricegrinda/",
    description: "Founder of OLX and FJ Labs",
    imageUrl: "/lovable-uploads/12acce9a-72bb-4ea2-a0d0-ebdf7c4eb2b7.png",
    country: "USA"
  },
  {
    name: "Edward Lando",
    linkedIn: "https://www.linkedin.com/in/edwardlando/",
    description: "Serial entrepreneur and investor",
    imageUrl: "/lovable-uploads/6b47b599-6ded-4b14-a09b-44c0dbad8481.png",
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
    name: "Francis Pedraza",
    linkedIn: "https://www.linkedin.com/in/francispedraza/",
    description: "Founder at Invisible Technologies",
    imageUrl: "/lovable-uploads/dc5b5f95-0b6e-493c-b293-4e43ce71392a.png",
    country: "USA"
  },
  {
    name: "Eric Wu",
    linkedIn: "https://www.linkedin.com/in/ericwu01/",
    description: "Founder at Opendoor",
    imageUrl: "/lovable-uploads/b44fbc4b-212b-49e6-adcc-bf0072f797ed.png",
    country: "USA"
  },
  {
    name: "Cyan Banister",
    linkedIn: "https://www.linkedin.com/in/cyantechnology/",
    description: "Ex-Partner at Founders Fund",
    imageUrl: "/lovable-uploads/56ab8193-d996-4fc8-954d-c71a3d96bd5a.png",
    country: "USA"
  },
  {
    name: "Venus Williams",
    linkedIn: "https://www.linkedin.com/in/venuswilliams/",
    description: "Tennis champion and entrepreneur",
    imageUrl: "/lovable-uploads/18ade8c8-718c-4260-9dd6-c32709b1f948.png",
    country: "USA"
  },
  {
    name: "Sarah Guo",
    linkedIn: "https://www.linkedin.com/in/sarahguo/",
    description: "Founder at Conviction VC",
    imageUrl: "/lovable-uploads/67bf0c08-24a9-4e1d-bb41-9318d2c672e8.png",
    country: "USA"
  },
  {
    name: "Gokul Rajaram",
    linkedIn: "https://www.linkedin.com/in/gokulrajaram1/",
    description: "Investor & Board Member at Coinbase and Pinterest",
    imageUrl: "/lovable-uploads/98179821-cd4d-4a1e-9c84-8544e48e694f.png",
    country: "USA"
  },
  {
    name: "Max Altman",
    linkedIn: "https://www.linkedin.com/in/maxhaltman/",
    description: "Founder & GP at Saga Ventures",
    imageUrl: "/lovable-uploads/dad2a4c2-5fc0-4074-8dac-8294428f754e.png",
    country: "USA"
  },
  {
    name: "Liu Jiang",
    linkedIn: "https://www.linkedin.com/in/liujiang/",
    description: "Founder & GP at Sunflower and former Sequoia Partner",
    imageUrl: "/lovable-uploads/6c5fe0c4-03d3-4457-b3b6-e5f0a5cb69c6.png",
    country: "USA"
  },
  {
    name: "Reilly Opelka",
    linkedIn: "https://www.linkedin.com/in/reillyopelka/",
    description: "Tennis player, Investor and Art Guru",
    imageUrl: "/lovable-uploads/3cfd928c-129d-4412-8860-6361ee0774ab.png",
    country: "USA"
  }
];

const ScrollingMentors = () => {
  const x = useMotionValue(0);
  const animationRef = useRef<any>(null);

  const startAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    animationRef.current = animate(x, -4000, {
      duration: 40,      
      ease: "linear",  
      repeat: Infinity,
      repeatType: "reverse",
    });
  };

  // Stop the current animation
  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
  };

  useEffect(() => {
    startAnimation();
    return () => stopAnimation();
  }, []);

  return (
    <div className="relative overflow-hidden py-16">
      <div className="text-center mb-8">
        <h2 className="text-sm uppercase tracking-widest mb-3 text-pareto-pink">
          OUR MENTORS
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Learn from the Best
        </h3>
        <p className="text-black/60 dark:text-white/60 text-lg max-w-2xl mx-auto">
          Decacorn and unicorn founders, tier 1 investors, top operators, public figures, and more
        </p>
      </div>
      
      <div className="w-full">
        <motion.div 
          className={`flex space-x-12 px-4 py-6`}
          style={{x}}
          onMouseEnter={stopAnimation}
          onMouseLeave={startAnimation}
        >
          {/* First set of mentors */}
          {mentors.map((mentor, index) => (
            <a 
              key={`a-${mentor.name}-${index}`}
              href={mentor.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 group"
            >
              <div className="flex flex-col items-center w-48">
                <div className="h-48 w-48 rounded-full overflow-hidden mb-4 group-hover:shadow-lg transition-all duration-300">
                  {mentor.imageUrl && (
                    <img
                      src={mentor.imageUrl}
                      alt={mentor.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-lg text-center mb-1">{mentor.name}</h4>
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                </div>
                <p className="text-black/60 dark:text-white/60 text-sm text-center">{mentor.description}</p>
              </div>
            </a>
          ))}
          
          {/* Duplicated mentors for infinite scroll effect */}
          {mentors.map((mentor, index) => (
            <a 
              key={`b-${mentor.name}-${index}`}
              href={mentor.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 group"
            >
              <div className="flex flex-col items-center w-48">
                <div className="h-48 w-48 rounded-full overflow-hidden mb-4 group-hover:shadow-lg transition-all duration-300">
                  {mentor.imageUrl && (
                    <img
                      src={mentor.imageUrl}
                      alt={mentor.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-lg text-center mb-1">{mentor.name}</h4>
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                </div>
                <p className="text-black/60 dark:text-white/60 text-sm text-center">{mentor.description}</p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
      
      <div className="text-center mt-6 mb-12 max-w-3xl mx-auto">
        <p className="text-lg text-black/70 dark:text-white/70 italic">
          Wisdom from leaders who have collectively built companies worth over $50 billion and invested in thousands of startups
        </p>
      </div>
      
      <div className="text-center mt-8">
        <Link to="/mentors" className="inline-flex items-center gap-2 px-6 py-3 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-300 text-lg font-medium rounded-sm">
          Meet All Mentors
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default ScrollingMentors;
