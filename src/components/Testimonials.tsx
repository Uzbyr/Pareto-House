
import React from "react";
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
                  <div className="p-8">
                    {/* Text sized per user's request */}
                    <p className="text-white text-base leading-relaxed mb-8">
                      {testimonial.testimonial}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -inset-1 rounded-full bg-white/5 blur-md -z-10"></div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-lg">{testimonial.name}</h4>
                        <p className="text-zinc-400 text-sm">{testimonial.university}</p>
                        <p className="text-zinc-500 text-sm">{testimonial.position}</p>
                      </div>
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
