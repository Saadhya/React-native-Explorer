import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { GroupScreen } from "@/app/utils/constants";

type RootStackParamList = {
  [GroupScreen.AddGroup]: undefined;
};

const GroupAppBar = () => {
  const nav = useNavigation<StackNavigationProp<RootStackParamList>>();
  const navToAddScreen = () => {
    nav.navigate(GroupScreen.AddGroup);
  };

  return (
    <View>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Action icon={"magnify"} onPress={() => console.log("search")} />
        
        <Appbar.Action
          icon="account-multiple-plus-outline"
          onPress={navToAddScreen}
        />
        </Appbar.Header>
    </View>
  );
};

export default GroupAppBar;

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "transparent",
    marginLeft: "auto",
  },
});
