import { StyleSheet, Text, View } from "react-native";
import React, { Children, createContext, useContext, useState } from "react";

// Define the type for a group
interface Group {
  id: string | number;
  name?: string;
}

// Define the context type
interface AppStateContextType {
  selectedGroup: Group | null;
  setSelectedGroup: (group: Group | null) => void;
}

const AppStateContext = createContext<AppStateContextType>({
  selectedGroup: null,
  setSelectedGroup: (group: Group | null) => {},
});
export const useAppState = () => useContext(AppStateContext);

const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  return (
    <AppStateContext.Provider value={{ selectedGroup, setSelectedGroup }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
