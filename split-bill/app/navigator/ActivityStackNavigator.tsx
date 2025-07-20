import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityScreen } from "../utils/constants";
import AllActivities from "../screens/Activity/AllActivities";

const Stack = createNativeStackNavigator();

const ActivityStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ActivityScreen.AllActivities}
        component={AllActivities}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ActivityStackNavigator;
