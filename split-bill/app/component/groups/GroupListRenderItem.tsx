import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { GroupScreen } from "@/app/utils/constants";
import { useNavigation } from "@react-navigation/native";
import { useAppState } from "@/app/context/AppStateProvider";
import { getMembersOfGroup, getMemberCountOfGroup } from "@/app/sql/group-members/get";

const GroupListRenderItem = ({ group }: { group: any }) => {
  const { setSelectedGroup, selectedGroup} = useAppState();
  const [memberCount, setMemberCount] = useState<number>(0);
  const nav = useNavigation();

  const navToGroupScreen = () => {
    // Store the full group object in context to match AppStateProvider typing
    setSelectedGroup(group);
    // console.log("navigating to group screen with group:", group);
    // @ts-ignore
    nav.navigate(GroupScreen.GroupItem, {group});
  };
  // Fetch member count for this list item independently so counts are correct per group
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const count = await getMemberCountOfGroup(+group.id);
        if (isMounted) setMemberCount(count ?? 0);
      } catch (err) {
        console.log("error while fetching member count: ", err);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [group?.id]);

  // Keep existing layout effect if you still want to populate shared context when a group is selected
  // useLayoutEffect(() => {
  //   if (!selectedGroup) return;
  //   getMembersOfGroup(+selectedGroup.id)
  //     .then((res) => {
  //       console.log("group members GLRI: ", res);
  //       setGroupMembers(res || []);
  //     })
  //     .catch((err) => {
  //       console.log("error while fetching group members: ", err);
  //     });
  // }, [selectedGroup]);
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
          <Text style={styles.smallText}>{memberCount}</Text>
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
