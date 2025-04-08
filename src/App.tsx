
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import Index from "./pages/Index";
import Apply from "./pages/Apply";
import Mentors from "./pages/Mentors";
import MentorFinder from "./pages/MentorFinder";
import FAQ from "./pages/FAQ";
import Perks from "./pages/Perks";
import TechPartners from "./pages/TechPartners";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/admin/Dashboard";
import Applications from "./pages/admin/Applications";
import Analytics from "./pages/admin/Analytics";
import Funnel from "./pages/admin/Funnel";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import FellowLayout from "./components/FellowLayout";
import FellowDashboard from "./pages/FellowDashboard";
import FellowProfile from "./pages/FellowProfile";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <ProfileProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/mentors" element={<Mentors />} />
                <Route path="/mentor-finder" element={<MentorFinder />} />
                <Route path="/perks" element={<Perks />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/tech-partners" element={<TechPartners />} />
                <Route path="/login" element={<AdminLogin />} />

                {/* Onboarding Route */}
                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute requireOnboarding={false}>
                      <Onboarding />
                    </ProtectedRoute>
                  }
                />

                {/* Password Change Route */}
                <Route
                  path="/change-password"
                  element={
                    <ProtectedRoute>
                      <ChangePassword />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute requiredRoles={["admin"]}>
                      <AdminLayout>
                        <Dashboard />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/applications"
                  element={
                    <ProtectedRoute requiredRoles={["admin"]}>
                      <AdminLayout>
                        <Applications />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/analytics"
                  element={
                    <ProtectedRoute requiredRoles={["admin"]}>
                      <AdminLayout>
                        <Analytics />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/funnel"
                  element={
                    <ProtectedRoute requiredRoles={["admin"]}>
                      <AdminLayout>
                        <Funnel />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute requiredRoles={["admin"]}>
                      <AdminLayout>
                        <Users />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute requiredRoles={["admin"]}>
                      <AdminLayout>
                        <Settings />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Fellow Routes - Completely separate from admin routes */}
                <Route
                  path="/fellowship"
                  element={
                    <ProtectedRoute requiredRoles={["fellow", "admin"]}>
                      <FellowLayout>
                        <FellowDashboard />
                      </FellowLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/fellowship/profile"
                  element={
                    <ProtectedRoute requiredRoles={["fellow", "admin"]}>
                      <FellowLayout>
                        <FellowProfile />
                      </FellowLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/fellowship/:section"
                  element={
                    <ProtectedRoute requiredRoles={["fellow", "admin"]}>
                      <FellowLayout>
                        <FellowDashboard />
                      </FellowLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Alumni Routes - can use the same layout as fellows but with different access */}
                <Route
                  path="/alumni"
                  element={
                    <ProtectedRoute requiredRoles={["alumni", "admin"]}>
                      <FellowLayout>
                        <FellowDashboard />
                      </FellowLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
