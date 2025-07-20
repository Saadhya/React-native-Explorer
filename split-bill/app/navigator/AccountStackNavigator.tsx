import { createStackNavigator } from "@react-navigation/stack";
import AccountDetails from "../screens/Account/AccountDetails";
import { AccountScreen } from "../utils/constants";

const Stack = createStackNavigator();

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AccountScreen.AccountDetails}
        component={AccountDetails} // Replace with actual component
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AccountStackNavigator;
