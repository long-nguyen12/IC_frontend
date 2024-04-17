import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

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
    setToken(null);
    setIs2FAVerified(false);
    // navigate("/", { replace: true });
  };

  const verifyToken = async (token) => {
    // Mock verification logic
    if (token) {
      // console.log(token);
      setToken(token);
      setIs2FAVerified(true);
      // navigate("/upload"); // Navigate to a protected route after successful 2FA
      return true;
    }
    return false;
  };

  const value = {
    // user,
    is2FAVerified,
    token,
    // login,
    logout,
    verifyToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
