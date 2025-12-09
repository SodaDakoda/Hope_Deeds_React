import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();

        if (data?.id) {
          setUser(data);
        } else {
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (err) {
        console.error("Session restore failed", err);
        localStorage.removeItem("token");
        setUser(null);
      }

      setLoading(false);
    }

    loadSession();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
