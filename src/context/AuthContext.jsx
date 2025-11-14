import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchOrg() {
    try {
      const res = await fetch("/api/organization");
      if (res.ok) {
        const data = await res.json();
        setOrg(data);
      }
    } catch (err) {
      console.error("Auth load failed:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchOrg();
  }, []);

  return (
    <AuthContext.Provider value={{ org, setOrg, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
