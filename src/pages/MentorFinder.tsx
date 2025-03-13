import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SendIcon, User, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

interface Mentor {
  name: string;
  country: string;
  expertise: string[];
  description: string;
  linkedIn: string;
}

const mentorsData: Mentor[] = [
  {
    name: "Edward Lando",
    country: "USA",
    expertise: [
      "entrepreneurship",
      "investment",
      "startup",
      "venture capital",
      "innovation",
      "business models",
    ],
    description:
      "Serial entrepreneur and investor, co-founder of Pareto Holdings. Combines capital investment with hands-on mentorship to help startups thrive.",
    linkedIn: "https://www.linkedin.com/in/edwardlando/",
  },
  {
    name: "Ben Cambier",
    country: "USA",
    expertise: [
      "early-stage investment",
      "startup",
      "entrepreneurship",
      "growth strategy",
      "market traction",
    ],
    description:
      "Early-stage investor and founder focusing on high-potential startups at their formative stages, providing financial backing and strategic counsel.",
    linkedIn: "https://www.linkedin.com/in/jbenjamin-cambier/",
  },
  {
    name: "Abhi Ramesh",
    country: "USA",
    expertise: [
      "food tech",
      "sustainability",
      "supply chain",
      "e-commerce",
      "food waste",
      "social impact",
    ],
    description:
      "Founder & CEO at Misfits Market, addressing food waste by rescuing surplus produce and making it accessible to consumers.",
    linkedIn: "https://www.linkedin.com/in/abhiramesh/",
  },
  {
    name: "Zach Bookman",
    country: "USA",
    expertise: [
      "government technology",
      "civic innovation",
      "transparency",
      "data-driven",
      "public sector",
      "budgeting",
    ],
    description:
      "Co-founder & CEO at OpenGov, creating technology platforms for public agencies focused on transparency and efficient government.",
    linkedIn: "https://www.linkedin.com/in/zacharybookman/",
  },
  {
    name: "Eric Glyman",
    country: "USA",
    expertise: [
      "fintech",
      "financial efficiency",
      "spend management",
      "automation",
      "corporate finance",
      "data-driven",
    ],
    description:
      "Co-founder & CEO at Ramp, offering corporate cards and spend-management software to increase financial efficiency.",
    linkedIn: "https://www.linkedin.com/in/eglyman/",
  },
  {
    name: "Pietro Invernizzi",
    country: "UK",
    expertise: [
      "cross-border opportunities",
      "international markets",
      "startup advisory",
      "investment",
      "collaborative ecosystems",
    ],
    description:
      "Entrepreneur and investor based in the UK, supporting emerging startups through capital deployment and advisory.",
    linkedIn: "https://www.linkedin.com/in/pietro-invernizzi/",
  },
  {
    name: "Liu Jiang",
    country: "USA",
    expertise: [
      "engineering leadership",
      "product development",
      "software architecture",
      "team scaling",
      "technical advisory",
    ],
    description:
      "Engineering leader and startup advisor with strong technical background, guiding product development and scaling engineering teams.",
    linkedIn: "https://www.linkedin.com/in/liujiang1/",
  },
  {
    name: "Grant Gordon",
    country: "USA",
    expertise: [
      "technology solutions",
      "strategic growth",
      "product excellence",
      "customer-centric innovation",
      "collaborative culture",
    ],
    description:
      "Founder & CEO at Artemis, focusing on identifying market gaps and building technology-driven solutions.",
    linkedIn: "https://www.linkedin.com/in/grantgordonconnect/",
  },
  {
    name: "Arthur Querou",
    country: "USA",
    expertise: [
      "video creation",
      "marketing technology",
      "user-friendly design",
      "multimedia",
      "content creation",
    ],
    description:
      "Founder & CEO at PlayPlay, simplifying video creation for businesses to produce engaging content quickly.",
    linkedIn: "https://www.linkedin.com/in/arthurquerou/",
  },
  {
    name: "Nicolas Douay",
    country: "France",
    expertise: [
      "disruptive technology",
      "operational guidance",
      "scaling ventures",
      "french startup ecosystem",
      "tech investment",
    ],
    description:
      "Technology entrepreneur and investor in France, seeking disruptive ideas and providing funding and operational guidance.",
    linkedIn: "https://www.linkedin.com/in/nicolasdouay/",
  },
  {
    name: "Mathias Adam",
    country: "France",
    expertise: [
      "digital strategy",
      "agile processes",
      "data-driven decision-making",
      "technological transformation",
      "advisory",
    ],
    description:
      "Technology leader and advisor in France, assisting organizations in implementing digital strategies and navigating complex technological landscapes.",
    linkedIn: "https://www.linkedin.com/in/mathias-adam-7a10274a/",
  },
  {
    name: "Sylvain Gariel",
    country: "France",
    expertise: [
      "cross-functional collaboration",
      "emerging technologies",
      "technical operations",
      "commercial strategy",
      "french tech sector",
    ],
    description:
      "Technology entrepreneur and business leader in France, focusing on catalyzing innovation through effective leadership.",
    linkedIn: "https://www.linkedin.com/in/sylvain-gariel-21455735/",
  },
  {
    name: "Arthur Waller",
    country: "France",
    expertise: [
      "fintech",
      "accounting",
      "financial analytics",
      "automation",
      "financial management",
      "business software",
    ],
    description:
      "Co-founder & CEO at Pennylane, combining accounting, billing, and financial analytics into one integrated platform.",
    linkedIn: "https://www.linkedin.com/in/arthur-waller-a793a611/",
  },
  {
    name: "Alexandre Yazdi",
    country: "France",
    expertise: [
      "mobile gaming",
      "casual games",
      "game design",
      "user acquisition",
      "developer partnerships",
      "entertainment tech",
    ],
    description:
      "Co-founder & CEO at Voodoo, a mobile gaming company renowned for its casual game titles and supporting independent developers.",
    linkedIn: "https://www.linkedin.com/in/alexandre-yazdi-21a9813a/",
  },
  {
    name: "Michal Valko",
    country: "France",
    expertise: [
      "machine learning",
      "reinforcement learning",
      "artificial intelligence",
      "AI research",
      "theoretical frameworks",
    ],
    description:
      "Research scientist and AI expert based in France, advancing machine learning with emphasis on reinforcement learning.",
    linkedIn: "https://www.linkedin.com/in/michalvalko/",
  },
  {
    name: "Jean Ponce",
    country: "France",
    expertise: [
      "computer vision",
      "image recognition",
      "3D reconstruction",
      "AI research",
      "visual understanding",
      "academic leadership",
    ],
    description:
      "Leading computer vision researcher and academic authority in France, contributing to image recognition and 3D reconstruction.",
    linkedIn: "https://www.linkedin.com/in/jean-ponce-2302986/",
  },
  {
    name: "Boaz Avital",
    country: "USA",
    expertise: [
      "engineering leadership",
      "product architecture",
      "development practices",
      "technical roadmaps",
      "engineering culture",
    ],
    description:
      "Engineering leader and startup advisor in the US, guiding product architecture and development best practices.",
    linkedIn: "https://www.linkedin.com/in/boazavital/",
  },
  {
    name: "Jean-Daniel Guyot",
    country: "France",
    expertise: [
      "digital solutions",
      "product design",
      "strategic partnerships",
      "organizational leadership",
      "startup ecosystem",
    ],
    description:
      "Serial entrepreneur and investor from France, founding companies that address market gaps with innovative digital solutions.",
    linkedIn: "https://www.linkedin.com/in/jeandanielguyot/",
  },
  {
    name: "Jack Pierse",
    country: "Ireland",
    expertise: [
      "fintech",
      "finance",
      "startup growth",
      "financial operations",
      "business development",
    ],
    description:
      "Co-founder & CFO at Wayflyer, providing financial solutions to help businesses scale.",
    linkedIn: "https://www.linkedin.com/in/jack-pierse-53b51155/",
  },
  {
    name: "Serena Williams",
    country: "USA",
    expertise: [
      "sports",
      "entrepreneurship",
      "investment",
      "women in business",
      "brand building",
      "media",
    ],
    description:
      "Tennis champion, entrepreneur and investor with a focus on supporting innovative companies and diverse founders.",
    linkedIn: "https://www.linkedin.com/in/serena-williams-16428a279/",
  },
  {
    name: "Fabrice Grinda",
    country: "USA",
    expertise: [
      "marketplace businesses",
      "angel investing",
      "global startups",
      "e-commerce",
      "digital strategy",
    ],
    description:
      "Serial entrepreneur and investor with numerous successful ventures and investments across multiple industries.",
    linkedIn: "https://www.linkedin.com/in/fabricegrinda/",
  },
];

