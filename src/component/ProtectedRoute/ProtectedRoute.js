import { Navigate, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import request from "../../service/request";
import { useEffect } from "react";
import { API } from "../../constants/API";
import { useNavigate } from "react-router-dom";
import { UserUpdate } from "../../Screen/LoginScreen/UserSlice";
import { useState } from "react";


export const ProtectedRoute = ({ children, allowedRoles }) => {
  const [role, setRole] = useState(null); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    handleGetInfo();
  }, []);

  const handleGetInfo = async () => {
    await request
      .get(API.USERS_INFO)
      .then((res) => {
        if (res.data.user) {
          dispatch(UserUpdate(res.data));
        }
      })
      .catch((err) => 
        console.log(err)
    );
  };




  const User = useSelector((state) => state.User);
  const location = useLocation();

  console.log("user-----w---", User);

 
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
