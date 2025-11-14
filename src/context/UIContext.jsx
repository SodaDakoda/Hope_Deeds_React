import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);

  return (
    <UIContext.Provider
      value={{
        loading,
        setLoading,
        modal,
        setModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
