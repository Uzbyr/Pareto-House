import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navigation from "../components/Navigation";
import { mentors, backlogMentors, Mentor } from "@/data/mentors";

const Mentors = () => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getCountryDisplay = (country: string) => {
    switch (country) {
      case "USA":
        return { name: "United States", flag: "🇺🇸" };
      case "France":
        return { name: "France", flag: "🇫🇷" };
      case "UK":
        return { name: "United Kingdom", flag: "🇬🇧" };
      case "Ireland":
        return { name: "Ireland", flag: "🇮🇪" };
      case "Lithuania":
        return { name: "Lithuania", flag: "🇱🇹" };
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
      <div className="container mx-auto px-4 py-12 pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Mentors</h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <p className="text-xl text-black/80 dark:text-white/80 max-w-2xl">
              Meet our exceptional mentors who are leaders in their fields,
              ready to share their knowledge and experience with the next
              generation of entrepreneurs.
            </p>
            <div className="flex-shrink-0">
              {false && (
                <Link to="/mentor-finder">
                  <Button variant="pink" className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Find Your Mentor
                  </Button>
                </Link>
              )}
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
                      {mentor.name.charAt(0)}
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
                        {mentor.description}{" "}
                        <span className="text-black/40 dark:text-white/40">
                          ({countryInfo.name})
                        </span>
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
                    <span>
                      {getCountryDisplay(selectedMentor.country).flag}
                    </span>
                    <span>
                      {getCountryDisplay(selectedMentor.country).name}
                    </span>
                  </p>
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Mentors;
