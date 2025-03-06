
import { 
  UserRoundCog, 
  Users, 
  PiggyBank, 
  Cloud, 
  TrendingUp, 
  ArrowRight,
  School
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

const targetUniversities = {
  "United States": [
    "Harvard University",
    "Stanford University",
    "MIT",
    "Princeton University",
    "Yale University",
    "Columbia University",
    "UC Berkeley",
    "University of Chicago",
    "University of Pennsylvania",
    "Cornell University"
  ],
  "United Kingdom": [
    "University of Oxford",
    "University of Cambridge",
    "Imperial College London",
    "University College London",
    "London School of Economics"
  ],
  "Canada": [
    "University of Toronto",
    "McGill University",
    "University of British Columbia",
    "University of Waterloo"
  ],
  "France": [
    "École Polytechnique",
    "HEC Paris",
    "Sciences Po",
    "École Normale Supérieure"
  ],
  "Singapore": [
    "National University of Singapore",
    "Nanyang Technological University"
  ],
  "Switzerland": [
    "ETH Zurich",
    "EPFL"
  ],
  "China": [
    "Tsinghua University",
    "Peking University",
    "Fudan University"
  ],
  "India": [
    "Indian Institute of Technology (IITs)",
    "Indian Institute of Management (IIMs)"
  ],
  "Israel": [
    "Technion – Israel Institute of Technology",
    "Hebrew University of Jerusalem"
  ]
};

const perks = [
  {
    icon: <UserRoundCog className="w-12 h-12 text-pareto-pink" />,
    title: "World-Class Mentors",
    description: "Connect with top founders, operators, investors, researchers, public figures who've built successful companies"
  },
  {
    icon: <Users className="w-12 h-12 text-pareto-pink" />,
    title: "Elite Peer Network",
    description: "The most exclusive community of amazingly talented and ambitious undergrads from all over the world university ecosystem"
  },
  {
    icon: <PiggyBank className="w-12 h-12 text-pareto-pink" />,
    title: "Initial Capital",
    description: "Up to $100k as initial funding the day a fellow starts a company"
  },
  {
    icon: <Cloud className="w-12 h-12 text-pareto-pink" />,
    title: "Startup Resources",
    description: "Access over $100,000 in credits from AWS, OpenAI, Perplexity, Vercel, and more"
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-pareto-pink" />,
    title: "Fast Track to Opportunities",
    description: "Access to internships at the most competitive startups in Silicon Valley and connections with people who can transform your career trajectory"
  }
];

const FellowshipPerks = () => {
  const [showUniversities, setShowUniversities] = useState(false);

  return (
    <div className="bg-black/5 dark:bg-white/5 py-32">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Fellowship Perks
          </h2>
          <p className="text-lg md:text-xl text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            As a Pareto Fellow, you get access to exclusive benefits and opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-pareto-black p-8 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-6">{perk.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{perk.title}</h3>
              {index === 1 ? (
                <div>
                  <p className="text-black/70 dark:text-white/70">
                    {perk.description}{" "}
                    <button 
                      onClick={() => setShowUniversities(true)}
                      className="text-pareto-pink font-medium hover:underline"
                    >
                      target universities
                    </button>
                  </p>
                </div>
              ) : (
                <p className="text-black/70 dark:text-white/70">{perk.description}</p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link 
            to="/perks"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-300 text-lg font-medium rounded-md"
          >
            View All Perks
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      <Dialog open={showUniversities} onOpenChange={setShowUniversities}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <School className="w-5 h-5 text-pareto-pink" />
              Target Universities
            </DialogTitle>
            <DialogDescription>
              Pareto Fellows come from the world's most prestigious institutions
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {Object.entries(targetUniversities).map(([country, universities]) => (
              <div key={country} className="bg-black/5 dark:bg-white/5 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{country}</h3>
                <ul className="space-y-1">
                  {universities.map((university, index) => (
                    <li key={index} className="text-sm text-black/70 dark:text-white/70">
                      {university}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FellowshipPerks;
