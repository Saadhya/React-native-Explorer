import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import LoginPage from '../screens/LoginPage';
import RegisterPage from '../screens/RegisterPage';

// Define Stack Type for TypeScript
export type StackParamList = {
    Home: undefined;
    Profile: undefined; // Example of passing parameters
    Login: undefined; // Example of passing parameters
    Register: undefined; // Example of passing parameters
  };
const Stack = createStackNavigator<StackParamList>();

const UserStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
    </Stack.Navigator>
  );
};

export default UserStack;
