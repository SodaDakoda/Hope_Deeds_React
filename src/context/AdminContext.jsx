import { createContext, useContext, useState } from "react";
import { apiRequest } from "../utils/api";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [volunteers, setVolunteers] = useState([]);

  // -----------------------------
  // Load Pending Volunteers
  // -----------------------------
  const loadVolunteers = async () => {
    const data = await apiRequest("/api/admin/pending-volunteers", {
      method: "GET",
    });

    if (Array.isArray(data)) {
      setVolunteers(data);
    }
  };

  return (
    <AdminContext.Provider value={{ volunteers, loadVolunteers }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
