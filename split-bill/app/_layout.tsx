import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { Suspense } from "react";
import { AuthProvider } from "./context/AuthProvider";
import MainNavigator from "./navigator";
import { SQLiteProvider } from "expo-sqlite";
import { DatabaseName } from "./utils/constants";
import { onErrorInitialisingDatabase, onInitDatabase } from "./sql";

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
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </SQLiteProvider>
      </Suspense>
    </React.Fragment>
  );
}

const styles=StyleSheet.create({
container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  padding:20,
}
});