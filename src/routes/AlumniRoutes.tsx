
import { Route, Routes } from "react-router-dom";
import FellowLayout from "@/components/FellowLayout";
import FellowDashboard from "@/pages/fellowship/FellowDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

const AlumniRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRoles={["alumni", "admin"]}>
            <FellowLayout>
              <FellowDashboard />
            </FellowLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AlumniRoutes;
