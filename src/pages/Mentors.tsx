import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navigation from "../components/Navigation";

interface Mentor {
  name: string;
  linkedIn: string;
  twitter?: string;
  description?: string;
  bio?: string;
  imagePlaceholder?: string;
  imageUrl?: string;
  country: string;
}

// Active mentors to display on the page
const mentors: Mentor[] = [
  {
    name: "Fabrice Grinda",
    linkedIn: "https://www.linkedin.com/in/fabricegrinda/",
    description: "Founder of OLX and FJ Labs",
    bio: "Fabrice Grinda is a French-American serial entrepreneur and investor. As a prominent angel investor, he has backed hundreds of startups globally through his investment vehicle. Grinda's entrepreneurial background includes founding and scaling multiple successful marketplace businesses. His investment thesis often centers on marketplace models and network-effect businesses. He is known for his data-driven approach to identifying investment opportunities across diverse geographic markets.",
    imageUrl: "/lovable-uploads/12acce9a-72bb-4ea2-a0d0-ebdf7c4eb2b7.png",
    country: "USA"
  },
  {
    name: "Edward Lando",
    linkedIn: "https://www.linkedin.com/in/edwardlando/",
    description: "Serial entrepreneur and investor",
    bio: "Edward Lando is a serial entrepreneur and investor based in the United States. He co-founded Pareto Holdings, an early-stage investment firm and venture studio that has made over 900 investments globally. Lando is also the co-founder and former CEO of Goody, a gifting app that simplifies sending gifts. He is known for combining capital investment with hands-on mentorship to help startups thrive. Lando maintains a notable presence in the startup community by championing founders and scalable technologies.",
    imageUrl: "/lovable-uploads/6b47b599-6ded-4b14-a09b-44c0dbad8481.png",
    country: "USA"
  },
  {
    name: "Abhi Ramesh",
    linkedIn: "https://www.linkedin.com/in/abhiramesh/",
    description: "Founder & CEO at Misfits Market",
    bio: "Abhi Ramesh is the founder and CEO of Misfits Market, a U.S.-based company addressing food waste by delivering surplus and \"imperfect\" produce to consumers at discounted prices. Under his leadership, Misfits Market has expanded rapidly, reflecting strong consumer interest in sustainability and affordable food options. Ramesh's business model combines environmental impact with cost savings, promoting a more equitable food system. He is recognized for using innovative supply-chain strategies to reduce waste and improve food distribution.",
    imageUrl: "/lovable-uploads/7d1b363b-018d-4f30-a2db-f2eb6515cc8e.png",
    country: "USA"
  },
  {
    name: "Zach Bookman",
    linkedIn: "https://www.linkedin.com/in/zacharybookman/",
    description: "Co-founder & CEO at OpenGov",
    bio: "Zach Bookman is the co-founder and CEO of OpenGov, a technology platform that provides cloud-based solutions for public sector budgeting, performance management, and citizen engagement. He envisions a more transparent and efficient government through data-driven decision-making. Bookman's leadership reflects a commitment to civic innovation and the modernization of public-sector tools. By partnering with governments, he aims to optimize resource allocation and enhance public trust.",
    imageUrl: "/lovable-uploads/1cc17b96-3462-4d26-974f-15ba3628034c.png",
    country: "USA"
  },
  {
    name: "Eric Glyman",
    linkedIn: "https://www.linkedin.com/in/eglyman/",
    description: "Co-founder & CEO at Ramp",
    bio: "Eric Glyman is the co-founder and CEO of Ramp, a financial technology company offering corporate cards and spend-management software designed to increase financial efficiency. Glyman's approach emphasizes transparency and automation to help businesses cut wasteful spending. Under his guidance, Ramp has positioned itself as an innovative player in the fintech landscape. His leadership centers on simplifying complex financial processes and empowering companies to make data-driven decisions.",
    imageUrl: "/lovable-uploads/3a89b51a-b995-42c3-85a2-c29983c21e46.png",
    country: "USA"
  },
  {
    name: "Liu Jiang",
    linkedIn: "https://www.linkedin.com/in/liujiang1/",
    description: "Engineering leader and startup advisor",
    bio: "Liu Jiang is a U.S.-based engineering leader and startup advisor. She leverages a strong technical background to guide product development and software architecture. Jiang's advisory work includes optimizing organizational processes and scaling engineering teams. Her experience spans multiple tech segments, reflecting a versatile problem-solving skill set. She is committed to nurturing inclusive, innovative environments that empower teams to excel.",
    imageUrl: "/lovable-uploads/86c1fa85-94f4-464c-9ba6-1d7dc3b6dd1e.png",
    country: "USA"
  },
  {
    name: "Francis Pedraza",
    linkedIn: "https://www.linkedin.com/in/francispedraza/",
    description: "Founder at Invisible Technologies",
    bio: "Francis Pedraza is the founder of Invisible Technologies, a company that provides remote talent and process automation solutions. He's known for his innovative approach to building scalable service businesses and his unique perspective on leadership and company culture.",
    imageUrl: "/lovable-uploads/dc5b5f95-0b6e-493c-b293-4e43ce71392a.png",
    country: "USA"
  },
  {
    name: "Eric Wu",
    linkedIn: "https://www.linkedin.com/in/ericwu01/",
    description: "Founder at Opendoor",
    bio: "Eric Wu is the co-founder of Opendoor, a digital platform for residential real estate transactions. He has founded multiple successful companies and has a track record of disrupting traditional industries with technology-driven solutions. Wu's expertise spans real estate tech, marketplaces, and scaling high-growth startups.",
    imageUrl: "/lovable-uploads/b44fbc4b-212b-49e6-adcc-bf0072f797ed.png",
    country: "USA"
  },
  {
    name: "Cyan Banister",
    linkedIn: "https://www.linkedin.com/in/cyantechnology/",
    description: "Ex-Partner at Founders Fund",
    bio: "Cyan Banister is a prominent angel investor and entrepreneur. She served as a partner at Founders Fund and has made early investments in companies like SpaceX, Uber, and Postmates. As the founder of Zivity, she brings firsthand entrepreneurial experience to her advisory roles. Banister is known for her contrarian investment approach and for backing unconventional founders.",
    imageUrl: "/lovable-uploads/56ab8193-d996-4fc8-954d-c71a3d96bd5a.png",
    country: "USA"
  },
  {
    name: "Venus Williams",
    linkedIn: "https://www.linkedin.com/in/venuswilliams/",
    description: "Tennis champion and entrepreneur",
    bio: "Venus Williams is a legendary tennis champion who has successfully transitioned into entrepreneurship and investing. She has founded multiple businesses including her activewear brand EleVen and interior design firm V Starr. Williams brings her championship mindset and global influence to her business ventures and investments, with a focus on wellness, women's empowerment, and equality.",
    imageUrl: "/lovable-uploads/18ade8c8-718c-4260-9dd6-c32709b1f948.png",
    country: "USA"
  },
  {
    name: "Sarah Guo",
    linkedIn: "https://www.linkedin.com/in/sarahguo/",
    description: "Founder at Conviction VC",
    bio: "Sarah Guo is the founder of Conviction VC, a venture capital firm focused on early-stage technology companies. Previously, she was a General Partner at Greylock Partners, where she led investments in AI, cybersecurity, and enterprise software. Guo brings deep technical knowledge and operational insights to her role as an investor and advisor to founders.",
    imageUrl: "/lovable-uploads/67bf0c08-24a9-4e1d-bb41-9318d2c672e8.png",
    country: "USA"
  },
  {
    name: "Gokul Rajaram",
    linkedIn: "https://www.linkedin.com/in/gokulrajaram1/",
    description: "Investor & Board Member at Coinbase and Pinterest",
    bio: "Gokul Rajaram is a seasoned product and business leader who has made significant contributions at companies like Facebook, Google, DoorDash, and Square. His experience spans product development, business strategy, and growth initiatives. Rajaram serves on the boards of multiple public and private companies, providing strategic guidance derived from his extensive career in technology.",
    imageUrl: "/lovable-uploads/98179821-cd4d-4a1e-9c84-8544e48e694f.png",
    country: "USA"
  },
  {
    name: "Max Altman",
    linkedIn: "https://www.linkedin.com/in/maxhaltman/",
    description: "Founder & GP at Saga Ventures",
    bio: "Max Altman is the Founder and General Partner at Saga Ventures, an early-stage venture capital firm. His investment focus spans AI, developer tools, and enterprise software. Altman brings a unique perspective to his role as an investor, combining technical acumen with strategic business insights to support founders building transformative companies.",
    imageUrl: "/lovable-uploads/dad2a4c2-5fc0-4074-8dac-8294428f754e.png",
    country: "USA"
  },
  {
    name: "Liu Jiang",
    linkedIn: "https://www.linkedin.com/in/liujiang/",
    description: "Founder & GP at Sunflower and former Sequoia Partner",
    bio: "Liu Jiang is a U.S.-based engineering leader and startup advisor. She leverages a strong technical background to guide product development and software architecture. Jiang's advisory work includes optimizing organizational processes and scaling engineering teams. Her experience spans multiple tech segments, reflecting a versatile problem-solving skill set. She is committed to nurturing inclusive, innovative environments that empower teams to excel.",
    imageUrl: "/lovable-uploads/6c5fe0c4-03d3-4457-b3b6-e5f0a5cb69c6.png",
    country: "USA"
  },
  {
    name: "Reilly Opelka",
    linkedIn: "https://www.linkedin.com/in/reillyopelka/",
    description: "Tennis player, Investor and Art Guru",
    bio: "Reilly Opelka is a professional tennis player and investor with interests spanning sports, technology, and art. He brings a unique perspective to his investment activities, combining his experiences as a professional athlete with a keen eye for emerging trends and opportunities. Opelka is known for his thoughtful approach to both his athletic career and his business ventures.",
    imageUrl: "/lovable-uploads/3cfd928c-129d-4412-8860-6361ee0774ab.png",
    country: "USA"
  }
];

