import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

const OrgContext = createContext();

export const OrgProvider = ({ children }) => {
  const [org, setOrg] = useState(null);
  const [token, setToken] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // LOAD ORG SESSION FROM LOCALSTORAGE
  // -----------------------------
  useEffect(() => {
    const storedOrg = localStorage.getItem("org");
    const storedToken = localStorage.getItem("token");

    if (storedOrg) setOrg(JSON.parse(storedOrg));
    if (storedToken) setToken(storedToken);

    setLoading(false);
  }, []);

  // -----------------------------
  // LOGIN (ORG LOGIN PAGE WILL CALL THIS)
  // -----------------------------
  const orgLogin = (orgData, jwt) => {
    localStorage.setItem("org", JSON.stringify(orgData));
    localStorage.setItem("token", jwt);

    setOrg(orgData);
    setToken(jwt);
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const orgLogout = () => {
    localStorage.removeItem("org");
    localStorage.removeItem("token");

    setOrg(null);
    setToken(null);
  };

  // -----------------------------
  // LOAD OPPORTUNITIES
  // -----------------------------
  const loadOpportunities = async () => {
    if (!token) return;

    const data = await apiRequest("/opportunities", {
      method: "GET",
    });

    if (Array.isArray(data)) {
      setOpportunities(data);
    }
  };

  // -----------------------------
  // CREATE OPPORTUNITY
  // -----------------------------
  const createOpportunity = async (opportunity) => {
    const newOpp = await apiRequest("/opportunities", {
      method: "POST",
      body: JSON.stringify(opportunity),
    });

    if (newOpp?.id) {
      setOpportunities((prev) => [...prev, newOpp]);
    }
  };

  // -----------------------------
  // DELETE OPPORTUNITY
  // -----------------------------
  const deleteOpportunity = async (id) => {
    await apiRequest(`/opportunities/${id}`, {
      method: "DELETE",
    });

    setOpportunities((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <OrgContext.Provider
      value={{
        org,
        token,
        loading,
        orgLogin,
        orgLogout,
        opportunities,
        loadOpportunities,
        createOpportunity,
        deleteOpportunity,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = () => useContext(OrgContext);
