
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface Testimonial {
  id: number;
  name: string;
  university: string;
  position: string;
  testimonial: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Joseph",
    university: "Yale University",
    position: "Founder of Ventr",
    testimonial: "Creating entrepreneurship opportunities for college freshmen through Experiential Entrepreneurship Societies (EES). Pareto's fellowship provided Joseph with crucial mentorship, funding resources, and a network of campus ambassadors that helped Ventr expand to 10+ top institutions and build a thriving intercollegiate community for student entrepreneurs.",
    image: "/lovable-uploads/carlos-eduardo.jpeg"
  },
  {
    id: 2,
    name: "Sophia Williams",
    university: "MIT",
    position: "CTO at BlockSync",
    testimonial: "The mentorship and network I gained through this program accelerated my startup's growth beyond what I thought possible. The connections I made have been invaluable for fundraising and product development.",
    image: "/lovable-uploads/herve-bredin.jpeg"
  },
  {
    id: 3,
    name: "Michael Johnson",
    university: "Harvard University",
    position: "Co-founder at NexGen Health",
    testimonial: "Being part of this fellowship gave me access to resources and mentors that completely changed my entrepreneurial journey. I was able to validate my ideas faster and connect with investors who truly believed in our vision.",
    image: "/lovable-uploads/christian-reber.jpeg"
  }
];

const Testimonials = () => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const carouselApi = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const manualInteractionTimeRef = useRef<number>(0);
  const isMobile = useIsMobile();
  
  // Initialize auto-rotation for the carousel
  useEffect(() => {
    const startAutoRotation = () => {
      // Clear any existing timer
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
      
      // Set up new timer
      autoRotateTimerRef.current = setInterval(() => {
        // Only auto-rotate if enough time has passed since manual interaction
        const now = Date.now();
        if (now - manualInteractionTimeRef.current >= 3000 && carouselApi.current) {
          const nextIndex = (activeIndex + 1) % testimonials.length;
          carouselApi.current.scrollTo(nextIndex);
        }
      }, 5000); // Auto-rotate every 5 seconds instead of 2 seconds
    };
    
    startAutoRotation();
    
    // Cleanup on unmount
    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [activeIndex]);

  // Handler for manual navigation
  const handleManualNavigation = (direction: 'prev' | 'next') => {
    if (!carouselApi.current) return;
    
    // Record the time of manual interaction
    manualInteractionTimeRef.current = Date.now();
    
    // Navigate to the previous or next slide
    if (direction === 'prev') {
      carouselApi.current.scrollPrev();
    } else {
      carouselApi.current.scrollNext();
    }
  };

  // Calculate and set the maximum height whenever content changes
  useEffect(() => {
    const calculateMaxHeight = () => {
      // Reset refs array to match current testimonials length
      cardsRef.current = cardsRef.current.slice(0, testimonials.length);
      
      // Calculate the maximum height among all cards
      const heights = cardsRef.current
        .filter(Boolean)
        .map(card => card?.offsetHeight || 0);
      
      const newMaxHeight = Math.max(...heights, 0);
      
      if (newMaxHeight > 0 && newMaxHeight !== maxHeight) {
        setMaxHeight(newMaxHeight);
      }
    };

    // Initial calculation
    calculateMaxHeight();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateMaxHeight);
    
    return () => {
      window.removeEventListener('resize', calculateMaxHeight);
    };
  }, [testimonials, maxHeight]);

  return (
    <div className="py-16 relative">
      <div className="max-w-5xl mx-auto relative">
        {/* Left gradient - adjusted width for mobile */}
        <div className="absolute top-0 bottom-0 left-0 w-6 md:w-12 bg-gradient-to-r from-black to-transparent z-10"></div>
        {/* Right gradient - adjusted width for mobile */}
        <div className="absolute top-0 bottom-0 right-0 w-6 md:w-12 bg-gradient-to-l from-black to-transparent z-10"></div>
        
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          onSelect={(api) => {
            // TypeScript fix: ensure api is the carousel API object, not an event
            if (api && typeof api.selectedScrollSnap === 'function') {
              setActiveIndex(api.selectedScrollSnap());
            }
          }}
          setApi={(api) => {
            carouselApi.current = api;
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem 
                key={testimonial.id} 
                className="sm:basis-10/12 md:basis-3/4 pl-4"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  style={{ 
                    height: !isMobile && maxHeight > 0 ? `${maxHeight}px` : 'auto'
                  }}
                  className="h-full"
                >
                  <Card 
                    className="bg-[#1B1B1B] overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.05)] h-full flex flex-col border-0"
                    ref={el => cardsRef.current[index] = el}
                  >
                    <div className="p-4 md:p-6 flex flex-col h-full">
                      {/* User information */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                        <div className="relative mb-2 sm:mb-0">
                          <Avatar className="h-12 w-12 sm:h-14 sm:w-14 rounded-none">
                            <AvatarImage 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="rounded-none" 
                            />
                            <AvatarFallback className="rounded-none">
                              {testimonial.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -inset-1 bg-white/5 blur-md -z-10"></div>
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-lg">{testimonial.name}</h4>
                          <p className="text-zinc-400 text-sm">{testimonial.university}</p>
                          <p className="text-zinc-500 text-sm">{testimonial.position}</p>
                        </div>
                      </div>
                      
                      {/* Testimonial text */}
                      <p className="text-white text-sm md:text-base leading-relaxed flex-grow max-w-full break-words">
                        {testimonial.testimonial}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            <CarouselPrevious 
              className="relative inset-0 translate-y-0 bg-zinc-900 border-none hover:bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.07)]" 
              onClick={() => handleManualNavigation('prev')}
            />
            <CarouselNext 
              className="relative inset-0 translate-y-0 bg-zinc-900 border-none hover:bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.07)]" 
              onClick={() => handleManualNavigation('next')}
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
