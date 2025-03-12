
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRef, useState, useEffect } from "react";

interface Undergrad {
  name: string;
  imageUrl: string;
  university: string;
  achievement: string;
  description: string;
}

const undergrads: Undergrad[] = [
  {
    name: "Sarah Chen",
    imageUrl: "/lovable-uploads/22d647e1-7b1f-4966-af22-3bb3a6254c2f.png",
    university: "Stanford University",
    achievement: "Raised $2.1M Seed Round",
    description: "Built an AI-powered education platform that helps students learn mathematics through personalized learning paths. Featured in TechCrunch and backed by Y Combinator."
  },
  {
    name: "Alex Kumar",
    imageUrl: "/lovable-uploads/42612d8f-eb8a-4d6f-9f50-69c3e8662f84.png",
    university: "MIT",
    achievement: "Acquired by Microsoft",
    description: "Developed a revolutionary quantum computing simulation software while still a junior. The technology was acquired by Microsoft for $15M, making him one of the youngest founders to achieve such an exit."
  },
  {
    name: "Anu Varma",
    imageUrl: "/lovable-uploads/aad2ef57-76d8-4b0a-9f5b-413f9d4fba41.png",
    university: "University of Oxford",
    achievement: "Co-Founder at Canopy Labs",
    description: "Building virtual humans that are indistinguishable from real ones. Through Pareto's network, Anu connected with top AI researchers and secured early investment that helped accelerate his venture's development and recruit key engineering talent."
  },
  {
    name: "Maya Patel",
    imageUrl: "/lovable-uploads/56ab8193-d996-4fc8-954d-c71a3d96bd5a.png",
    university: "Harvard University",
    achievement: "Series A - $12M",
    description: "Founded a climate tech startup that developed innovative carbon capture technology. Secured partnerships with major energy companies and raised a $12M Series A led by Sequoia Capital."
  },
  {
    name: "David Park",
    imageUrl: "/lovable-uploads/8545216b-c853-4042-b152-cada13843026.png",
    university: "UC Berkeley",
    achievement: "YC W23 Batch",
    description: "Created a next-generation cybersecurity platform that uses behavioral biometrics to prevent fraud. Selected for Y Combinator's W23 batch and already serving Fortune 500 clients."
  }
];

const BackedUndergrads = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const handleInteraction = () => {
    setIsAutoScrolling(false);
  };

  const handleInteractionEnd = () => {
    setIsAutoScrolling(true);
  };

  useEffect(() => {
    let animationId: number;
    let lastTimestamp = 0;
    const scrollSpeed = 0.5; // pixels per millisecond

    const autoScroll = (timestamp: number) => {
      if (!isAutoScrolling || !viewportRef.current) {
        lastTimestamp = timestamp;
        animationId = requestAnimationFrame(autoScroll);
        return;
      }

      const elapsed = timestamp - lastTimestamp;
      if (elapsed > 0) {
        viewportRef.current.scrollLeft += scrollSpeed * elapsed;
        
        // If we've scrolled to the end, reset to the beginning
        if (viewportRef.current.scrollLeft >= 
            viewportRef.current.scrollWidth - viewportRef.current.clientWidth) {
          viewportRef.current.scrollLeft = 0;
        }
      }
      
      lastTimestamp = timestamp;
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isAutoScrolling]);

  return (
    <div className="bg-black/5 dark:bg-white/5 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-sm uppercase tracking-widest mb-3 text-pareto-pink">
            SUCCESS STORIES
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Undergrads Backed by Pareto
          </h3>
          <p className="text-black/60 dark:text-white/60 text-lg max-w-2xl mx-auto">
            Meet some of our exceptional fellows who have gone on to build remarkable companies
          </p>
        </div>

        <ScrollArea 
          viewportRef={viewportRef}
          className="w-full"
          onMouseEnter={handleInteraction}
          onTouchStart={handleInteraction}
          onMouseLeave={handleInteractionEnd}
          onTouchEnd={handleInteractionEnd}
        >
          <div className="flex space-x-6 px-4 py-6">
            {undergrads.map((undergrad, index) => (
              <div 
                key={index}
                className="flex-shrink-0 flex gap-6 bg-white/50 dark:bg-white/5 p-6 rounded-lg w-[600px] group hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={undergrad.imageUrl}
                    alt={undergrad.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-xl font-semibold mb-1">{undergrad.name}</h4>
                  <p className="text-sm text-black/60 dark:text-white/60 mb-2">{undergrad.university}</p>
                  <div className="mb-3">
                    <span className="inline-block bg-pareto-pink/20 text-pareto-pink px-3 py-1 rounded-full text-sm font-medium">
                      {undergrad.achievement}
                    </span>
                  </div>
                  <p className="text-black/80 dark:text-white/80">
                    {undergrad.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="bg-black/10 dark:bg-white/10" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default BackedUndergrads;
