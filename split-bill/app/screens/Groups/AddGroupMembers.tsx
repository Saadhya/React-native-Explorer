import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SelectContacts } from "@/app/component/friends/SelectContacts";
import { useAppState } from "@/app/context/AppStateProvider";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { createNewGroupMembersTransaction } from "@/app/sql/group/create";
import { SafeAreaView } from "react-native-safe-area-context";

const AddGroupMembers = () => {
  const [contactsToAdd, setContactsToAdd] = useState([]);
  const nav = useNavigation();
  const { selectedGroup }: { selectedGroup: any } = useAppState();
  console.log("group id : "+selectedGroup);

  const addNewMembers = async () => {
    alert("adding new members: " + contactsToAdd.length);
    if (contactsToAdd.length === 0) return;
    // add contactsToAdd to group members table with selectedGroup id
    try {
      await createNewGroupMembersTransaction({
        contactIds: contactsToAdd,
        groupId: selectedGroup.id,
      });
      alert("success");
    } catch (err) {
      console.log("error while adding new members to group: ", err);
    }
  };
  useLayoutEffect(() => {
    nav.setOptions({
      title: selectedGroup?.group_name,
      headerShadowColor: "",
      headerRight: (props: any) => {
        return (
          <Button {...props} mode="text" onPress={addNewMembers}>
            Create
          </Button>
        );
      },
    });
  }, []);
  const onSelectContacts = (data: any) => {
    console.log("agm : " + data);
    setContactsToAdd(data);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.title}>AddGroupMembers</Text> */}
      <SelectContacts onSelectContacts={onSelectContacts} />
    </SafeAreaView>
  );
};

export default AddGroupMembers;

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    justifyContent: "flex-start",
    // alignContent: "flex-start",
    width: Dimensions.get("window").width - 50,
  },
  title: {
    fontWeight: 500,
    fontSize: 20,
    marginBottom: "auto",
  },
});
