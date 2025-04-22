import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const User = useSelector((state) => state.User);
  const location = useLocation();


  console.log("allowedRoles-----w1--", allowedRoles);

 
  if (!User || !User.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasPermission =
    !allowedRoles || allowedRoles.some((role) => User.role?.includes(role));

  if (hasPermission === false) {
    return <Navigate to="/unauthorized" replace />;
   
  }else{
    console.log("hasPermission-----w1-qqqq-", hasPermission);
   
  }

  return children;
};
