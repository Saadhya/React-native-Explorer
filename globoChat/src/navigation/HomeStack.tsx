import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import LoginPage from '../screens/LoginPage';
import RegisterPage from '../screens/RegisterPage';
import Chats from '../screens/Chats';
import Layout from '../components/Layout';
import Room from '../screens/Room';

// Define Stack Type for TypeScript
export type StackParamList = {
  Home: undefined;
  Profile: undefined; 
  Login: undefined; 
  Register: undefined; 
  Chats: undefined; 
  Room: undefined; 
};

// Create Stack Navigator
const Stack = createStackNavigator<StackParamList>();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // header: ({ navigation }) => <Header navigation={navigation} />, // Custom header with navigation
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Chats">
        {props => (
          <Layout {...props}>
            <Chats />
          </Layout>
        )}
      </Stack.Screen>
      <Stack.Screen name="Room">
        {props => (
          <Layout {...props}>
            <Room />
          </Layout>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;
