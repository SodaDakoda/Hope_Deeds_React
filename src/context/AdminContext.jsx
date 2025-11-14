import { createContext, useContext, useState } from "react";
import api from "../utils/api";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [volunteers, setVolunteers] = useState([]);

  const loadVolunteers = async () => {
    const data = await api.get("/admin/volunteers");
    setVolunteers(data);
  };

  return (
    <AdminContext.Provider value={{ volunteers, loadVolunteers }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
