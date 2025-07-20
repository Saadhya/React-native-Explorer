import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthScreen } from "../utils/constants";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={AuthScreen.Login}
        component={Login} 
      />
      <Stack.Screen name={AuthScreen.Signup} component={Signup} />
    </Stack.Navigator> 
  );
};

export default AuthStackNavigator;

const styles = StyleSheet.create({});
