
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    description: "Serial entrepreneur and investor",
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
    name: "Olivier Godement",
    linkedIn: "https://www.linkedin.com/in/oliviergodement/",
    description: "Head of Product at OpenAI",
    imageUrl: "/lovable-uploads/3ee502bc-ee4c-422f-9408-e89c6cbbab00.png",
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
    name: "Gokul Rajaram",
    linkedIn: "https://www.linkedin.com/in/gokulrajaram/",
    description: "Product and business leader",
    imageUrl: "/lovable-uploads/f136e975-2a52-41a5-9cd9-e464dda2a69b.png",
    country: "USA"
  }
];

const ScrollingMentors = () => {
  const [hoveredMentor, setHoveredMentor] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const handleInteraction = () => {
    setIsAutoScrolling(false);
  };

  const handleInteractionEnd = () => {
    setIsAutoScrolling(true);
  };

  return (
    <div className="relative overflow-hidden py-16">
      <div className="text-center mb-8">
        <h2 className="text-sm uppercase tracking-widest mb-3 text-pareto-pink">
          OUR MENTORS
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Learn from the Best
        </h3>
      </div>
      
      <div 
        className="relative overflow-hidden py-8"
        onMouseEnter={handleInteraction}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteraction}
        onTouchEnd={handleInteractionEnd}
      >
        <div 
          ref={scrollContainerRef}
          className={`flex space-x-8 px-4 ${isAutoScrolling ? 'animate-[scroll_35s_linear_infinite]' : ''}`}
        >
          {mentors.concat(mentors).map((mentor, index) => (
            <motion.div
              key={`${mentor.name}-${index}`}
              className="flex-shrink-0"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              transition={{ duration: 0.3 }}
              onHoverStart={() => setHoveredMentor(mentor.name)}
              onHoverEnd={() => setHoveredMentor(null)}
            >
              <Link to="/mentors" className="block relative">
                <div className="h-32 w-32 overflow-hidden rounded-full relative transition-all duration-300">
                  {mentor.imageUrl && (
                    <img
                      src={mentor.imageUrl}
                      alt={mentor.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${hoveredMentor === mentor.name ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>
                <div className={`absolute bottom-0 left-0 w-full text-center transition-all duration-300 ${hoveredMentor === mentor.name ? 'opacity-100 -mb-10' : 'opacity-0 mb-0'}`}>
                  <p className="text-sm font-medium text-white truncate px-1">{mentor.name}</p>
                  <p className="text-xs text-white/70 truncate px-1">{mentor.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-12">
        <Link 
          to="/mentors"
          className="inline-flex items-center px-6 py-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300 text-lg font-medium rounded-md"
        >
          Meet All Mentors
        </Link>
      </div>
    </div>
  );
};

export default ScrollingMentors;
