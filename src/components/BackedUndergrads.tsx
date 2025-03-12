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
    name: "Anu Varma",
    imageUrl: "/lovable-uploads/aad2ef57-76d8-4b0a-9f5b-413f9d4fba41.png",
    university: "University of Oxford",
    achievement: "Co-Founder at Canopy Labs",
    description: "Building virtual humans that are indistinguishable from real ones. Through Pareto's network, Anu connected with top AI researchers and secured early investment that helped accelerate his venture's development and recruit key engineering talent."
  },
  {
    name: "Elias Fizesan",
    imageUrl: "/lovable-uploads/f5342cf3-4935-463d-9528-09ba6816b5e1.png",
    university: "Columbia University",
    achievement: "Co-Founder at Canopy Labs",
    description: "Building virtual humans that are indistinguishable from real ones. Pareto's mentorship program and investor connections helped Elias refine his vision and secure the initial funding round that made the company's breakthrough technology possible."
  },
];

const BackedUndergrads = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollDirection = useRef<number>(1);

  const handleInteraction = () => {
    setIsAutoScrolling(false);
  };

  const handleInteractionEnd = () => {
    setIsAutoScrolling(true);
  };

  useEffect(() => {
    let frameId: number;

    const step = () => {
      if (isAutoScrolling && viewportRef.current) {
        const el = viewportRef.current;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        const currentScrollLeft = el.scrollLeft;
        const speed = 2; // adjust speed as desired

        // If we've hit the right edge, switch to negative direction
        if (currentScrollLeft >= maxScrollLeft) {
          scrollDirection.current = -1;
        }
        // If we've hit the left edge, switch to positive direction
        else if (currentScrollLeft <= 0) {
          scrollDirection.current = 1;
        }

        el.scrollLeft += scrollDirection.current * speed;
      }

      frameId = requestAnimationFrame(step);
    };

    if (isAutoScrolling) {
      frameId = requestAnimationFrame(step);
    }

    return () => cancelAnimationFrame(frameId);
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
