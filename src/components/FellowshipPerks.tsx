
import { 
  UserRoundCog, 
  Users, 
  PiggyBank, 
  Cloud, 
  TrendingUp, 
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const perks = [
  {
    icon: <UserRoundCog className="w-12 h-12 text-pareto-pink" />,
    title: "World-Class Mentors",
    description: "Connect one-on-one with top founders, operators, and researchers who've built successful companies"
  },
  {
    icon: <Users className="w-12 h-12 text-pareto-pink" />,
    title: "Elite Peer Network",
    description: "Join a vetted community of ambitious undergraduates building the future"
  },
  {
    icon: <PiggyBank className="w-12 h-12 text-pareto-pink" />,
    title: "Initial Capital",
    description: "$10,000 pre-seed funding via a no cap, no discount SAFE for qualifying projects"
  },
  {
    icon: <Cloud className="w-12 h-12 text-pareto-pink" />,
    title: "Startup Resources",
    description: "Access over $100,000 in credits from AWS, OpenAI, Perplexity, Vercel, and more"
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-pareto-pink" />,
    title: "Accelerated Growth",
    description: "Exclusive workshops, demo days, and investor introductions to fast-track your success"
  }
];

const FellowshipPerks = () => {
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
              <p className="text-black/70 dark:text-white/70">{perk.description}</p>
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
    </div>
  );
};

export default FellowshipPerks;
