import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import BackToHomeButton from "../components/application/BackToHomeButton";
import Navigation from "../components/Navigation";

const FAQ = () => {
  const faqSections = [
    {
      title: "General Information",
      items: [
        {
          question: "What is the Pareto Fellowship?",
          answer:
            "The Pareto Fellowship is an undergraduate program designed to empower emerging leaders and innovators. The fellowship provides mentorship, professional development, and hands-on project or research opportunities, all inspired by the Pareto Principle—that focusing on a few critical areas can drive significant impact.",
        },
        {
          question: "Why is it called the Pareto Fellowship?",
          answer:
            'The name "Pareto" is inspired by the Pareto Principle (also known as the 80/20 rule), which suggests that a small number of causes can lead to a large portion of the outcomes. Our program embraces this philosophy by helping fellows focus on key challenges and opportunities to maximize their impact.',
        },
      ],
    },
    {
      title: "Eligibility & Application",
      items: [
        {
          question: "Who is eligible to apply?",
          answer:
            "The fellowship is open to undergraduate students enrolled in accredited institutions. Ideal candidates typically have a strong academic record, demonstrated leadership potential, and a passion for innovation. Specific eligibility criteria—including academic standing, field of study, or year of study—are detailed on our application page.",
        },
        {
          question: "How do I apply for the fellowship?",
          answer:
            "Applications are submitted online through our dedicated application portal. Prospective fellows will need to provide a resume, a statement of purpose outlining their goals and interests, academic transcripts, and letters of recommendation. Detailed application instructions can be found on our website.",
        },
        {
          question: "What is the application deadline?",
          answer:
            "Application deadlines may vary by cycle. Please refer to our official website for the most current deadline and timeline information.",
        },
      ],
    },
    {
      title: "Selection Process & Program Details",
      items: [
        {
          question: "What does the selection process entail?",
          answer:
            "Our selection process begins with a thorough review of application materials. Shortlisted candidates are then invited to participate in an interview. The selection committee evaluates applications based on academic achievements, leadership potential, innovative mindset, and alignment with the fellowship's mission.",
        },
        {
          question: "What is the duration of the fellowship?",
          answer:
            "The fellowship duration varies by program cycle. Detailed information about the program's schedule—including orientation sessions and project phases—is provided upon selection.",
        },
        {
          question:
            "What types of projects or initiatives will fellows engage in?",
          answer:
            "Fellows can expect to work on projects that may include research, community initiatives, or collaborative ventures with industry partners. The specific nature of the projects is tailored to both the fellows' interests and the program's focus areas, ensuring real-world experience and skill development.",
        },
        {
          question: "Are there any commitments or obligations for fellows?",
          answer:
            "Yes. Fellows are expected to actively participate in scheduled events, workshops, and project work. This commitment ensures a collaborative learning environment and maximizes the benefits of the fellowship for everyone involved.",
        },
      ],
    },
    {
      title: "Benefits & Support",
      items: [
        {
          question: "What benefits do fellows receive?",
          answer:
            "Fellows gain access to a network of mentors, industry professionals, and academic leaders. Benefits include:\n\n• Mentorship and guidance from experienced professionals\n• Access to exclusive networking events and workshops\n• Opportunities for hands-on project experience\n• In some cases, financial support or a stipend to cover academic or project-related expenses\n\nFor a detailed breakdown of benefits, please visit our benefits page.",
        },
        {
          question: "Will there be an orientation or training provided?",
          answer:
            "Yes. All selected fellows participate in an orientation session at the start of the program. Ongoing training and professional development workshops are also integral parts of the fellowship experience.",
        },
      ],
    },
    {
      title: "Additional Information",
      items: [
        {
          question: "How competitive is the Pareto Fellowship?",
          answer:
            "The fellowship is competitive, with selections based on academic excellence, leadership, and a commitment to innovative problem-solving. We encourage all eligible candidates to apply and share their unique perspectives.",
        },
        {
          question: "Who can I contact if I have more questions?",
          answer:
            "If you need further information or assistance during the application process, please contact our support team. We're here to help!",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-pareto-black text-black dark:text-white font-inter">
      <Navigation />

      <div className="container mx-auto px-4 py-12 pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Frequently Asked Questions
          </h1>

          <p className="text-xl text-black/80 dark:text-white/80 mb-12">
            Find answers to common questions about the Pareto Fellowship.
          </p>

          <div className="space-y-8">
            {faqSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-2xl font-semibold text-pareto-pink">
                  {section.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <AccordionItem
                      key={itemIndex}
                      value={`item-${index}-${itemIndex}`}
                      className="border border-black/10 dark:border-white/10 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-lg font-medium hover:text-pareto-pink">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-black/80 dark:text-white/80 leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
