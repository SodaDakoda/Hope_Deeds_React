import { createContext, useContext, useState } from "react";
import { apiRequest } from "../utils/api";

const OrgContext = createContext();

export const OrgProvider = ({ children }) => {
  const [opportunities, setOpportunities] = useState([]);

  // -----------------------------
  // LOAD ALL OPPORTUNITIES
  // -----------------------------
  const loadOpportunities = async () => {
    const data = await apiRequest("/api/opportunities", {
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
    const newOpp = await apiRequest("/api/opportunities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opportunity),
    });

    if (newOpp && newOpp.id) {
      setOpportunities((prev) => [...prev, newOpp]);
    }
  };

  // -----------------------------
  // DELETE OPPORTUNITY
  // -----------------------------
  const deleteOpportunity = async (id) => {
    await apiRequest(`/api/opportunities/${id}`, {
      method: "DELETE",
    });

    setOpportunities((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <OrgContext.Provider
      value={{
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
