
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

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
    name: "Elias Fizesan",
    university: "Columbia University",
    position: "Co-Founder at Canopy Labs",
    testimonial: "Pareto has been a force of nature when it comes to supporting founders after partnering with them. They've truly had an immeasurable impact on our company, which is rare to find among investors. From assisting with hiring and network expansion to GTM strategy and customer acquisition, Pareto has you covered in every way!",
    image: "/lovable-uploads/b713e628-e079-4ecd-ae45-250fd51f8b75.png"
  },
  {
    id: 2,
    name: "Marieliesse Gouilliard",
    university: "University of Chicago",
    position: "Tech Founder & ML Engineer",
    testimonial: "Leveraging her expertise in Machine Learning and multilingual background to build innovative tech solutions. Through Pareto's network, she connected with leading AI researchers and received mentorship that helped transform her prototype into a scalable product while developing strong leadership skills.",
    image: "/lovable-uploads/edc8c4d8-8477-4a2e-9b32-31c5cd2c8022.png"
  },
  {
    id: 3,
    name: "Chan Woo Kim",
    university: "Williams College",
    position: "Co-founder & CEO at Theta One",
    testimonial: "Building innovative generative AI tools for language learning, focusing on the Korean market. Through Pareto's extensive network, Chan secured strategic partnerships and mentorship that helped him raise $2M in pre-seed funding and grants, while developing a deep understanding of product-market fit in the EdTech space.",
    image: "/lovable-uploads/1b5b93dd-9470-44e6-9562-7f5b07dea786.png"
  },
  {
    id: 4,
    name: "Joseph Jojoe",
    university: "Columbia University",
    position: "Founder at Ventr",
    testimonial: "Creating entrepreneurship opportunities for college freshmen through Experiential Entrepreneurship Societies (EES). Pareto's fellowship provided Joseph with crucial mentorship, funding resources, and a network of campus ambassadors that helped Ventr expand to 10+ top institutions and build a thriving intercollegiate community for student entrepreneurs.",
    image: "/lovable-uploads/314dd570-2849-43b6-98b3-91f9f3f847f5.png"
  },
  {
    id: 5,
    name: "Shadi Elaridi",
    university: "Stanford University",
    position: "Founder & CEO at Swish Robotics",
    testimonial: "Pareto has been instrumental in building Swish, providing invaluable support - whether through investor and partner introductions, GTM strategy discussions, or connecting us with like-minded founders. The team is engaged, genuine, and truly invested in our success - we're proud to call them our partners.",
    image: "/lovable-uploads/42cfa80b-53c6-461b-8e9e-c025c6ffc29f.png"
  },
  {
    id: 6,
    name: "Zilin Dong",
    university: "Vanderbilt University",
    position: "Founder of Stealth Startup",
    testimonial: "Working on a groundbreaking stealth startup with significant market potential. Through Pareto's extensive fellowship network, Zilin gained access to elite entrepreneurial mentors and venture connections that provided both strategic guidance and early-stage funding opportunities, helping transform his innovative concept from idea to execution.",
    image: "/lovable-uploads/204adfe5-24f7-4700-8a9e-7181a25aca5a.png"
  },
  {
    id: 7,
    name: "James (Yuxi) Qian",
    university: "Stanford University",
    position: "Founder of Stealth AI Startup",
    testimonial: "Developing cutting-edge AI technology with applications in computer vision and natural language processing. With Pareto's support, James secured seed funding from top Silicon Valley investors and gained access to a network of technical advisors who helped refine the product architecture and go-to-market strategy for his revolutionary AI platform.",
    image: "/lovable-uploads/270f2e1d-f4a1-4f0b-b958-8cf7f9865fb5.png"
  },
  {
    id: 8,
    name: "Kian Sadeghi",
    university: "University of Pennsylvania",
    position: "Founder & CEO at Nucleus",
    testimonial: "Building Nucleus, the consumer health platform that's ushering in a new era of preventive healthcare based on whole-genome sequencing. Through Pareto's network, Kian connected with key biotech investors and mentors who helped him secure funding from Founders Fund, 776, and other top investors, while providing strategic guidance for scaling his innovative healthcare platform.",
    image: "/lovable-uploads/eeb20dcb-6eb8-495b-8ba2-6d36044ebef9.png"
  },
  {
    id: 9,
    name: "Anu Varma",
    university: "University of Oxford",
    position: "Co-Founder at Canopy Labs",
    testimonial: "As a founder, partnering with Pareto has been one of the best decisions we've made. Their level of involvement goes way beyond typical investors—they've been hands-on in opening doors to helping us raise, shaping our go-to-market approach, and accelerating us in every way. Having Pareto on board feels like having an extension of our own team, genuinely invested in our long-term success.",
    image: "/lovable-uploads/bb4c16b9-c0bd-4414-b160-5cfc2de0eeec.png"
  }
];

const Testimonials = () => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const carouselApi = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const manualInteractionTimeRef = useRef<number>(0);
  
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
    <div className="pt-0 pb-8 md:pb-16 relative">
      <div className="max-w-5xl mx-auto relative">
        {/* Left gradient positioned relative to the carousel */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-gradient-to-r from-black to-transparent z-10"></div>
        {/* Right gradient positioned relative to the carousel */}
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-black to-transparent z-10"></div>
        
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
              <CarouselItem key={testimonial.id} className="sm:basis-full md:basis-4/5 lg:basis-4/5 pl-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  style={{ minHeight: '100%' }}
                  className="h-full"
                >
                  <Card 
                    className="bg-[#1B1B1B] overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.05)] h-full flex flex-col border-0"
                    ref={el => cardsRef.current[index] = el}
                  >
                    <div className="p-4 md:p-8 flex flex-col h-full">
                      {/* User information */}
                      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
                        <div className="relative">
                          <Avatar className="h-10 w-10 md:h-14 md:w-14 rounded-none">
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
                          <h4 className="text-white font-medium text-base md:text-lg">{testimonial.name}</h4>
                          <p className="text-zinc-400 text-xs md:text-sm">{testimonial.university}</p>
                          <p className="text-zinc-500 text-xs md:text-sm">{testimonial.position}</p>
                        </div>
                      </div>
                      
                      {/* Testimonial text */}
                      <p className="text-white text-sm md:text-base leading-relaxed flex-grow">
                        {testimonial.testimonial}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            <CarouselPrevious 
              className="relative inset-0 translate-y-0 h-8 w-8 md:h-10 md:w-10 bg-zinc-900 border-none hover:bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.07)]" 
              onClick={() => handleManualNavigation('prev')}
            />
            <CarouselNext 
              className="relative inset-0 translate-y-0 h-8 w-8 md:h-10 md:w-10 bg-zinc-900 border-none hover:bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.07)]" 
              onClick={() => handleManualNavigation('next')}
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
