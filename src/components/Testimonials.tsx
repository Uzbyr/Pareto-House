
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface Testimonial {
  id: number;
  name: string;
  university: string;
  position: string;
  testimonial: string;
  bio: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marieliesse Gouilliard",
    university: "University of Chicago",
    position: "Tech Founder & ML Engineer",
    testimonial: "Joining the fellowship has been a transformative experience. The collaboration, innovative spirit, and support I've found here are unmatched.",
    bio: "Leveraging her expertise in Machine Learning and multilingual background to build innovative tech solutions. Through Pareto's network, she connected with leading AI researchers and received mentorship that helped transform her prototype into a scalable product while developing strong leadership skills.",
    image: "/lovable-uploads/carlos-eduardo.jpeg"
  },
  {
    id: 2,
    name: "Sophia Williams",
    university: "MIT",
    position: "CTO at BlockSync",
    testimonial: "The mentorship and network I gained through this program accelerated my startup's growth beyond what I thought possible.",
    bio: "Combining her computer science expertise with blockchain technology to revolutionize data security for enterprise applications. With guidance from Pareto mentors, she secured seed funding and built a diverse engineering team focused on solving complex technical challenges in the cybersecurity space.",
    image: "/lovable-uploads/herve-bredin.jpeg"
  },
  {
    id: 3,
    name: "Michael Johnson",
    university: "Harvard University",
    position: "Co-founder at NexGen Health",
    testimonial: "Being part of this fellowship gave me access to resources and mentors that completely changed my entrepreneurial journey.",
    bio: "Using his background in biomedical engineering to create accessible healthcare solutions for underserved communities. Through the Pareto fellowship, he gained critical insights on product market fit and connected with healthcare industry leaders who provided invaluable guidance on regulatory navigation and Go-To-Market strategy.",
    image: "/lovable-uploads/christian-reber.jpeg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  useEffect(() => {
    // Auto-rotate testimonials every 5 seconds
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4 relative">
        {/* Stack of cards */}
        <div className="relative h-[360px] md:h-[320px] perspective-[1000px]">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => {
              // Calculate position in the stack relative to the active card
              const position = (index - activeIndex + testimonials.length) % testimonials.length;
              
              return (
                <motion.div
                  key={testimonial.id}
                  className="absolute w-full"
                  initial={{ 
                    opacity: index === activeIndex ? 1 : 0.6,
                    scale: 1 - (position * 0.05),
                    y: position * 15,
                    zIndex: testimonials.length - position,
                    rotateX: position * -2,
                  }}
                  animate={{ 
                    opacity: index === activeIndex ? 1 : 0.6 - (position * 0.1),
                    scale: 1 - (position * 0.05),
                    y: position * 15,
                    zIndex: testimonials.length - position,
                    rotateX: position * -2,
                  }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-[#121212] overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.05)]">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="md:w-1/4">
                        <div className="mb-4">
                          <AspectRatio ratio={1} className="overflow-hidden w-20 h-20 mx-auto md:mx-0">
                            <Avatar className="h-full w-full">
                              <AvatarImage 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                                className="object-cover"
                              />
                              <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                          </AspectRatio>
                        </div>
                        <div className="space-y-2 text-center md:text-left">
                          <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                          <p className="text-zinc-400 text-sm">{testimonial.university}</p>
                          <div className="bg-zinc-800 text-zinc-300 px-3 py-1 inline-block text-sm">
                            {testimonial.position}
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-3/4 space-y-4">
                        <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                          {testimonial.bio}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      
        {/* Navigation controls */}
        <div className="flex justify-center gap-4 mt-12">
          <Button 
            onClick={prevTestimonial} 
            className="bg-zinc-900 border-none hover:bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.07)]"
            size="icon"
            disabled={isAnimating}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            onClick={nextTestimonial} 
            className="bg-zinc-900 border-none hover:bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.07)]"
            size="icon"
            disabled={isAnimating}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
