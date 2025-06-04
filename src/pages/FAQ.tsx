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
          question: "What exactly is the Pareto House?",
          answer:
            "The Pareto House is an elite community designed to nurture extraordinary undergraduates excelling in mathematics, computer science, physics, and entrepreneurship. Our goal is to empower fellows with mentorship, networking opportunities, and resources that accelerate their journey to becoming leaders in the tech industry. We focus exclusively on high-achieving students with demonstrated excellence through competition medals, exceptional academic records, or significant entrepreneurial achievements.",
        },
        {
          question: 'Why the name "Pareto House"?',
          answer: (
            <>
              The house is named after Pareto because it's managed and
              operated by{" "}
              <a
                href="https://pareto20.com?ref=pareto-house"
                className="text-pareto-pink hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pareto
              </a>
              , which helps the world's most ambitious students and graduates
              become tech leaders. Pareto also refers to the Pareto Principle -
              the idea that 20% of people create 80% of the value. Our community
              brings together that exceptional 20% of undergraduates who are
              poised to make an outsized impact in technology and innovation.
            </>
          ),
        },
      ],
    },
    {
      title: "Eligibility & Application",
      items: [
        {
          question: "Who can join?",
          answer:
            "We're looking for exceptional hackers skilled in mathematics, computer science, physics, and entrepreneurship. If you're a competitive programmer, mathematician, scientist, engineer, researcher, or founder excelling in these fields, this house is designed for you.",
        },
        {
          question: "How do I apply for the house?",
          answer:
            "Simply click the 'Apply Now' button on this page. The application process includes submitting your academic achievements, competition results, projects, and a brief essay about your goals and aspirations.",
        },
        {
          question: "What are the eligibility criteria?",
          answer:
            "We primarily accept hackers who have demonstrated exceptional achievement through hawkathons wins, international competition medals (IMO, IPhO, IOI, ICPC, etc.), outstanding academic performance, significant research contributions, or notable entrepreneurial success. While we value diversity of thought and background, our selection is merit-based and highly competitive.",
        },
        {
          question: "What happens after I'm accepted?",
          answer:
            "Once accepted, you'll gain access to our exclusive community platform, mentorship network, and various perks. You'll be able to connect with other exceptional founders, participate in events, and receive guidance from industry leaders.",
        },
        {
          question: "Is there a cost to join?",
          answer:
            "We cover from 50% to 100% of the rent of the house, according to your personal financial situation. Room prices range from €1,150 to €1,250 per month, of which we cover at least 50%. You can also receive APL support if you’re a French national. We also provide various benefits and opportunities to our members at no cost.",
        },
        {
          question: "How long does the house last?",
          answer:
            "Each hacker can stay as long as they want in the house. The batch lasts 3 months, renewable if you've shown great intensity and accomplishments during your stay at the Pareto House. It's an ongoing community that you remain part of as long as you're actively engaged and contributing. We encourage long-term participation and alumni often continue to benefit from and contribute to the community even after their stay at the house.",
        },
        {
          question: "What's expected of me as a member?",
          answer:
            "We expect active participation in the hacker house, whether through building sessions, discussions, events, or collaborative projects. While highly flexible, the house values proactive engagement and genuine collaboration.",
        },
        {
          question: "Do you provide training or courses?",
          answer:
            "No formal training is provided. The house is a platform that gathers the best people within the same community, enabling them to experience unforgettable moments together and accelerating their path to becoming leaders in the tech industry. The value comes from peer learning, mentorship, and networking rather than structured courses.",
        },
        {
          question: "Can international hackers apply?",
          answer:
            "Yes, we welcome applications from exceptional hackers worldwide. The community is global and we value diverse perspectives and backgrounds.",
        },
      ],
    },
    {
      title: "Selection Process & Program Details",
      items: [
        {
          question: "What does the selection process look like?",
          answer:
            "Our selection process involves an initial screening, followed by interviews with the Pareto team and selected mentors.",
        },
        {
          question: "How long does the hacker house last?",
          answer:
            "The hacker house lasts 3 months, renewable if you've shown great intensity and accomplishments in the past 3 months. The hackers remain part of the community for the entirety of their founding journey, even after their stay at the Pareto House, benefiting from continuous support, mentorship, and community engagement.",
        },
        {
          question: "What commitments are expected of hackers?",
          answer:
            "Hackers commit to live in the Pareto House for at least 3 months, actively building a project or a company, participating in mentorship sessions, regular cohort meetings, and completing their selected project. The hacker house is a place to build, learn and grow.",
        },
      ],
    },
    {
      title: "Benefits & Support",
      items: [
        {
          question: "What specific benefits do hackers receive?",
          answer:
            "Hackers gain access to personalized mentorship from prominent founders, researchers and leaders, extensive networking opportunities, funding support for their projects, and 'lifetime membership' in our community.",
        },
        {
          question: "Is there an orientation or training provided?",
          answer:
            "No formal training is provided. The hacker house is a platform that gathers the best people within the same community, enabling them to experience unforgettable moments together and accelerating their path to becoming leaders in the tech ecosystems.",
        },
      ],
    },
    {
      title: "Additional Information",
      items: [
        {
          question: "How competitive is the Pareto House?",
          answer:
            "The Pareto House is extremely competitive. Most hackers are hackathons winners, repeat founders and medalists - often multiple gold medalists - in prestigious international competitions like IMO, IPhO, IOI, and others. We do not focus on diversity quotas but instead select purely based on exceptional merit and potential for impact in technology and innovation.",
        },
        {
          question: "Who can I reach out to if I have further questions?",
          answer: (
            <div>
              We're here to help! For any inquiries, please contact Yoan at{" "}
              <a
                className="text-pareto-pink underline"
                href="mailto:yoan@pareto20.com"
              >
                yoan@pareto20.com
              </a>{" "}
              or{" "}
              <a
                className="text-pareto-pink underline"
                href="https://wa.me/33651540270"
              >
                +33651540270
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
            Find answers to common questions about the Pareto House.
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
