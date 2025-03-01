
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";
import { useEffect } from "react";

const partners = [
  { name: "Together AI", url: "https://www.together.xyz" },
  { name: "Cognition AI", url: "https://www.cognition.ai" },
  { name: "Beantown MV", url: "https://www.beantownmv.com" },
  { name: "Mercor", url: "https://www.mercor.com" },
  { name: "Hebbia", url: "https://www.hebbia.ai" },
  { name: "Glean", url: "https://www.glean.com" },
  { name: "Sierra", url: "https://www.sierra.ai" },
  { name: "Anysphere", url: "https://www.anysphere.co" },
  { name: "Attention", url: "https://www.attention.tech" },
  { name: "Clasp", url: "https://www.clasp.com" },
  { name: "CodaMetrix", url: "https://www.codametrix.com" },
  { name: "Cohere Health", url: "https://www.coherehealth.com" },
  { name: "Coram AI", url: "https://www.coramai.com" },
  { name: "Cortica", url: "https://www.cortica.com" },
  { name: "Daedalus", url: "https://www.daedalus.com" },
  { name: "Decagon", url: "https://www.decagon.com" },
  { name: "EliseAI", url: "https://www.eliseai.com" },
  { name: "Flo", url: "https://www.flo.health" },
  { name: "Grow Therapy", url: "https://www.growtherapy.com" },
  { name: "Harvey", url: "https://www.harvey.ai" },
  { name: "KNIME", url: "https://www.knime.com" },
  { name: "Duro Labs", url: "https://durolabs.co" },
  { name: "Nimble.ai", url: "https://www.nimble.ai" },
  { name: "Norm AI", url: "https://www.norm.ai" },
  { name: "Please", url: "https://www.please.com" },
  { name: "Reality Defender", url: "https://www.realitydefender.com" },
  { name: "Robin AI", url: "https://www.robinai.com" },
  { name: "Sublime Security", url: "https://www.sublimesecurity.com" },
  { name: "Synthesia", url: "https://www.synthesia.io" },
  { name: "Torq", url: "https://www.torq.io" },
  { name: "7AI", url: "https://www.7ai.com" },
  { name: "Firestorm", url: "https://www.firestorm.com" },
  { name: "Finally", url: "https://www.finally.com" },
  { name: "Fintary", url: "https://www.fintary.com" },
  { name: "Felix Pago", url: "https://www.felixpago.com" },
  { name: "PsiQuantum", url: "https://psiquantum.com" },
  { name: "Boston Dynamics", url: "https://www.bostondynamics.com" },
  { name: "Agility Robotics", url: "https://www.agilityrobotics.com" },
  { name: "Figure", url: "https://www.figure.ai" },
  { name: "Apptronik", url: "https://www.apptronik.com" },
  { name: "QuEra Computing", url: "https://www.quera.com" },
  { name: "Helion Energy", url: "https://www.helionenergy.com" },
  { name: "Thea Energy", url: "https://thea.energy" },
  { name: "Commonwealth Fusion Systems", url: "https://cfs.energy" },
  { name: "Physical Intelligence", url: "https://www.physicalintelligence.com" },
  { name: "Standard Bots", url: "https://www.standardbots.com" },
  { name: "Shield AI", url: "https://shield.ai" }
];

const TechPartners = () => {
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
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-black dark:text-white font-medium transition-colors duration-300 rounded-md text-sm flex items-center gap-2 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Homepage
            </Link>
            <div className="text-center mt-10 mb-12">
              <h1 className="text-4xl font-bold">
                Our Tech Partners
              </h1>
              <p className="mt-4 text-black/60 dark:text-white/60 max-w-xl mx-auto">
                Pareto Fellows gain exclusive access to resources, mentorship, and opportunities from our tech partners.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-20">
            {partners.map((partner, index) => (
              <a 
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-zinc-900 p-4 rounded-md flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md aspect-square"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-xl font-semibold text-pareto-pink">{partner.name.charAt(0)}</span>
                    </div>
                    <span className="text-sm font-medium">{partner.name}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mb-20">
            <h2 className="text-2xl font-bold mb-6">Want to become a Tech Partner?</h2>
            <p className="text-black/60 dark:text-white/60 max-w-xl mx-auto mb-8">
              We're always looking to expand our network of partners to provide even more opportunities for our fellows.
            </p>
            <a
              href="mailto:partners@pareto.xyz"
              className="px-6 py-3 bg-pareto-pink text-black hover:bg-white dark:hover:bg-white transition-colors duration-300 text-lg font-semibold rounded-sm inline-flex items-center gap-2"
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
