import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
// Import Screens
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../screens/Profile';
import HomeStack from './HomeStack';
import UserStack from './UserStack';

const Tab = createBottomTabNavigator();

// const HomeScreen = () => (
//   <View>
//     <Text>My Home</Text>
//   </View>
// );
// const ProfileScreen = () => (
//   <View>
//     <Text>Profile</Text>
//   </View>
// );

interface BottomTabsProps {
  userType: 'customer' | 'host';
}

const BottomTabs: React.FC<BottomTabsProps> = ({userType}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName: string = '';
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Profile':
              iconName = 'account-outline';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      {/* {userType === 'host' && <Tab.Screen name="My Car" component={MyCarScreen} />} */}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
