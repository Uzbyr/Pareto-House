
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "@/pages/Index";
import Apply from "@/pages/Apply";
import NotFound from "@/pages/NotFound";
import FAQ from "@/pages/FAQ";
import Perks from "@/pages/Perks";
import Mentors from "@/pages/Mentors";
import MentorFinder from "@/pages/MentorFinder";
import AdminLogin from "@/pages/AdminLogin";

// Admin Pages
import Dashboard from "@/pages/admin/Dashboard";
import Applications from "@/pages/admin/Applications";
import Analytics from "@/pages/admin/Analytics";
import Funnel from "@/pages/admin/Funnel";
import Settings from "@/pages/admin/Settings";
import Users from "@/pages/admin/Users";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useLocation } from "react-router-dom";

function AppContent() {
  const { trackPageVisit } = useAuth();
  const location = useLocation();

  // Track page visits when location changes
  useEffect(() => {
    if (location.pathname) {
      trackPageVisit(location.pathname);
    }
  }, [location.pathname, trackPageVisit]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/perks" element={<Perks />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/mentor-finder" element={<MentorFinder />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Protected Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/applications" 
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/analytics" 
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/funnel" 
        element={
          <ProtectedRoute>
            <Funnel />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/settings" 
        element={
          <ProtectedRoute requiredRole="admin">
            <Settings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/users" 
        element={
          <ProtectedRoute requiredRole="super_admin">
            <Users />
          </ProtectedRoute>
        } 
      />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="pareto-theme">
        <AuthProvider>
          <AppContent />
          <Toaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
