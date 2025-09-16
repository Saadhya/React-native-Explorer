import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SelectContacts } from "@/app/component/friends/SelectContacts";
import { useAppState } from "@/app/context/AppStateProvider";
import { getMembersOfGroup } from "@/app/sql/group-members/get";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GroupScreen } from "@/app/utils/constants";

const GroupItemPersons = () => {
  const nav = useNavigation();
  const [members, setMembers] = useState<any[]>([]);
  const { selectedGroup }: { selectedGroup: any } = useAppState();
  console.log("item persons: " + selectedGroup);

  useLayoutEffect(() => {
    // fetch group members from db using selectedGroup
    getMembersOfGroup(+selectedGroup)
      // .then(setMembers)
      .then((res) => {
        console.log("group members: ", res);
        setMembers(res || []);
      })
      .catch((err) => {
        console.log("error while fetching group members: ", err);
      }); //+ unary + operator to convert string to number
  }, []);

  const navToAddMembers = () => {
    (nav as any).navigate(GroupScreen.AddGroupMembers, {members});
  }

  return (
    <View>
      <Button mode="contained" onPress={navToAddMembers} style={styles.addBtn}>Add New Members</Button>
      <Text>GroupItemPersons</Text>
      <Text style={styles.text}>{JSON.stringify(members)} </Text>
    </View>
  );
};

export default GroupItemPersons;

const styles = StyleSheet.create({
  addBtn:{
    width:300,
    marginVertical:10, 
    marginHorizontal:'auto',
  },
  text:{
    padding:10
  }
});
