
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Linkedin, Twitter } from "lucide-react";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Updated partners array with correct logos, categories and company descriptions
const partnerCategories = [
  {
    name: "AI & Machine Learning",
    partners: [
      { 
        name: "Together AI", 
        url: "https://www.together.xyz",
        logo: "/lovable-uploads/7d10b339-395d-49d7-9bbb-b128ccc371b3.png",
        description: "Provides access to AI computing resources, enabling businesses to integrate advanced AI capabilities into their operations.",
        linkedin: "https://www.linkedin.com/company/togetherai/",
        twitter: "https://twitter.com/togethercompute"
      },
      { 
        name: "Anthropic", 
        url: "https://www.anthropic.com",
        logo: "/lovable-uploads/a7131433-2963-45ce-9ebf-10e08f28cdff.png",
        description: "Focuses on developing reliable and steerable AI systems, advancing the field of artificial intelligence responsibly.",
        linkedin: "https://www.linkedin.com/company/anthropic-ai/",
        twitter: "https://twitter.com/anthropic_ai"
      },
      { 
        name: "Cognition AI", 
        url: "https://www.cognition.ai",
        logo: "/lovable-uploads/6975cc3f-f721-4a96-bed2-39e5a9130d01.png",
        description: "Develops AI-driven solutions to enhance marketing strategies and optimize advertising campaigns.", 
        linkedin: "https://www.linkedin.com/company/cognition-ai/",
        twitter: "https://twitter.com/cognition_ai"
      },
      { 
        name: "Scale AI", 
        url: "https://scale.com",
        logo: "/lovable-uploads/82c9eaa4-b4b7-4f80-811c-71a4c8304ad3.png",
        description: "Provides data annotation and labeling services to accelerate the development of artificial intelligence applications across various industries.",
        linkedin: "https://www.linkedin.com/company/scaleai/",
        twitter: "https://twitter.com/scale_ai"
      },
      { 
        name: "Hebbia", 
        url: "https://www.hebbia.ai",
        logo: "/lovable-uploads/dd4e65c5-8c5e-4976-8e63-1fc3410ad504.png",
        description: "Develops AI tools to enhance corporate workflows and data analysis, improving decision-making processes.",
        linkedin: "https://www.linkedin.com/company/hebbia/",
        twitter: "https://twitter.com/hebbiaai"
      },
      { 
        name: "Glean", 
        url: "https://www.glean.com",
        logo: "/lovable-uploads/0553296c-e753-4367-80ec-2fff4c443d09.png",
        description: "Provides AI solutions to improve corporate data retrieval and management, facilitating knowledge sharing within organizations.",
        linkedin: "https://www.linkedin.com/company/glean-ai/",
        twitter: "https://twitter.com/glean_ai"
      }
    ]
  },
  {
    name: "Enterprise & Business Solutions",
    partners: [
      { 
        name: "Sierra", 
        url: "https://www.sierra.ai",
        logo: "/lovable-uploads/b5749bd7-671b-4630-b12a-8df0f53a1a40.png",
        description: "Focuses on AI technologies to optimize business operations, enhancing efficiency and productivity.",
        linkedin: "https://www.linkedin.com/company/sierra-ai/",
        twitter: "https://twitter.com/sierra_ai"
      },
      { 
        name: "Anysphere", 
        url: "https://www.anysphere.co",
        logo: "/lovable-uploads/78716aa6-12c4-4774-bb9f-1b9da4922855.png",
        description: "Specializes in AI coding tools to assist developers in writing and debugging code, accelerating software development.",
        linkedin: "https://www.linkedin.com/company/anysphere/",
        twitter: "https://twitter.com/anysphere"
      },
      { 
        name: "Attention", 
        url: "https://www.attention.tech",
        logo: "/lovable-uploads/a1395bba-1b85-47b1-aad8-b8a7d5fca078.png",
        description: "Utilizes AI to enhance customer relationship management and sales processes, boosting client engagement.",
        linkedin: "https://www.linkedin.com/company/attentiontechnology/",
        twitter: "https://twitter.com/attention_tech"
      },
      { 
        name: "Mercor", 
        url: "https://www.mercor.com",
        logo: "/lovable-uploads/fc2035ab-aa13-44a8-883a-5cb2a400df68.png",
        description: "Offers AI-driven hiring software to streamline recruitment processes and identify top talent efficiently.",
        linkedin: "https://www.linkedin.com/company/mercor-ai/",
        twitter: "https://twitter.com/mercor_ai"
      },
      { 
        name: "Clasp", 
        url: "https://www.clasp.com",
        logo: "/lovable-uploads/f8e07141-bc6b-4978-8342-2d19a205e47c.png",
        description: "Offers AI-driven solutions to address talent shortages and streamline hiring, connecting companies with qualified candidates.",
        linkedin: "https://www.linkedin.com/company/clasp-ai/",
        twitter: "https://twitter.com/clasp_ai"
      },
      { 
        name: "EliseAI", 
        url: "https://www.eliseai.com",
        logo: "/lovable-uploads/639cc2cc-e67f-4dce-bfc7-0a104838161b.png",
        description: "Innovates in the housing market with AI-driven property management solutions, enhancing tenant experiences.",
        linkedin: "https://www.linkedin.com/company/eliseai/",
        twitter: "https://twitter.com/elise_ai"
      }
    ]
  },
  {
    name: "Healthcare & Wellness",
    partners: [
      { 
        name: "CodaMetrix", 
        url: "https://www.codametrix.com",
        logo: "/lovable-uploads/d1a7805a-3d79-409f-9ec6-40acecd5fb10.png",
        description: "Develops AI tools to automate medical coding and billing processes, reducing administrative burdens in healthcare.",
        linkedin: "https://www.linkedin.com/company/codametrix/",
        twitter: "https://twitter.com/codametrix"
      },
      { 
        name: "Cohere", 
        url: "https://www.coherehealth.com",
        logo: "/lovable-uploads/82303084-40a9-4fce-b5d4-28e5ba38ecca.png",
        description: "Provides AI-driven solutions to streamline healthcare administration and improve patient care coordination.",
        linkedin: "https://www.linkedin.com/company/cohere-health/",
        twitter: "https://twitter.com/coherehealth"
      },
      { 
        name: "Cortica", 
        url: "https://www.cortica.com",
        logo: "/lovable-uploads/7e8aaf16-32c2-40c9-90b5-6e728ec2d64b.png",
        description: "Offers comprehensive pediatric care powered by AI diagnostics, improving early detection and treatment.",
        linkedin: "https://www.linkedin.com/company/cortica-healthcare/",
        twitter: "https://twitter.com/corticacare"
      },
      { 
        name: "Flo", 
        url: "https://www.flo.health",
        logo: "/lovable-uploads/fbbdb89f-de54-4525-845c-e00003f9c68a.png",
        description: "Provides AI-powered solutions for women's health and wellness, offering personalized insights and guidance.",
        linkedin: "https://www.linkedin.com/company/flo-health/",
        twitter: "https://twitter.com/flotracker"
      },
      { 
        name: "Grow Therapy", 
        url: "https://www.growtherapy.com",
        logo: "/lovable-uploads/75f3fa05-19ac-480c-96ec-5cd462b3d72b.png",
        description: "Enhances mental health support through AI-driven platforms connecting patients and therapists.",
        linkedin: "https://www.linkedin.com/company/grow-therapy/",
        twitter: "https://twitter.com/growtherapy"
      }
    ]
  },
  {
    name: "Cybersecurity & Legal Tech",
    partners: [
      { 
        name: "Wiz", 
        url: "https://www.wiz.io",
        logo: "/lovable-uploads/eae05c82-a444-41ec-9b34-34dd5e9b88b6.png",
        description: "Provides cloud security solutions powered by AI, helping organizations protect their cloud infrastructure.",
        linkedin: "https://www.linkedin.com/company/wizio/",
        twitter: "https://twitter.com/wiz_io"
      },
      { 
        name: "Harvey", 
        url: "https://www.harvey.ai",
        logo: "/lovable-uploads/71dea3be-cba4-4adf-85cb-2d78453848c0.png",
        description: "Focuses on legal technology solutions powered by artificial intelligence, streamlining legal research and documentation.",
        linkedin: "https://www.linkedin.com/company/harvey-ai/",
        twitter: "https://twitter.com/harvey_ai"
      },
      { 
        name: "Reality Defender", 
        url: "https://www.realitydefender.com",
        logo: "/lovable-uploads/51aad1fa-b83b-45b1-90ae-5e72bd972f53.png",
        description: "Detects deepfakes and enhances security using AI, safeguarding against digital misinformation.",
        linkedin: "https://www.linkedin.com/company/realitydefender/",
        twitter: "https://twitter.com/realitydefender"
      },
      { 
        name: "Coram AI", 
        url: "https://www.coramai.com",
        logo: "/lovable-uploads/a7d520fd-8be4-462b-994d-3253cbb0ac3d.png",
        description: "Enhances security systems using advanced AI technologies, protecting organizations from emerging threats.",
        linkedin: "https://www.linkedin.com/company/coram-ai/",
        twitter: "https://twitter.com/coram_ai"
      },
      { 
        name: "Robin AI", 
        url: "https://www.robinai.com",
        logo: "/lovable-uploads/9266495d-1ad7-45c9-ad67-b4325e3489a8.png",
        description: "Transforms contract management with artificial intelligence, automating legal document analysis.",
        linkedin: "https://www.linkedin.com/company/robin-ai/",
        twitter: "https://twitter.com/robin_ai"
      }
    ]
  },
  {
    name: "Advanced Robotics",
    partners: [
      { 
        name: "Boston Dynamics", 
        url: "https://www.bostondynamics.com",
        logo: "/lovable-uploads/75ae7b42-d44e-463e-909e-aa75fb2d5a07.png",
        description: "Develops advanced mobile robots, known for their agility and mobility, to automate tasks in various industries.",
        linkedin: "https://www.linkedin.com/company/boston-dynamics/",
        twitter: "https://twitter.com/bostondynamics"
      },
      { 
        name: "Agility Robotics", 
        url: "https://www.agilityrobotics.com",
        logo: "/lovable-uploads/42612d8f-eb8a-4d6f-9f50-69c3e8662f84.png",
        description: "Designs and builds legged robots to operate in human environments, addressing labor shortages and enhancing productivity.",
        linkedin: "https://www.linkedin.com/company/agility-robotics/",
        twitter: "https://twitter.com/agilityrobotics"
      },
      { 
        name: "Figure", 
        url: "https://www.figure.ai",
        logo: "/lovable-uploads/faab0a18-ab06-4d79-98cd-71febc370ca7.png",
        description: "Develops humanoid robots powered by artificial intelligence to perform tasks in dynamic environments, aiming to revolutionize the workforce.",
        linkedin: "https://www.linkedin.com/company/figure-ai/",
        twitter: "https://twitter.com/figurerobotics"
      },
      { 
        name: "Apptronik", 
        url: "https://www.apptronik.com",
        logo: "/lovable-uploads/b1cca260-4994-4b84-abb4-1b0b554db412.png",
        description: "Focuses on creating versatile robotic systems designed to work alongside humans in various industries, enhancing efficiency and safety.",
        linkedin: "https://www.linkedin.com/company/apptronik/",
        twitter: "https://twitter.com/apptronik"
      }
    ]
  },
  {
    name: "Quantum Computing & Energy",
    partners: [
      { 
        name: "PsiQuantum", 
        url: "https://psiquantum.com",
        logo: "/lovable-uploads/7dea8e09-9d6b-4b8a-b1c2-a219111641ca.png",
        description: "Aims to build the world's first commercially viable quantum computer using silicon photonics technology.",
        linkedin: "https://www.linkedin.com/company/psiquantum/",
        twitter: "https://twitter.com/psiquantum"
      },
      { 
        name: "QuEra Computing", 
        url: "https://www.quera.com",
        logo: "/lovable-uploads/cb2d7de3-f11a-4a56-9273-c1b08178589a.png",
        description: "Develops scalable quantum computers using neutral-atom technology to solve complex computational problems.",
        linkedin: "https://www.linkedin.com/company/quera-computing/",
        twitter: "https://twitter.com/quera_computing"
      },
      { 
        name: "Helion Energy", 
        url: "https://www.helionenergy.com",
        logo: "/lovable-uploads/7724acfb-ee1a-4d40-abd4-9702f46efac6.png",
        description: "Pursues the development of fusion energy technology to provide a safe, clean, and virtually limitless energy source.",
        linkedin: "https://www.linkedin.com/company/helion-energy/",
        twitter: "https://twitter.com/helionenergy"
      },
      { 
        name: "Thea Energy", 
        url: "https://thea.energy",
        logo: "/lovable-uploads/f077bc15-c451-403a-b9c8-7b10ed91fdc7.png",
        description: "Focuses on advancing fusion energy solutions to meet the growing global demand for clean and sustainable power.",
        linkedin: "https://www.linkedin.com/company/thea-energy/",
        twitter: "https://twitter.com/theaenergy"
      },
      { 
        name: "Commonwealth Fusion Systems", 
        url: "https://cfs.energy",
        logo: "/lovable-uploads/72400298-ee82-452a-a65a-a787181d6265.png",
        description: "Aims to commercialize fusion energy by developing compact fusion power plants using high-temperature superconductors.",
        linkedin: "https://www.linkedin.com/company/commonwealth-fusion-systems/",
        twitter: "https://twitter.com/cfs_energy"
      }
    ]
  },
  {
    name: "Specialized Technology",
    partners: [
      { 
        name: "KNIME", 
        url: "https://www.knime.com",
        logo: "/lovable-uploads/18279275-a46c-47c1-a970-3a957648f488.png",
        description: "Democratizes data analytics with AI-driven platforms accessible to various industries, enabling data-driven decisions.",
        linkedin: "https://www.linkedin.com/company/knime/",
        twitter: "https://twitter.com/knime"
      },
      { 
        name: "Nimble.ai", 
        url: "https://www.nimble.ai",
        logo: "/lovable-uploads/c19ee72a-8e14-4e0b-b1ca-cb672d5d0868.png",
        description: "Advances e-commerce logistics using artificial intelligence for efficiency, optimizing supply chain operations.",
        linkedin: "https://www.linkedin.com/company/nimble-ai/",
        twitter: "https://twitter.com/nimble_ai"
      },
      { 
        name: "Norm AI", 
        url: "https://www.norm.ai",
        logo: "/lovable-uploads/22d2b266-aa95-4154-a4ae-8c1d11c01c09.png",
        description: "Simplifies compliance processes with AI-driven solutions, ensuring organizations meet regulatory requirements.",
        linkedin: "https://www.linkedin.com/company/norm-ai/",
        twitter: "https://twitter.com/norm_ai"
      },
      { 
        name: "Sublime Security", 
        url: "https://www.sublimesecurity.com",
        logo: "/lovable-uploads/9bf8a7e6-3118-4869-bc4d-627c38f01e98.png",
        description: "Boosts email security through AI-driven solutions, protecting organizations from phishing attacks.",
        linkedin: "https://www.linkedin.com/company/sublime-security/",
        twitter: "https://twitter.com/sublimesecurity"
      },
      { 
        name: "Synthesia", 
        url: "https://www.synthesia.io",
        logo: "/lovable-uploads/1ce31354-c95e-400c-9f96-2c3f748a651a.png",
        description: "Pioneers AI video creation for business applications, enabling easy production of engaging content.",
        linkedin: "https://www.linkedin.com/company/synthesia-technologies/",
        twitter: "https://twitter.com/synthesiaIO"
      },
      { 
        name: "Torq", 
        url: "https://www.torq.io",
        logo: "/lovable-uploads/0b635c6d-c4ab-4892-8ea7-fbf59e9b8a72.png",
        description: "Enhances cybersecurity with autonomous security operations, automating threat detection and response.",
        linkedin: "https://www.linkedin.com/company/torq-security/",
        twitter: "https://twitter.com/torq_io"
      }
    ]
  },
  {
    name: "Defense & Advanced Technologies",
    partners: [
      { 
        name: "Anduril", 
        url: "https://www.anduril.com",
        logo: "/lovable-uploads/63a1d43a-073a-4958-81df-7f532b343650.png",
        description: "Specializes in defense technology, developing advanced surveillance and reconnaissance systems to enhance national security.",
        linkedin: "https://www.linkedin.com/company/anduril-industries/",
        twitter: "https://twitter.com/anduriltech"
      },
      { 
        name: "7AI", 
        url: "https://www.7ai.com",
        logo: "/lovable-uploads/bbd0203e-682c-4429-af77-52170e91b789.png",
        description: "Provides advanced AI-driven cybersecurity solutions, protecting organizations from sophisticated cyber threats.",
        linkedin: "https://www.linkedin.com/company/7ai-tech/",
        twitter: "https://twitter.com/7ai_tech"
      },
      { 
        name: "Shield AI", 
        url: "https://www.shield.ai",
        logo: "/lovable-uploads/8cc6ad55-2063-4af0-8a5d-35bfd8faf3f1.png",
        description: "Develops artificial intelligence systems for defense applications, focusing on autonomous aircraft to protect service members and civilians.",
        linkedin: "https://www.linkedin.com/company/shield-ai/",
        twitter: "https://twitter.com/shield_ai"
      },
      { 
        name: "Physical Intelligence", 
        url: "https://www.physicalintelligence.com",
        logo: "/lovable-uploads/42853899-f7a9-4650-a9ad-f02c2a32e562.png",
        description: "Develops intelligent robotic systems that adapt to complex environments, enhancing automation capabilities across industries.",
        linkedin: "https://www.linkedin.com/company/physical-intelligence/",
        twitter: "https://twitter.com/physical_intel"
      },
      { 
        name: "Standard Bots", 
        url: "https://www.standardbots.com",
        logo: "/lovable-uploads/96e2e918-7d01-4163-93aa-855ca982221b.png",
        description: "Specializes in creating autonomous robotic solutions to optimize manufacturing processes and improve operational efficiency.",
        linkedin: "https://www.linkedin.com/company/standard-bots/",
        twitter: "https://twitter.com/standard_bots"
      }
    ]
  },
  {
    name: "Financial Technology",
    partners: [
      { 
        name: "Finally", 
        url: "https://www.finally.com",
        logo: "/lovable-uploads/c7261fe4-31d5-4517-bd73-d4aa7be7bd19.png",
        description: "Uses AI to provide automated bookkeeping software for small businesses, simplifying financial management.",
        linkedin: "https://www.linkedin.com/company/finally-finance/",
        twitter: "https://twitter.com/finally_finance"
      },
      { 
        name: "Misfits Market", 
        url: "https://www.misfitsmarket.com",
        logo: "/lovable-uploads/a4b1b8a1-044b-44b6-a5fd-51ba79e0ef89.png",
        description: "An online grocery platform that offers affordable access to high-quality, sustainably sourced food by rescuing and distributing surplus and imperfect produce.",
        linkedin: "https://www.linkedin.com/company/misfits-market/",
        twitter: "https://twitter.com/misfitsmarket"
      },
      { 
        name: "Fintary", 
        url: "https://www.fintary.com",
        logo: "/lovable-uploads/22d647e1-7b1f-4966-af22-3bb3a6254c2f.png",
        description: "Streamlines financial processes through AI-powered solutions, enhancing efficiency and accuracy in financial management.",
        linkedin: "https://www.linkedin.com/company/fintary/",
        twitter: "https://twitter.com/fintary"
      },
      { 
        name: "Decagon", 
        url: "https://www.decagon.com",
        logo: "/lovable-uploads/a8d5fcf5-9b28-44c9-b00c-c144ca0d312d.png",
        description: "Develops AI support agents to assist businesses in customer service, providing efficient and accurate responses.",
        linkedin: "https://www.linkedin.com/company/decagon-ai/",
        twitter: "https://twitter.com/decagon_ai"
      }
    ]
  }
];

