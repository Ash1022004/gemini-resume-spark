import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mongoApi } from "@/services/mongoApi";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!mongoApi.isAuthenticated()) {
      navigate("/auth");
    }
  }, [navigate]);

  if (!mongoApi.isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
