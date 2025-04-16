
import { Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Apply from "@/pages/Apply";
import Mentors from "@/pages/Mentors";
import MentorFinder from "@/pages/MentorFinder";
import Perks from "@/pages/Perks";
import FAQ from "@/pages/FAQ";
import TechPartners from "@/pages/TechPartners";
import NotFound from "@/pages/NotFound";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/mentor-finder" element={<MentorFinder />} />
      <Route path="/perks" element={<Perks />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/tech-partners" element={<TechPartners />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
