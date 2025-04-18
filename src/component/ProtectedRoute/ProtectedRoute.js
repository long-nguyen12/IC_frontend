import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const User = useSelector((state) => state.User);
  const location = useLocation();

  console.log("user-----w---", User);
  console.log("allowedRoles-----w---", allowedRoles);

 
  if (!User || !User.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // const hasPermission =
  //   !allowedRoles || allowedRoles.some((role) => User.role?.includes(role));

  // if (!hasPermission) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return children;
};
