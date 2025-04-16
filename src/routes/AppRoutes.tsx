
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProfileProvider } from "@/contexts/ProfileContext";

// Route components
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import FellowshipRoutes from "./FellowshipRoutes";
import AlumniRoutes from "./AlumniRoutes";
import AuthRoutes from "./AuthRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route index element={<PublicRoutes />} />
      <Route path="/*" element={<PublicRoutes />} />
      
      {/* Auth Routes */}
      <Route element={<AuthProvider />}>
        <Route path="/login/*" element={<AuthRoutes />} />
        <Route path="/onboarding/*" element={<AuthRoutes />} />
        
        {/* Protected Routes */}
        <Route element={<ProfileProvider />}>
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          
          {/* Fellowship Routes */}
          <Route path="/fellowship/*" element={<FellowshipRoutes />} />
          
          {/* Alumni Routes */}
          <Route path="/alumni/*" element={<AlumniRoutes />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
