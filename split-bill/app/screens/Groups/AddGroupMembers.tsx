import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SelectContacts } from "@/app/component/friends/SelectContacts";
import { useAppState } from "@/app/context/AppStateProvider";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import * as Contacts from "expo-contacts";
import { createNewGroupMembersTransaction } from "@/app/sql/group/create";
import { SafeAreaView } from "react-native-safe-area-context";
import { GroupScreen } from "@/app/utils/constants";

const AddGroupMembers = () => {
   const [selectedContacts, setSelectedContacts] = useState<Contacts.Contact[]>(
    []
  );
  const nav = useNavigation();
  const { selectedGroup }: { selectedGroup: any } = useAppState();
  console.log("group id : "+selectedGroup?.id);

  const addNewMembers = async () => {
    console.log("selectedContacts : "+selectedContacts.length);
    // if (selectedContacts.length === 0) {
    //   console.log("no contacts");
    //   return;
    // }
    
    // add contactsToAdd to group members table with selectedGroup id
    // Alert.alert(`Adding new members: ${selectedContacts.length}`);

    try {
      // check disabling this function call if no contacts are selected or not working as expected
      await createNewGroupMembersTransaction({
        contactIds: selectedContacts,
        groupId: selectedGroup?.id,
      });
      Alert.alert("Success", "Members added to the group.");
      // add navigation to the members screen= GroupItemPersons

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
          <Button {...props} mode="text" onPress={addNewMembers.bind(this)}>
            Create
          </Button>
        );
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={addNewMembers}>Add Contacts</Button>
      <SelectContacts selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts}/>
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
