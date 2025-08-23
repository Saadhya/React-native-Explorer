import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FriendsScreen, GroupScreen } from "../utils/constants";
import AllFriends from "../screens/Friends/AllFriends";
import FriendPage from "../screens/Friends/FriendPage";
import AddFriend from "../screens/Friends/AddFriend";

const Stack = createNativeStackNavigator();

const FriendsStackNavigator = () => {
  return (
      <Stack.Navigator >
        <Stack.Screen
          name={FriendsScreen.AddFriend}
          component={AddFriend}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={FriendsScreen.AllFriends}
          component={AllFriends}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={FriendsScreen.FriendPage}
        component={FriendPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}



export default FriendsStackNavigator;
