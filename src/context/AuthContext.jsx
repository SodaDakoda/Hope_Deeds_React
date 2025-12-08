import { createContext, useContext, useState, useEffect } from "react";
import { getProfile as getProfile } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const token = localStorage.getItem("token");

      // No token → no session
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();

        // Backend returns:  { success: true, user: {...} }
        if (data?.user) {
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Failed to load session:", err);
        localStorage.removeItem("token");
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
