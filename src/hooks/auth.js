import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import Cookies from 'js-cookie';
import { API } from "../constants/API";
import request from "../service/request";
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useLocalStorage("user", null);
  
  const [is2FAVerified, setIs2FAVerified] = useState(false);
  // const navigate = useNavigate();

  // const login = async (data) => {
  //   setUser(data);

  //   // Navigate to 2FA verification page
  //   navigate("/verify-2fa");
  // };

  const logout = () => {
    console.log("logout",API.USERS_LOGOUT)
    request.get(API.API_HOST + API.USERS_LOGOUT)
    .then((res) => {
      if (res) {
       console.log("res",res)
      }
    })
    .catch((err) => console.log(err));

  };

  const verifyToken = async (token) => {
    if (token) {
      setIs2FAVerified(true);
      return true;
    }
    return false;
  };

  const value = {
    // user,
    is2FAVerified,
    // token,
    // login,
    logout,
    verifyToken,
  };

  console.log(value)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};