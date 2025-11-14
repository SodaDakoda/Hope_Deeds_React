import { createContext, useContext, useState } from "react";
import api from "../utils/api";

const OrgContext = createContext();

export const OrgProvider = ({ children }) => {
  const [opportunities, setOpportunities] = useState([]);

  const loadOpportunities = async () => {
    const data = await api.get("/api/opportunities");
    setOpportunities(data);
  };

  const createOpportunity = async (opportunity) => {
    const newOpp = await api.post("/api/opportunities", opportunity);
    setOpportunities((prev) => [...prev, newOpp]);
  };

  const deleteOpportunity = async (id) => {
    await api.delete(`/api/opportunities/${id}`);
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
