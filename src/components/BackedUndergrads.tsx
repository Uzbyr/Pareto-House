
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
    description:
      "As a founder, partnering with Pareto has been one of the best decisions we’ve made. Their level of involvement goes way beyond typical investors—they’ve been hands-on in opening doors to helping us raise, shaping our go-to-market approach, and accelerating us in every way. Having Pareto on board feels like having an extension of our own team, genuinely invested in our long-term success.",
  },
  {
    name: "Elias Fizesan",
    imageUrl: "/lovable-uploads/f5342cf3-4935-463d-9528-09ba6816b5e1.png",
    university: "Columbia University",
    achievement: "Co-Founder at Canopy Labs",
    description:
      "Pareto has been a force of nature when it comes to supporting founders after partnering with them. They've truly had an immeasurable impact on our company, which is rare to find among investors. From assisting with hiring and network expansion to GTM strategy and customer acquisition, Pareto has you covered in every way!",
  },
  {
    name: "Marieliesse Gouilliard",
    imageUrl: "/lovable-uploads/cc7fd917-15d3-458e-80dd-fbbff7c92477.png",
    university: "University of Chicago",
    achievement: "Tech Founder & ML Engineer",
    description:
      "Leveraging her expertise in Machine Learning and multilingual background to build innovative tech solutions. Through Pareto's network, she connected with leading AI researchers and received mentorship that helped transform her prototype into a scalable product while developing strong leadership skills.",
  },
  {
    name: "Chan Woo Kim",
    imageUrl: "/lovable-uploads/ca60f026-0749-4237-bf1c-b5b3358d7294.png",
    university: "Williams College",
    achievement: "Co-founder & CEO at Theta One",
    description:
      "Building innovative generative AI tools for language learning, focusing on the Korean market. Through Pareto's extensive network, Chan secured strategic partnerships and mentorship that helped him raise $2M in pre-seed funding and grants, while developing a deep understanding of product-market fit in the EdTech space.",
  },
  {
    name: "Joseph Jojoe",
    imageUrl: "/lovable-uploads/ce0f044b-5857-4abb-a8f6-5200557d6056.png",
    university: "Columbia University",
    achievement: "Founder at Ventr",
    description:
      "Creating entrepreneurship opportunities for college freshmen through Experiential Entrepreneurship Societies (EES). Pareto's fellowship provided Joseph with crucial mentorship, funding resources, and a network of campus ambassadors that helped Ventr expand to 10+ top institutions and build a thriving intercollegiate community for student entrepreneurs.",
  },
  {
    name: "Shadi Elaridi",
    imageUrl: "/lovable-uploads/f6e0e831-44b3-4f4d-8e98-f439b0ed49e8.png",
    university: "Stanford University",
    achievement: "Founder & CEO at Swish Robotics",
    description:
      "Pareto has been instrumental in building Swish, providing invaluable support - whether through investor and partner introductions, GTM strategy discussions, or connecting us with like-minded founders. The team is engaged, genuine, and truly invested in our success - we’re proud to call them our partners.",
  },
  {
    name: "Zilin Dong",
    imageUrl: "/lovable-uploads/bd372fdd-df3e-40e1-a62d-ce8a61c518bf.png",
    university: "Vanderbilt University",
    achievement: "Founder of Stealth Startup",
    description:
      "Working on a groundbreaking stealth startup with significant market potential. Through Pareto's extensive fellowship network, Zilin gained access to elite entrepreneurial mentors and venture capital connections that provided both strategic guidance and early-stage funding opportunities, helping transform his innovative concept from idea to execution.",
  },
  {
    name: "James (Yuxi) Qian",
    imageUrl: "/lovable-uploads/183d91d4-e5cc-4421-ae9f-45473f615ff4.png",
    university: "Stanford University",
    achievement: "Founder of Stealth AI Startup",
    description:
      "Developing cutting-edge AI technology with applications in computer vision and natural language processing. With Pareto's support, James secured seed funding from top Silicon Valley investors and gained access to a network of technical advisors who helped refine the product architecture and go-to-market strategy for his revolutionary AI platform.",
  },
  {
    name: "Kian Sadeghi",
    imageUrl: "/lovable-uploads/1a1f7ecf-11fe-4981-bd07-b46cb3042726.png",
    university: "University of Pennsylvania",
    achievement: "Founder & CEO at Nucleus",
    description:
      "Building Nucleus, the consumer health platform that's ushering in a new era of preventive healthcare based on whole-genome sequencing. Through Pareto's network, Kian connected with key biotech investors and mentors who helped him secure funding from Founders Fund, 776, and other top investors, while providing strategic guidance for scaling his innovative healthcare platform.",
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
        const speed = 1; // adjust speed as desired

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
    <div className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-sm uppercase tracking-widest mb-3 text-pareto-pink">
            SUCCESS STORIES
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Undergrads Backed by Pareto
          </h3>
          <p className="text-black/60 dark:text-white/60 text-lg max-w-2xl mx-auto">
            Meet some of our exceptional fellows who have gone on to build
            remarkable companies
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
                  <h4 className="text-xl font-semibold mb-1">
                    {undergrad.name}
                  </h4>
                  <p className="text-sm text-black/60 dark:text-white/60 mb-2">
                    {undergrad.university}
                  </p>
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
          <ScrollBar
            orientation="horizontal"
            className="bg-black/10 dark:bg-white/10"
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default BackedUndergrads;
