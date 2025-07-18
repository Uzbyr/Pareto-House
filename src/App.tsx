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
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Applications from "./pages/admin/Applications";
import Opportunities from "./pages/admin/Opportunities";
import Events from "./pages/admin/Events";
import Analytics from "./pages/admin/Analytics";
import Funnel from "./pages/admin/Funnel";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import FellowLayout from "./components/FellowLayout";
import FellowDashboard from "./pages/fellowship/FellowDashboard";
import FellowProfile from "./pages/fellowship/FellowProfile";
import Onboarding from "./pages/Onboarding";
import FellowDirectory from "./pages/fellowship/FellowDirectory";
import FellowEvents from "./pages/fellowship/FellowEvents";
import FellowOpportunities from "./pages/fellowship/FellowOpportunities";
import FellowPerks from "./pages/fellowship/FellowPerks";
import FellowDiscussions from "./pages/fellowship/FellowDiscussions";
import { useState, useEffect } from 'react';
import supabase from './utils/supabase';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <ScrollToTop />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route 
              path="/" 
              element={<Index />} 
            />
            <Route 
              path="/apply" 
              element={<Apply />} 
            />
            <Route 
              path="/mentors" 
              element={<Mentors />} 
            />
            <Route 
              path="/mentor-finder" 
              element={<MentorFinder />} 
            />
            <Route 
              path="/perks" 
              element={<Perks />} 
            />
            <Route 
              path="/faq" 
              element={<FAQ />} 
            />
            <Route 
              path="/tech-partners" 
              element={<TechPartners />} 
            />
            
            <Route element={<AuthProvider />}>
              <Route 
                path="/login" 
                element={<Login />}
              />

              <Route element={<ProfileProvider />}>
                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute requireOnboarding={false}>
                      <Onboarding />
                    </ProtectedRoute>
                  }
                />

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
                  path="/admin/opportunities"
                  element={
                    <ProtectedRoute requiredRoles={["admin"]}>
                      <AdminLayout>
                        <Opportunities />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/events"
                  element={
                    <ProtectedRoute requiredRoles={["admin"]}>
                      <AdminLayout>
                        <Events />
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

                <Route
                  path="/house"
                  element={
                    <ProtectedRoute requiredRoles={["fellow", "admin"]}>
                      <FellowLayout>
                        <FellowDashboard />
                      </FellowLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/house/profile"
                  element={
                    <ProtectedRoute requiredRoles={["fellow", "admin"]}>
                      <FellowLayout>
                        <FellowProfile />
                      </FellowLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/house/directory"
                  element={
                    <ProtectedRoute requiredRoles={["fellow", "admin"]}>
                      <FellowLayout>
                        <FellowDirectory />
                      </FellowLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/house/events"
                  element={
                    <ProtectedRoute requiredRoles={["fellow", "admin"]}>
                      <FellowLayout>
                        <FellowEvents />
                      </FellowLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/house/opportunities"
                  element={
                    <ProtectedRoute requiredRoles={["fellow", "admin"]}>
                      <FellowLayout>
                        <FellowOpportunities />
                      </FellowLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/house/perks"
                  element={
                    <ProtectedRoute requiredRoles={["fellow", "admin"]}>
                      <FellowLayout>
                        <FellowPerks />
                      </FellowLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/house/discussions"
                  element={
                    <ProtectedRoute requiredRoles={["fellow", "admin"]}>
                      <FellowLayout>
                        <FellowDiscussions />
                      </FellowLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/house/:section"
                  element={
                    <ProtectedRoute requiredRoles={["fellow", "admin"]}>
                      <FellowLayout>
                        <FellowDashboard />
                      </FellowLayout>
                    </ProtectedRoute>
                  }
                />

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
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

function Page() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('todos').select();
      if (todos && todos.length > 0) {
        setTodos(todos);
      }
    }
    getTodos();
  }, []);

  return (
    <div>
      {todos.map((todo, idx) => (
        <li key={todo.id || idx}>{JSON.stringify(todo)}</li>
      ))}
    </div>
  );
}

export default App;