// Backlog mentors (not displayed on the page)
const backlogMentors: Mentor[] = [
  {
    name: "Ben Cambier",
    linkedIn: "https://www.linkedin.com/in/jbenjamin-cambier/",
    description: "Early-stage investor and founder",
    bio: "Ben Cambier is a partner at Pareto Holdings, where he focuses on building and investing in early-stage companies. His role involves identifying and partnering with high-potential startups at their formative stages. Cambier leverages firsthand entrepreneurial insights to guide companies toward sustainable growth. He provides both financial backing and strategic counsel, aiming to de-risk the path to market traction. Through active involvement, he fosters a supportive ecosystem that empowers emerging tech ventures.",
    imageUrl: "/lovable-uploads/b4e34a3e-e7d3-4045-a380-3fe37f7b05ce.png",
    country: "USA"
  },
  {
    name: "Pietro Invernizzi",
    linkedIn: "https://www.linkedin.com/in/pietro-invernizzi/",
    description: "Investor and entrepreneur",
    bio: "Pietro Invernizzi is an entrepreneur and investor based in the United Kingdom. He focuses on supporting emerging startups through both capital deployment and advisory services. Invernizzi takes a hands-on approach, helping founders navigate the challenges of early-stage company building. His cross-border perspective allows him to spot international opportunities and bridge diverse markets. He believes in fostering collaborative ecosystems that nurture disruptive ideas and sustainable growth.",
    imageUrl: "/lovable-uploads/687c5fe9-ccfa-4d12-bdb9-066f37806034.png",
    country: "UK"
  },
  {
    name: "Grant Gordon",
    linkedIn: "https://www.linkedin.com/in/grantgordonconnect/",
    description: "Founder & CEO at Artemis",
    bio: "Grant Gordon is a philanthropist and entrepreneur dedicated to building stronger communities and creating opportunities for people to thrive. He is the founder and chair of The Childhood Trust, London's child poverty charity, and has been awarded an OBE for his services to philanthropy, including during the COVID-19 response. Gordon also serves as board chair across a portfolio of UK charities, including The Cabrach Trust and The Reekimlane Foundation. His leadership emphasizes strategic growth, product excellence, and customer-centric innovation. By balancing vision with practical business strategies, he aims to establish his ventures as forward-thinking industry players.",
    imageUrl: "/lovable-uploads/29fe48b3-0fa6-425e-abc6-7add6c5d7236.png",
    country: "USA"
  },
  {
    name: "Arthur Querou",
    linkedIn: "https://www.linkedin.com/in/arthurquerou/",
    description: "Founder & CEO at PlayPlay",
    bio: "Arthur Querou is the founder and CEO of PlayPlay, a company that simplifies video creation for businesses, enabling them to produce engaging content quickly. Querou's vision centers on user-friendly design and intuitive technology. Under his leadership, PlayPlay addresses the rising demand for dynamic, multimedia marketing solutions. He strives to democratize professional-grade video production, allowing teams to communicate their stories more effectively.",
    imageUrl: "/lovable-uploads/8545216b-c853-4042-b152-cada13843026.png",
    country: "USA"
  },
  {
    name: "Nicolas Douay",
    linkedIn: "https://www.linkedin.com/in/nicolasdouay/",
    description: "Technology entrepreneur and investor",
    bio: "Nicolas Douay is a French technology entrepreneur and investor. He actively seeks out disruptive ideas and teams, providing both funding and operational guidance. Douay's background includes hands-on experience in launching and scaling tech ventures. He is a proponent of strengthening France's position in the global startup ecosystem. His dual role as entrepreneur and investor reflects a commitment to empowering the next wave of innovation.",
    imageUrl: "/lovable-uploads/e838327a-3836-4221-bb14-73a96f840ec9.png",
    country: "France"
  },
  {
    name: "Mathias Adam",
    linkedIn: "https://www.linkedin.com/in/mathias-adam-7a10274a/",
    description: "Technology leader and advisor",
    bio: "Mathias Adam is a French technology leader and advisor. He assists organizations in implementing digital strategies, often bridging technical and managerial disciplines. Adam's approach highlights the importance of agile processes and data-driven decision-making. As an advisor, he emphasizes collaboration and continuous innovation to stay competitive. His guidance helps companies navigate complex technological landscapes and drive sustainable transformation.",
    imageUrl: "/lovable-uploads/296914cf-fcac-4a48-9c42-8e9bc9b50f4a.png",
    country: "France"
  },
  {
    name: "Sylvain Gariel",
    linkedIn: "https://www.linkedin.com/in/sylvain-gariel-21455735/",
    description: "Technology entrepreneur and business leader",
    bio: "Sylvain Gariel is a French technology entrepreneur and business leader. He focuses on catalyzing innovation through effective leadership and cross-functional collaboration. Gariel has co-founded ventures that harness emerging technologies to solve practical challenges. His background spans technical, operational, and commercial responsibilities. By fostering a culture of ambition and resilience, he aims to propel France's technology sector forward.",
    imageUrl: "/lovable-uploads/9ae2e248-a5a6-4e6d-be4d-3c747a6426de.png",
    country: "France"
  },
  {
    name: "Arthur Waller",
    linkedIn: "https://www.linkedin.com/in/arthur-waller-a793a611/",
    description: "Co-founder & CEO at Pennylane",
    bio: "Arthur Waller is the co-founder and CEO of Pennylane, a French company that combines accounting, billing, and financial analytics into one integrated platform.",
    imageUrl: "/lovable-uploads/ecc7349b-b875-4cdb-8e87-9c6a4dda4f28.png",
    country: "France"
  },
  {
    name: "Alexandre Yazdi",
    linkedIn: "https://www.linkedin.com/in/alexandre-yazdi-21a9813a/",
    description: "Co-founder & CEO at Voodoo",
    bio: "Alexandre Yazdi is a successful French entrepreneur who co-founded and serves as CEO of Voodoo, a mobile game publisher that has become one of the world's leading mobile game companies. Under his leadership, Voodoo has published numerous hit games and expanded its global presence. Yazdi's business strategy combines data-driven development with innovative marketing approaches.",
    imageUrl: "/lovable-uploads/2c496de7-e447-40fc-9bc9-d3c5ec2d8b71.png",
    country: "France"
  },
  {
    name: "Michal Valko",
    linkedIn: "https://www.linkedin.com/in/michalvalko/",
    description: "Research scientist and AI expert",
    bio: "Michal Valko is a distinguished research scientist specializing in artificial intelligence and machine learning. Based in France, he contributes to advancing the field through innovative research approaches and academic leadership. Valko's work explores the theoretical foundations and practical applications of AI systems. His research has implications for various industries seeking to implement cutting-edge AI solutions.",
    imageUrl: "/lovable-uploads/9b10dc7d-bdd5-4a3f-b04b-51ac68f019ff.png",
    country: "France"
  },
  {
    name: "Jean Ponce",
    linkedIn: "https://www.linkedin.com/in/jean-ponce-2302986/",
    description: "Computer vision researcher and academic leader",
    bio: "Jean Ponce is a renowned computer vision researcher and academic leader based in France. His work focuses on developing algorithms and models that enable computers to interpret and understand visual information. Ponce has made significant contributions to the fields of 3D computer vision and object recognition. Through his research and teaching, he shapes the next generation of computer vision specialists and contributes to advancements in AI-powered visual technologies.",
    imageUrl: "/lovable-uploads/1429b1d7-6575-4620-97cd-fee282a06662.png",
    country: "France"
  },
  {
    name: "Boaz Avital",
    linkedIn: "https://www.linkedin.com/in/boazavital/",
    description: "Engineering leader and startup advisor",
    bio: "Boaz Avital is an engineering leader and startup advisor based in the United States. He leverages his technical expertise to guide companies through critical growth stages and technological challenges. Avital specializes in scaling engineering teams and implementing effective development processes. As an advisor, he helps startups establish solid technical foundations while maintaining innovation velocity. His approach balances engineering excellence with business objectives.",
    imageUrl: "/lovable-uploads/8754e353-9082-4238-926b-13289a92cdce.png",
    country: "USA"
  },
  {
    name: "Jean-Daniel Guyot",
    linkedIn: "https://www.linkedin.com/in/jeandanielguyot/",
    description: "Serial entrepreneur and investor",
    bio: "Jean-Daniel Guyot is a French serial entrepreneur and investor with a track record of building and scaling technology companies. He combines business vision with technical understanding to identify promising opportunities. Guyot actively supports the French startup ecosystem through mentorship and investments. His entrepreneurial journey provides valuable insights for founders navigating similar paths. As an investor, he seeks ventures with disruptive potential and strong execution capabilities.",
    imageUrl: "/lovable-uploads/9df83c61-279d-4084-b315-55d7f8d3b272.png",
    country: "France"
  },
  {
    name: "Jack Pierse",
    linkedIn: "https://www.linkedin.com/in/jack-pierse-53b51155/",
    description: "Co-founder & CFO at Wayflyer",
    bio: "Jack Pierse is the co-founder and CFO of Wayflyer, an Irish company that provides revenue-based financing and marketing analytics for e-commerce businesses. He has helped build Wayflyer into a significant player in the alternative financing space. Pierse's approach combines financial expertise with e-commerce insights to help online businesses scale effectively. His leadership focuses on creating accessible funding solutions that align with the unique needs of digital merchants.",
    imageUrl: "/lovable-uploads/675c3651-db8d-4edd-9ff6-3ffd7210745e.png",
    country: "Ireland"
  },
  {
    name: "Serena Williams",
    linkedIn: "https://www.linkedin.com/in/serena-williams-16428a279/",
    description: "Tennis champion, entrepreneur and investor",
    bio: "Serena Williams is an accomplished tennis champion, entrepreneur, and investor based in the United States. Beyond her legendary sports career, she has established herself as a formidable presence in business and investment. Williams has founded and invested in numerous ventures, with a focus on supporting diverse founders and innovative companies. Her investment philosophy emphasizes companies that align with her values of inclusivity and empowerment. Williams brings her championship mindset and global influence to her role as a business leader and mentor.",
    imageUrl: "/lovable-uploads/fc28bb63-8d48-4262-a6db-0b61a7a4595b.png",
    country: "USA"
  }
];

