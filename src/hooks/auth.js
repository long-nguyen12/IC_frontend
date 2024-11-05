import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import Cookies from 'js-cookie';
import { API } from "../constants/API";
import request from "../service/request";
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [is2FAVerified, setIs2FAVerified] = useState(false);
  // const navigate = useNavigate();

  // const login = async (data) => {
  //   setUser(data);

  //   // Navigate to 2FA verification page
  //   navigate("/verify-2fa");
  // };

  const logout = () => {
    request.get(API.USERS_LOGOUT)
    .then((res) => {
      if (res) {
       console.log("res",res)
       
      }
    })
    .catch((err) => console.log(err));



    // setToken(null);
    // removeAllCookies();
    // setIs2FAVerified(false);
    // navigate("/", { replace: true });
  };

  const verifyToken = async (token) => {
    console.log("sadjkjashdjkashjdh",token)
    // Mock verification logic
    if (token) {
      // console.log(token);
      // setToken(token);
      setIs2FAVerified(true);
      // navigate("/upload"); // Navigate to a protected route after successful 2FA
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
