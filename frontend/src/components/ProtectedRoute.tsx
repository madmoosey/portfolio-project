import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user && !localStorage.getItem("access")) {
    return <Navigate to="/login" />;
  }
  return children;
}
