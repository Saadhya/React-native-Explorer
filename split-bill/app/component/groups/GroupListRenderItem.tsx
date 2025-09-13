import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { GroupScreen } from "@/app/utils/constants";
import { useNavigation } from "@react-navigation/native";


const GroupListRenderItem = ({ group }: { group: any }) => {
      const nav = useNavigation();
    const navToGroupScreen=()=>{
        nav.navigate(GroupScreen.GroupItem);
    }
  return (
    <TouchableOpacity style={styles.container} onPress={navToGroupScreen}>
      {/* <Text style={styles.text}>{JSON.stringify(group)}</Text> */}
      <View style={styles.groupContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.groupText}>{group.name}</Text>
          <Text style={styles.smallText}>
            {new Date(group.created_at).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.iconContainer}>
        <Feather name="user" size={20} color={"white"}/>
          <Text style={styles.smallText}>{3}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupListRenderItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: Dimensions.get("window").width - 60,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    backgroundColor: "green",
    shadowColor:'#ffffff',
    elevation:10,
    shadowOffset:{width:0,height:10},
    shadowOpacity:0.8,
    shadowRadius:10
  },
  itemContainer: {
    flex: 1,
    height: 100,
  },
  groupContainer: {
    flexDirection: "row",
  },
  groupText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  smallText: {
    color: "white",
    fontWeight: "500",
  },
  iconContainer:{
    flexDirection:'row',
    justifyContent:'center',
    gap:4
  }
});
