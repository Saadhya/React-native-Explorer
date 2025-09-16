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
import { useAppState } from "@/app/context/AppStateProvider";

const GroupListRenderItem = ({ group }: { group: any }) => {
  const { setSelectedGroup } = useAppState();
  const nav = useNavigation();
  // console.log(group);
  const navToGroupScreen = () => {
    setSelectedGroup(group.id);
    // console.log("navigating to group screen with group:", group);
    // @ts-ignore
    nav.navigate(GroupScreen.GroupItem, {group});
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navToGroupScreen}>
      {/* <Text style={styles.groupText}>{JSON.stringify(group)}</Text> */}

      <View style={styles.groupContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.groupText}>{group.group_name}</Text>
          <Text style={styles.smallText}>
            {new Date(group.created_at).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Feather name="user" size={20} color={"white"} />
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
    borderRadius: 10,
    width: Dimensions.get("window").width - 60,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    backgroundColor: "green",
    shadowColor: "#ffffff",
    elevation: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
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
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
});
