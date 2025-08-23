import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { GroupScreen } from "@/app/utils/constants";
import { Feather } from "@expo/vector-icons";
// import { Icon } from "react-native-vector-icons/MaterialIcons";

type RootStackParamList = {
  [GroupScreen.AddGroup]: undefined;
};

const AddNewGroup = () => {
  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: true,
      headerRight: () => (
        <Button mode="text" onPress={() => alert("save")}>
          Done
        </Button>
      ),
      headerLeft: () => (
        <IconButton icon="close" onPress={() => nav.goBack()} />
      ),
      headerShadowVisible: false,
    });
  }, [nav]);

  return (
    <View style={styles.container}>
      <View style={styles.groupDetails}>
        <View style={styles.photoContainer}>
          <Feather name="user" size={30} color="#000" />
        </View>
      </View>
    </View>
  );
};

export default AddNewGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  groupDetails: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  photoContainer: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor:'green',
    padding:3
  },
});
