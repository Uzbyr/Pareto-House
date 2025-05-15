
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

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
  return (
    <div className="py-16 relative">
      {/* Add gradient overlays for the peeking effect */}
      <div className="absolute top-0 bottom-0 left-0 w-1/6 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute top-0 bottom-0 right-0 w-1/6 bg-gradient-to-l from-black to-transparent z-10"></div>
      
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="max-w-5xl mx-auto"
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="sm:basis-4/5 md:basis-4/5 lg:basis-4/5 pl-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-[#121212] overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.05)]">
                  <div className="p-8 flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                      <div className="mb-4">
                        <AspectRatio ratio={1} className="overflow-hidden w-24 h-24 mx-auto md:mx-0">
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
                        <p className="text-zinc-400">{testimonial.university}</p>
                        <div className="bg-zinc-800 text-zinc-300 px-3 py-1 inline-block text-sm">
                          {testimonial.position}
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-3/4 space-y-4">
                      <p className="text-zinc-400 leading-relaxed">
                        {testimonial.bio}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-8">
          <CarouselPrevious className="relative inset-0 translate-y-0 bg-zinc-900 border-none hover:bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.07)]" />
          <CarouselNext className="relative inset-0 translate-y-0 bg-zinc-900 border-none hover:bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.07)]" />
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonials;