const MentorFinder = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      isBot: true,
      text: "👋 Hi there! I'm the Mentor Finder bot. I can help you connect with the right mentor based on your interests. What topics or areas are you interested in exploring?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findRelevantMentors = (query: string): Mentor[] => {
    const normalizedQuery = query.toLowerCase();

    // Create a map to score mentors based on relevance to the query
    const scoredMentors = mentorsData.map((mentor) => {
      let score = 0;

      // Check if query directly mentions mentor's name
      if (normalizedQuery.includes(mentor.name.toLowerCase())) {
        score += 10;
      }

      // Check if query mentions country
      if (normalizedQuery.includes(mentor.country.toLowerCase())) {
        score += 3;
      }

      // Check expertise keywords
      mentor.expertise.forEach((expertise) => {
        if (normalizedQuery.includes(expertise.toLowerCase())) {
          score += 5;
        }
      });

      // Check for partial matches in expertise
      mentor.expertise.forEach((expertise) => {
        const words = expertise.toLowerCase().split(" ");
        words.forEach((word) => {
          if (word.length > 3 && normalizedQuery.includes(word)) {
            score += 2;
          }
        });
      });

      return { mentor, score };
    });

    // Sort mentors by score and return top 3 relevant ones
    const relevantMentors = scoredMentors
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.mentor)
      .slice(0, 3);

    return relevantMentors;
  };

  const generateResponse = (query: string): string => {
    const relevantMentors = findRelevantMentors(query);

    if (relevantMentors.length === 0) {
      return "I couldn't find a specific mentor matching your interests. Could you please provide more details about what you're looking for? For example, are you interested in technology, finance, entrepreneurship, or specific industries?";
    }

    let response =
      "Based on your interests, I'd recommend connecting with:\n\n";

    relevantMentors.forEach((mentor, index) => {
      response += `**${mentor.name}** (${mentor.country}) - ${mentor.description}\n`;
      response += `Areas of expertise: ${mentor.expertise.slice(0, 4).join(", ")}\n`;
      response += `[Connect on LinkedIn](${mentor.linkedIn})\n\n`;
    });

    response +=
      "Would you like more specific recommendations or information about any of these mentors?";

    return response;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsThinking(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(userMessage.text),
        isBot: true,
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsThinking(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-pareto-black text-black dark:text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="text-pareto-pink hover:text-black dark:hover:text-white inline-block"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mentor Finder</h1>
          <p className="text-xl text-black/80 dark:text-white/80 max-w-2xl">
            Not sure who to connect with? Our AI assistant can help you find the
            right mentor based on your interests.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/5 dark:bg-white/5 rounded-lg p-4 md:p-6 mb-4 h-[60vh] overflow-y-auto"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isBot ? "" : "justify-end"}`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${message.isBot ? "bg-black/10 dark:bg-white/10" : "bg-pareto-pink text-black ml-auto"} p-3 rounded-lg`}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-black/20 dark:bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">
                      {message.isBot ? "Mentor Finder" : "You"}
                    </div>
                    <div
                      className="text-sm whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: message.text
                          .replace(
                            /\*\*(.*?)\*\*/g,
                            '<span class="font-bold">$1</span>',
                          )
                          .replace(
                            /\[([^\]]+)\]\(([^)]+)\)/g,
                            '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-blue-500 dark:text-blue-400">$1</a>',
                          ),
                      }}
                    />
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex mb-4">
                <div className="bg-black/10 dark:bg-white/10 p-3 rounded-lg flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-black/20 dark:bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-black/40 dark:bg-white/40 rounded-full animate-bounce"
                        style={{ animationDelay: "0s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-black/40 dark:bg-white/40 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-black/40 dark:bg-white/40 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-2"
          >
            <textarea
              className="flex-1 bg-black/5 dark:bg-white/5 border-none rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-pareto-pink text-black dark:text-white"
              placeholder="Ask about your interests, industries, or skills you'd like to develop..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              disabled={isThinking}
            ></textarea>
            <Button
              onClick={handleSendMessage}
              className="self-end"
              disabled={!inputValue.trim() || isThinking}
              variant="pink"
            >
              <SendIcon className="w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-8 text-black/60 dark:text-white/60 text-sm"
          >
            <p>
              Can't find what you're looking for?{" "}
              <Link to="/mentors" className="text-pareto-pink hover:underline">
                View all mentors
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MentorFinder;