const Mentors = () => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getCountryDisplay = (country: string) => {
    switch(country) {
      case "USA":
        return { name: "United States", flag: "🇺🇸" };
      case "France":
        return { name: "France", flag: "🇫🇷" };
      case "UK":
        return { name: "United Kingdom", flag: "🇬🇧" };
      case "Ireland":
        return { name: "Ireland", flag: "🇮🇪" };
      default:
        return { name: country, flag: "🏳️" };
    }
  };

  const handleMentorClick = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-pareto-black text-black dark:text-white font-inter">
      <Navigation />
      <div className="container mx-auto px-4 py-12 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-pareto-pink hover:text-black dark:hover:text-white mb-8 inline-block">&larr; Back to Home</Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Mentors</h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <p className="text-xl text-black/80 dark:text-white/80 max-w-2xl">
              Meet our exceptional mentors who are leaders in their fields, ready to share their knowledge and experience with the next generation of entrepreneurs.
            </p>
            <div className="flex-shrink-0">
            {false &&<Link to="/mentor-finder">
                <Button variant="pink" className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Find Your Mentor
                </Button>
              </Link>}
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {mentors.map((mentor, index) => {
            const countryInfo = getCountryDisplay(mentor.country);
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-black/5 dark:bg-white/5 rounded-lg p-6 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {mentor.imageUrl ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                      <img 
                        src={mentor.imageUrl} 
                        alt={mentor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-pareto-pink flex items-center justify-center text-black font-bold text-xl">
                      {mentor.imagePlaceholder}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <button 
                        onClick={() => handleMentorClick(mentor)}
                        className="text-xl font-semibold hover:text-pareto-pink transition-colors text-left"
                      >
                        {mentor.name}
                      </button>
                      <span 
                        className="text-lg" 
                        aria-label={countryInfo.name}
                        title={countryInfo.name}
                        role="img"
                      >
                        {countryInfo.flag}
                      </span>
                    </div>
                    {mentor.description && (
                      <p className="text-black/60 dark:text-white/60 mb-4 text-sm">
                        {mentor.description} <span className="text-black/40 dark:text-white/40">({countryInfo.name})</span>
                      </p>
                    )}
                    <div className="flex gap-3">
                      <a
                        href={mentor.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      {mentor.twitter && (
                        <a
                          href={mentor.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">
                {selectedMentor?.name}
              </DialogTitle>
            </div>
            <DialogDescription className="text-black/60 dark:text-white/60">
              {selectedMentor?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col md:flex-row gap-6 mt-4 flex-1 overflow-hidden">
            {selectedMentor?.imageUrl && (
              <div className="md:w-1/3 flex-shrink-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={selectedMentor.imageUrl} 
                    alt={selectedMentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="mt-4 flex gap-3">
                  <a
                    href={selectedMentor.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  {selectedMentor.twitter && (
                    <a
                      href={selectedMentor.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            )}
            
            <ScrollArea className="md:w-2/3 flex-1 pr-4">
              <div className="text-lg leading-relaxed">
                {selectedMentor?.bio}
              </div>
              
              {selectedMentor && (
                <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="flex items-center gap-2">
                    <span>{getCountryDisplay(selectedMentor.country).flag}</span>
                    <span>{getCountryDisplay(selectedMentor.country).name}</span>
                  </p>
                </div>
              )}
            </ScrollArea>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Link to="/mentor-finder">
              <Button variant="pink" className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Find Match
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Mentors;
