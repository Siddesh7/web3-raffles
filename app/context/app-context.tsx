"use client";
import {createContext, useContext, useEffect, useState} from "react";

export interface AppContextType {
  showRaffleCreateModal: boolean;
  setShowRaffleCreateModal: (show: boolean) => void;
}
const appContext = {
  showRaffleCreateModal: false,
  setShowRaffleCreateModal: (show: boolean) => {},
};
export const AppContext = createContext<AppContextType>(appContext);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [showRaffleCreateModal, setShowRaffleCreateModal] = useState(false);

  useEffect(() => {
    appContext.showRaffleCreateModal = showRaffleCreateModal;
    appContext.setShowRaffleCreateModal = setShowRaffleCreateModal;
  }, [showRaffleCreateModal]);

  return (
    <AppContext.Provider
      value={{showRaffleCreateModal, setShowRaffleCreateModal}}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
