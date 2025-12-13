import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { GroupScreen } from "@/app/utils/constants";
import { Feather } from "@expo/vector-icons";
import { createNewGroup } from "@/app/sql/group/create";
import { useAuth } from "@/app/context/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  [GroupScreen.AddGroup]: undefined;
};

const AddNewGroup = () => {
  const {
    user: { id },
  } = useAuth();
  const [groupName, setGroupName] = useState("");
  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();

  const addNewGroup = async (groupName:any) => {
    try {
      if (!groupName || groupName.trim().length === 0) return;
      if (!id || isNaN(+id)) {
        alert("User not authenticated");
        return;
      }

      console.log("group name: ", groupName);

      const groupId = await createNewGroup({ name: groupName, creatorId: +id });
      // alert(`${groupName} created with id: ${groupId}` );
      (nav as any).navigate(GroupScreen.AllGroups);
      setGroupName('')
    } catch (error) {
      console.log("Error creating new group: ", error);
      alert("Error: " + error);
    }
  };
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: true,
      headerRight: () => (
        <Button mode="text" onPress={()=>addNewGroup(groupName)}>
          Done
        </Button>
      ),
      headerLeft: () => (
        <IconButton icon="close" onPress={() => nav.goBack()} />
      ),
      headerShadowVisible: false,
    });
  }, [nav, groupName]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupDetails}>
        <View style={styles.photoContainer}>
          <Feather name="user" size={30} color="#000" />
        </View>
        <View style={styles.inputCont}>
          <TextInput
            mode="flat"
            placeholder="Group name"
            value={groupName}
            onChangeText={(name) => setGroupName(name)}
            style={styles.input}
          ></TextInput>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddNewGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  groupDetails: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  photoContainer: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 8,
    padding: 3,
  },
  inputCont: {
    maxWidth: 300,
    width: 300,
  },
  input: {
    fontSize: 20,
  },
});
