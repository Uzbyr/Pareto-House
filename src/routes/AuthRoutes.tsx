
import { Route, Routes } from "react-router-dom";
import Login from "@/pages/Login";
import Onboarding from "@/pages/Onboarding";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ProfileProvider } from "@/contexts/ProfileContext";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProfileProvider />}>
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute requireOnboarding={false}>
              <Onboarding />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
