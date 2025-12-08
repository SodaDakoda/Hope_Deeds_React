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
        const data = await getOrgProfile();

        setUser(data);
      } catch (err) {
        console.error("Failed to load session:", err);
        localStorage.removeItem("token");
        setUser(null);
      }

      setLoading(false);
    }

    loadSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
