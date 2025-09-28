import { StyleSheet, Text, View } from "react-native";
import React, { Children, createContext, useContext, useState } from "react";

  // Define the type for a group
  interface Group {
    id: number;
    group_name?: string;
    created_by?: string ;
    created_at?: string;
  }

  interface AppStateContextType {
    selectedGroup: Group | null;
    setSelectedGroup: (group: Group | null) => void;
    groupMembers: any[];
    setGroupMembers: (members: any[]) => void;
  }

  const AppStateContext = createContext<AppStateContextType>({
    selectedGroup: null,
    setSelectedGroup: () => {},
    groupMembers: [],
    setGroupMembers: () => {},
  });
export const useAppState = () => useContext(AppStateContext);

const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groupMembers, setGroupMembers] = useState<any[]>([]);
  return (
    <AppStateContext.Provider value={{ selectedGroup, setSelectedGroup, groupMembers, setGroupMembers }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
