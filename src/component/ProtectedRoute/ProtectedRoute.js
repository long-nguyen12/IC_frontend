import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  // else {
  //   return <Navigate to="upload" />;
  // }
  return children;
};
