import { createStackNavigator } from "@react-navigation/stack";
import AccountDetails from "../screens/Account/AccountDetails";
import { AccountScreen } from "../utils/constants";

const Stack = createStackNavigator();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:true}}>
      <Stack.Screen
        name={AccountScreen.AccountDetails}
        component={AccountDetails} // Replace with actual component
      />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
