import { StyleSheet, Text, View } from "react-native";
import React, { Children, createContext, useContext, useState } from "react";

const AppStateContext = createContext({
  selectedGroup: null,
  setSelectedGroup: (groupId: any) => {},
});
export const useAppState = () => useContext(AppStateContext);

const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  return (
    <AppStateContext.Provider value={{ selectedGroup, setSelectedGroup }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
