import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FriendsScreen } from "../utils/constants";
import AllFriends from "../screens/Friends/AllFriends";
import FriendPage from "../screens/Friends/FriendPage";
import AddFriend from "../screens/Friends/AddFriend";
import FriendAddExpense from "../screens/Friends/FriendAddExpense";
import FriendExpenseItem from "../screens/Friends/FriendExpenseItem";
import { FriendsStackParamList } from "../navigation/types";

const Stack = createNativeStackNavigator<FriendsStackParamList>();

const FriendsStackNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:true}}>
       <Stack.Screen
          name={FriendsScreen.AllFriends}
          component={AllFriends}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name={FriendsScreen.AddFriend}
          component={AddFriend}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={FriendsScreen.FriendPage}
        component={FriendPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={FriendsScreen.FriendAddExpense}
          component={FriendAddExpense}
        />
        <Stack.Screen
          name={FriendsScreen.FriendExpenseItem}
          component={FriendExpenseItem}
         />
      </Stack.Navigator>
  );
}



export default FriendsStackNavigator;
