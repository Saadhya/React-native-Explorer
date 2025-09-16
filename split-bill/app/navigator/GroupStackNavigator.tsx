import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GroupScreen } from "../utils/constants";
import AddGroup from "../screens/Groups/AddGroup";
import AllGroups from "../screens/Groups/AllGroups";
import GroupItem from "../screens/Groups/GroupItem";
import GroupItemMain from "../screens/Groups/GroupItemMain";
import GroupItemPersons from "../screens/Groups/GroupItemPersons";
import AddGroupMembers from "../screens/Groups/AddGroupMembers";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const GroupItemNavigator=()=>{
  return(
   <Tab.Navigator>
    <Tab.Screen options={{title:'Splits', animationEnabled:true}} name={GroupScreen.GroupItemMain} component={GroupItemMain}/>
    <Tab.Screen options={{title:'Members'}} name={GroupScreen.GroupItemPersons} component={GroupItemPersons}/>
   </Tab.Navigator>
  )
}
const GroupStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:true}}>
      <Stack.Screen name={GroupScreen.AllGroups} component={AllGroups} />
      <Stack.Screen name={GroupScreen.AddGroup} component={AddGroup} />
      <Stack.Screen
        name={GroupScreen.AddGroupMembers}
        component={AddGroupMembers}
      />
      <Stack.Screen name={GroupScreen.GroupItem} component={GroupItemNavigator} />
    </Stack.Navigator>
  );
};

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   return (
//     <View>
//       <Text>Home Screen</Text>
//       <Text>Welcome to the Split Bill App</Text>
//       {/* <TouchableOpacity
//         onPress={() => navigation.navigate("/Details")}
//         style={{ padding: 10, backgroundColor: 'lightblue', borderRadius: 5 }}
//       >
//         <Text>Go to Details</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// };
// const DetailsScreen = () => {
//   return (
//     <View>
//       <Text>Details Screen</Text>
//       <Text>Here you can see the details of the bill</Text>
//     </View>
//   );
// };

export default GroupStackNavigator;
