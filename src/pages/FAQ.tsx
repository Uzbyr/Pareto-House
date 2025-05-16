
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
import Footer from "../components/Footer";

const FAQ = () => {
  const faqSections = [
    {
      title: "General Information",
      items: [
        {
          question: "What exactly is the Pareto Fellowship?",
          answer:
            "The Pareto Fellowship is an elite community designed to nurture extraordinary undergraduates excelling in mathematics, computer science, physics, and entrepreneurship. Our goal is to empower fellows with mentorship, resources, and connections to amplify their potential and change their career trajectory.",
        },
        {
          question: 'Why the name "Pareto Fellowship"?',
          answer: (
            <div>
              The fellowship is named after Pareto because it's managed and
              funded by{" "}
              <a
                className="text-pareto-pink underline"
                target="_blank"
                href="https://pareto20.com?ref=pareto-fellowship"
              >
                Pareto
              </a>
              , a small group of dedicated individuals who invest in and build
              innovative companies.
            </div>
          ),
        },
      ],
    },
    {
      title: "Eligibility & Application",
      items: [
        {
          question: "Who is eligible to apply?",
          answer:
            "We accept undergraduate students from all over the world. It's highly recommended that applicants have demonstrated deep interest or even obsession with STEM fields and/or computer science. If you consider yourself part of the top 0.1% of the next generation's best engineers, researchers, and founders, this fellowship is designed for you.",
        },
        {
          question: "How do I apply for the fellowship?",
          answer: (
            <div>
              Applications can be submitted through this very website. You will
              need to provide details about your background, achievements a nd
              interests. You can apply{" "}
              <Link to="/apply" className="text-pareto-pink underline">
                {" "}
                here
              </Link>
              .
            </div>
          ),
        },
        {
          question: "When is the application deadline?",
          answer:
            "The application deadline for our next cohort is the 30th of April. We encourage applying early as we review applications on a rolling basis.",
        },
      ],
    },
    {
      title: "Selection Process & Program Details",
      items: [
        {
          question: "What does the selection process look like?",
          answer:
            "Our selection process involves an initial screening, followed by interviews with the Pareto team and selected mentors. Candidates will also participate in a brief, engaging challenge designed to demonstrate their creativity, analytical skills, and problem-solving abilities.",
        },
        {
          question: "How long does the fellowship last?",
          answer:
            "Students remain fellows for the entirety of their undergraduate studies, from freshman year through senior year, benefiting from continuous support, mentorship, and community engagement. Fellows can join at any point during their undergraduate period.",
        },
        {
          question: "What commitments are expected of fellows?",
          answer:
            "Fellows commit to actively participating in mentorship sessions, regular cohort meetings, and completing their selected project. While highly flexible, the fellowship values proactive engagement and genuine collaboration.",
        },
      ],
    },
    {
      title: "Benefits & Support",
      items: [
        {
          question: "What specific benefits do fellows receive?",
          answer:
            "Fellows gain access to personalized mentorship from prominent founders, researchers and leaders, extensive networking opportunities, funding support for their projects, and “lifetime membership” in our community.",
        },
        {
          question: "Is there an orientation or training provided?",
          answer:
            "No formal training is provided. The fellowship is a platform that gathers the best people within the same community, enabling them to experience unforgettable moments together and accelerating their path to becoming leaders in the tech and research ecosystems.",
        },
      ],
    },
    {
      title: "Additional Information",
      items: [
        {
          question: "How competitive is the Pareto Fellowship?",
          answer:
            "The Pareto Fellowship is extremely competitive. Most fellows are medalists - often multiple gold medalists - in prestigious international competitions like IMO, IPhO, IOI, and others. We do not focus on diversity for diversity's sake; we exclusively seek the best of the best.",
        },
        {
          question: "Who can I reach out to if I have further questions?",
          answer: (
            <div>
              We're here to help! For any inquiries, please contact Jules at{" "}
              <a
                className="text-pareto-pink underline"
                href="mailto:jules@pareto20.com"
              >
                jules@pareto20.com
              </a>{" "}
              or{" "}
              <a
                className="text-pareto-pink underline"
                href="https://wa.me/33777002975"
              >
                +33777002975
              </a>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-inter">
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

          <p className="text-xl text-white/80 mb-12">
            Find answers to common questions about the Pareto Fellowship.
          </p>

          <div className="space-y-8">
            {faqSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-2xl font-semibold text-pareto-pink">
                  {section.title}
                </h2>
                <Accordion type="multiple" className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <AccordionItem
                      key={itemIndex}
                      value={`item-${index}-${itemIndex}`}
                      className="border border-white/10 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-lg font-medium hover:text-pareto-pink">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/80 leading-relaxed whitespace-pre-line">
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
      <Footer />
    </div>
  );
};

export default FAQ;
