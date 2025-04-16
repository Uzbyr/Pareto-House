
import { Route, Routes } from "react-router-dom";
import FellowLayout from "@/components/FellowLayout";
import FellowDashboard from "@/pages/fellowship/FellowDashboard";
import FellowProfile from "@/pages/fellowship/FellowProfile";
import FellowDirectory from "@/pages/fellowship/FellowDirectory";
import FellowEvents from "@/pages/fellowship/FellowEvents";
import FellowOpportunities from "@/pages/fellowship/FellowOpportunities";
import ProtectedRoute from "@/components/ProtectedRoute";

const FellowshipRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRoles={["fellow", "admin"]}>
            <FellowLayout>
              <FellowDashboard />
            </FellowLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute requiredRoles={["fellow", "admin"]}>
            <FellowLayout>
              <FellowProfile />
            </FellowLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/directory"
        element={
          <ProtectedRoute requiredRoles={["fellow", "admin"]}>
            <FellowLayout>
              <FellowDirectory />
            </FellowLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute requiredRoles={["fellow", "admin"]}>
            <FellowLayout>
              <FellowEvents />
            </FellowLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/opportunities"
        element={
          <ProtectedRoute requiredRoles={["fellow", "admin"]}>
            <FellowLayout>
              <FellowOpportunities />
            </FellowLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/:section"
        element={
          <ProtectedRoute requiredRoles={["fellow", "admin"]}>
            <FellowLayout>
              <FellowDashboard />
            </FellowLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default FellowshipRoutes;