const TechPartners = () => {
  // State to track selected partner for detailed view
  const [selectedPartner, setSelectedPartner] = useState(null);
  
  // Track page visit for analytics
  useEffect(() => {
    console.log("Tech Partners page visited");
    
    // For our demo, we'll just increment a page view counter in localStorage
    const techPartnersPageViews = localStorage.getItem('techPartnersPageViews') || '0';
    localStorage.setItem('techPartnersPageViews', (parseInt(techPartnersPageViews) + 1).toString());
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-pareto-black text-black dark:text-white font-inter">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link
              to="/"
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-black dark:text-white font-medium transition-colors duration-300 rounded-sm text-sm flex items-center gap-2 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Homepage
            </Link>
            <div className="text-center mt-10 mb-12">
              <h1 className="text-4xl font-bold animate-fade-in">
                Our Tech Partners
              </h1>
              <p className="mt-4 text-black/60 dark:text-white/60 max-w-xl mx-auto animate-fade-in" style={{animationDelay: "0.1s"}}>
                Pareto Fellows gain exclusive access to resources, mentorship, and opportunities from our tech partners.
              </p>
            </div>
          </div>
          
          {/* Partner detail modal/card */}
          {selectedPartner && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto animate-fade-in" onClick={() => setSelectedPartner(null)}>
              <Card className="max-w-2xl w-full bg-white dark:bg-zinc-900 p-0 m-4 animate-scale-in" onClick={(e) => e.stopPropagation()}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-md flex items-center justify-center overflow-hidden">
                        {selectedPartner.logo ? (
                          <img 
                            src={selectedPartner.logo} 
                            alt={`${selectedPartner.name} logo`} 
                            className="max-h-14 max-w-14 object-contain p-1"
                          />
                        ) : (
                          <span className="text-2xl font-semibold text-pareto-pink">{selectedPartner.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{selectedPartner.name}</h3>
                        <div className="flex gap-2 mt-1">
                          <a 
                            href={selectedPartner.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-pareto-pink dark:text-zinc-400 dark:hover:text-pareto-pink transition-colors"
                            aria-label={`Visit ${selectedPartner.name} website`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          {selectedPartner.linkedin && (
                            <a 
                              href={selectedPartner.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-zinc-500 hover:text-pareto-pink dark:text-zinc-400 dark:hover:text-pareto-pink transition-colors"
                              aria-label={`Visit ${selectedPartner.name} LinkedIn`}
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                          {selectedPartner.twitter && (
                            <a 
                              href={selectedPartner.twitter} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-zinc-500 hover:text-pareto-pink dark:text-zinc-400 dark:hover:text-pareto-pink transition-colors"
                              aria-label={`Visit ${selectedPartner.name} Twitter`}
                            >
                              <Twitter className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPartner(null)}
                      className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mt-4">
                    <p className="text-black/80 dark:text-white/80">{selectedPartner.description}</p>
                    <a 
                      href={selectedPartner.url} 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="mt-4 inline-flex items-center gap-2 text-pareto-pink hover:underline"
                    >
                      Visit website <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Display partners by category */}
          {partnerCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16 animate-fade-up" style={{animationDelay: `${categoryIndex * 0.1}s`}}>
              <h2 className="text-2xl font-bold mb-8 text-center">{category.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {category.partners.map((partner, partnerIndex) => (
                  <button
                    key={partnerIndex}
                    onClick={() => setSelectedPartner(partner)}
                    className="group bg-white dark:bg-zinc-900 p-4 rounded-md flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md aspect-square cursor-pointer animate-fade-up"
                    style={{animationDelay: `${(categoryIndex * 0.1) + (partnerIndex * 0.05)}s`}}
                    aria-label={`View ${partner.name} details`}
                  >
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="text-center">
                        {partner.logo ? (
                          <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                            <img 
                              src={partner.logo}
                              alt={`${partner.name} logo`} 
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-xl font-semibold text-pareto-pink">{partner.name.charAt(0)}</span>
                          </div>
                        )}
                        <a 
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm font-medium text-[1.15em] hover:text-pareto-pink transition-colors duration-300"
                        >
                          {partner.name}
                        </a>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center mb-20 animate-fade-up" style={{animationDelay: "0.9s"}}>
            <h2 className="text-2xl font-bold mb-6">Want to become a Tech Partner?</h2>
            <p className="text-black/60 dark:text-white/60 max-w-xl mx-auto mb-8">
              We're always looking to expand our network of partners to provide even more opportunities for our fellows.
            </p>
            <a
              href="mailto:partners@pareto.xyz"
              className="px-6 py-3 bg-pareto-pink text-black hover:bg-white dark:hover:bg-white transition-colors duration-300 text-lg font-semibold rounded-sm inline-flex items-center gap-2 transform hover:scale-105 transition-transform duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TechPartners;
