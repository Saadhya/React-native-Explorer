import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "../utils/constants";
import GroupStackNavigator from "./GroupStackNavigator";
import FriendsStackNavigator from "./FriendsStackNavigator";
import ActivityStackNavigator from "./ActivityStackNavigator";
import AccountStackNavigator from "./AccountStackNavigator";
import { Feather } from "@expo/vector-icons";
import AuthStackNavigator from "./AuthStackNavigator";
import { useAuth } from "../context/AuthProvider";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
const auth= useAuth();
  if(!auth.loggedIn){
    return <AuthStackNavigator/>
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={Tabs.Groups}
        options={{
          tabBarIcon: (props) => (
            <Feather name="users" size={24} color="black" />
          ),
        }}
        component={GroupStackNavigator}
      />
      <Tab.Screen name={Tabs.Friends} options={{
          tabBarIcon: () => (
            <Feather name="user" size={24} color="black" />
          ),
        }} component={FriendsStackNavigator} />
      <Tab.Screen name={Tabs.Activity} component={ActivityStackNavigator} options={{
          tabBarIcon: () => (
            <Feather name="activity" size={24} color="black" />
          ),
        }} />
      <Tab.Screen name={Tabs.Account} component={AccountStackNavigator} options={{
          tabBarIcon: () => (
            <Feather name="package" size={24} color="black" />
          ),
        }} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
