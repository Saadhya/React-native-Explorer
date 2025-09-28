import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { Suspense } from "react";
import { AuthProvider } from "./context/AuthProvider";
import MainNavigator from "./navigator";
import { SQLiteProvider } from "expo-sqlite";
import { DatabaseName } from "./utils/constants";
import { onErrorInitialisingDatabase, onInitDatabase } from "./sql";
import AppStateProvider from "./context/AppStateProvider";
import { Provider as PaperProvider } from 'react-native-paper';
import { appTheme } from './theme';

export default function RootLayout() {
  return (
    <React.Fragment >
     
      <StatusBar />
      <Suspense fallback={<Text>Loading database...</Text>}> 
        <SQLiteProvider
          databaseName={DatabaseName}
          onInit={onInitDatabase}
          onError={onErrorInitialisingDatabase}
        >
          <PaperProvider theme={appTheme}>
            <AuthProvider>
              <AppStateProvider>
                <MainNavigator />
              </AppStateProvider>
            </AuthProvider>
          </PaperProvider>
        </SQLiteProvider>
      </Suspense>
    </React.Fragment>
  );
}
// container:{
//   flex:1,
//   justifyContent:"center",
//   alignItems:"center",
//   padding:20,
// }
// });