import { createContext, useContext, useState } from "react";
import api from "../utils/api";

const OpportunityContext = createContext();

export const OpportunityProvider = ({ children }) => {
  const [opportunity, setOpportunity] = useState(null);

  const loadOpportunity = async (id) => {
    const data = await api.get(`/api/opportunities/${id}`);
    setOpportunity(data);
  };

  const updateOpportunity = async (id, updates) => {
    const updated = await api.put(`/api/opportunities/${id}`, updates);
    setOpportunity(updated);
  };

  return (
    <OpportunityContext.Provider
      value={{ opportunity, loadOpportunity, updateOpportunity }}
    >
      {children}
    </OpportunityContext.Provider>
  );
};

export const useOpportunity = () => useContext(OpportunityContext);
