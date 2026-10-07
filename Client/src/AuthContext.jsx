import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const API_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          `${API_URL}/`,
          {},
          { withCredentials: true },
        );

        console.log(data);
        const { status, user } = data;

        if (status) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading,setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
